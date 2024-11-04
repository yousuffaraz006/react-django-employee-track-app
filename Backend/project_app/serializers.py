from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from .models import *

class UserSerializer(ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'first_name', 'last_name', 'username', 'password']
    extra_kwargs = {'password': {'write_only': True}}
    
  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user
  
class EmployeeSerializer(ModelSerializer):
  class Meta:
    model = Employee
    fields = ['id', 'fullname', 'email', 'phone', 'salary', 'department']