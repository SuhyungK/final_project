from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse

from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from rest_framework import status

# Create your views here.


@api_view(['POST'])
def follow(request, username):
    User = get_user_model()
    person = User.objects.get(username=username)
    if person != request.user:
        if person.followers.filter(pk=request.user.pk).exists():
            person.followers.remove(request.user)
        else:
            person.followers.add(request.user)
    
    followCount = person.followers.filter(pk=request.user.pk).count()
    context = {
        'followCount': followCount
    }
    return JsonResponse(context)

# 팔로잉 리스트 요청
@api_view(['GET'])
def followingsList(request, username):
    User = get_user_model()
    user = User.objects.get(username=username)
    followings = user.followers.all()


    followings_list = []
    for person in followings:
        followings_list.append(person.id)

    context = {
        'followings_list': followings_list
    }
    return JsonResponse(context)


# 팔로우 리스트 요청
@api_view(['GET'])
def followsList(request, username):
    User = get_user_model()
    user = User.objects.get(username=username)
    follows = user.followings.all()


    follows_list = []
    for person in follows:
        follows_list.append(person.id)

    context = {
        'follows_list': follows_list
    }
    return JsonResponse(context)
