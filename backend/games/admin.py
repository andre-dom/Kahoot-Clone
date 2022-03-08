import nested_admin.nested
from django.contrib import admin

# Register your models here.

import nested_admin

from .models import Game, Player, PlayerAnswerList

import nested_admin


class PlayerInLine(nested_admin.NestedTabularInline):
    model = Player
    list_display = ('UUID', 'email',)


class GameAdmin(nested_admin.NestedModelAdmin):
    model = Game
    list_display = ('creator', 'game_quiz',)
    readonly_fields = ('current_question', 'state',)
    inlines = (PlayerInLine,)


admin.site.register(Game, GameAdmin)
admin.site.register(Player)
