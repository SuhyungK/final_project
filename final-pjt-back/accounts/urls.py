from django.urls import path
from . import views

urlpatterns = [
    path('follow/<username>/', views.follow),
    path('followings-list/<username>/', views.followingsList), # 팔로잉 리스트 뽑기
    path('follows-list/<username>/', views.followsList), # 팔로우 리스트 뽑기
]