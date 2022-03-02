from rest_framework import serializers
from .models import Game
from drf_writable_nested.serializers import WritableNestedModelSerializer

class GameSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Game
        fields = ('game_quiz','players',)
        read_only_fields = ('current_question',)


