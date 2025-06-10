from django.shortcuts import render,redirect
from .models import Departamento
from django.http import JsonResponse
# Create your views here.

def redirect_(request):
    return redirect("/admin/")

def getDepartamentos(request):
   data = list(Departamento.objects.all().values('id', 'nombre_departamento'))
   return JsonResponse(data, safe=False)
