from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenVerifySerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser


from .models import UserAccount, Profile

from .serializers import UserProfileSerializer

User = get_user_model()
# Create your views here.

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserAccount.objects.all()
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    parser_classes = (MultiPartParser, FormParser)

    def retrieve(self, request, *args, **kwargs):
        # instance = self.request.user
        # user_id = UserAccount.objects.get(email=instance).id
        # profile = Profile.objects.get(user_id=user_id)
        # serializer = UserProfileSerializer(profile)
        # print(serializer.data)
        # return Response(serializer.data)
        instance = self.request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = request.user
        # Disabling The Updation Of Username
        # request.data['email'] = instance.email
        serializer = UserProfileSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserStatusView(generics.RetrieveAPIView):
    """View To Return The User Status (Active/Superuser)"""

    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenVerifySerializer,)

    def get(self, request, *Args, **kwargs):
        user_instance = request.user
        data = {'is_active': user_instance.is_active,
                'is_superuser': user_instance.is_superuser}
        return Response(data, status=status.HTTP_200_OK)