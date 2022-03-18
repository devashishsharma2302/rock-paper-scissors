from os import stat
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from core.models import GameSession, Gameplay
from core.serializers import GameSessionSerializer
from core.utils import get_game_result


# Create your views here.

class GameSessionView(APIView):
    def get(self, request, format=None):
        game_id = request.query_params.get('id')
        try:
            game_session = GameSession.objects.get(id=game_id)
            serializer = GameSessionSerializer(game_session)
            return Response(serializer.data)
        except GameSession.DoesNotExist:
            return HttpResponse(status=404)


    def post(self, request, format=None):
        data = JSONParser().parse(request)
        player_1_id = data.get('player_1_id')
        player_2_id = data.get('player_2_id')

        if (player_1_id and player_2_id):
            gameplay = Gameplay.objects.create()
            game_session = GameSession.objects.create(player_1_id=player_1_id, player_2_id=player_2_id, current_gameplay=gameplay)
            serializer = GameSessionSerializer(game_session)
            return Response(serializer.data)
        return HttpResponse(status=400)

@api_view([ 'POST'])
def gameplay_view(request):
    data = JSONParser().parse(request)
    game_id = data.get('game_id')
    move = data.get('move')
    player_id = data.get('player_id')
    
    try:
        game_session = GameSession.objects.get(id=game_id)
        gameplay = game_session.current_gameplay
        if player_id == game_session.player_1_id:
            # Player 1's move
            gameplay.player_1_move = move
            gameplay.save()
        if player_id == game_session.player_2_id:
            # Player 2's move
            gameplay.player_2_move = move
            gameplay.save()
        
        # check if game complete
        if gameplay.player_1_move and gameplay.player_2_move:
            game_session.player_1_score += 1 if get_game_result(gameplay.player_1_move, gameplay.player_2_move) == 'WIN' else 0
            game_session.player_2_score += 1 if get_game_result(gameplay.player_2_move, gameplay.player_1_move) == 'WIN' else 0
            game_session.current_gameplay = Gameplay.objects.create()
            game_session.save()
        return HttpResponse(status=200)
    except:
        return HttpResponse(status=400)


@api_view([ 'GET'])
def gameplay_status_check_view(request):
    game_id = request.query_params.get('game_id')
    gameplay_id = request.query_params.get('gameplay_id')
    player_id = request.query_params.get('player_id')
    
    game_session = GameSession.objects.get(id=game_id)
    gameplay = Gameplay.objects.get(id=gameplay_id)
    if player_id == game_session.player_1_id:
        # Player 1
        if not gameplay.player_1_move:
            return JsonResponse({"state": 'IDLE'})
        if not gameplay.player_2_move:
            return JsonResponse({"state": 'WAITING'})
        return JsonResponse({"state": get_game_result(gameplay.player_1_move, gameplay.player_2_move)})
    if player_id == game_session.player_2_id:
        # Player 2
        if not gameplay.player_2_move:
            return JsonResponse({"state": 'IDLE'})
        if not gameplay.player_1_move:
            return JsonResponse({"state": 'WAITING'})
        return JsonResponse({"state": get_game_result(gameplay.player_2_move, gameplay.player_1_move)})
    return HttpResponse(status=400)
