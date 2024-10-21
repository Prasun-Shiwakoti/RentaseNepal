from django.urls import path
from . import views

urlpatterns = [
    path('hostels/', views.get_hostels, name='get_hostels'),
]