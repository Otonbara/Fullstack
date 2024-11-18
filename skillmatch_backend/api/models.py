from django.db import models
from django.contrib.auth.models import User
from .firebase_storage import upload_to_firebase

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_company = models.BooleanField(default=False)
    bio = models.TextField(blank=True)
    skills = models.TextField(blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True)  # Local path
    profile_pic_url = models.URLField(blank=True, null=True)  # Firebase URL

    def save(self, *args, **kwargs):
        if self.profile_pic and not self.profile_pic_url:
            file = self.profile_pic.file
            file_name = f"{self.user.username}_profile_pic.jpg"
            self.profile_pic_url = upload_to_firebase(file, file_name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.username


class Job(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    company = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    requirements = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)  # Add this for job visibility
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Optional salary field

    def __str__(self):
        return self.title