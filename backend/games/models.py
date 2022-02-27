import uuid

from django.db import models
from quizzes.models import Quiz, Question, Answer
from django.contrib.auth.models import User
from django_fsm import FSMField, transition
from autoslug import AutoSlugField


class Game(models.Model):
    instructor_name = models.CharField(max_length=30)
    players = models.ForeignKey('Player', related_name='games', on_delete=models.CASCADE)
    current_question = models.ForeignKey(Question, related_name='game_questions', on_delete=models.CASCADE)
    question_answers = models.ForeignKey('Question_Answer', related_name='game_answers', on_delete=models.CASCADE)

    # Finite State Machine
    state = FSMField(default='new')

    def num_players(self):
        return len(self.players.all())

    def __str__(self):
        return self.instructor_name


class Player(models.Model):
    email = models.ForeignKey(User, related_name='player_email', on_delete=models.CASCADE)
    UUID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    game = models.ForeignKey('Game', related_name='players', on_delete=models.CASCADE)

    def __str__(self):
        return self.email


class QuestionAnswer(models.Model):
    player = models.ForeignKey('Player', related_name='')
    question = models.ForeignKey(Question, related_name='quiz_question', on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, related_name='quiz_answer', on_delete=models.CASCADE)
