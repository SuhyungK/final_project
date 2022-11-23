from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.contrib.auth import get_user, get_user_model
from django.http import JsonResponse

from .models import Movie, Review, Comment

from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from rest_framework import status

from .serializers import MovieSerializer, TmpMovieListSerializer, TmpReviewSerializer, CommentSerializer
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
    # print("실행!!!!!!!!!!!!!!!!")
    if request.method == 'GET':
        # articles = Article.objects.all()
        print(request.GET)
        articles = get_list_or_404(Movie)
        serializer = TmpMovieListSerializer(articles, many=True)
        return Response(serializer.data)

# 리뷰 작성
@api_view(['POST'])
def tmpReviewCreate(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = TmpReviewSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid(raise_exception=True):
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!   !!!!!")
        serializer.save(movie=movie, user=request.user, username=request.user.username)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# 리뷰에 달린 댓글 조회 / 작성
@api_view(['GET', 'POST'])
def createComment(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'POST':
        serailizer = CommentSerializer(data=request.data)
        if serailizer.is_valid(raise_exception=True):
            serailizer.save(review=review, user=request.user, username=request.user.username)
            return Response(serailizer.data, status=status.HTTP_201_CREATED)
    else:
        comments = Comment.objects.filter(review=review_pk).order_by('-created_at')
        serailizer = CommentSerializer(comments, many=True)
        return Response(serailizer.data)

# 영화 좋아요 기능
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


#  내가 좋아요한 영화 리스트
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


# 사용자가 쓴 리뷰
@api_view(['GET'])
def reviewcount(request):
    user = request.user
    reviews = Review.objects.filter(user=user)
    serializer = TmpReviewSerializer(reviews, many=True)

    return Response(serializer.data, status=status.HTTP_201_CREATED)


# 특정영화에 대한 리뷰 목록가져오기
@api_view(['GET'])
def movieReviews(request, movie_pk):
    reviews = Review.objects.filter(movie=movie_pk).order_by('-created_at')
    serializer = TmpReviewSerializer(reviews, many=True)
    print(reviews)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# 리뷰 좋아요
@api_view(['Post'])
def likeReview(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    user = request.user
    if review.like_users.filter(pk=user.pk).exists():
        review.like_users.remove(user)
        is_liked = False
    else:
        review.like_users.add(user)
        is_liked = True
    
    context = {
        'is_liked': is_liked,
    }
    return JsonResponse(context)



# 내가 좋아요한 리뷰 리스트 만들기
@api_view(['GET'])
def likeReviewList(request):
    me = request.user
    liked = []
    for review in me.like_review.all():
        liked.append(review.pk)
    context = {
        'liked': liked,
    }

    return JsonResponse(context)

# 영화 검색
@api_view(['GET'])
def searchMovie(request):
    search_word = request.GET.get('search_word')
    movies = Movie.objects.filter(Q(title__contains=search_word) | Q(original_title=search_word)).order_by('-popularity').distinct()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


# 영화 게이지 계산용 장르 카운트
@api_view(['POST'])
def genreGage(request):
    allmovies = request.data['myMovies']
    genredict = defaultdict(int)

    total_cnt = 0
    for movie in allmovies:
        tmp = json.loads(movie['genres'])['result']
        for K in tmp:
            G = K['genre']
            genredict[G] += 1
            total_cnt += 1

    context = {
        'genredict': genredict,
        'cnt' : total_cnt,
    }

    return JsonResponse(context)
