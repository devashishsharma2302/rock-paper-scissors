from django.db import models

# Create your models here.


class Gameplay(models.Model):
    MOVES = (
        ('R', 'Rock'),
        ('P', 'Paper'),
        ('S', 'Scissors'),
    )
    id = models.BigAutoField(primary_key=True)
    player_1_move = models.CharField(max_length=1, choices=MOVES, null=True, blank=True)
    player_2_move = models.CharField(max_length=1, choices=MOVES, null=True, blank=True)

class GameSession(models.Model):
    id = models.BigAutoField(primary_key=True)
    player_1_id = models.CharField(max_length=50)
    player_2_id = models.CharField(max_length=50)
    player_1_score = models.IntegerField(default=0)
    player_2_score = models.IntegerField(default=0)
    current_gameplay = models.OneToOneField(Gameplay, on_delete=models.CASCADE)