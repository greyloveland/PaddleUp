import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

// Create a custom theme with black text color
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'black',
    primary: '#27c2a0',
  },
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: '#d0f0ff', // Pickleball-ish background: energetic aqua
    alignItems: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#004b87', // Darker blue for contrast
  },
  card: {
    width: '100%',
    maxWidth: 500,
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    marginBottom: 15,
    borderRadius: 10,
  },
  devButton: {
    marginTop: 30,
    borderColor: '#666',
  },
});

export default function Index() {
  const router = useRouter();

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>PADDLEUP</Text>
        </View>

        <Card style={styles.card}>
          <Card.Title 
            title="Welcome to PaddleUp" 
            titleStyle={{ fontSize: 20, textAlign: 'center' }} 
            titleVariant="headlineMedium"
            style={{ alignItems: 'center' }}
          />
          <Card.Content>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => {
                  console.log('Navigating to register page');
                  router.replace('/register');
                }}
                style={styles.button}
                labelStyle={{ color: '#fff' }}
              >
                Create New Account
              </Button>

              <Button
                mode="contained"
                onPress={() => router.replace('/login')}
                style={styles.button}
                labelStyle={{ color: '#fff' }}
              >
                Login to Existing Account
              </Button>

              <Button
                mode="outlined"
                onPress={() => {
                  console.log('Dev login pressed');
                  router.replace('/dashboard');
                }}
                style={styles.devButton}
                labelStyle={{ color: '#666' }}
              >
                Skip Login (Dev Only)
              </Button>

              <Button
                mode="outlined"
                onPress={() => {
                  console.log('Navigating to test page');
                  router.replace('/test');
                }}
                style={[styles.devButton, { marginTop: 10 }]}
                labelStyle={{ color: '#666' }}
              >
                Test Navigation
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
}
