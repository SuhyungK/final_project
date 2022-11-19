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

from collections import defaultdict
import json
from django.db.models import Q

#######################알고리즘 용 함수##########################
def releaseDate(data):
    v = int(data[:4]) + int(data[5:7]) + int(data[8:10])
    return v
################################################################

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
    context = {
        'liked': liked,
    }

    return JsonResponse(context)



@api_view(['GET'])
def algorithm(request):
    movies = get_list_or_404(Movie)
    me = request.user
    prefer = defaultdict(int)
    already_like = []
    for movie in me.like_movie.all():
        already_like.append(movie.pk)
        res = json.loads(movie.genres) # 문자열 제이슨을 제이슨으로
        for genre in res['result']:
            prefer[genre['genre']] += 1 # 내가 본 장르를 prefer에 추가
    
    movie_list = []
    for movie in movies:
        if movie.pk in already_like: # 본영화는 패스
            continue
    
        score = movie.vote_average * 0.3 # 평점 가중치 0.3
        res = json.loads(movie.genres)
        for genre in res['result']:
            score += prefer[genre['genre']] * 0.4 # 내가 본 장르 가중치 0.4
        
        data = movie.release_date
        score += releaseDate(data) * 0.2 # 최신 영화 가중치 0.2

        movie_list.append([score, movie.pk])
    
    movie_list.sort(reverse=True)

    my_movie = []
    for s, i in  movie_list[:10]:
        my_movie.append(i)

    context = {
        'myMovie': my_movie
    }

    return JsonResponse(context)


@api_view(['POST'])
def likeListDetail(request):

    likedList = []
    for moviePk in request.data['movieList']:
        movie = Movie.objects.get(pk=moviePk)
        likedList.append(movie)
    
    likedList = TmpMovieListSerializer(likedList, many=True)
    return Response(likedList.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def searchMovie(request):
    search_word = request.GET.get('search_word')
    movies = Movie.objects.filter(Q(title__contains=search_word) | Q(original_title=search_word))
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)

