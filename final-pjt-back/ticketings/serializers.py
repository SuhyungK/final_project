from rest_framework import serializers
from .models import MovieTimeTheater, SeatInfomation, Reservation

class MovieTimeTheaterSerializer(serializers.ModelSerializer):

    class Meta:
        model = MovieTimeTheater
        fields = '__all__'
        read_only_fields = ('theater', 'date', 'time', 'movie')
        

class SeatInfomationSerializer(serializers.ModelSerializer):

    class Meta:
        model = SeatInfomation
        fields = '__all__'
        read_only_fields = ('movietimetheater', 'i', 'j')

class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = '__all__'
        read_only_fields = ('movie', 'movietimetheater', 'seatinfo', 'user')
