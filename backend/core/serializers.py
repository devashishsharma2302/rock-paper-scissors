from rest_framework import serializers
from core.models import GameSession

class GameSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = ['id', 'player_1_id', 'player_2_id', 'player_1_score', 'player_2_score', 'current_gameplay']