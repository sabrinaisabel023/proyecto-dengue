import os 
import django
import sys
import json
import time
import csv
#sys.path.append('/home/sabrina/Documentos/django/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dengue.settings')
django.setup()

from configuracion.models import Departamento,Municipio


def localizacion():
    with open('localidades.csv', 'r') as file:
        lectura=csv.reader(file)
        filas=next(lectura)
        
        codigo = None
        departamento = None
        arr_municipios=[]
        for i in lectura:
            if codigo != i[0]:
                departamento = Departamento.objects.create(
                    codigo=i[0],
                    nombre_departamento=i[1]
                )
                codigo = i[0]
            arr_municipios.append(
                Municipio(
                    codigo=i[2],
                    departamento=departamento,
                    longitud=i[5],
                    latitud=i[6],
                    nombre_municipio=i[3]
                )
            )
        Municipio.objects.bulk_create(arr_municipios)
        print('terminado')
          
        
        
#localizacion()