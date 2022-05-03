import uuid
import ast

from django.contrib.auth.models import User
from django.core.validators import validate_comma_separated_integer_list
from django.dispatch import receiver

from quizzes.models import Quiz,Question,Answer
from django_fsm import FSMField, transition


from django.db import models
from django.core.mail import send_mail

class Game(models.Model):
    creator = models.ForeignKey(User, related_name='games', on_delete=models.CASCADE, )
    quiz = models.ForeignKey(Quiz, null=False, on_delete=models.CASCADE, )
    current_question = models.ForeignKey(Question, null=True, related_name='game', on_delete=models.CASCADE)
    state = FSMField(default='active', protected=True)
    slug = models.CharField(unique=True, max_length=5)

    # advance the game forward one question, return false if the game is over

    def advance_game(self):
        if self.current_question.index < self.quiz.num_questions():
            self.current_question = self.quiz.questions.get(index=self.current_question.index + 1)
            self.save()
            return True
        self.to_state_complete()
        self.save()
        return False

    # return a sorted dict of players and their scores
    def get_leaderboard(self):
        leaderboard = {}
        for player in self.players.all():
            print(player.email)
            leaderboard[player.email] = player.num_correct_answers()

        return {k: v for k, v in sorted(leaderboard.items(), key=lambda x: x[1], reverse=True)}

    # precondition for state transition, make sure we are on the last question before we finish the game
    def can_complete(self):
        return not self.current_question.index < self.quiz.num_questions()

    # complete the game
    @transition(field=state, source="active", target="complete", conditions=[can_complete])
    def to_state_complete(self):
        self.current_question = None
        self.slug = uuid.uuid4().hex[:6].upper()
        self.save()

    def __str__(self):
        return f'{self.creator.username}: {self.quiz.name}'


# runs after a Game is saved to DB, set current question to the first question if the game is just starting
@receiver(models.signals.post_save, sender=Game)
def initialize_game(sender, instance, created, *args, **kwargs):
    if created:
        if not instance.current_question and instance.state == 'active':
            instance.current_question = instance.quiz.questions.get(index=1)
            instance.save()


class Player(models.Model):
    email = models.EmailField()
    game = models.ForeignKey(Game, null=False, related_name='players', on_delete=models.CASCADE, )
    slug = models.CharField(unique=True, max_length=5)
    answers = models.CharField(validators=[validate_comma_separated_integer_list],
                               max_length=100)  # 100 chars, enough for 50 comma seperated answers

    # helper functions to convert between string and list
    def set_answer(self, question_index, answer):
        if question_index < 1 or question_index > self.game.quiz.num_questions():
            raise ValueError(
                f'get_answer: question_index should be between 1 and {self.game.quiz.num_questions()}, got {question_index}')
        if int(answer) < 1 or int(answer) > 4:
            raise ValueError(f'set_answer: question_index should be between 1 and 4, got {answer}')
        answers = ast.literal_eval(f'[{self.answers}]')
        answers[question_index - 1] = answer
        self.answers = ','.join([str(i) for i in answers])
        self.save()

    def get_answer_list(self):
        return ast.literal_eval(f'[{self.answers}]')

    def get_answer(self, question_index):
        if question_index < 1 or question_index > self.game.quiz.num_questions():
            raise ValueError(
                f'get_answer: question_index should be between 1 and {self.game.quiz.num_questions()}, got {question_index}')
        return self.get_answer_list()[question_index - 1]

    def num_correct_answers(self):
        correct = 0
        answers = self.get_answer_list()
        quiz = self.game.quiz
        for i in range(0, quiz.num_questions()):
            if answers[i] == quiz.questions.get(index=i + 1).correct_answer:
                correct += 1
        return correct

    # check if player got a given question correct
    def question_correct(self, question_index):
        return self.get_answer(question_index) == self.game.quiz.questions.get(index=question_index).correct_answer

    # check if player got the previous question correct
    def previous_question_correct(self):
        if self.game.state == 'complete':
            return self.question_correct(self.game.quiz.num_questions())
        return self.question_correct(self.game.current_question.index - 1)

    # return the player's score - for now just the number of correct answers
    def get_score(self):
        return self.num_correct_answers()

    def __str__(self):
        return f'{self.email}: {self.game.quiz.name}'


# runs after a player is saved to DB, make sure they have an initialized answer list and id
@receiver(models.signals.post_save, sender=Player)
def initialize_player(sender, instance, created, *args, **kwargs):
    if created:
        # at some point we should make a check to ensure that the player slug is unique
        if not instance.slug:
            instance.slug = uuid.uuid4().hex[:6].upper()
        if not instance.answers:
            send_mail(
                'Kahoot-Clone Game Invite',
                f'{instance.game.creator.username} has invited you to a game! Join with the link below:\n\nhttp://127.0.0.1:3000/game/{instance.slug}',
                'admin@example.com',
                [instance.email],
                fail_silently=False,
            )
            instance.answers = ','.join([str(0) for i in range(0, instance.game.quiz.num_questions())])
        instance.save()
