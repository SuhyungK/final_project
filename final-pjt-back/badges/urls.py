from django.urls import path
from . import views


urlpatterns = [
    path('tmpDataCreate/', views.tmpDataCreate), # 뱃지 데이터 생성용
    path('initailBadge/', views.initailBadge), # 초기 미획득상태의 뱃지 생성
    path('mybages/', views.mybages), # 내 뱃지들 불러오기
    path('defaultbadges/', views.defaultbadges), # 본래 뱃지들 불러오기
    path('badgeUpdate/', views.badgeUpdate), # 본래 뱃지들 불러오기


]
