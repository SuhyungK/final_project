from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class User(AbstractUser):
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
    # like_movies = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_users')
    