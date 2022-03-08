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
from .serializers import GameSerializer


class GameViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = Game.objects.filter(state='active')
    serializer_class = GameSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @action(methods=['delete'], detail=False, )
    def delete_active_game(self, request):
        get_object_or_404(Game.objects.all(), creator=self.request.user).delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['get'], detail=False, )
    def get_active_game(self, request):
        game = get_object_or_404(Game.objects.all(), creator=self.request.user)
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
    return response.Response({'info': 'game has completed!'},status=status.HTTP_200_OK)

# instructor get current game standings
@api_view(['GET'])
def standings(request):
    game = get_object_or_404(Game.objects.all(), creator=request.user, state='active')
    leaderboard = {}
    for player in game.players.all():
        leaderboard[player.email] = player.num_correct_answers()
    leaderboard = {k: v for k, v in sorted(leaderboard.items(), key=lambda x: x[1], reverse=True)}
    return response.Response(leaderboard, status=status.HTTP_200_OK)

# view for players to submit their answers
@api_view(['POST'])
def submit_answer(request, slug):
    player = get_object_or_404(Player.objects.all(), slug=slug)
    if player.game.state != 'active':
        return response.Response({'error': 'This game has concluded'}, status=status.HTTP_403_FORBIDDEN)
    player.set_answer(player.game.current_question.index, request.data['answer'])
    return response.Response(status=status.HTTP_204_NO_CONTENT)
