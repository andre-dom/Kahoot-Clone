from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from autoslug import AutoSlugField
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User


class Quiz(models.Model):
    name = models.CharField(max_length=30)
    creator = models.ForeignKey(
        User,
        related_name="quizzes",
        on_delete=models.CASCADE,
    )
    slug = AutoSlugField(populate_from="name", unique=True, editable=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "quizzes"


class Question(models.Model):
    body = models.TextField()
    index = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(50)]
    )
    quiz = models.ForeignKey(
        "Quiz",
        related_name="questions",
        on_delete=models.CASCADE,
    )
    correct_answer = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(4)]
    )

    def save(self, *args, **kwargs):
        super(Question, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.index}. {self.body}"

    class Meta:
        ordering = ["index"]


class Answer(models.Model):
    body = models.TextField()
    index = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(4)]
    )
    question = models.ForeignKey(
        "Question",
        related_name="answers",
        on_delete=models.CASCADE,
    )

    def save(self, *args, **kwargs):
        self.index = self.question.answers.count() + 1
        super(Answer, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.index}. {self.body}"
