from tokenize import Token
from django import views
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import PostListSerializer, PostDetailSerializer, PostCreateSerializer, PostUpdateSerializer
from .models import Post
from users.models import UserAccount
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenVerifySerializer

# class PostListView(viewsets.ModelViewSet):
#     serializer_class = PostListSerializer
#     queryset = Post.objects.all()

class PostListView(generics.ListAPIView):
	queryset = Post.objects.all()
	serializer_class = PostListSerializer
	lookup_field = 'slug'


class PostDetailView(generics.RetrieveAPIView):
    """View For The Details Of A Single Post"""
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    lookup_field = 'slug'


@api_view(['POST'])
def post_create_view(request):
    """View To Create New Post For The Logged In Users"""

    if request.method == 'POST':
        token_type, token = request.META.get('HTTP_AUTHORIZATION').split()
        if(token_type != 'JWT'):
            return Response({'detail': 'No JWT Authentication Token Found'}, status=status.HTTP_400_BAD_REQUEST)

        token_data = {'token': token}

        try:
            valid_data = TokenVerifySerializer().validate(token_data)
        except:
            return Response({'detail': 'Invalid Token'}, status.HTTP_400_BAD_REQUEST)

        data = request.data
        data['author'] = request.user.pk  # Adding User ID Of The Author
        serializer = PostCreateSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({'detail': 'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def post_update_view(request):
    """View To Update A Post For Logged In Users"""

    if request.method == 'POST':
        token_type, token = request.META.get('HTTP_AUTHORIZATION').split()
        if(token_type != 'JWT'):
            return Response({'detail': 'No JWT Authentication Token Found'}, status=status.HTTP_400_BAD_REQUEST)

        token_data = {'token': token}

        try:
            valid_data = TokenVerifySerializer().validate(token_data)
            logged_in_user = valid_data.get('user')
        except:
            return Response({'detail': 'Invalid Token'}, status.HTTP_400_BAD_REQUEST)

        updated_data = request.data
        instance = Post.objects.get(slug=updated_data.get('slug'))
        admin_user = UserAccount.objects.get(pk=1)  # PK Of Admin User Is 1

        if(instance.author == logged_in_user or logged_in_user == admin_user):
            updated_data.pop('slug')
            serializer = PostUpdateSerializer(instance, data=updated_data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({'detail': 'Something Went Wrong.'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'detail': 'You Are Not Authorised To Edit This Post'}, status.HTTP_403_FORBIDDEN)

    else:
        return Response({'detail': 'You Are Not Authorised To Edit This Post'}, status.HTTP_403_FORBIDDEN)


@api_view(['DELETE'])
def post_delete_view(request):
    """View To Delete A Post For Logged In Users"""

    if request.method == 'DELETE':
        token_type, token = request.META.get('HTTP_AUTHORIZATION').split()
        if(token_type != 'JWT'):
            return Response({'detail': 'No JWT Authentication Token Found'}, status=status.HTTP_400_BAD_REQUEST)

        token_data = {'token': token}

        try:
            valid_data = TokenVerifySerializer().validate(token_data)
            logged_in_user = valid_data.get('user')
        except:
            return Response({'detail': 'Invalid Token'}, status.HTTP_400_BAD_REQUEST)

        instance = Post.objects.get(slug=request.data.get('slug'))
        admin_user = UserAccount.objects.get(pk=1)  # PK Of Admin User Is 1

        if(instance.author == logged_in_user or logged_in_user == admin_user):
            instance.delete()
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Something Went Wrong.'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({'detail': 'You Are Not Authorised To Edit This Post'}, status.HTTP_403_FORBIDDEN)