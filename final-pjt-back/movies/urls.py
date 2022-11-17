from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('tmp_list/', views.tmpList),
    path('tmp_reviewC/<int:movie_pk>/', views.tmpReviewCeate),
    path('like/<int:movie_pk>/', views.likeMovie),
    path('like-list/', views.likeList),

]