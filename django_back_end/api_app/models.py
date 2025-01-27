from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField(blank=True, null=True)  # email is optional
    favorite_color = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
