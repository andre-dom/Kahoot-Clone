import base64
import os

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


class GameViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = Game.objects.filter(state='active')
    serializer_class = GameSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @action(methods=['delete'], detail=False, )
    def delete_active_game(self, request):
        get_object_or_404(Game.objects.all(), creator=self.request.user, state='active').delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['get'], detail=False, )
    def get_active_game(self, request):
        game = get_object_or_404(Game.objects.all(), creator=self.request.user, state='active')
        return response.Response(self.serializer_class(game).data, status=status.HTTP_200_OK)

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
        return response.Response(self.serializer_class(game).data, status=status.HTTP_200_OK)


# instructor advance game state
@api_view(['POST'])
def advance_game(request):
    game = get_object_or_404(Game.objects.all(), creator=request.user, state='active')
    if game.advance_game():
        return response.Response(GameSerializer(game).data, status=status.HTTP_200_OK)
    leaderboard = game.get_leaderboard()
    return response.Response({'info': 'game has completed!', 'leaderboard': leaderboard}, status=status.HTTP_200_OK)


# instructor get current game standings
@api_view(['GET'])
def standings(request):
    game = get_object_or_404(Game.objects.all(), creator=request.user, state='active')
    leaderboard = game.get_leaderboard()
    return response.Response(leaderboard, status=status.HTTP_200_OK)


# view for players to submit their answers
@api_view(['POST'])
def submit_answer(request, slug):
    player = get_object_or_404(Player.objects.all(), slug=slug)
    if player.game.state != 'active':
        return response.Response({'error': 'This game has concluded'}, status=status.HTTP_403_FORBIDDEN)
    player.set_answer(player.game.current_question.index, request.data['answer'])
    return response.Response(status=status.HTTP_204_NO_CONTENT)


# list completed games
@api_view(['GET'])
def list_completed_games(request):
    games = Game.objects.filter(creator=request.user, state='complete')
    games_list = []
    for game in games.all():
        data = {'slug': game.slug, 'players': []}
        for player in game.players.all():
            data['players'].append({'email': player.email})
        games_list.append(data)
    return response.Response(games_list, status=status.HTTP_200_OK)

# get completed game and some stats
@api_view(['GET'])
def get_completed_game(request, slug):
    games = Game.objects.filter(creator=request.user, state='complete')
    game = get_object_or_404(games, slug=slug)
    game_data = {'slug': game.slug, 'players': []}
    scores = []
    for player in game.players.all():
        game_data['players'].append({'email': player.email,
                                     'answers': player.get_answer_list(),
                                     'num_correct': player.num_correct_answers()},)
        scores.append(player.num_correct_answers())
    scores = pd.Series(scores)
    game_data['leaderboard'] = game.get_leaderboard()
    game_data['mean_score'] = scores.mean()
    game_data['median_score'] = scores.median()
    game_data['histogram'] = generate_score_histogram(scores, game.quiz.num_questions())
    return response.Response(game_data, status=status.HTTP_200_OK)
