from django.shortcuts import render
from .models import Rates, User, office,ChatTable, ChatContent, Notif
from .serializers import RateSerializer, OfficeSerializer, UserSerializer3,UserSerializer4, ChatListSerializer, NotifSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q

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
def chats_starta(request):
    if request.method == 'GET':
        cr, created = ChatTable.objects.get_or_create(dest=request.user, src=User.objects.get(
            pk=request.query_params.get('doctorid')), destusername=request.user.username, destpp=request.user.pp, destid=request.user.pk)
        cr2, created2 = ChatTable.objects.get_or_create(src=request.user, dest=User.objects.get(
            pk=request.query_params.get('doctorid')), destusername=User.objects.get(
            pk=request.query_params.get('doctorid')).username, destpp=User.objects.get(
            pk=request.query_params.get('doctorid')).pp, destid=User.objects.get(
            pk=request.query_params.get('doctorid')).pk)
        a = ChatContent.objects.filter(
            Q(table=cr) | Q(table=cr2)).order_by('pk')
        b = User.objects.get(
            pk=request.query_params.get('doctorid'))
        c = request.user
        serializer = ChatContentSerializer(a, many=True)
        perializer = UserSerializer4(b)
        merializer = UserSerializer4(c)
        return Response({"doctor": perializer.data, "patient": merializer.data, "chats": serializer.data})


@api_view(['GET'])
def chats_startb(request):
    if request.method == 'GET':
        cr, created = ChatTable.objects.get_or_create(dest=request.user, src=User.objects.get(
            pk=request.query_params.get('patientid')), destusername=request.user.username, destpp=request.user.pp, destid=request.user.pk)
        cr2, created2 = ChatTable.objects.get_or_create(src=request.user, dest=User.objects.get(
            pk=request.query_params.get('patientid')), destusername=User.objects.get(
            pk=request.query_params.get('patientid')).username, destpp=User.objects.get(
            pk=request.query_params.get('patientid')).pp, destid=User.objects.get(
            pk=request.query_params.get('patientid')).pk)
        a = ChatContent.objects.filter(
            Q(table=cr) | Q(table=cr2)).order_by('pk')
        b = User.objects.get(
            pk=request.query_params.get('patientid'))
        c = request.user
        serializer = ChatContentSerializer(a, many=True)
        perializer = UserSerializer4(c)
        merializer = UserSerializer4(b)
        return Response({"doctor": perializer.data, "patient": merializer.data, "chats": serializer.data})


@api_view(['GET'])
def chats_list(request):
    if request.method == 'GET':
        chats = ChatTable.objects.filter(src=request.user)
        serializer = ChatListSerializer(chats, many=True)
        return Response({"info": serializer.data})


@api_view(['GET'])
def notif_num(request):
    if request.method == 'GET':
        num = Notif.objects.filter(
            Q(rec_id=request.user.pk) & Q(was_seen="no"))
        return Response({"num": num.count()})


@api_view(['GET'])
def notif_get(request):
    if request.method == 'GET':
        num = Notif.objects.filter(
            Q(rec_id=request.user.pk) & Q(was_seen="no")).order_by('-pk')
        serializer = NotifSerializer(num, many=True)
        data = serializer.data
        num.update(was_seen="yes")
        return Response({"notifs": data})
