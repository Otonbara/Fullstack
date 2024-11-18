from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    # Django Admin
    path('admin/', admin.site.urls),

    # Django API
    path('api/', include('api.urls')),

    # Serve React frontend for any unmatched route
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

# Serving media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
