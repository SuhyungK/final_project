from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('tmp_list/', views.tmpList),
    path('tmp_reviewC/<int:movie_pk>/', views.tmpReviewCeate),
    path('like/<int:movie_pk>/', views.likeMovie),  #영화 좋아요
    path('like-list/', views.likeList),
    path('like-list-Detail/', views.likeListDetail),
    path('algorithm/', views.algorithm),
    path('search/', views.searchMovie),


]