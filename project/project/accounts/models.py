from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    phone = models.CharField(null=True, max_length=255)
    f_name = models.CharField(null=True, max_length=30)
    l_name = models.CharField(null=True, max_length=30)
    birth = models.DateField(null=True)
    gender = models.CharField(null=True, max_length=30)
    insurance = models.CharField(null=True, max_length=30)
    edu = models.CharField(null=True, max_length=30)
    code = models.BigIntegerField(null=True)
    activetime = models.DateField(null=True)
    field = models.CharField(null=True, max_length=30)
    city = models.CharField(null=True, max_length=30)


class office (models.Model):
    address = models.CharField(null=True, max_length=30)
    city = models.CharField(null=True, max_length=30)
    phone = models.CharField(null=True, max_length=30)
    park = models.CharField(null=True, max_length=30)
    transport = models.CharField(null=True, max_length=30)
    info = models.CharField(null=True, max_length=30)
    doctor = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['city']

    def __str__(self):
        return self.data
