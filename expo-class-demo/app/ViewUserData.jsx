import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchUsers } from '../state/slices/userSlice'; // Import the async thunk

const ViewUserData = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users on component mount
  }, []);

  if (status === 'loading') {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (status === 'failed') {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>

      {users.length === 0 ? (
        <Text style={styles.noDataText}>No users found.</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()} // Assuming each user has a unique ID
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.text}>First Name: {item.first_name}</Text>
              <Text style={styles.text}>Last Name: {item.last_name}</Text>
              <Text style={styles.text}>Phone: {item.phone_number}</Text>
              <Text style={styles.text}>Email: {item.email || 'N/A'}</Text>
              <Text style={styles.text}>Favorite Color: {item.favorite_color}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  loading: {
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default ViewUserData;
