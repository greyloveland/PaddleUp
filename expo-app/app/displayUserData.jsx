import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { removeFormData } from '@/state/userSlice';

export default function DisplayUserData() {
  const userDataList = useSelector((state) => state.user.formDataList);
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      {userDataList.length > 0 ? (
        userDataList.map((userData, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title title={`User ${index + 1}`} />
            <Card.Content>
              <Paragraph>First Name: {userData.first_name}</Paragraph>
              <Paragraph>Last Name: {userData.last_name}</Paragraph>
              <Paragraph>Phone Number: {userData.phone_number}</Paragraph>
              <Paragraph>Email: {userData.email}</Paragraph>
              <Paragraph>Favorite Color: {userData.favorite_color}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => dispatch(removeFormData(index))}
                mode="contained"
              >
                Remove
              </Button>
            </Card.Actions>
          </Card>
        ))
      ) : (
        <Paragraph style={styles.noData}>No user data available.</Paragraph>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 10,
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
  },
});
