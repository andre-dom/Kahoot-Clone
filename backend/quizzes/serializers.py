from rest_framework import serializers
from .models import Quiz, Question, Answer

from drf_writable_nested.serializers import WritableNestedModelSerializer


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('answer_body',)


class QuestionSerializer(WritableNestedModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ('question_body', 'answers', "correct_answer")

    def validate(self, data):
        if len(data['answers']) != 4:
            raise serializers.ValidationError("Must be exactly 4 answers to each question")
        return data


class QuizSerializer(WritableNestedModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ('slug', 'name', 'questions',)
        lookup_field = 'slug'
        depth = 2
        
    def validate(self, data):
        if len(data['questions']) == 0:
            raise serializers.ValidationError("Must be at least one question")
        if len(data['questions']) > 50:
            raise serializers.ValidationError("Can not have more than 50 questions")
        return data
