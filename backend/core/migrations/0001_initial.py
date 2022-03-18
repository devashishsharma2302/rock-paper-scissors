# Generated by Django 4.0.3 on 2022-03-18 05:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Gameplay',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('player_1_move', models.CharField(blank=True, choices=[('R', 'Rock'), ('P', 'Paper'), ('S', 'Scissors')], max_length=1, null=True)),
                ('player_2_move', models.CharField(blank=True, choices=[('R', 'Rock'), ('P', 'Paper'), ('S', 'Scissors')], max_length=1, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='GameSession',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('player_1_id', models.CharField(max_length=50)),
                ('player_2_id', models.CharField(max_length=50)),
                ('player_1_score', models.IntegerField(default=0)),
                ('player_2_score', models.IntegerField(default=0)),
                ('current_gameplay', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core.gameplay')),
            ],
        ),
    ]