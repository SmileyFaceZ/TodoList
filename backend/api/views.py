from django.shortcuts import redirect
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, TodoSerializer, PrioritySerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from allauth.socialaccount.models import SocialToken, SocialAccount
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.http import JsonResponse
import json
from .models import Todo, Priority, Category


User = get_user_model()

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return self.request.user


class TodoListView(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user).order_by('-created_at')
    
    def perform_create(self, serializer):
        return super().perform_create(serializer)



class PriorityListView(generics.ListCreateAPIView):
    serializer_class = PrioritySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Priority.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        return super().perform_create(serializer)
    

class PriorityDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PrioritySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Priority.objects.filter(user=self.request.user)


class CategoryListView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        return super().perform_create(serializer)
    

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

@login_required
def google_login_callback(request):
    user = request.user

    social_accounts = SocialAccount.objects.filter(user=user)

    social_account = social_accounts.first()

    if not social_account:
        return redirect('http://localhost:5173/login/callback/?error=NoSocialAccount')
    
    token = SocialToken.objects.filter(account=social_account, account__provider='google').first()

    if token:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return redirect(f'http://localhost:5173/login/callback/?access_token={access_token}')
    else:
        return redirect(f'http://localhost:5173/login/callback/?error=NoGoogleToken')


# @csrf_exempt
def validate_google_token(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            google_access_token = data.get('access_token')

            if not google_access_token:
                return JsonResponse({'detail': 'Access Token is missing.'}, status=400)
            return JsonResponse({'valid': True})
        except json.JSONDecodeError:
            return JsonResponse({'detail': 'Invalid JSON.'}, status=400)
    return JsonResponse({'detail': 'Method not allowed.'}, status=405)
