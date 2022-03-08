import uuid

from django.contrib.auth.models import User
from django.core.validators import int_list_validator, validate_comma_separated_integer_list

from quizzes.models import Quiz, Question, Answer
from django_fsm import FSMField, transition
from django.db import models


# Create your models here.
class Game(models.Model):
    instructor = models.ForeignKey(User, related_name='games', on_delete=models.CASCADE, )
    game_quiz = models.ForeignKey(Quiz, null=True, on_delete=models.CASCADE, )
    current_question = models.ForeignKey(Question, null=True, related_name='game', on_delete=models.CASCADE)
    state = FSMField(default='active', protected=True)

    def __str__(self):
        return f'{self.instructor.username}: {self.game_quiz.name}'


class Players(models.Model):
    email = models.ForeignKey(User, null=True, on_delete=models.CASCADE, )

    game = models.ForeignKey(Game, null=True, related_name='players', on_delete=models.CASCADE, )
    UUID = models.UUIDField(editable=False, default=uuid.uuid4, unique=True, )

    def __str__(self):
        return f'{self.email}: {self.game.game_quiz.name}'


# internal model to store a specific player's answers
class PlayerAnswerList(models.Model):
    player = models.ForeignKey('Players', related_name='question_answers', on_delete=models.CASCADE, )
    # store the list of answers as a string, validate that it is properly formatted
    answers = models.CharField(validators=validate_comma_separated_integer_list)
