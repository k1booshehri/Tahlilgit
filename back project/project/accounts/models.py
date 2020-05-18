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
    pp = models.TextField(null=True)
    rate = models.CharField(null=True, max_length=30)


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


class Rates (models.Model):
    Value = models.CharField(null=True, max_length=30)
    doctor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='doctor')
    patient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='patient')

    doctorusername = models.CharField(null=True, max_length=30)

class ChatTable (models.Model):
    src = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='src')
    dest = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='dest')
    destusername = models.CharField(null=True, max_length=30)
    destpp = models.TextField(null=True)
    destid = models.CharField(null=True, max_length=30)

class ChatContent (models.Model):
    time = models.DateTimeField(null=True)
    message = models.TextField(null=True)
    table = models.ForeignKey(
        ChatTable, on_delete=models.CASCADE, related_name='table')
    sender = models.TextField(null=True)