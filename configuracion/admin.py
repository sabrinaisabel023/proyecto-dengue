from django.contrib import admin
from .models import *

# Register your models here.

class MunicipioInline(admin.StackedInline):
    model=Municipio

class DepartamentoAdmin(admin.ModelAdmin):
    list_filter=["codigo","nombre_departamento",]
    search_fields=["nombre_departamento"]
    inlines=[MunicipioInline,]

admin.site.register(Departamento,DepartamentoAdmin)
#admin.site.register(Municipio)
admin.site.register(TipoDocumento)