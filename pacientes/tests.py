from django.test import TestCase
from django.contrib.auth.models import User
from configuracion.models import Departamento, Municipio, TipoDocumento
from pacientes.models import PacientesModel
from pacientes.choices import SEXO_CHOICES, CLASIFICACION, CONDUCTA_CHOICES

class PacientesModelTestCase(TestCase):
    def setUp(self):
        # Crear datos de apoyo
        self.user = User.objects.create(username='medico1')
        self.departamento = Departamento.objects.create(codigo='08')
        self.municipio = Municipio.objects.create(codigo='08001', departamento=self.departamento)
        self.tipo_documento = TipoDocumento.objects.create(nombre_documento='Cedula')

        # Crear paciente
        self.paciente = PacientesModel.objects.create(
            medico=self.user,
            nombre_paciente='Daniel',
            apellido_paciente='Pinzon',
            edad=30,
            identificacion=1234567890,
            departamento=self.departamento,
            municipio=self.municipio,
            documento=self.tipo_documento,
            numero_documento='1234567890',
            sexo='M',  # Suponiendo que 'M' está en SEXO_CHOICES
            fecha_notificacion='2024-05-01',
            clasificacion='Leve',  # Suponiendo que 'Leve' está en CLASIFICACION
            estrato=3,
            estado_paciente='Estable',  # Suponiendo que 'Estable' está en CONDUCTA_CHOICES
            Observaciones='Paciente sin antecedentes.'
        )

    def test_creacion_paciente(self):
        paciente = PacientesModel.objects.get(id=self.paciente.id)
        self.assertEqual(paciente.nombre_paciente, 'Daniel')
        self.assertEqual(paciente.apellido_paciente, 'Pinzon')
        self.assertEqual(paciente.edad, 30)
        self.assertEqual(paciente.medico.username, 'medico1')
        self.assertEqual(paciente.departamento.codigo, '08')
        self.assertEqual(paciente.municipio.codigo, '08001')
        self.assertEqual(paciente.documento.nombre_documento, 'Cedula')

    def test_str_fields(self):
        self.assertIsInstance(self.paciente.numero_documento, str)
        self.assertIsInstance(self.paciente.nombre_paciente, str)

    def test_opcional_fields_blank(self):
        paciente = PacientesModel.objects.create()
        self.assertIsNone(paciente.nombre_paciente)
        self.assertIsNone(paciente.edad)
