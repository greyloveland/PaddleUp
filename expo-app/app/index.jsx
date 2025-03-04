import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { Button, Card } from 'react-native-paper';
import { FormBuilder } from 'react-native-paper-form-builder';
import { useDispatch } from 'react-redux';
import { createUser } from '@/state/userSlice';

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      favorite_color: 'red',
    },
  });

  const colorOptions = [
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' },
    { label: 'Orange', value: 'orange' },
  ];

  const onSubmit = (data) => {
    // Dispatch the new user data to the Redux store
    dispatch(createUser(data));

    console.log('New User Entry:', data);
    reset(); // Reset the form after submission
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="User Registration" />
        <Card.Content>
          <FormBuilder
            control={control}
            setFocus={() => {}}
            formConfigArray={[
              {
                name: 'first_name',
                type: 'text',
                textInputProps: {
                  label: 'First Name',
                  mode: 'outlined',
                },
                rules: {
                  required: 'First name is required',
                },
              },
              {
                name: 'last_name',
                type: 'text',
                textInputProps: {
                  label: 'Last Name',
                  mode: 'outlined',
                },
                rules: {
                  required: 'Last name is required',
                },
              },
              {
                name: 'phone_number',
                type: 'text',
                textInputProps: {
                  label: 'Phone Number',
                  mode: 'outlined',
                  keyboardType: 'phone-pad',
                },
                rules: {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9\-+() ]{7,15}$/,
                    message: 'Invalid phone number',
                  },
                },
              },
              {
                name: 'email',
                type: 'text',
                textInputProps: {
                  label: 'Email (Optional)',
                  mode: 'outlined',
                  keyboardType: 'email-address',
                },
                rules: {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                },
              },
              {
                name: 'favorite_color',
                type: 'select',
                textInputProps: {
                  label: 'Favorite Color',
                  mode: 'outlined',
                },
                options: colorOptions,
                rules: {
                  required: 'Please select a favorite color',
                },
              },
            ]}
          />

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          >
            Submit
          </Button>

          {/* Navigation Button */}
          <Button
            mode="outlined"
            onPress={() => router.push('displayUserData/')}
            style={styles.navButton}
          >
            View User Data
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    padding: 10,
    borderRadius: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  navButton: {
    marginTop: 10,
  },
});
