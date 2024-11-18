from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, JobViewSet

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet, basename='profile')
router.register(r'jobs', JobViewSet, basename='job')

urlpatterns = [
    path('', include(router.urls)),
]

app_name = 'api'
