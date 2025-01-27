from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer

# List and create users (GET and POST)
class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Retrieve, update, and delete a single user (GET, PUT, DELETE)
class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
