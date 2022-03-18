from core.models import Gameplay

def get_game_result(playerMove, opponentMove):
    if playerMove == opponentMove:
        return 'TIE'
    if playerMove == 'R':
        return 'WIN' if opponentMove == 'S' else 'LOOSE'
    if playerMove == 'P':
        return 'WIN' if opponentMove == 'R' else 'LOOSE'
    if playerMove == 'S':
        return 'WIN' if opponentMove == 'P' else 'LOOSE'