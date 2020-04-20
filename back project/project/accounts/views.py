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
