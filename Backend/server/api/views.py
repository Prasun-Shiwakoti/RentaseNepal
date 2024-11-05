from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Hostel
from .serializers import HostelSerializer
from django.db.models import Q
from django.db.models import F
from django.db.models.functions import ACos, Cos, Radians, Sin
from datetime import datetime

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
        serializer = HostelSerializer(hostels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Override list function for manual pagination
    def list(self, request, *args, **kwargs):
        limit = int(request.query_params.get('limit', 10)) 
        offset = int(request.query_params.get('offset', 0))  

        # Get all hostels
        hostels = Hostel.objects.all()

        # Apply manual pagination
        paginated_hostels = hostels[offset:offset + limit]

        # Serialize the data
        serializer = HostelSerializer(paginated_hostels, many=True)

        # Prepare response data with pagination info
        response_data = {
            'hostels': serializer.data,
            'total_count': hostels.count(),  
            'has_more': offset + limit < hostels.count() 
        }

        return Response(response_data)

    