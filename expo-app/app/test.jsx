import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Test() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Page</Text>
      <Text style={styles.subtitle}>This is a test page to verify routing</Text>
      
      <Button 
        title="Go to Register" 
        onPress={() => router.replace('/register')} 
        color="#27c2a0"
      />
      
      <Button 
        title="Go to Login" 
        onPress={() => router.replace('/login')} 
        color="#004b87"
      />
      
      <Button 
        title="Go to Dashboard" 
        onPress={() => router.replace('/dashboard')} 
        color="#27c2a0"
      />
      
      <Button 
        title="Go Back to Home" 
        onPress={() => router.replace('/')} 
        color="#004b87"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d0f0ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#004b87',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#333',
  },
}); 