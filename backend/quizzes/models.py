from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from autoslug import AutoSlugField
from rest_framework.exceptions import ValidationError
from django.contrib.auth.models import User


class Quiz(models.Model):
    name = models.CharField(max_length=30)
    creator = models.ForeignKey(User, related_name='quizzes', on_delete=models.CASCADE, )
    # used to make objects unique by providing a '-' inside key's syntax
    slug = AutoSlugField(populate_from='name', unique=True, editable=False)

    # not sure what this will be used for right now...
    def num_questions(self):
        return len(self.questions.all())

    # Django will use the result of that function to display objects of that type for example in the admin interface.
    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'quizzes'


class Question(models.Model):
    question_body = models.TextField()
    index = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(50)])
    quiz = models.ForeignKey('Quiz', related_name='questions', on_delete=models.CASCADE, )
    correct_answer = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])

    def num_answers(self):
        return len(self.answers.all())

    def save(self, *args, **kwargs):
        self.index = self.quiz.num_questions() + 1
        super(Question, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.index}. {self.question_body}'


class Answer(models.Model):
    answer_body = models.TextField()
    index = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    question = models.ForeignKey('Question', related_name='answers', on_delete=models.CASCADE, )

    def save(self, *args, **kwargs):
        self.index = self.question.num_answers() + 1
        super(Answer, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.index}. {self.answer_body}'
