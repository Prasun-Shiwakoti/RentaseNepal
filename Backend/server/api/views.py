# Django and Django REST Framework imports
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, F
from django.db.models.functions import ACos, Cos, Radians, Sin
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


# Local models and serializers
from .models import Hostel, Blog
from .serializers import (
    HostelSerializer,
    UserSerializer,
    LoginSerializer,
    CustomUserSerializer,
    BlogSerializer,
    HostelImage
)

# Python standard library imports
from datetime import datetime
import copy

class HostelViewSet(viewsets.ModelViewSet):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer

    # Custom action to filter hostels based on various parameters
    @action(detail=False, methods=['post'], url_path='filter')
    def filter_hostels(self, request):

        gender = request.data.get('gender', 2)
        max_price = request.data.get('max_price', 1000000)
        min_price = request.data.get('min_price', 0)

        boolean_fields = {
            'internet': request.data.get('internet', 2),
            'washing_machine': request.data.get('washing_machine', 2),
            'bathroom_cleaning': request.data.get('bathroom_cleaning', 2),
            'study_table': request.data.get('study_table', 2),
            'books_rack': request.data.get('books_rack', 2),
            'wardrobe': request.data.get('wardrobe', 2),
            'clothes_hanger': request.data.get('clothes_hanger', 2),
            'smoking_and_beverages_usage': request.data.get('smoking_and_beverages_usage', 2),
            'approved': request.data.get('approved', 2),
            'isFeatured': request.data.get('isFeatured', 2),
            'parking_space': request.data.get('parking_space', 2),
            'mess': request.data.get('mess', 2),
            'cctv': request.data.get('cctv', 2),
            'generator': request.data.get('generator', 2),
            'furniture': request.data.get('furniture', 2),
            'geysers': request.data.get('geysers', 2),
            'heater': request.data.get('heater', 2),
            'cooler': request.data.get('cooler', 2),
            'ac': request.data.get('ac', 2),
            'gym': request.data.get('gym', 2),
            'security_guard': request.data.get('security_guard', 2),
            'lift': request.data.get('lift', 2),

            'approved': request.data.get('approved', 2),
            'isFeatured': request.data.get('isFeatured', 2),
            'parking_space': request.data.get('parking_space', 2),
            'mess': request.data.get('mess', 2),
            'cctv': request.data.get('cctv', 2),
            'generator': request.data.get('generator', 2),
            'furniture': request.data.get('furniture', 2),
            'geysers': request.data.get('geysers', 2),
            'heater': request.data.get('heater', 2),
            'cooler': request.data.get('cooler', 2),
            'ac': request.data.get('ac', 2),
            'gym': request.data.get('gym', 2),
            'security_guard': request.data.get('security_guard', 2),
            'lift': request.data.get('lift', 2),

        }

        arrival_time = request.data.get('arrival_time', '00:00')
        rating = request.data.get('rating', 0)  
        try:
            arrival_time = datetime.strptime(arrival_time, '%H:%M').time()
        except ValueError:
            return Response({'error': 'Invalid arrival time format'}, status=status.HTTP_400_BAD_REQUEST)
        
        distance = request.data.get('distance', None)

        location = request.data.get('location', None)
        nearby_hospitals_pharmacy = request.data.get('nearby_hospitals_pharmacy', None)
        nearby_schools = request.data.get('nearby_schools', None)
        nearby_shopping_malls = request.data.get('nearby_shopping_malls', None)
        nearby_cafes_and_restaurants = request.data.get('nearby_cafes_and_restaurants', None)

        if max_price - min_price < 1000:
            return Response({'error': 'Invalid price range'}, status=status.HTTP_400_BAD_REQUEST)

        # Get all hostels
        hostels = Hostel.objects.all()

        # Apply arrival time filter
        hostels = hostels.filter(arrival_time__gte=arrival_time)

        # Apply rating filter
        hostels = hostels.filter(rating__gte=rating)

        # Apply location filter
        if location is not None:
            hostels = hostels.filter(location__icontains=location)

        # Apply gender filter (0: Female, 1: Male, 2: Any, 3: Both)
        if gender in [0, 1, 3]: 
            if gender == 3:
                gender = 2 # In database 2 is for Both
            hostels = hostels.filter(gender=gender)

        # Apply price filter
        if min_price is not None:
            hostels = hostels.filter(
                Q(single_seater_price__gte=min_price) |
                Q(two_seater_price__gte=min_price) |
                Q(three_seater_price__gte=min_price) |
                Q(four_seater_price__gte=min_price)
            )
        
        if max_price is not None:
            hostels = hostels.filter(
                Q(single_seater_price__lte=max_price) |
                Q(two_seater_price__lte=max_price) |
                Q(three_seater_price__lte=max_price) |
                Q(four_seater_price__lte=max_price)
            )

        # Apply boolean filters (0: No, 1: Yes, 2: Any)
        for field, value in boolean_fields.items():
            if value in [0, 1]:  # Only filter if the value is 0 or 1
                hostels = hostels.filter(**{field: bool(value)})
         
        # Apply distance filter
        if distance is not None:
            earth_radius_km = 6371.0
            latitude = distance.get('latitude', None)
            longitude = distance.get('longitude', None)

            max_distance_km = distance.get('max_distance_km', 10)
            if max_distance_km < .1:
                return Response({'error': 'Invalid distance range'}, status=status.HTTP_400_BAD_REQUEST)

            if latitude is None or longitude is None:
                return Response({'error': 'Invalid latitude or longitude'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Haversine formula to calculate distance based on latitude and longitude
            hostels = hostels.annotate(
                distance=earth_radius_km * ACos(
                    Cos(Radians(latitude)) * Cos(Radians(F('latitude'))) *
                    Cos(Radians(F('longitude')) - Radians(longitude)) +
                    Sin(Radians(latitude)) * Sin(Radians(F('latitude')))
                )
            ).filter(distance__lte=max_distance_km)

        if not (request.user.is_authenticated and request.user.custom_user.role == 'admin'):
            hostels = hostels.exclude(approved=False)

        # Serialize and return the filtered data
        serializer = self.get_serializer(hostels, many=True)
        serializer_data = copy.deepcopy(serializer.data)
        
        if not (request.user.is_authenticated and request.user.custom_user.role == 'admin'):
        
            exclude_fields = ['contact_information', 'longitude', 'latitude', 'name', 'owner_name']
        
            for obj in serializer_data:
                for field in exclude_fields:
                    obj.pop(field, None)
        
        return Response(serializer_data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # Serialize the instance data
        serializer = self.get_serializer(instance)

        # Get the serialized data
        data = serializer.data
        if getattr(request.user,'custom_user.role', None) != 'admin':
            if instance.approved == False:
                return Response({
                    "status": False,
                    "message": "No Hostel matches the given query.",
                    "data": {},
                }, status=status.HTTP_404_NOT_FOUND)
            
            exclude_fields = ['contact_information', 'longitude', 'latitude', 'name', 'owner_name']

            for field in exclude_fields:
                if field in data:
                    data.pop(field)

        # Return the modified response
        return Response(data)
    
    # Override list function for manual pagination
    def list(self, request, *args, **kwargs):
        limit = int(request.query_params.get('limit', 20)) 
        offset = int(request.query_params.get('offset', 0))  

        # Get all hostels
        hostels = Hostel.objects.all()

        # Apply manual pagination
        paginated_hostels = hostels[offset:offset + limit]
        if not (request.user.is_authenticated and request.user.custom_user.role == 'admin'):
            paginated_hostels = paginated_hostels.exclude(approved=False)

        # Serialize the data
        serializer = self.get_serializer(paginated_hostels, many=True)


        serializer_data = copy.deepcopy(serializer.data)

        if not getattr(request.user.custom_user, 'role', None) == 'admin':
            exclude_fields = ['contact_information', 'longitude', 'latitude', 'name', 'owner_name']
            for obj in serializer_data:
                for field in exclude_fields:
                    obj.pop(field, None)

        response_data = {
            'hostels': serializer_data,
            'total_count': hostels.count(),  
            'has_more': offset + limit < hostels.count() 
        }

        return Response(response_data)      
    
    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.custom_user.role != 'user':
            data = request.data.copy()
            
            if (request.user.custom_user.role == 'renter') :
                data.update({'approved': 0, 'isFeatured': 0, 'rating': 0})

            
            data['user'] = request.user.custom_user.id
            
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer_data = serializer.data.copy()
                serializer_data['user'] = request.user.custom_user
                
                cover_image = request.FILES.get('cover_image', None)
                additional_images = request.FILES.getlist('additional_images', [])

                # Create the Hostel object
                obj = Hostel.objects.create(**serializer_data)
                if obj:
                    # Save the cover image
                    if cover_image:
                        obj.image = cover_image
                        obj.save()
                    
                    # Save the additional images
                    if additional_images:
                        HostelImage.objects.bulk_create([
                            HostelImage(hostel=hostel, image=image) 
                            for image in additional_images
                        ])

                return Response({
                    "status": True,
                    "message": "Hostel created successfully.",
                    "data": serializer.data,
                }, status=status.HTTP_201_CREATED)
            
            return Response({
                "status": False,
                "message": "Failed to create hostel.",
                "data": serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            "status": False,
            "message": "Unauthorized.",
            "data": {},
        }, status=status.HTTP_401_UNAUTHORIZED)

    # Override the `update` method
    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            instance = self.get_object()

            if (request.user.custom_user == instance.user or request.user.custom_user.role == 'admin'):
                data = request.data
                
                if request.user.custom_user.role != 'admin':
                    data.update({'approved': 0})
                    data.pop('isFeatured', None)
                    data.pop('rating', None)

                partial = kwargs.pop('partial', False)  # Determines whether it's a partial update

                serializer = self.get_serializer(instance, data=data, partial=partial)

                if serializer.is_valid():
                    serializer.save()
                    return Response({
                        "status": True,
                        "message": "Hostel updated successfully.",
                        "data": serializer.data,
                    }, status=status.HTTP_200_OK)
                
                return Response({
                    "status": False,
                    "message": "Failed to update hostel.",
                    "data": serializer.errors,
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "status": False,
            "message": "Unauthorized.",
            "data": {},
        }, status=status.HTTP_401_UNAUTHORIZED)

    # Override the `destroy` method
    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            instance = self.get_object()
            if request.user.custom_user == instance.user or request.user.custom_user.role == 'admin':
                instance.delete()
                return Response({
                    "status": True,
                    "message": "Hostel deleted successfully.",
                    "data": {},
                }, status=status.HTTP_204_NO_CONTENT)

        return Response({
            "status": False,
            "message": "Unauthorized.",
            "data": {},
        }, status=status.HTTP_401_UNAUTHORIZED)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request, *args, **kwargs):

        if not (request.user.is_authenticated and request.user.custom_user.role == 'admin'):  
            return Response({
                "status": False,
                "message": "Unauthorized",
                "data": {}
            }, status=status.HTTP_403_FORBIDDEN)
        
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        # Allow access only if the logged-in user is accessing their own record or if the user is an admin.
        user_instance = self.get_object()
        if request.user != user_instance and not request.user.custom_user.role == 'admin':
            return Response({
                "status": False,
                "message": "Unauthorized",
                "data": {}
            }, status=status.HTTP_403_FORBIDDEN)
        
        return super().retrieve(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if request.data.get('role', 'user') == "admin":
            return Response({
                "status": False,
                "message": "Unauthorized.",
                "data": {},
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        user_credentials = {
            "username": request.data.get("username"),
            "email": request.data.get("email"),
            "password": request.data.get("password"),
        }
        user_serializer = self.get_serializer(data=user_credentials)
        if user_serializer.is_valid():
            # Create the User object
            user = user_serializer.save()
            
            # Create the CustomUsers object
            custom_user_data = {
                "name": request.data.get("name"),
                "role": request.data.get("role", "user"),  # Default role is 'user'
                "user": user.id, 
            }

            custom_user_serializer = CustomUserSerializer(data=custom_user_data)
            if custom_user_serializer.is_valid():
                custom_user_serializer.save()

                # Create token for authentication
                token, _ = Token.objects.get_or_create(user=user)

                return Response({
                    "status": True,
                    "message": "User registered successfully.",
                    "data": {
                        "username": user.username,
                        "email": user.email,
                        "role": custom_user_serializer.data["role"],
                        "token": str(token),
                    }
                }, status=status.HTTP_201_CREATED)
            
            # Rollback User creation if CustomUsers creation fails
            user.delete()
            return Response({
                "status": False,
                "message": "Registration failed.",
                "data": custom_user_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "status": False,
            "message": "Registration failed.",
            "data": user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['post'])
    def login(self, request):
        """Authenticate user and return a token."""
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.data['username']
            password = serializer.data['password']
            user = authenticate(username=username, password=password)
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({
                    "status": True,
                    "message": "Login successful.",
                    "data": {
                        "token": str(token),
                    }
                }, status=status.HTTP_200_OK)
            return Response({
                "status": False,
                "message": "Invalid credentials.",
                "data": {}
            }, status=status.HTTP_401_UNAUTHORIZED)
        return Response({
            "status": False,
            "message": "Invalid input.",
            "data": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
class BlogsViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    # Override the list method for manual pagination
    def list(self, request, *args, **kwargs):
        limit = int(request.query_params.get('limit', 10))  # Default limit is 10
        offset = int(request.query_params.get('offset', 0))  # Default offset is 0

        # Get all blogs and apply pagination
        blogs = Blog.objects.all()
        paginated_blogs = blogs[offset:offset + limit]

        # Serialize data
        serializer = self.get_serializer(paginated_blogs, many=True)
        serializer_data = copy.deepcopy(serializer.data)

        response_data = {
            'blogs': serializer_data,
            'total_count': blogs.count(),
            'has_more': offset + limit < blogs.count()
        }

        return Response(response_data, status=status.HTTP_200_OK)

    # Override create method to ensure only authorized users can create
    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            data = request.data.copy()

            data['author'] = request.user.id
            data['views'] = 0
            data.pop('date', None)

            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                image = request.FILES.get('image', None)
                serializer.validated_data['image'] = image
                serializer.save()
                return Response({
                    "status": True,
                    "message": "Blog created successfully.",
                    "data": serializer.data,
                }, status=status.HTTP_201_CREATED)

            return Response({
                "status": False,
                "message": "Failed to create blog.",
                "data": serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "status": False,
            "message": "Unauthorized.",
            "data": {},
        }, status=status.HTTP_401_UNAUTHORIZED)

    # Override update method to allow partial updates
    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            instance = self.get_object()

            if (request.user.custom_user == instance.author or request.user.custom_user.role == 'admin'):
                data = request.data
                if request.user.custom_user.role != 'admin':
                    data.pop('views', None)
                    data.pop('date', None)
            
                partial = kwargs.pop('partial', False)  # Determines whether it's a partial update
                serializer = self.get_serializer(instance, data=data, partial=partial)
                if serializer.is_valid():
                    serializer.save()
                    return Response({
                        "status": True,
                        "message": "Blog updated successfully.",
                        "data": serializer.data,
                    }, status=status.HTTP_200_OK)

                return Response({
                    "status": False,
                    "message": "Failed to update blog.",
                    "data": serializer.errors,
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "status": False,
            "message": "Unauthorized.",
            "data": {},
        }, status=status.HTTP_401_UNAUTHORIZED)

    # Override destroy method to restrict deletion to admins
    def destroy(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            instance = self.get_object()
            if request.user.custom_user == instance.author or request.user.custom_user.role == 'admin':
                instance.delete()
                return Response({
                    "status": True,
                    "message": "Hostel deleted successfully.",
                    "data": {},
                }, status=status.HTTP_204_NO_CONTENT)

        return Response({
            "status": False,
            "message": "Unauthorized.",
            "data": {},
        }, status=status.HTTP_401_UNAUTHORIZED)

    # Custom action to filter blogs based on title or content
    @action(detail=False, methods=['get'], url_path='filter')
    def filter_blogs(self, request):
        query = request.query_params.get('query', None)

        if not query:
            return Response({
                'error': 'Query parameter is required.'
            }, status=status.HTTP_400_BAD_REQUEST)

        blogs = Blog.objects.filter(
            Q(title__icontains=query) | 
            Q(content__icontains=query) | 
            Q(hook__icontains=query) | 
            Q(summary__icontains=query) |
            Q(link__icontains=query) |
            Q(author__name__icontains=query)

        )

        serializer = self.get_serializer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)












