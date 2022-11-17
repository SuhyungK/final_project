from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.contrib.auth import get_user, get_user_model
from django.http import JsonResponse

from .models import Movie

from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from rest_framework import status

from .serializers import MovieSerializer, TmpMovieListSerializer, TmpReviewSerializer
# import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# Create your views here.
@api_view(['GET'])
def index(request):
    movies_serializers = MovieSerializer(Movie.objects.all(), many=True)
    return Response(movies_serializers.data)



###
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def tmpList(request):
    print("실행!!!!!!!!!!!!!!!!")
    if request.method == 'GET':
        # articles = Article.objects.all()
        articles = get_list_or_404(Movie)
        serializer = TmpMovieListSerializer(articles, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def tmpReviewCeate(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)

    serializer = TmpReviewSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def likeMovie(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    user = request.user
    if movie.like_users.filter(pk=user.pk).exists():
        movie.like_users.remove(user)
        is_liked = False
    else:
        movie.like_users.add(user)
        is_liked = True
    
    context = {
        'is_liked': is_liked,
    }
    return JsonResponse(context)

@api_view(['GET'])
def likeList(request):
    movies = get_list_or_404(Movie)
    me = request.user
    liked = []
    for movie in me.like_movie.all():
        liked.append(movie.pk)
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    print(liked)
    context = {
        'liked': liked,
    }

    return JsonResponse(context)

