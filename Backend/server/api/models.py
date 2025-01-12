from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Hostel(models.Model):
    GENDER_CHOICES = [
        (0, 'Female'),
        (1, 'Male'),
        (2, 'Both'),
    ]

    # Basic Information
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    owner_name = models.CharField(max_length=255)
    contact_information = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    approved = models.BooleanField(default=False)
    rating = models.FloatField(default=0)

    # Accommodation Details (Price of Seater Rooms)
    single_seater_price = models.IntegerField( default=0)
    two_seater_price = models.IntegerField( default=0)
    three_seater_price = models.IntegerField(default=0)
    four_seater_price = models.IntegerField(default=0)

    # Amenities
    gender = models.IntegerField(choices=GENDER_CHOICES)
    internet = models.BooleanField(default=False)
    washing_machine = models.BooleanField(default=False)
    bathroom_cleaning = models.BooleanField(default=False)
    study_table = models.BooleanField(default=False)
    books_rack = models.BooleanField(default=False)  
    wardrobe = models.BooleanField(default=False) 
    clothes_hanger = models.BooleanField(default=False)
    smoking_and_beverages_usage = models.BooleanField(default=False)

    # Arrival Time
    arrival_time = models.TimeField()



    # Nearby Facilities
    transportation_bus_stations = models.TextField(blank=True, null=True)
    nearby_hospitals_pharmacy = models.TextField(blank=True, null=True)
    nearby_schools = models.TextField(blank=True, null=True)
    nearby_shopping_malls = models.TextField(blank=True, null=True)
    nearby_cafes_and_restaurants = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.location}"


class Blog(models.Model):
    title = models.CharField(max_length=255)
    summary = models.CharField(max_length=1000, default="")
    content = models.TextField(default="")
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    link = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title
    

class CustomUsers(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('staff', 'Staff'),
        ('normal', 'Normal User'),
    ]

    name = models.CharField(max_length=100)
    stats = models.JSONField(default=dict, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='normal')
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='custom_user')
    
    def __str__(self):
        return f"{self.name} ({self.role})"