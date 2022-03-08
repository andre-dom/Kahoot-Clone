import uuid

from django.contrib.auth.models import User
from django.core.validators import int_list_validator, validate_comma_separated_integer_list
from django.dispatch import receiver

from quizzes.models import Quiz, Question, Answer
from django_fsm import FSMField, transition
from django.db import models


# Create your models here.
class Game(models.Model):
    creator = models.ForeignKey(User, related_name='games', on_delete=models.CASCADE, )
    quiz = models.ForeignKey(Quiz, null=False, on_delete=models.CASCADE, )
    current_question = models.ForeignKey(Question, null=True, related_name='game', on_delete=models.CASCADE)
    state = FSMField(default='active', protected=True)

    def __str__(self):
        return f'{self.creator.username}: {self.quiz.name}'


class Player(models.Model):
    email = models.EmailField()
    game = models.ForeignKey(Game, null=False, related_name='players', on_delete=models.CASCADE, )
    UUID = models.UUIDField(editable=False, default=uuid.uuid4, unique=True, )
    # store list of player's answers as a string, validate that it is a properly formatted list
    answers = models.CharField(validators=[validate_comma_separated_integer_list],
                               max_length=100)  # 100 chars, enough for 50 comma seperated answers

    def __str__(self):
        return f'{self.email}: {self.game.quiz.name}'


# runs after a player is saved to DB, make sure they have an initialized answer list
@receiver(models.signals.post_save, sender=Player)
def initialize_answer_list(sender, instance, created, *args, **kwargs):
    if created:
        if not instance.answers:
            instance.answers = ','.join([str(0) for i in range(0, instance.game.quiz.num_questions())])
            instance.save()
