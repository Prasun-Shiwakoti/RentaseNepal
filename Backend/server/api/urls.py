from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HostelViewSet, UserViewSet, BlogsViewSet

router = DefaultRouter()
router.register(r"hostels", HostelViewSet, basename='hostel')
router.register('users', UserViewSet, basename='user')
router.register('blogs', BlogsViewSet, basename='blog')

urlpatterns = [
    path("", include(router.urls)),
]
