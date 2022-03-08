from django.urls import path, include
from rest_framework import routers
from .views import GameViewSet, submit_answer, advance_game

create_active_game = GameViewSet.as_view({'post': 'create'})
get_active_game = GameViewSet.as_view({'get': 'get_active_game'})
delete_active_game = GameViewSet.as_view({'delete': 'delete_active_game'})

urlpatterns = [
    path('game/new/', create_active_game, name='create_active_game'),
    path('game/', get_active_game, name='get_active_game'),
    path('game/delete/', delete_active_game, name='delete_active_game'),
    path('game/advance/', advance_game, name='advance_game'),

    path('player/<slug:UUID>/submit', submit_answer, name='submit_answer'),
]
