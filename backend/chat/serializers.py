"""
The ModelSerializer class provides a shortcut that lets you automatically create a Serializer class with fields that correspond to the Model fields.
The ModelSerializer class is the same as a regular Serializer class, except that:

It will automatically generate a set of fields for you, based on the model.
It will automatically generate validators for the serializer, such as unique_together validators.
It includes simple default implementations of .create() and .update().

By default, all the model fields on the class will be mapped to a corresponding serializer fields.

Any relationships such as foreign keys on the model will be mapped to PrimaryKeyRelatedField. Reverse relationships are not included by default unless explicitly included as specified in the serializer relations documentation.
"""
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
        # fields = '__all__'
        fields = ['id', 'body', 'created_at', 'user_id'] 