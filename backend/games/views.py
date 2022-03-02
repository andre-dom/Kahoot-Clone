from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Game
from .serializers import GameSerializer

'''
this is where the CRUD operations will happen
'''


class GameView(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

