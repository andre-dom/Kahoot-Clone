from django.urls import path, include
from rest_framework import routers
from .views import GameViewSet, submit_answer, advance_game, standings, list_completed_games, get_completed_game, get_game_results_as_csv, get_name,set_name

create_active_game = GameViewSet.as_view({'post': 'create'})
get_active_game = GameViewSet.as_view({'get': 'get_active_game'})
delete_active_game = GameViewSet.as_view({'delete': 'delete_active_game'})

urlpatterns = [
    path('game/new/', create_active_game, name='create_active_game'),
    path('game/', get_active_game, name='get_active_game'),
    path('game/delete/', delete_active_game, name='delete_active_game'),
    path('game/advance/', advance_game, name='advance_game'),
    path('game/standings/', standings, name='game_standings'),
    path('game/completed/', list_completed_games, name='list_completed_games'),
    path('game/completed/<slug:slug>/', get_completed_game, name='get_completed_game'),
    path('game/completed/<slug:slug>/export/', get_game_results_as_csv, name='get_completed_game_csv'),

    path('player/<slug:slug>/submit/', submit_answer, name='submit_answer'),
    path('player/<slug:slug>/name/', get_name, name='get_name'),
    path('player/<slug:slug>/setname/', set_name, name='set_name'),
]
