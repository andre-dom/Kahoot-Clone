import uuid

from django.contrib.auth.models import User
from quizzes.models import Quiz,Question,Answer
from django_fsm import FSMField,transition
from django.db import models

# Create your models here.
class Game(models.Model):
    instructor = models.CharField(max_length=30)
    game_quiz = models.ForeignKey(Quiz,null=True,on_delete=models.CASCADE,)
    current_question = models.ForeignKey(Question,null=True,related_name='game',on_delete=models.CASCADE)
    question_answers = models.ForeignKey('Question_Answer',null=True,related_name='game',on_delete=models.CASCADE)
    #should this be a list
    # players = models.ForeignKey('Player',null=True,related_name='game',on_delete=models.CASCADE)
    #default = 'start' ????
    state = FSMField(default='start',protected=True)

    def __str__(self):
        return self.instructor


class Players(models.Model):
    email = models.ForeignKey(User,null=True,on_delete=models.CASCADE,)

    games = models.ForeignKey(Game,null=True,related_name='players',on_delete=models.CASCADE,)
    UUID = models.UUIDField(editable=False, default=uuid.uuid4, unique=True,)

    def __str__(self):
        return self.UUID

class Question_Answer(models.Model):
    #fix this
    # player = models.ForeignKey('Pla')
    player = models.ForeignKey('Players',related_name='question_answers',on_delete=models.CASCADE,)
    question = models.ForeignKey(Question,null=True,related_name='question_answers',on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer,null=True,related_name='question_answers',on_delete=models.CASCADE)

