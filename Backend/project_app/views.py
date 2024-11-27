from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *

### Added Base Code ---
class CreateUserView(generics.CreateAPIView):
  serializer_class = UserSerializer
  permission_classes = [AllowAny]
### --- Added Base Code

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def EmployeeListCreate(request):
  user = request.user
  if request.method == 'GET':
    employees = Employee.objects.filter(company=user)
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)
  elif request.method == 'POST':
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save(company=user)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def EmployeeDetail(request, pk):
  if request.method == 'GET':
    employee = Employee.objects.get(id=pk)
    serializer = EmployeeSerializer(employee)
    return Response(serializer.data, status=status.HTTP_200_OK)
  elif request.method == 'PUT':
    employee = Employee.objects.get(id=pk)
    serializer = EmployeeSerializer(employee, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def EmployeeDelete(request, pk):
  employee = Employee.objects.get(id=pk)
  employee.delete()
  return Response(status=status.HTTP_204_NO_CONTENT)