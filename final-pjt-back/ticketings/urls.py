from django.urls import path
from . import views

urlpatterns = [
    path('request-seat-data/', views.request_seat_data),
    path('payment/', views.payment), # 결제 요청옴
]