from rest_framework import serializers
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist


from .models import CustomUser, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'last_login', 'date_joined']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'body', 'created_at', 'user_id']