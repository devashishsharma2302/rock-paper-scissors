from django.contrib import admin
from core.models import GameSession, Gameplay

# Register your models here.
class GameSessionAdmin(admin.ModelAdmin):
    pass

class GameplayAdmin(admin.ModelAdmin):
    pass

admin.site.register(GameSession, GameSessionAdmin)
admin.site.register(Gameplay, GameplayAdmin)