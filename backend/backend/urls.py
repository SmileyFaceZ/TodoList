from django.contrib import admin
from django.urls import path, include
from api.views import google_login_callback


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),

    path('accounts/', include('allauth.urls')),
    path('callback/', google_login_callback, name='callback'),
]