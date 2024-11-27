from django.contrib import admin
from django.urls import path, include
from project_app.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/register/', CreateUserView.as_view(), name='register'),        ### Added Base Code
    path('token/', TokenObtainPairView.as_view(), name='get_token'),           ### Added Base Code
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),    ### Added Base Code
    path('', include('project_app.urls')),                                       ### Added Base Code
]
