from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from datetime import datetime

from .models import CustomUser, Message
from .serializers import UserSerializer, MessageSerializer

# Create your views here.

class UserView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [CustomUser.username for user in CustomUser.objects.all()]
        return Response(usernames)


class MessageView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

    def list(self, request, pk=None):
        ret_list = []
        for msg in list(Message.objects.all()):
            # print(msg.user_id)
            ret_list.append({'id': msg.id, 'body': msg.body, 'created_at': msg.created_at.strftime('%Y-%m-%d %H:%M:%S'), 'user': CustomUser.objects.get(email = msg.user_id).username})
        return Response(ret_list)
        # queryset = Message.objects.all()

