# Generated by Django 5.1.2 on 2024-11-02 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_hostel_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='hostel',
            name='latitude',
            field=models.FloatField(default=27.6927236),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='hostel',
            name='longitude',
            field=models.FloatField(default=85.3376411),
            preserve_default=False,
        ),
    ]
