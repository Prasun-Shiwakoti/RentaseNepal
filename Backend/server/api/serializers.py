from rest_framework import serializers
from .models import Hostel, CustomUsers, Blog, HostelImage
from django.contrib.auth.models import User

class HostelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelImage
        fields = ['id', 'image']  

    
class HostelSerializer(serializers.ModelSerializer):
    additional_image = HostelImageSerializer(source='additional_images', many=True, read_only=True)
    
    class Meta:
        model = Hostel
        fields = '__all__'  # Includes all fields defined in your `Hostel` model
        # extra_fields = ['additional_image']  # Additional fields not in the model

    # def to_representation(self, instance):
    #     """
    #     Add extra fields to the representation dynamically.
    #     """
    #     representation = super().to_representation(instance)
    #     if hasattr(self.Meta, 'extra_fields'):
    #         for field in self.Meta.extra_fields:
    #             representation[field] = self.fields[field].to_representation(getattr(instance, field))
    #     return representation  


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'     

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
        