from django.shortcuts import render
from rest_framework import generics, viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import User, Player, Location
from .serializers import UserSerializer, PlayerSerializer, LocationSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.db import transaction
from django.contrib.auth.models import User

# List and create users (GET and POST)
class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Retrieve, update, and delete a single user (GET, PUT, DELETE)
class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the profile
        return obj.user == request.user

class PlayerViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing player profiles.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        """
        This view should return a list of all players
        for the currently authenticated user.
        """
        return Player.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """
        Set the user when creating a new player profile.
        """
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """
        Custom action to get the current user's profile.
        """
        player = get_object_or_404(Player, user=request.user)
        serializer = self.get_serializer(player)
        return Response(serializer.data)
    
    @action(detail=False, methods=['patch'])
    def update_preferences(self, request):
        """
        Custom action to update player preferences.
        """
        player = get_object_or_404(Player, user=request.user)
        serializer = self.get_serializer(player, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LocationViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing locations.
    """
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        """
        Optionally filter locations by city or state.
        """
        queryset = Location.objects.all()
        city = self.request.query_params.get('city', None)
        state = self.request.query_params.get('state', None)
        
        if city:
            queryset = queryset.filter(city__icontains=city)
        if state:
            queryset = queryset.filter(state__iexact=state)
            
        return queryset

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    """
    Register a new user and create a player profile.
    """
    try:
        with transaction.atomic():
            # Create Django User
            user_data = {
                'username': request.data.get('email'),
                'email': request.data.get('email'),
                'password': request.data.get('password'),
                'first_name': request.data.get('first_name'),
                'last_name': request.data.get('last_name'),
            }
            
            user = User.objects.create_user(
                username=user_data['username'],
                email=user_data['email'],
                password=user_data['password'],
                first_name=user_data['first_name'],
                last_name=user_data['last_name']
            )
            
            # Create Player profile
            player_data = {
                'user': user,
                'first_name': request.data.get('first_name'),
                'last_name': request.data.get('last_name'),
                'email': request.data.get('email'),
                'phone_number': request.data.get('phone_number'),
                'skill_rating': request.data.get('rating', 3.0),
                'availability': request.data.get('availability', []),
                'preferred_play': request.data.get('preferredPlay', 'Both'),
                'notifications_enabled': request.data.get('notifications', True),
                'email_notifications': request.data.get('emailNotifications', True),
                'push_notifications': request.data.get('pushNotifications', True),
            }
            
            player = Player.objects.create(**player_data)
            
            # Create token for authentication
            token, _ = Token.objects.get_or_create(user=user)
            
            return Response({
                'token': token.key,
                'user_id': user.id,
                'player_id': player.id,
                'message': 'User registered successfully'
            }, status=status.HTTP_201_CREATED)
            
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    """
    Login a user and return a token.
    """
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({
            'error': 'Please provide both email and password'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Find user by email
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    # Authenticate user
    user = authenticate(username=user.username, password=password)
    
    if not user:
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    # Get or create token
    token, _ = Token.objects.get_or_create(user=user)
    
    # Get player profile
    try:
        player = Player.objects.get(user=user)
        player_id = player.id
    except Player.DoesNotExist:
        player_id = None
    
    return Response({
        'token': token.key,
        'user_id': user.id,
        'player_id': player_id,
        'message': 'Login successful'
    })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user_profile(request):
    """
    Get the profile data for the authenticated user.
    """
    try:
        player = Player.objects.get(user=request.user)
        return Response({
            'first_name': player.first_name,
            'last_name': player.last_name,
            'email': player.email,
            'phone': player.phone_number,
            'rating': float(player.skill_rating),
            'location': player.get_location_display(),
            'availability': player.availability,
            'preferredPlay': player.preferred_play,
            'notifications': player.notifications_enabled,
            'emailNotifications': player.email_notifications,
            'pushNotifications': player.push_notifications,
        }, status=status.HTTP_200_OK)
    except Player.DoesNotExist:
        return Response({
            'error': 'Player profile not found'
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
