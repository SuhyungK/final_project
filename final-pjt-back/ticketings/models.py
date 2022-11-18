from django.db import models
from django.conf import settings
from movies.models import Movie

# Create your models here.

class Theater(models.Model): # 고정 데이터
    #  좌석정보
    # [
    #     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    #     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    #     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    # ]
    # [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 좌석 9개 인덱스 로 접근하고 번호 맞춰주기 위해 크기는 10
    #  0 번극장, 1번극장, 2번 극장 
    isreserved = models.TextField()


class Ticketing(models.Model):
    # 모델 만들때 뱃지처럼 for 문 돌려서 time 에 0, 1, 2 각각 생성
    # 0 = 9시 , 1 = 1시, 2 = 6시
    time = models.IntegerField()

    #  filter 로 뽑아봐서 오늘 날짜 없으면 생성 -> 파이썬 datetime 같은걸로 년월일만 스트링으로 뽑아서 비교
    date = models.IntegerField()


    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)