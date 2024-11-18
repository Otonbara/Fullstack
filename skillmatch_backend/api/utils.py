# api/utils.py
import firebase_admin
from firebase_admin import credentials, auth
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

# Initialize Firebase Admin SDK if not already initialized
if not firebase_admin._apps:
    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
    firebase_admin.initialize_app(cred)

def verify_firebase_token(request):
    """
    Verifies the Firebase ID token from the request's Authorization header.
    """
    id_token = request.headers.get('Authorization')
    
    if not id_token:
        raise AuthenticationFailed("Authorization header missing")

    try:
        # Remove 'Bearer ' prefix if present
        if id_token.startswith('Bearer '):
            id_token = id_token.split('Bearer ')[1]

        # Decode the Firebase ID token
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token  # Return the decoded token with user info
    
    except Exception as e:
        raise AuthenticationFailed("Invalid Firebase ID token")
