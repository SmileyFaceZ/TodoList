from django.urls import path, include
from api.views import UserCreate, UserDetailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import validate_google_token


urlpatterns = [
    path('user/register/', UserCreate.as_view(), name='user_register'),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/user/', UserDetailView.as_view(), name='user_detail'),

    # Token authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Google login
    path('google/validate_token/', validate_google_token, name='validate_token'),

    # Load user data
    path('user/', UserDetailView.as_view(), name='user_detail'),
]
