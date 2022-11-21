# Generated by Django 3.2.13 on 2022-11-21 03:17

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie_id', models.IntegerField()),
                ('title', models.CharField(max_length=20)),
                ('original_title', models.CharField(max_length=20)),
                ('overview', models.TextField()),
                ('genres', models.TextField()),
                ('release_date', models.CharField(max_length=20)),
                ('poster_path', models.TextField()),
                ('backdrop_path', models.TextField()),
                ('trailer_path', models.TextField(blank=True, default=False, null=True)),
                ('popularity', models.IntegerField()),
                ('vote_average', models.FloatField()),
                ('is_now_playing', models.BooleanField(blank=True, default=False, null=True)),
                ('like_users', models.ManyToManyField(related_name='like_movie', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('rating', models.IntegerField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('isSpoiler', models.BooleanField(default=False)),
                ('username', models.TextField()),
                ('from_review', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='movies.review')),
                ('like_users', models.ManyToManyField(related_name='like_review', to=settings.AUTH_USER_MODEL)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=50)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.review')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
