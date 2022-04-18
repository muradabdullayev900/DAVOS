from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

from .models import Profile, UserAccount
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')


class UserProfileSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    image = serializers.ImageField(
        source='profile.image',
        required=False,
        max_length=None,
        use_url=True
    )

    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name', 'image')
        # fields = ('email', 'first_name', 'last_name')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        self.update_or_create_profile(instance, profile_data)
        return super(UserProfileSerializer, self).update(instance, validated_data)

    def update_or_create_profile(self, user, profile_data):
        Profile.objects.update_or_create(user=user, defaults=profile_data)

    # def get_photo_url(self, user):
    #     request = self.context.get('request')
    #     image = user.photo.url
    #     return request.build_absolute_uri(image)

class UserStatus(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('is_active', 'is_superuser')