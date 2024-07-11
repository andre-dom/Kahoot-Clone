from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Quiz, Question, Answer
from .serializers import QuizSerializer, QuestionSerializer, AnswerSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    DefaultOrderingFilterBackend,
    CompoundSearchFilterBackend,
)
from .documents import QuizDocument
from .serializers import QuizSerializer


class QuizSearchView(DocumentViewSet):
    document = QuizDocument
    serializer_class = QuizSerializer
    lookup_field = "slug"
    permission_classes = [IsAuthenticated]
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        CompoundSearchFilterBackend,
    ]
    search_fields = ("name", "questions.body", "questions.answers.body")
    multi_match_search_fields = ("name", "questions.body", "questions.answers.body")
    filter_fields = {
        "name": "name",
        "creator.username": "creator.username",
    }
    ordering_fields = {
        "name": "name",
        "creator.username": "creator.username",
    }
    ordering = ("name",)

    def filter_queryset(self, queryset):
        # Get the current user from the request
        user = self.request.user
        # Filter the queryset to only include quizzes created by the current user
        queryset = queryset.filter("term", creator__username=user.username)
        return queryset


class QuizView(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    lookup_field = "slug"
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_queryset(self):
        return super(QuizView, self).get_queryset().filter(creator=self.request.user)
