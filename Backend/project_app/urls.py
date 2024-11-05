from django.urls import path
from .views import *

urlpatterns = [
  path('employees/', EmployeeListCreate, name='employees-list'),
  path('employee/detail/<int:pk>/', EmployeeUpdate, name='update-employee'),
  path('employee/delete/<int:pk>/', EmployeeDelete, name='delete-employee'),
]