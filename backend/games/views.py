from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import Game
from .serializers import GameSerializer


class GameView(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_queryset(self):
        return super(GameView, self).get_queryset().filter(creator=self.request.user)
