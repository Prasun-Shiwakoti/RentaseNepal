# Generated by Django 5.1.2 on 2024-10-22 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hostel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('owner_name', models.CharField(max_length=255)),
                ('contact_information', models.CharField(max_length=255)),
                ('single_seater_price', models.IntegerField(blank=True, default=-1, null=True)),
                ('two_seater_price', models.IntegerField(blank=True, default=-1, null=True)),
                ('three_seater_price', models.IntegerField(blank=True, default=-1, null=True)),
                ('four_seater_price', models.IntegerField(blank=True, default=-1, null=True)),
                ('internet', models.BooleanField(default=False)),
                ('washing_machine', models.BooleanField(default=False)),
                ('bathroom_cleaning', models.BooleanField(default=False)),
                ('study_table', models.BooleanField(default=False)),
                ('books_rack', models.BooleanField(default=False)),
                ('wardrobe', models.BooleanField(default=False)),
                ('clothes_hanger', models.BooleanField(default=False)),
                ('arrival_time', models.TimeField()),
                ('smoking_and_beverages_usage', models.TextField(blank=True, null=True)),
                ('transportation_bus_stations', models.TextField(blank=True, null=True)),
                ('nearby_hospitals_pharmacy', models.TextField(blank=True, null=True)),
                ('nearby_schools', models.TextField(blank=True, null=True)),
                ('nearby_shopping_malls', models.TextField(blank=True, null=True)),
                ('nearby_cafes_and_restaurants', models.TextField(blank=True, null=True)),
            ],
        ),
    ]