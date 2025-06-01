from django.db import models
from django.contrib.auth.models import Group
from .choise import ROLES_CHOISE
# Create your models here.

Group.add_to_class('codigo', models.IntegerField(choices=ROLES_CHOISE, blank=True, null=True, verbose_name='codigo'))

