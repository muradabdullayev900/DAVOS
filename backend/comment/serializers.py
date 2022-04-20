from rest_framework import serializers

from comment.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """DRF Serializer For Listing Published Comment"""

    class Meta:
        model = Comment
        fields = ['author', 'author_full_name', 'user_profile', 'body', 'published_on']


class CommentCreateSerializer(serializers.ModelSerializer):
    """DRF Serializer Fpr Creating Comments By The User"""

    class Meta:
        model = Comment
        fields = ['body', 'post', 'author']