from django.db import models

# Create your models here.

class Departamento(models.Model):
    codigo=models.CharField(max_length=250, blank=True, null=True, verbose_name='Codigo')
    nombre_departamento=models.CharField(max_length=250, blank=True, null=True, verbose_name='Nombre del departamento')

    class Meta:
        verbose_name='Departamento'
        verbose_name_plural='Departamentos'
    
    def __str__(self):
        return self.nombre_departamento
    
class Municipio(models.Model):
    departamento = models.ForeignKey(Departamento,on_delete=models.CASCADE,blank=True,null=True,verbose_name='Departamento')
    codigo=models.CharField(max_length=250, blank=True, null=True, verbose_name='Codigo')
    nombre_municipio=models.CharField(max_length=250, blank=True, null=True, verbose_name='Nombre del Municipio')
    latitud=models.CharField(max_length=250, blank=True, null=True, verbose_name='Latitud')
    longitud=models.CharField(max_length=250, blank=True, null=True, verbose_name='Longitud')
   
    class Meta:
        verbose_name='Municipio'
        verbose_name_plural='Municipios'
    
    def __str__(self):
        return self.nombre_municipio

class TipoDocumento(models.Model):
    nombre_documento=models.CharField(max_length=250, blank=True, null=True, verbose_name='Tipo de Documento')
    class Meta:
        verbose_name='Tipo de Documento'
        verbose_name_plural='Tipos de Documentos'
    
    def __str__(self):
        return self.nombre_documento
    
