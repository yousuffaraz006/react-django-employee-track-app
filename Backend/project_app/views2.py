from django.shortcuts import render, redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db import IntegrityError
from django.contrib.auth import login, logout, authenticate
from rest_framework.authtoken.models import Token
from django.template import Template, Context
from django.template.loader import render_to_string
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from .models import Company, CompanyLocation
from .serializers import CompanySerializer, CompanyLocationSerializer, UserCompanySerializer
from user.models import User
from utils.helpers import generateRandomPassword
from .utils import capitalise_first_letters
from utils.helpers import send_otp_mail, send_password_email

import json

# Create your views here.

@api_view(["POST"])
@permission_classes((AllowAny,))
def register_company_view(request):
  if request.method == "POST":
    body = request.data
    name = body.get("name")
    email = body.get("email")
    company = body.get("company")
    g_sign = body.get("gSign")
    name_split = capitalise_first_letters(name).split(" ")
    first_name = name_split[0]
    last_name = " ".join(name.split(" ")[1:])
    initial = first_name[0]+last_name[0]
    try:
      company_obj = Company.objects.create(company_name=company)
    except IntegrityError:
      return Response({'success':False, 'msg': 'Company with the name already exists'}, status=HTTP_200_OK)
    create_query = {
      'first_name': first_name,
      'last_name': last_name,
      'email': email,
      'company': company_obj,
      'initials': initial,
    }

    try:
      user = User.objects.create_user(**create_query)
      user.user_type = "1"
      user.has_signed_up = True 
      user.office_start_time = "09:00:00"
      user.office_end_time = "17:00:00"
      user.save()
      login(request, user)
      if (g_sign):
        rendered_message = render_to_string('email_templates/password.html', {'cred': False})
        try:
          send_password_email(email=user.email, name=user.first_name+" "+user.last_name, subject="Welcome to PinPoint", email_body=rendered_message )
        except:
          pass
        token,_ = Token.objects.get_or_create(user = user)
        return Response({'success': True,'token': token.key, 'email': token.user.email, 'name': f"{token.user.first_name} {token.user.last_name}", 'userId': token.user.id, 'user_type': token.user.user_type, 'onsite': token.user.onsite}, status=HTTP_200_OK)
      else:
        temp_password = generateRandomPassword(pass_count=6,only_num=True)
        user.set_password(temp_password)
        rendered_message = render_to_string('email_templates/password.html', {'cred': True, 'email':email, 'temp_password': temp_password})
        try:
          send_password_email(email=user.email, name=user.first_name+" "+user.last_name, subject="Welcome to PinPoint", email_body=rendered_message )
        except:
          pass
        user.save()
        return Response({'success': True, 'msg': 'User created successfully.'}, status=HTTP_200_OK )
    except IntegrityError:
      return Response({'success': False, 'msg': 'User with the email already exists.'}, status=HTTP_200_OK)
    except:
      return Response({'success': False, 'msg': 'An error occured. Please try again'}, status=HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated,])
def get_company_details(request):
  token_key = request.auth.key
  try:
    token = Token.objects.get(key = token_key)
  except Token.DoesNotExist:
    return Response({'success': False, 'msg': 'Token not found'})
  user = token.user

  if user.is_deleted:
     return Response({'success': False, 'msg': 'tokenDelete'})
  
  try: 
    company_detail = Company.objects.get(id = user.company.id)
    company_serializer = CompanySerializer(company_detail, many=False)
   
    return Response({'success': True, 'msg': 'Successful', 'company_detail': company_serializer.data}, status=HTTP_200_OK)
  except Company.DoesNotExist:
    return Response({'success': False, 'msg': 'Company Does not exist'}, status=HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def edit_company_details(request):
  token_key = request.auth.key
  try:
    token = Token.objects.get(key = token_key)
  except Token.DoesNotExist:
    return Response({'success': False, 'msg': 'Token not found'})
  user = token.user

  if user.is_deleted:
     return Response({'success': False, 'msg': 'tokenDelete'})
  
  if request.method == "POST":
    company_name = request.POST.get("name")
   
    website = request.POST.get("website")
    industry = request.POST.get("industry")
    logo = request.FILES.get("logo")
    locations = request.POST.get("locations")
   

    if locations:
        try:
            locations_data = json.loads(locations)
        except json.JSONDecodeError:
            locations_data = []
    else:
        locations_data = []
    

    try:
      company_obj = Company.objects.get(id = user.company.id)
    except Company.DoesNotExist:
      return Response({'success': False, 'msg': 'Company Does not exist'}, status=HTTP_200_OK)

    for i in locations_data:
      location_id = i.get("id")
      if location_id:
        company_location_obj = CompanyLocation.objects.get(id = location_id)
        if i.get("delete"):
          company_location_obj.delete()
        else:
          company_location_obj.name = i.get("name")
          company_location_obj.geocodes = i.get("geocodes")
          company_location_obj.description = i.get("description")
          company_location_obj.save()
        
      else:
        company_location_obj = CompanyLocation.objects.create(
          name = i.get("name"),
          geocodes = i.get("geocodes"),
          description = i.get("description")
        )
        company_location_obj.save()
        company_obj.locations.add(company_location_obj)
    
 
    company_obj = Company.objects.get(id = user.company.id)
    company_obj.company_name = company_name
    company_obj.website = website
    company_obj.industry = industry
    if logo:
      company_obj.logo = logo
    company_obj.save()
    return Response({'success': True, 'msg': 'Info updated successfully'}, status=HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def edit_company_contact_details(request):
  token_key = request.auth.key
  try:
    token = Token.objects.get(key = token_key)
  except Token.DoesNotExist:
    return Response({'success': False, 'msg': 'Token not found'})
  logged_user = token.user

  if logged_user.is_deleted:
     return Response({'success': False, 'msg': 'tokenDelete'})
  
  if request.method == "POST":
    body = json.loads(request.body)
    print(body)
   
    locations = body.get("locations")
    try:
      company_obj = Company.objects.get(id = logged_user.company.id)
      company_obj.locations = locations
      company_obj.save()
      return Response({'success':True, 'msg': 'Contact Info updated successfully'}, status=HTTP_200_OK)
    except Company.DoesNotExist:
      return Response({'success':False, 'msg': 'Company does not exist'}, status=HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_company_locations(request):
  token_key = request.auth.key
  try:
    token = Token.objects.get(key = token_key)
  except Token.DoesNotExist:
    return Response({'success': False, 'msg': 'Token not found'})
  logged_user = token.user

  if logged_user.is_deleted:
     return Response({'success': False, 'msg': 'tokenDelete'})
  
  try:
    company_obj = Company.objects.get(id = logged_user.company.id)
    company_locations = UserCompanySerializer(company_obj, many=False)

    return Response({'success': True, 'locations': company_locations.data}, status=HTTP_200_OK)
  except Company.DoesNotExist:
    return Response({'success':False, 'msg': 'Company does not exist'}, status=HTTP_200_OK) 