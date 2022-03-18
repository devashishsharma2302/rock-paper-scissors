from django.urls import path

from . import views

urlpatterns = [
    path('game/', views.GameSessionView.as_view()),
    path('play/', views.gameplay_view),
    path('gameplay-status-check/', views.gameplay_status_check_view),
]