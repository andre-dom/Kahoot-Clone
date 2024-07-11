from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("quizzes", views.QuizView)
router.register("search", views.QuizSearchView, basename="search-quizzes")

urlpatterns = [path("", include(router.urls))]
