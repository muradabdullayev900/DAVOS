from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'date_posted', 'author')


class PostListSerializer(serializers.ModelSerializer):
	author = serializers.StringRelatedField()	
	class Meta:
		model = Post
		fields = ('id', 'title', 'content', 'author', 'date_posted')


class PostDetailSerializer(serializers.ModelSerializer):
	author = serializers.StringRelatedField()
	class Meta:
		model = Post
		lookup_field = 'pk'
		fields = ('id', 'title', 'content', 'date_posted', 'author')


class PostCreateSerializer(serializers.ModelSerializer):
	author = serializers.StringRelatedField()
	class Meta:
		model = Post
		fields = ('title', 'content', 'author', 'date_posted')