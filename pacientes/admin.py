from django.contrib import admin
from .models import PacientesModel

# Register your models here.

class PacienteAdmin(admin.ModelAdmin):
    list_display=('numero_documento', 'edad','sexo','estrato','clasificacion',)
    list_filter=('clasificacion','sexo','edad','estrato',)
    list_per_page=30
    
    def get_exclude(self, request, obj):
        sup=super().get_exclude(request, obj)
        print (request.user.groups.filter(codigo=2).first())
        if request.user.groups.filter(codigo=2).first():
            return ('medico',)
        return sup
    
    def save_model(self, request, obj, form, change):
        sup=super().save_model(request, obj, form, change)
        if not change : 
            if request.user.groups.filter(codigo=2).first():
                obj.medico=request.user
                obj.save()
        return sup
    
    def get_queryset(self, request):
        qs=PacientesModel.objects.all()
        if request.user.groups.filter(codigo=2).first():
           qs=qs.filter(medico=request.user)
        return qs
         
        
         
admin.site.register(PacientesModel,PacienteAdmin)
