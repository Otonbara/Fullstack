from rest_framework import serializers
from .models import Profile, Job
from .firebase_storage import upload_to_firebase

class ProfileSerializer(serializers.ModelSerializer):
    profile_pic_url = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['user', 'is_company', 'bio', 'skills', 'profile_pic', 'profile_pic_url']
        read_only_fields = ['profile_pic_url']

    def get_profile_pic_url(self, obj):
        if obj.profile_pic:
            return upload_to_firebase(obj.profile_pic, str(obj.profile_pic))
        return None


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'description', 'company', 'location', 'requirements', 'created_at', 'is_active', 'salary']