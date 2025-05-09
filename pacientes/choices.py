#creamos choises para despegable de opciones

SEXO_CHOICES=(
    ('M','Masculino'),
    ('F','Femenino'),
    ('I','Indefinido')
)

CLASIFICACION=(
    ('1','Dengue clasico sin signos de alarma'),
    ('2','dengue clasico con signos de alarma'),
    ('3','dengue grave')
)

CONDUCTA_CHOICES = [
    (0, 'No aplica'),
    (1, 'Ambulatoria'),
    (2, 'Hospitalización piso'),
    (3, 'Unidad de cuidados intensivos'),
    (4, 'Observación'),
    (5, 'Remisión para hospitalización'),
]