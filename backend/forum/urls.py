from django.urls import path, re_path
from .views import PostListView, PostDetailView, post_create_view, post_update_view

urlpatterns = [
    re_path(r'^$', PostListView.as_view(), name='List'),
    path('view/<slug>/', PostDetailView.as_view(), name='post-detail'),
    path('create-new-post', post_create_view),
    path('update-post', post_update_view),
]