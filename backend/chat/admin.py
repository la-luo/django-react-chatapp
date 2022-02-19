from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser, Message
from .forms import CustomUserChangeForm, CustomUserCreationForm

# Register your models here.
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['email', 'password', 'is_staff', 'is_active', 'is_superuser', 'last_login', 'date_joined']

admin.site.register(CustomUser, CustomUserAdmin)

class MessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'body', 'user_id', 'created_at')

admin.site.register(Message, MessageAdmin)