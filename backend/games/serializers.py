from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from quizzes.models import Quiz
from .models import Game, Player
from drf_writable_nested.serializers import WritableNestedModelSerializer


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('email',)


class QuizFieldSerializer(serializers.SlugRelatedField):
    def get_queryset(self):
        queryset = Quiz.objects.all()
        request = self.context.get('request', None)
        queryset = queryset.filter(creator=request.user)
        return queryset


class GameSerializer(WritableNestedModelSerializer):
    players = PlayerSerializer(many=True)
    quiz = QuizFieldSerializer(slug_field='slug')

    class Meta:
        model = Game
        fields = ('quiz', 'players',)

    def validate(self, data):
        user = self.context['request'].user
        if Game.objects.filter(creator=user, state='active').exists():
            raise ValidationError("User cannot have more than one active game.")
        if len(data['players']) == 0:
            raise serializers.ValidationError("Must be at least one player")
        return data


class GameStateSerializer(WritableNestedModelSerializer):
    class Meta:
        model = Game
        readonly_fields = ('quiz', 'players', )

