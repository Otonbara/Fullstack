from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Profile, Job
from .serializers import ProfileSerializer, JobSerializer
from .firebase_auth import FirebaseAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

# Profile ViewSet
class ProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user profiles.
    Only authenticated users can view or edit their own profiles.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [FirebaseAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Show only the profile of the currently authenticated user
        user = self.request.user
        if not user.is_authenticated:
            return Profile.objects.none()
        return Profile.objects.filter(user=user)

    def perform_create(self, serializer):
        # Ensure the profile is created for the authenticated user
        if Profile.objects.filter(user=self.request.user).exists():
            raise PermissionDenied("You already have a profile.")
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Allow users to update only their own profiles
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You can only update your own profile.")
        serializer.save()

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    authentication_classes = [FirebaseAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Job.objects.none()
        
        # Filter jobs based on whether the user is a company or not
        if hasattr(user, 'profile') and user.profile.is_company:
            return Job.objects.filter(company=user)
        return Job.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        if not hasattr(user, 'profile') or not user.profile.is_company:
            raise PermissionDenied("Only companies can create job listings.")
        serializer.save(company=user)