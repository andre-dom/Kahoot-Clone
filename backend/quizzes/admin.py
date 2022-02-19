from django.contrib import admin

# Register your models here.
from .models import Quiz, Question, Answer

import nested_admin


class AnswerInline(nested_admin.NestedTabularInline):
    model = Answer
    # readonly_fields = ('created_at', 'slug')
    list_display = ('answer_body',)


class QuestionInline(nested_admin.NestedTabularInline):
    model = Question
    # readonly_fields = ('created_at', 'slug')
    list_display = ('question_body',)
    inlines = (AnswerInline,)


class QuizAdmin(nested_admin.NestedModelAdmin):
    model = Quiz
    # readonly_fields = ()
    list_display = ('name',)
    inlines = (QuestionInline,)
    # filter_horizontal = ('students',)


admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question)
admin.site.register(Answer)
