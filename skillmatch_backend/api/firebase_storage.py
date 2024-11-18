from firebase_admin import storage
from django.core.files.base import ContentFile

def upload_to_firebase(file, file_name):
    """
    Uploads a file to Firebase Storage and returns the public URL.
    """
    bucket = storage.bucket()
    blob = bucket.blob(f'media/{file_name}')
    
    # If the file is a Django file object, use `file.read()` to get its content
    blob.upload_from_string(file.read(), content_type=file.content_type)
    
    # Make the file publicly accessible
    blob.make_public()
    
    return blob.public_url
