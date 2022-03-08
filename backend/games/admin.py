import nested_admin.nested
from django.contrib import admin

# Register your models here.

# from .models import Game,Player,Question_Answer
#
# import nested_admin

from .models import Game,PlayerAnswerList,Players

import nested_admin

# class Question_Answer_Inline(nested_admin.NestedTabularInline):
#     model = Question_Answer
#     list_display = ('question_answer',)
# class PlayerInLine(nested_admin.NestedTabularInline):
#     model = Players
#     list_display = ('UUID')
# class GameAdmin(nested_admin.NestedModelAdmin):
#     model = Game
#     list_display = ('instructor',)
#     readonly_fields = ('current_question')



