from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .models import Hostel
from .serializers import HostelSerializer

class HostelViewSet(viewsets.ModelViewSet):
    serializer_class = HostelSerializer

    def get_queryset(self):
        queryset = Hostel.objects.all()

        location = self.request.query_params.get('location', None)

        if location is not None:
            pass

        return queryset
    