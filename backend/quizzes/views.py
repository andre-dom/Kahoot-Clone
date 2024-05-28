from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Quiz, Question, Answer
from .serializers import QuizSerializer, QuestionSerializer, AnswerSerializer


class QuizView(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    lookup_field = "slug"
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_queryset(self):
        return super(QuizView, self).get_queryset().filter(creator=self.request.user)
