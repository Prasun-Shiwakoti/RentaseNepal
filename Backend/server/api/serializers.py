from rest_framework import serializers
from .models import Hostel, CustomUsers, Blog, HostelImage
from .models import Hostel, CustomUsers, Blog, HostelImage
from django.contrib.auth.models import User

class HostelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelImage
        fields = ['id', 'image']  

    
class HostelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hostel
        fields = '__all__'  

class HostelImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelImage
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'     

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']


    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUsers
        fields = '__all__'



       