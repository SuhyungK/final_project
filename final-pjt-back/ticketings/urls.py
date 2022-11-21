from django.urls import path
from . import views

urlpatterns = [
    path('request-seat-data/', views.request_seat_data),
    path('payment/', views.payment), # 결제 요청옴
    path('my-payed-movies/', views.MyPayedMovies), # 내가 예매(구매)한 영화 목록 뽑기 
    
]