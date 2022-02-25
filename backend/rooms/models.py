from autoslug import AutoSlugField
from django.db import models

# Create your models here.
from django.contrib.auth.models import User


class Room(models.Model):
    name = models.CharField(max_length=30)
    creator = models.ForeignKey(User, related_name='rooms', on_delete=models.CASCADE, )
    slug = AutoSlugField(populate_from='name', unique=True, editable=False)

    def __str__(self):
        return self.name

