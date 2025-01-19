from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Hostel, CustomUsers, Blog, HostelImage

class HostelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelImage
        fields = ['id', 'image']  

    
class HostelSerializer(serializers.ModelSerializer):
    additional_image = HostelImageSerializer(source='additional_images', many=True, read_only=True)
    class Meta:
        model = Hostel
        fields = '__all__'  


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'     

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUsers
        fields = '__all__'



       