import nested_admin.nested
from django.contrib import admin

# Register your models here.

import nested_admin

from .models import Game, Player

import nested_admin

class PlayerAdmin(admin.ModelAdmin):
    model = Player
    list_display = ('email',)
    readonly_fields = ('UUID', 'answers')

class PlayerInline(nested_admin.NestedTabularInline):
    model = Player
    list_display = ('email',)
    readonly_fields = ('UUID', 'answers')


class GameAdmin(nested_admin.NestedModelAdmin):
    model = Game
    list_display = ('creator', 'quiz',)
    readonly_fields = ('current_question', 'state',)
    inlines = (PlayerInline,)


admin.site.register(Game, GameAdmin)
admin.site.register(Player, PlayerAdmin)
