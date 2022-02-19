from turtle import update
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
	
	def __str__(self):
		return self.email

	class Meta:
		indexes = [models.Index(fields = ['email'])]

class Message(models.Model):
	id = models.AutoField(primary_key = True)
	body = models.TextField(null=False)
	created_at = models.DateTimeField(auto_now_add=True)
	user_id = models.ForeignKey('CustomUser', on_delete=models.CASCADE)

	def __str__(self):
		return self.body

	class Meta:
		ordering = ['created_at']