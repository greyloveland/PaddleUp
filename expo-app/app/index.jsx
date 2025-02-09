import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

export default function Index() {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      favorite_color: 'red',  // Default selected color
    },
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    Alert.alert('Form Submitted', `User: ${data.first_name} ${data.last_name}\nFavorite Color: ${data.favorite_color}`);
    reset(); // Optional: Reset form after submission
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Registration</Text>

      {/* First Name */}
      <Controller
        control={control}
        name="first_name"
        rules={{ required: 'First name is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Last Name */}
      <Controller
        control={control}
        name="last_name"
        rules={{ required: 'Last name is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="Last Name"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Phone Number */}
      <Controller
        control={control}
        name="phone_number"
        rules={{
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9\-+() ]{7,15}$/,
            message: 'Invalid phone number',
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="Phone Number"
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Email (Optional) */}
      <Controller
        control={control}
        name="email"
        rules={{
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder="Email (Optional)"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      {/* Favorite Color Picker */}
      <Controller
        control={control}
        name="favorite_color"
        rules={{ required: 'Please select a favorite color' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Favorite Color:</Text>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Red" value="red" />
              <Picker.Item label="Blue" value="blue" />
              <Picker.Item label="Green" value="green" />
              <Picker.Item label="Yellow" value="yellow" />
              <Picker.Item label="Purple" value="purple" />
              <Picker.Item label="Orange" value="orange" />
            </Picker>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
