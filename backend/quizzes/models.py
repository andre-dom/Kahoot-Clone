from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from autoslug import AutoSlugField
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User


class Quiz(models.Model):
    name = models.CharField(max_length=30)
    creator = models.ForeignKey(User, related_name='quizzes', on_delete=models.CASCADE,)
    slug = AutoSlugField(populate_from='name', unique=True, editable=False)

    def num_questions(self):
        return len(self.questions.all())

    def __str__(self):
        return self.name


class Question(models.Model):
    question_body = models.TextField()
    quiz = models.ForeignKey('Quiz', related_name='questions', on_delete=models.CASCADE, )
    correct_answer = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])

    def num_answers(self):
        return len(self.answers.all())

    def __str__(self):
        return self.question_body


class Answer(models.Model):
    answer_body = models.TextField()
    question = models.ForeignKey('Question', related_name='answers', on_delete=models.CASCADE, )

    def __str__(self):
        return self.answer_body
