import requests
import json

BASE_URL = 'http://localhost:8000/api'

def test_registration():
    """Test user registration endpoint"""
    url = f'{BASE_URL}/auth/register/'
    data = {
        'first_name': 'Test',
        'last_name': 'User',
        'email': 'test@example.com',
        'password': 'password123',
        'phone_number': '1234567890',
        'rating': 3.5,
        'availability': ['Weekends', 'Evenings'],
        'preferredPlay': 'Singles',
        'notifications': True,
        'emailNotifications': True,
        'pushNotifications': True
    }
    
    response = requests.post(url, json=data)
    print(f"Registration Response: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    return response.json().get('token')

def test_login():
    """Test user login endpoint"""
    url = f'{BASE_URL}/auth/login/'
    data = {
        'email': 'test@example.com',
        'password': 'password123'
    }
    
    response = requests.post(url, json=data)
    print(f"Login Response: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    return response.json().get('token')

def test_get_profile(token):
    """Test getting user profile"""
    url = f'{BASE_URL}/players/me/'
    headers = {'Authorization': f'Token {token}'}
    
    response = requests.get(url, headers=headers)
    print(f"Profile Response: {response.status_code}")
    print(json.dumps(response.json(), indent=2))

def test_update_profile(token):
    """Test updating user profile"""
    url = f'{BASE_URL}/players/update_preferences/'
    headers = {'Authorization': f'Token {token}'}
    data = {
        'skill_rating': 4.0,
        'availability': ['Weekends', 'Evenings', 'Flexible'],
        'preferred_play': 'Both'
    }
    
    response = requests.patch(url, headers=headers, json=data)
    print(f"Update Profile Response: {response.status_code}")
    print(json.dumps(response.json(), indent=2))

def test_get_locations(token):
    """Test getting locations"""
    url = f'{BASE_URL}/locations/'
    headers = {'Authorization': f'Token {token}'}
    
    response = requests.get(url, headers=headers)
    print(f"Locations Response: {response.status_code}")
    print(json.dumps(response.json(), indent=2))

if __name__ == '__main__':
    print("Testing API Endpoints...")
    
    # Test registration
    token = test_registration()
    
    # If registration failed, try login
    if not token:
        print("Registration failed, trying login...")
        token = test_login()
    
    if token:
        # Test other endpoints with token
        test_get_profile(token)
        test_update_profile(token)
        test_get_locations(token)
    else:
        print("Authentication failed, cannot test other endpoints") 