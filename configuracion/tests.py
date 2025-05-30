from django.test import TestCase
from configuracion.models import Departamento, Municipio, TipoDocumento

class DepartamentoModelTest(TestCase):
    def setUp(self):
        self.departamento = Departamento.objects.create(nombre_departamento="Atlántico")

    def test_creacion_departamento(self):
        self.assertEqual(self.departamento.nombre_departamento, "Atlántico")
        self.assertEqual(str(self.departamento), "Atlántico")


class MunicipioModelTest(TestCase):
    def setUp(self):
        self.departamento = Departamento.objects.create(nombre_departamento="Atlántico")
        self.municipio = Municipio.objects.create(nombre_municipio="Barranquilla", departamento=self.departamento)

    def test_creacion_municipio(self):
        self.assertEqual(self.municipio.nombre_municipio, "Barranquilla")
        self.assertEqual(self.municipio.departamento.nombre_departamento, "Atlántico")
        self.assertEqual(str(self.municipio), "Barranquilla")



