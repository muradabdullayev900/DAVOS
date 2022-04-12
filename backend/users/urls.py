from django.urls import path, re_path
from .views import UserProfileView

urlpatterns = [
    path('profile/', UserProfileView.as_view())
]