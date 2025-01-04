from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HostelViewSet, UserViewSet

router = DefaultRouter()
router.register(r"hostels", HostelViewSet, basename='hostel')
router.register('users', UserViewSet, basename='user')

urlpatterns = [
    path("", include(router.urls)),
]
