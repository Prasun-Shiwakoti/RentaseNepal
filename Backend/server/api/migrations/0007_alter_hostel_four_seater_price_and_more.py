# Generated by Django 5.1.2 on 2025-01-04 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_blogs_remove_hostel_rating_hostel_approved_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hostel',
            name='four_seater_price',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='hostel',
            name='single_seater_price',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='hostel',
            name='three_seater_price',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='hostel',
            name='two_seater_price',
            field=models.IntegerField(default=0),
        ),
    ]
