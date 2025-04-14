import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter, Link } from 'expo-router';
import { Button, Card, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/state/userSlice';

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
  submitButton: {
    marginTop: 20,
    backgroundColor: '#27c2a0',
    borderRadius: 10,
  },
  registerButton: {
    marginTop: 10,
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  devButton: {
    marginTop: 20,
    borderColor: '#666',
  },
});

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(result)) {
        // Only navigate to dashboard after successful login
        router.replace('/dashboard');
      } else {
        console.error('Login failed:', result.error);
        // Handle login error (you might want to show an error message to the user)
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (you might want to show an error message to the user)
    }
  };

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>PADDLEUP</Text>
        </View>

        <Card style={styles.card}>
          <Card.Title 
            title="Welcome Back!" 
            titleStyle={{ fontSize: 20, textAlign: 'center' }} 
            titleVariant="headlineMedium"
            style={{ alignItems: 'center' }}
          />
          <Card.Content>
            <FormBuilder
              control={control}
              setFocus={() => {}}
              formConfigArray={[
                {
                  name: 'email',
                  type: 'text',
                  textInputProps: {
                    label: 'Email',
                    mode: 'outlined',
                    keyboardType: 'email-address',
                    style: { backgroundColor: 'white', color: 'black' },
                  },
                  rules: {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  },
                },
                {
                  name: 'password',
                  type: 'text',
                  textInputProps: {
                    label: 'Password',
                    mode: 'outlined',
                    secureTextEntry: true,
                    style: { backgroundColor: 'white', color: 'black' },
                  },
                  rules: {
                    required: 'Password is required',
                  },
                },
              ]}
            />

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
              labelStyle={{ color: '#fff' }}
            >
              Log In
            </Button>

            <Button
              mode="text"
              onPress={() => router.replace('/')}
              style={styles.registerButton}
              labelStyle={{ color: '#004b87' }}
            >
              Don't have an account? Sign up
            </Button>

            <Button
              mode="text"
              onPress={() => router.replace('/forgot-password')}
              style={styles.forgotPasswordButton}
              labelStyle={{ color: '#004b87' }}
            >
              Forgot Password?
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
          </Card.Content>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
} 