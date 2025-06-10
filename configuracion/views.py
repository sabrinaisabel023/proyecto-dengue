from django.shortcuts import render,redirect
from .models import Departamento,Municipio
from django.http import JsonResponse
# Create your views here.

def redirect_(request):
    return redirect("/admin/")

def getDepartamentos(request):
   data = list(Departamento.objects.all().values('id', 'nombre_departamento'))
   return JsonResponse(data, safe=False)

def getMunicipios(request,id_dep):
    try:
        data = list(Municipio.objects.filter(departamento=id_dep).values('id', 'nombre_municipio'))
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse(status=500, data={'error': str(e)})
