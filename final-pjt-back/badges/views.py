from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.contrib.auth import get_user, get_user_model
from django.http import JsonResponse
from .models import BadgeList, Badge

from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from rest_framework import status


from .serializers import TmpBadgeListCreate, InitialBadgeCreate


# Create your views here.


@api_view(['POST'])
def tmpDataCreate(request):
    # badgelist = get_object_or_404(BadgeList)

    serializer = TmpBadgeListCreate(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def initailBadge(request):
    user = request.user
    for i in range(1, 10): # 1 ~ 9 번 뱃지
        badgelist = BadgeList.objects.get(pk=i)
        badge = Badge(user=user, badgelist=badgelist)
        badge.save()

    context = {

    }
    return JsonResponse(context)


@api_view(['GET'])
def mybages(request):
    user = request.user
    my_badges = Badge.objects.filter(user=user)

    serializer = InitialBadgeCreate(my_badges, many=True)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def defaultbadges(request):
    badgelist = get_list_or_404(BadgeList)
    serializer = TmpBadgeListCreate(badgelist, many=True)

    return Response(serializer.data, status=status.HTTP_201_CREATED)


# 뱃지정보 업데이트
@api_view(['POST'])
def badgeUpdate(request):
    user = request.user
    review_cnt = request.data['reviewCount']
    movie_cnt = request.data['payedMovieCount']

    # 영화 개수 조건, 영화 시창 시간으로 하려했는데 계산을 시간 계산을 좀해야돼서..
    if movie_cnt >= 15: # 진짜가 나타났다!
        badge = Badge.objects.get(user=user, badgelist_id=3)
        badge.isGet = True
        badge.save()
    elif movie_cnt >= 8: # 영화 찐 덕후
        badge = Badge.objects.get(user=user, badgelist_id=2)
        badge.isGet = True
        badge.save()
    elif movie_cnt >= 3: # 영화 덕후
        badge = Badge.objects.get(user=user, badgelist_id=1)
        badge.isGet = True
        badge.save()

    # 리뷰개수 조건
    if review_cnt >= 15:
        badge = Badge.objects.get(user=user, badgelist_id=6)
        badge.isGet = True
        badge.save()
    elif review_cnt >= 10:
        badge = Badge.objects.get(user=user, badgelist_id=5)
        badge.isGet = True
        badge.save()
    elif review_cnt >= 5:
        badge = Badge.objects.get(user=user, badgelist_id=4)
        badge.isGet = True
        badge.save()


    return Response(status=status.HTTP_200_OK)
