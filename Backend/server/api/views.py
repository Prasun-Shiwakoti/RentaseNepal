from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Hostel, Blog
from .serializers import HostelSerializer
from django.db.models import Q
from django.db.models import F
from django.db.models.functions import ACos, Cos, Radians, Sin
from datetime import datetime
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, LoginSerializer, CustomUserSerializer, BlogSerializer, HostelImage

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

        }

        arrival_time = request.data.get('arrival_time', '00:00')
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
            hostels = Hostel.objects.annotate(
                distance=earth_radius_km * ACos(
                    Cos(Radians(latitude)) * Cos(Radians(F('latitude'))) *
                    Cos(Radians(F('longitude')) - Radians(longitude)) +
                    Sin(Radians(latitude)) * Sin(Radians(F('latitude')))
                )
            ).filter(distance__lte=max_distance_km)


        # Serialize and return the filtered data
        serializer = self.get_serializer(hostels, many=True)
        serializer_data = copy.deepcopy(serializer.data)
        exclude_fields = ['single_seater_price', 'two_seater_price', 'three_seater_price', 'four_seater_price', 'contact_information', 'longitude', 'latitude']
        for obj in serializer_data:
            for field in exclude_fields:
                obj.pop(field, None)
        return Response(serializer_data, status=status.HTTP_200_OK)
    
    # Override list function for manual pagination
    def list(self, request, *args, **kwargs):
        limit = int(request.query_params.get('limit', 10)) 
        offset = int(request.query_params.get('offset', 0))  

        # Get all hostels
        hostels = Hostel.objects.all()

        # Apply manual pagination
        paginated_hostels = hostels[offset:offset + limit]

        # Serialize the data
        serializer = self.get_serializer(paginated_hostels, many=True)


        serializer_data = copy.deepcopy(serializer.data)

        if not (request.user.is_authenticated and request.user.custom_user.role == 'admin'):
            exclude_fields = ['single_seater_price', 'two_seater_price', 'three_seater_price', 'four_seater_price', 'contact_information', 'longitude', 'latitude']
            for obj in serializer_data:
                for field in exclude_fields:
                    obj.pop(field, None)
        # Prepare response data with pagination info
        response_data = {
            'hostels': serializer_data,
            'total_count': hostels.count(),  
            'has_more': offset + limit < hostels.count() 
        }

        return Response(response_data)      
    
    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.custom_user.role == 'admin':
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                # hostel_data = copy.deepcopy(serializer.data)
                # hostel_data['longitude'] = request.data.get('longitude', 0)
                # hostel_data['latitude'] = request.data.get('latitude', 0)

                cover_image = request.FILES.get('cover_image', None)
                additional_images = request.FILES.getlist('additional_images', [])

                # Create the Hostel object
                obj = Hostel.objects.create(**serializer.data)
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
        if request.user.is_authenticated and request.user.custom_user.role == 'admin':
            partial = kwargs.pop('partial', False)  # Determines whether it's a partial update
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
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
        if request.user.is_authenticated and request.user.custom_user.role == 'admin':
            instance = self.get_object()
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

    def create(self, request, *args, **kwargs):
        if request.user.is_authenticated and request.user.custom_user.role == 'admin':
            """Register a new user and their corresponding CustomUsers object."""
            request.data['role'] = 'admin'
            user_serializer = self.get_serializer(data=request.data)
            if user_serializer.is_valid():
                # Create the User object
                user = user_serializer.save()
                
                print("User created successfully.", user)
                # Create the CustomUsers object
                custom_user_data = {
                    "name": user_serializer.validated_data.get("name"),
                    "role": user_serializer.validated_data.get("role", "normal"),  # Default role is 'normal'
                    "user": user.id, 
                }
                custom_user_serializer = CustomUserSerializer(data=custom_user_data)
                if custom_user_serializer.is_valid():
                    custom_user_serializer.save()

                    print("CustomUser created successfully.", custom_user_serializer.data)

                    # Create token for authentication
                    token, _ = Token.objects.get_or_create(user=user)

                    print("Token created successfully.", token)
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

        return Response({
            "status": False,
            "message": "Unauthorized.",
            "data": {},
        }, status=status.HTTP_401_UNAUTHORIZED)
        
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
        if request.user.is_authenticated and request.user.custom_user.role == 'admin':
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
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
        if request.user.is_authenticated and request.user.custom_user.role == 'admin':
            partial = kwargs.pop('partial', False)  # Determines whether it's a partial update
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
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
        if request.user.is_authenticated and request.user.custom_user.role == 'admin':
            instance = self.get_object()
            instance.delete()
            return Response({
                "status": True,
                "message": "Blog deleted successfully.",
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
            Q(title__icontains=query) | Q(content__icontains=query)
        )

        serializer = self.get_serializer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)












