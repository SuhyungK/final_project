from django.db import models
from django.conf import settings
from movies.models import Movie

# Create your models here.

class MovieTimeTheater(models.Model): # 영화 시간 모델
    theater = models.IntegerField() # 상영관 번호
    date = models.IntegerField() # 상영날짜
    time = models.IntegerField() # 상영시간

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE) # 영화 정보


class SeatInfomation(models.Model):
    i = models.IntegerField() # i 열
    j = models.IntegerField() # j 열

    movietimetheater = models.ForeignKey(MovieTimeTheater, on_delete=models.CASCADE)


class Reservation(models.Model):
    create_at = models.DateTimeField(auto_now_add=True)
    seatinfo = models.TextField() # 좌석 정보 저장
    
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE) # 영화 정보
    movietimetheater = models.ForeignKey(MovieTimeTheater, on_delete=models.CASCADE) # 영화 시간
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # 예약자 정보