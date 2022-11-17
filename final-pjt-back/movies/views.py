from django.shortcuts import render
from .models import Movie
from rest_framework.response import Response 
from rest_framework.decorators import api_view  
from .serializers import MovieSerializer
# import requests

# Create your views here.
@api_view(['GET'])
def index(request):
    movies_serializers = MovieSerializer(Movie.objects.all(), many=True)
    return Response(movies_serializers.data)