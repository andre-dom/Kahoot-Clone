from rest_framework import serializers
from .models import Game, Players
from drf_writable_nested.serializers import WritableNestedModelSerializer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = ('email',)


class GameSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Game
        fields = ('game_quiz', 'players',)
