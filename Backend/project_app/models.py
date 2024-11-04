from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
  company = models.ForeignKey(User, on_delete=models.CASCADE, related_name='employees')
  fullname = models.CharField(max_length=50, null=True, blank=True)
  email = models.CharField(max_length=50, null=True, blank=True)
  phone = models.BigIntegerField(null=True, blank=True)
  salary = models.CharField(max_length=20,null=True, blank=True)
  department = models.CharField(max_length=70, null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return str(self.email)