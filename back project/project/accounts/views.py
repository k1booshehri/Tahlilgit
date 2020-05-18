from django.shortcuts import render
from .models import Rates, User, office
from .serializers import RateSerializer, OfficeSerializer, UserSerializer3
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.


@api_view(['GET'])
def user_detail(request, username):
    if request.method == 'GET':
        work = office.objects.filter(
            doctor=User.objects.get(username=username))
        person = User.objects.get(username=username)
        serializer = OfficeSerializer(work, many=True)
        perializer = UserSerializer3(person)
        return Response({"user": perializer.data, "offices": serializer.data})


@api_view(['GET'])
def time_detail(request):
    if request.method == 'GET':
        times = TimeTable.objects.filter(
            doctor=User.objects.get(username=request.GET.get('doctorusername', None)))
        times = times.filter(office__city=request.GET.get('city', None))
        serializer = TimeShowSerializer(times, many=True)
        return Response({"info": serializer.data})


@api_view(['GET'])
def time_view(request):
    if request.method == 'GET':
        times = TimeTable.objects.filter(
            office=office.objects.get(pk=request.query_params.get('officeid')))
        serializer = TimeShowSerializer(times, many=True)
        return Response({"info": serializer.data})
