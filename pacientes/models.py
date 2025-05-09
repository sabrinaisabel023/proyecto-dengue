from django.db import models
from django.contrib.auth.models import User #para llamar tablas de usuarios
from configuracion.models import Departamento, Municipio, TipoDocumento
from .choices import SEXO_CHOICES, CLASIFICACION,CONDUCTA_CHOICES
# Create your models here.

class PacientesModel (models.Model):
    medico=models.ForeignKey(User,on_delete=models.SET_NULL,blank=True, null=True, verbose_name='Medico')
    nombre_paciente=models.CharField(max_length=250, blank=True, null=True, verbose_name='Nombre del paciente')
    apellido_paciente=models.CharField(max_length=250, blank=True, null=True, verbose_name='Apellidos del paciente')
    edad=models.IntegerField(max_length=250, blank=True, null=True, verbose_name='Edad')
    identificacion=models.IntegerField(max_length=250, blank=True, null=True, verbose_name='Identificacion')
    departamento=models.ForeignKey(Departamento, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='Departamento')
    municipio=models.ForeignKey(Municipio, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='Municipio')
    documento=models.ForeignKey(TipoDocumento, on_delete=models.SET_NULL, blank=True, null=True, verbose_name='Tipo de Documento')
    numero_documento = models.CharField(max_length=200,blank=True,null=True,verbose_name='Numero de documento')
    sexo=models.CharField(max_length=100,choices=SEXO_CHOICES, blank=True,null=True, verbose_name='Sexos')
    fecha_notificacion=models.DateField(max_length=250, blank=True, null=True, verbose_name='Fecha de reporte')
    clasificacion=models.CharField(max_length=100,choices=CLASIFICACION, blank=True,null=True, verbose_name='Clasificacion')
    estrato = models.IntegerField(blank=True,null=True,verbose_name='Estrato socioeconómico')
    estado_paciente = models.CharField(max_length=200,choices=CONDUCTA_CHOICES,blank=True,null=True,verbose_name='Estado del paciente')
    Observaciones=models.TextField( blank=True, null=True, verbose_name='Observaciones de Diagnosticos')
    
    class Meta:
        verbose_name= 'Paciente'
        verbose_name_plural= 'pacientes'
        



    
