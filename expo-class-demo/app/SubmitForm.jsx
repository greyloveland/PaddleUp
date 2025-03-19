import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { addUser } from '../state/slices/userSlice'; // Import the async thunk
import { useRouter } from 'expo-router';

const UserForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');

  const { status, error } = useSelector((state) => state.user); // Get status from Redux state

  const handleSubmit = async () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email,
      favorite_color: favoriteColor,
    };

    try {
      const resultAction = await dispatch(addUser(userData));
      if (addUser.fulfilled.match(resultAction)) {
        console.log('User added successfully:', resultAction.payload);
        router.push('/ViewUserData'); // Redirect to view users
      } else {
        console.error('Failed to add user:', resultAction.error);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Information</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Email (Optional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Favorite Color"
        value={favoriteColor}
        onChangeText={setFavoriteColor}
      />

      {status === 'loading' ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Submit" onPress={handleSubmit} />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button title="View Data" onPress={() => router.push('/ViewUserData')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default UserForm;
