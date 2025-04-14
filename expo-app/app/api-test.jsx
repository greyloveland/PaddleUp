import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Card, TextInput, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';

// API base URL - change this to your Django server URL
const API_BASE_URL = 'http://localhost:8000/api';

export default function ApiTest() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const addResult = (title, data) => {
    setResults(prev => [...prev, { title, data, timestamp: new Date().toISOString() }]);
  };
  
  const clearResults = () => {
    setResults([]);
  };
  
  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: 'Test',
          last_name: 'User',
          email: email || 'test@example.com',
          password: password || 'password123',
          phone_number: '1234567890',
          rating: 3.5,
          availability: ['Weekends', 'Evenings'],
          preferredPlay: 'Singles',
          notifications: true,
          emailNotifications: true,
          pushNotifications: true
        }),
      });
      
      const data = await response.json();
      addResult('Register Response', data);
      
      if (data.token) {
        setToken(data.token);
      }
    } catch (error) {
      addResult('Register Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email || 'test@example.com',
          password: password || 'password123',
        }),
      });
      
      const data = await response.json();
      addResult('Login Response', data);
      
      if (data.token) {
        setToken(data.token);
      }
    } catch (error) {
      addResult('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGetProfile = async () => {
    if (!token) {
      addResult('Error', 'No token available. Please login or register first.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/players/me/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      
      const data = await response.json();
      addResult('Profile Response', data);
    } catch (error) {
      addResult('Profile Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateProfile = async () => {
    if (!token) {
      addResult('Error', 'No token available. Please login or register first.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/players/update_preferences/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skill_rating: 4.0,
          availability: ['Weekends', 'Evenings', 'Flexible'],
          preferred_play: 'Both'
        }),
      });
      
      const data = await response.json();
      addResult('Update Profile Response', data);
    } catch (error) {
      addResult('Update Profile Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGetLocations = async () => {
    if (!token) {
      addResult('Error', 'No token available. Please login or register first.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/locations/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      
      const data = await response.json();
      addResult('Locations Response', data);
    } catch (error) {
      addResult('Locations Error', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button 
          mode="text" 
          onPress={() => router.back()}
          icon="arrow-left"
        >
          Back
        </Button>
        <Text style={styles.title}>API Test</Text>
        <Button 
          mode="text" 
          onPress={clearResults}
          icon="delete"
        >
          Clear
        </Button>
      </View>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Authentication</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <Button 
              mode="contained" 
              onPress={handleRegister}
              style={styles.button}
              loading={loading}
            >
              Register
            </Button>
            <Button 
              mode="contained" 
              onPress={handleLogin}
              style={styles.button}
              loading={loading}
            >
              Login
            </Button>
          </View>
          
          {token ? (
            <View style={styles.tokenContainer}>
              <Text style={styles.tokenLabel}>Token:</Text>
              <Text style={styles.tokenText} numberOfLines={1} ellipsizeMode="middle">
                {token}
              </Text>
            </View>
          ) : null}
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>API Endpoints</Text>
          <View style={styles.buttonRow}>
            <Button 
              mode="contained" 
              onPress={handleGetProfile}
              style={styles.button}
              loading={loading}
            >
              Get Profile
            </Button>
            <Button 
              mode="contained" 
              onPress={handleUpdateProfile}
              style={styles.button}
              loading={loading}
            >
              Update Profile
            </Button>
          </View>
          <Button 
            mode="contained" 
            onPress={handleGetLocations}
            style={[styles.button, styles.fullWidth]}
            loading={loading}
          >
            Get Locations
          </Button>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Results</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#27c2a0" style={styles.loader} />
          ) : results.length === 0 ? (
            <Text style={styles.noResults}>No results yet. Try an API call.</Text>
          ) : (
            <ScrollView style={styles.resultsContainer}>
              {results.map((result, index) => (
                <View key={index} style={styles.resultItem}>
                  <Text style={styles.resultTitle}>{result.title}</Text>
                  <Text style={styles.resultTimestamp}>{result.timestamp}</Text>
                  <Text style={styles.resultData}>
                    {JSON.stringify(result.data, null, 2)}
                  </Text>
                  {index < results.length - 1 && <Divider style={styles.divider} />}
                </View>
              ))}
            </ScrollView>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  fullWidth: {
    marginTop: 8,
  },
  tokenContainer: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  tokenLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  tokenText: {
    fontFamily: 'monospace',
  },
  resultsContainer: {
    maxHeight: 300,
  },
  resultItem: {
    marginBottom: 12,
  },
  resultTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultTimestamp: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  resultData: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  divider: {
    marginVertical: 8,
  },
  loader: {
    marginVertical: 20,
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
  },
}); 