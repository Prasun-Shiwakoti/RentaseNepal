from django.db import models


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

    # Accommodation Details (Price of Seater Rooms)
    single_seater_price = models.IntegerField(blank=True, null=True, default=-1)
    two_seater_price = models.IntegerField(blank=True, null=True, default=-1)
    three_seater_price = models.IntegerField(blank=True, null=True, default=-1)
    four_seater_price = models.IntegerField(blank=True, null=True, default=-1)

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
