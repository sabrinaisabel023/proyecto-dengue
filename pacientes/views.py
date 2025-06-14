from django.shortcuts import render
from django.http import JsonResponse
from .models import PacientesModel
from configuracion.models import *
from consumo_data import call_api
import datetime
import random

# Create your views here.

def consumoApi(request):
    try:
        dt = call_api() # Llamada a la API para obtener los datos de pacientes
        pacientes = [] # Lista para almacenar los objetos PacientesModel que se van a crear
        for i in dt: #Iterar sobre los datos obtenidos de la API
            dept = Departamento.objects.filter(codigo=str(int(i['cod_dpto_r']))).first()
            mun = Municipio.objects.filter(codigo=f"{int(i['cod_dpto_r'])}{int(i['cod_mun_r'])}").first()
            r_edad = None
            if '+' in i['rango_edad']: 
                r_edad = [int(i['rango_edad'][0]),int(i['rango_edad'][0])+6]
            else:
                r_edad = i['rango_edad'].split('-')
            
            
            print(i['indice'])
            if dept is not None and mun is not None: # Verificar si el departamento y municipio existen
                # Crear un nuevo objeto PacientesModel con los datos del paciente
                # y agregarlo a la lista de pacientes
                pacientes.append(
                    PacientesModel(
                        departamento=dept,
                        municipio=mun,
                        sexo=i['sexo_'],
                        fecha_notificacion = datetime.datetime.strptime(i['fec_not'],"%Y-%m-%dT%H:%M:%S.%f").date(),
                        clasificacion=int(float(i['clasfinal'])),
                        estado_paciente=int(float(i['conducta'])),
                        estrato=int(float(i['estrato_'])),
                        edad = random.randint(int(r_edad[0]),int(r_edad[1])) 
                    )
                )
        PacientesModel.objects.bulk_create(pacientes) # guardar datos de forma maxima. 
            
        return JsonResponse(data={'status':200})
    except Exception as e:
        return JsonResponse(data={'error':str(e)})

def dataPaciente(request):
    try:
        dep = request.GET.get('dep', None) # filtrar pacientes por departamento
        ob_paciente = PacientesModel.objects.all()
        if dep is not None:
            ob_paciente = ob_paciente.filter(departamento=dep)

        data = []
        for paciente in ob_paciente: 
            paciente_dict = {
                'id': paciente.id,
                'departamento': paciente.departamento.id if paciente.departamento else None,
                'municipio': paciente.municipio.id if paciente.municipio else None,
                'sexo': paciente.sexo,
                'fecha_notificacion': paciente.fecha_notificacion,
                'clasificacion': paciente.clasificacion,
                'estado_paciente': paciente.estado_paciente,
                'estrato': paciente.estrato,
                'edad': paciente.edad,
                'nombre_municipio':paciente.municipio.nombre_municipio if paciente.municipio else None,
                'latitud': paciente.municipio.latitud if paciente.municipio else None,
                'longitud': paciente.municipio.longitud if paciente.municipio else None,
            }
            data.append(paciente_dict)

        return JsonResponse(data=data, safe=False) #se envia la data en formato json para que se muestren 
    
    except Exception as e:
        return JsonResponse(data={'error': str(e)})