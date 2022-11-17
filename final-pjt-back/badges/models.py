from django.db import models
from django.conf import settings

# Create your models here.
# 뱃지 9개
# [
#     0 : 영화 시청 횟수,
#     1 : 리뷰 남긴 횟수,
#     2 : 리뷰 좋아요 받은 개수,
#     3 : 연속 로그인
#     4 : 

# ]

class BadgeList(models.Model):
    name = models.TextField()
    before_get = models.TextField() # 획득 전 문구
    after_get = models.TextField() # 획득 후 문구
    total_cnt = models.IntegerField()

    

class Badge(models.Model):
    created_at = models.DateTimeField(auto_now_add = True)
    # 획득 여부를 넣을 필요가 있나? => DB 생성된 시점에서 이미 획득아녀?
    represent = models.IntegerField()

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    badgelist = models.ForeignKey(BadgeList, on_delete=models.CASCADE)
