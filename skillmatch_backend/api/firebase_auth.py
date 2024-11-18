# api/firebase_auth.py
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from .utils import verify_firebase_token

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        decoded_token = verify_firebase_token(request)
        
        # Retrieve user based on UID from decoded token
        user_id = decoded_token.get('uid')
        
        if not user_id:
            raise AuthenticationFailed('User ID not found in token')

        # Get or create Django user
        user, created = User.objects.get_or_create(username=user_id)
        
        return (user, None)
