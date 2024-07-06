from django.contrib import admin

# Register your models here.
from .models import Quiz, Question, Answer

import nested_admin


# i guess this is for what is displayed in the admin pages????
class AnswerInline(nested_admin.NestedTabularInline):
    model = Answer
    list_display = (
        "index",
        "body",
    )


class QuestionInline(nested_admin.NestedTabularInline):
    model = Question
    list_display = (
        "index",
        "body",
    )
    inlines = (AnswerInline,)


class QuizAdmin(nested_admin.NestedModelAdmin):
    model = Quiz
    list_display = ("name",)
    readonly_fields = ("slug",)
    inlines = (QuestionInline,)


# registering the models into the admin page
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question)
admin.site.register(Answer)
