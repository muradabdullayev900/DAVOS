from django import views
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import PostListSerializer
from .models import Post
from rest_framework.generics import (
	CreateAPIView,
	DestroyAPIView,
	ListAPIView,
	RetrieveAPIView,
	RetrieveUpdateAPIView
)

# Create your views here.

# def home(request):
#     return HttpResponse('<h1>Blog Home</h1>')


# def about(request):
#     return HttpResponse('<h1>Blog About</h1>')

# class PostListView(viewsets.ModelViewSet):
#     serializer_class = PostListSerializer
#     queryset = Post.objects.all()

class PostListView(ListAPIView):
	queryset = Post.objects.all()
	serializer_class = PostListSerializer
