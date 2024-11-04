from django.contrib import admin
from .models import *

class Createdtime(admin.ModelAdmin):
    readonly_fields = ('created_at',)

admin.site.register(Employee, Createdtime)