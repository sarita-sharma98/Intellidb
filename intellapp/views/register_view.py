from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from intellapp.models import UserDetail
from rest_framework.permissions import AllowAny
from datetime import datetime


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"message": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if UserDetail.objects.filter(username=username).exists():
            return Response(
                {"message": "User already exists."}, status=status.HTTP_400_BAD_REQUEST
            )

        hashed_password = make_password(password)

        user_detail = UserDetail(
            username=username,
            password=hashed_password,
            created_at=datetime.now(),
            is_staff=False,
            is_active=True,
        )
        user_detail.save()

        return Response(
            {"message": "User registered successfully!"}, status=status.HTTP_201_CREATED
        )
