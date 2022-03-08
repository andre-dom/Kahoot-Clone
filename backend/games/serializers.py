from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from quizzes.models import Quiz, Answer, Question
from .models import Game, Player
from drf_writable_nested.serializers import WritableNestedModelSerializer


class AnswerSerializer(WritableNestedModelSerializer):
    index = serializers.IntegerField(read_only=True)

    class Meta:
        model = Answer
        fields = ('answer_body', 'index', )


class QuestionSerializer(WritableNestedModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ('question_body', 'answers', "correct_answer", 'index' ,)


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
    current_question = QuestionSerializer(read_only=True)

    class Meta:
        model = Game
        fields = ('quiz', 'players', 'current_question')

    def validate(self, data):
        user = self.context['request'].user
        if Game.objects.filter(creator=user, state='active').exists():
            raise ValidationError("User cannot have more than one active game.")
        if len(data['players']) == 0:
            raise serializers.ValidationError("Must be at least one player")
        return data


class CompletedGameSerializer(WritableNestedModelSerializer):
    quiz = QuizFieldSerializer(slug_field='slug')
    players = PlayerSerializer(many=True)
    class Meta:
        model = Game
        fields = ('quiz', 'players', 'slug', )
