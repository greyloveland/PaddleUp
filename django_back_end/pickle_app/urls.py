from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'players', views.PlayerViewSet, basename='player')
router.register(r'locations', views.LocationViewSet, basename='location')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', views.register_user, name='register'),
    path('auth/login/', views.login_user, name='login'),
    path('auth/profile/', views.get_user_profile, name='get_user_profile'),
]
