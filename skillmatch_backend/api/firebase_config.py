import firebase_admin
from firebase_admin import credentials, storage

# Initialize Firebase Admin SDK
cred = credentials.Certificate("C:/Users/alfre/Documents/Tech/HTML_CSS_JS/Fullstack/skillmatch_backend/skillmatch_backend/skillmatch-48395-firebase-adminsdk-tiob5-f1d0aac23b.json")

# Replace with your actual Firebase Storage bucket name
firebase_storage_bucket = 'skillmatch-48395.appspot.com'

# Initialize Firebase app if not already initialized
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred, {
        'storageBucket': firebase_storage_bucket
    })
