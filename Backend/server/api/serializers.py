from rest_framework import serializers
from .models import Hostel

class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = '__all__'  

    def get_fields(self):
        fields = super().get_fields() 

        # Exculde specific fields from the serializer
        exclude_fields = ['single_seater_price', 'two_seater_price', 'three_seater_price', 'four_seater_price', 'contact_information', 'longitude', 'latitude']
        for field in exclude_fields:
            fields.pop(field, None)
        return fields