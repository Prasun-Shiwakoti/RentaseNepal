from rest_framework import serializers
from .models import Hostel, CustomUsers
from django.contrib.auth.models import User

class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = '__all__'  

    # def get_fields(self):
    #     fields = super().get_fields() 

    #     # Exculde specific fields from the serializer
    #     exclude_fields = ['single_seater_price', 'two_seater_price', 'three_seater_price', 'four_seater_price', 'contact_information', 'longitude', 'latitude']
    #     for field in exclude_fields:
    #         fields.pop(field, None)
    #     return fields
    

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=CustomUsers.ROLE_CHOICES, default="normal", write_only=True)  # CustomUsers role field
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'name', 'role']

    def create(self, validated_data):
        # Remove 'name' and 'role' since they don't belong to User
        name = validated_data.pop('name')
        role = validated_data.pop('role')
        # Create the User object
        user = User.objects.create_user(**validated_data)
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUsers
        fields = ['name', 'role', 'user']
        