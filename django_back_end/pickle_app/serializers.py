from rest_framework import serializers
from .models import Player, Location
from django.contrib.auth.models import User

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['location_id', 'courts', 'city', 'state']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PlayerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    location_id = serializers.PrimaryKeyRelatedField(
        queryset=Location.objects.all(),
        source='location',
        write_only=True,
        required=False
    )
    location_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Player
        fields = [
            'id', 'user', 'first_name', 'last_name', 'email', 'phone_number',
            'skill_rating', 'location', 'location_id', 'location_display', 
            'experience_years', 'availability', 'preferred_play', 
            'notifications_enabled', 'email_notifications',
            'push_notifications', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_location_display(self, obj):
        return obj.get_location_display()
