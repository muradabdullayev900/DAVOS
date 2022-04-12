from django.urls import path, re_path
from .views import PostListView

urlpatterns = [
    re_path(r'^$', PostListView.as_view(), name='List')
]