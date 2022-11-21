from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from rest_framework import status

from .models import MovieTimeTheater, SeatInfomation, Reservation
from movies.models import Movie

from .serializers import MovieTimeTheaterSerializer, SeatInfomationSerializer, ReservationSerializer
# Create your views here.

# 날짜, 시간, 상영관 정보를 가지고 DB요청
@api_view(['POST'])
def request_seat_data(request):
    date = request.data['date']
    time = request.data['time']
    theater = request.data['theater']
    movie = Movie.objects.get(pk = request.data['movieId'])

    movietimetheater = MovieTimeTheater.objects.filter(date=date, time=time, theater=theater, movie=movie)

    if movietimetheater: # 있어
        pass
    else: # 없어
        serializer = MovieTimeTheaterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(date=date, time=time, theater=theater, movie=movie)


    ## 영화 상영관, 날짜, 시간 정보 뽑았고 여기서 해당 하는 좌석정보 뽑자
    movietimetheater = MovieTimeTheater.objects.get(date=date, time=time, theater=theater, movie=movie)
    
    seatinfomation = SeatInfomation.objects.filter(movietimetheater=movietimetheater)
    serializer = SeatInfomationSerializer(seatinfomation, many=True)

    return Response(serializer.data, status=status.HTTP_201_CREATED)


# 결제 함
@api_view(['POST'])
def payment(request):
    date = request.data['date']
    time = request.data['time']
    theater = request.data['theater']
    movie = Movie.objects.get(pk = request.data['movieId'])
    selectSeats = request.data['selectSeats']

    movietimetheater = MovieTimeTheater.objects.get(date=date, time=time, theater=theater, movie=movie)

    for i, j in selectSeats:
        serializer = SeatInfomationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(i=i, j=j, movietimetheater=movietimetheater)

    # 결제 정보 저장
    serializer = ReservationSerializer(data=request.data)
    user = request.user
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, movietimetheater=movietimetheater, seatinfo=selectSeats, user=user)


    context = {
    }
    return JsonResponse(context)