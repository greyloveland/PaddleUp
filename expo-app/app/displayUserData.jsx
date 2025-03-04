import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function DisplayUserData() {
  // Access the form data from the Redux store
  const userData = useSelector((state) => state.user.formData);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="User Data" />
        <Card.Content>
          {userData.first_name ? (
            <>
              <Paragraph>First Name: {userData.first_name}</Paragraph>
              <Paragraph>Last Name: {userData.last_name}</Paragraph>
              <Paragraph>Phone Number: {userData.phone_number}</Paragraph>
              <Paragraph>Email: {userData.email}</Paragraph>
              <Paragraph>Favorite Color: {userData.favorite_color}</Paragraph>
            </>
          ) : (
            <Paragraph>No user data available.</Paragraph>
          )}
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
  },
});
