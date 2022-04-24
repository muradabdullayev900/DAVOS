from rest_framework import serializers
from .models import Post
from comment.serializers import CommentSerializer

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'date_posted', 'author')


class PostListSerializer(serializers.ModelSerializer):
	# author = serializers.StringRelatedField()
    total_comments = serializers.IntegerField()
    author_full_name = serializers.CharField()

    class Meta:
        model = Post
        fields = ('author', 'slug', 'title', 'content', 'author_full_name', 'published_on', 'user_profile', 'total_comments')


class PostDetailSerializer(serializers.ModelSerializer):
    comments_list = CommentSerializer(many=True)
    total_comments = serializers.IntegerField()
    author_full_name = serializers.CharField()

    class Meta:
        model = Post
        fields = ('author', 'slug', 'title', 'content', 'author_full_name', 'published_on', 'user_profile', 'comments_list', 'total_comments', 'image')


class PostCreateSerializer(serializers.ModelSerializer):
    """Serializer For Creating A Post For Logged In Users"""

    class Meta:
        model = Post
        fields = ('title', 'content', 'author', 'slug', 'image')


# class PostListSerializer(serializers.ModelSerializer):
#     """Serializer For Listing Only Relevant Information
#     Of Posts Of A Particular User"""

#     total_comments = serializers.IntegerField()

#     class Meta:
#         model = Post
#         fields = ('title', 'is_published', 'slug',
#                   'total_comments', 'created_on')

class PostUpdateSerializer(serializers.ModelSerializer):
    """Serializer For Creating A Post For Logged In Users"""
    class Meta:
        model = Post
        fields = ('title', 'content')