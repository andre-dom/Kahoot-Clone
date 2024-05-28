import base64
import csv
import os

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, mixins, response, status
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import APIException
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from quizzes.models import Quiz
from .models import Game, Player
from .serializers import GameSerializer, CompletedGameSerializer
from .graphs import generate_score_histogram

import pandas as pd
import pandas.util
import matplotlib as plt

from django_eventstream import send_event


class GameViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = Game.objects.filter(state="active")
    serializer_class = GameSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @action(
        methods=["delete"],
        detail=False,
    )
    def delete_active_game(self, request):
        get_object_or_404(
            Game.objects.all(), creator=self.request.user, state="active"
        ).delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    @action(
        methods=["get"],
        detail=False,
    )
    def get_active_game(self, request):
        game = get_object_or_404(
            Game.objects.all(), creator=self.request.user, state="active"
        )
        return response.Response(
            self.serializer_class(game).data, status=status.HTTP_200_OK
        )

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        # extra stuff after create here

    def get_object(self):
        return get_object_or_404(Game.objects.all(), active_creator=self.request.user)


# instructor views to get and manipulate game state
class GameStateViewSet(GenericViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        # Return current game state
        game = get_object_or_404(Game.objects.all(), creator=self.request.user)
        return response.Response(
            self.serializer_class(game).data, status=status.HTTP_200_OK
        )


# instructor advance game state
@api_view(["POST"])
def advance_game(request):
    game = get_object_or_404(Game.objects.all(), creator=request.user, state="active")
    if game.advance_game():
        question = game.current_question
        index = question.index
        body = question.question_body
        answers = [answer.answer_body for answer in question.answers.all()]
        for player in game.players.all():
            send_event(
                player.slug,
                "message",
                {
                    "message": "game advanced",
                    "question_index": index,
                    "question_body": body,
                    "correct": player.previous_question_correct(),
                    "score": player.get_score(),
                    "answers": answers,
                },
            )
        return response.Response(GameSerializer(game).data, status=status.HTTP_200_OK)
    leaderboard = game.get_leaderboard()
    for player in game.players.all():
        send_event(
            player.slug,
            "message",
            {
                "text": "game finished",
                "correct": player.previous_question_correct(),
                "score": player.get_score(),
            },
        )
    return response.Response(
        {
            "info": {game.slug},
            "leaderboard": leaderboard,
            "data": game.get_rechart_object(),
        },
        status=status.HTTP_200_OK,
    )


# instructor get current game standings
@api_view(["GET"])
def standings(request):
    game = get_object_or_404(Game.objects.all(), creator=request.user, state="active")
    leaderboard = game.get_leaderboard()
    return response.Response(leaderboard, status=status.HTTP_200_OK)


# view for players to get current game state
@api_view(["GET"])
def player_get_game_state(request, slug):
    player = get_object_or_404(Player.objects.all(), slug=slug)
    if player.game.state != "active":
        return response.Response(
            {"error": "This game has concluded"}, status=status.HTTP_403_FORBIDDEN
        )
    question = player.game.current_question
    index = question.index
    body = question.question_body
    answers = [answer.answer_body for answer in question.answers.all()]
    return response.Response(
        {
            "question_index": index,
            "question_body": body,
            "score": player.get_score(),
            "answers": answers,
        },
        status=status.HTTP_200_OK,
    )


# view for players to submit their answers
@api_view(["POST"])
def submit_answer(request, slug):
    player = get_object_or_404(Player.objects.all(), slug=slug)
    if player.game.state != "active":
        return response.Response(
            {"error": "This game has concluded"}, status=status.HTTP_403_FORBIDDEN
        )
    player.set_answer(player.game.current_question.index, request.data["answer"])
    return response.Response(status=status.HTTP_204_NO_CONTENT)


# list completed games
@api_view(["GET"])
def list_completed_games(request):
    games = (
        Game.objects.filter(creator=request.user, state="complete")
        .order_by("-completed_at")
        .select_related("quiz")
        .prefetch_related("players")
    )
    games_list = []
    for game in games:
        data = {
            "slug": game.slug,
            "name": game.quiz.name,
            "completed_at": game.completed_at,
            "players": [{"email": player.email} for player in game.players.all()],
        }
        games_list.append(data)
    return response.Response(games_list, status=status.HTTP_200_OK)


# get completed game and some stats
@api_view(["GET"])
def get_completed_game(request, slug):
    games = Game.objects.filter(creator=request.user, state="complete")
    game = get_object_or_404(games, slug=slug)
    game_data = {"slug": game.slug, "players": []}
    scores = []
    for player in game.players.all():
        scr = player.get_score()
        game_data["players"].append(
            {
                "email": player.email,
                "answers": player.get_answer_list(),
                "num_correct": scr,
            },
        )
        scores.append(scr)
    scores = pd.Series(scores)
    game_data["leaderboard"] = game.get_leaderboard()
    game_data["mean_score"] = scores.mean()
    game_data["median_score"] = scores.median()
    game_data["data"] = game.get_rechart_object()
    game_data["name"] = game.quiz.name
    return response.Response(game_data, status=status.HTTP_200_OK)


# allow instructors to download the results of completed games as CSV
@api_view(["GET"])
def get_game_results_as_csv(request, slug):
    game = get_object_or_404(Game.objects.all(), slug=slug, creator=request.user)

    # Create the HttpResponse object with the appropriate CSV header.
    res = HttpResponse(
        content_type="text/csv",
        headers={
            "Content-Disposition": f'attachment; filename="{game.quiz.name.replace(" ", "_")}_{game.slug}.csv"'
        },
    )

    writer = csv.writer(res)
    writer.writerow(["Player", "Correct", "Incorrect"])
    for player in game.players.all():
        correct = player.get_score()
        writer.writerow([player.email, correct, game.quiz.num_questions() - correct])

    return res


# return true if name is set
@api_view(["GET"])
def get_name(request, slug):
    player = get_object_or_404(Player.objects.all(), slug=slug)
    if player.game.state != "active":
        return response.Response(
            {"error": "This game has concluded"}, status=status.HTTP_403_FORBIDDEN
        )
    if player.name != None:
        return response.Response({"name": player.name}, status=status.HTTP_200_OK)
    return response.Response(None, status=status.HTTP_200_OK)


# return true if name is set
@api_view(["post"])
def set_name(request, slug):
    name = request.data["name"]
    if len(name) > 30:
        return response.Response(
            "error: Name is too long", status=status.HTTP_400_BAD_REQUEST
        )
    player = get_object_or_404(Player.objects.all(), slug=slug)
    if player.game.state != "active":
        return response.Response(
            {"error": "This game has concluded"}, status=status.HTTP_403_FORBIDDEN
        )
    player.name = name
    player.save()
    return response.Response(status=status.HTTP_200_OK)
    # player = get_object_or_404(Player.objects.all(), slug=slug)
    # if player.game.state != 'active':
    #     return response.Response({'error': 'This game has concluded'}, status=status.HTTP_403_FORBIDDEN)
    # if(player.name != None):
    #     return response.Response(True, status=status.HTTP_200_OK)
    # return response.Response(False, status=status.HTTP_200_OK)
