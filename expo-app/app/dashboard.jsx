import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Avatar, Divider, FAB, Provider as PaperProvider, DefaultTheme, Chip, Portal, Dialog, Checkbox, RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';

// Create a custom theme with black text color
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: 'black',
    primary: '#27c2a0',
  },
};

export default function Dashboard() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  // Filter states
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedPreferredPlay, setSelectedPreferredPlay] = useState([]);
  
  // Get current user from Redux store
  const currentUser = useSelector(state => state.user.currentUser);

  // Simulated user data - in a real app, this would come from an API
  const mockUsers = [
    { id: 1, name: 'John Smith', rating: 4.0, location: 'Seattle, WA', availability: 'Weekends', preferredPlay: 'Singles', experience: '5 years' },
    { id: 2, name: 'Sarah Johnson', rating: 3.5, location: 'Portland, OR', availability: 'Evenings', preferredPlay: 'Doubles', experience: '3 years' },
    { id: 3, name: 'Michael Brown', rating: 2.5, location: 'Vancouver, BC', availability: 'Flexible', preferredPlay: 'Both', experience: '1 year' },
    { id: 4, name: 'Emily Davis', rating: 4.5, location: 'San Francisco, CA', availability: 'Weekdays', preferredPlay: 'Singles', experience: '7 years' },
    { id: 5, name: 'David Wilson', rating: 3.0, location: 'Los Angeles, CA', availability: 'Weekends', preferredPlay: 'Doubles', experience: '2 years' },
    { id: 6, name: 'Jessica Martinez', rating: 4.0, location: 'Seattle, WA', availability: 'Weekdays', preferredPlay: 'Both', experience: '4 years' },
    { id: 7, name: 'Robert Taylor', rating: 2.0, location: 'Portland, OR', availability: 'Weekends', preferredPlay: 'Doubles', experience: '6 months' },
    { id: 8, name: 'Amanda Anderson', rating: 3.5, location: 'Vancouver, BC', availability: 'Evenings', preferredPlay: 'Singles', experience: '3 years' },
    { id: 9, name: 'James Thompson', rating: 4.5, location: 'San Francisco, CA', availability: 'Flexible', preferredPlay: 'Both', experience: '6 years' },
    { id: 10, name: 'Lisa Garcia', rating: 2.5, location: 'Los Angeles, CA', availability: 'Weekdays', preferredPlay: 'Doubles', experience: '1 year' },
    { id: 11, name: 'Thomas Lee', rating: 3.0, location: 'Seattle, WA', availability: 'Evenings', preferredPlay: 'Singles', experience: '2 years' },
    { id: 12, name: 'Jennifer White', rating: 4.0, location: 'Portland, OR', availability: 'Weekends', preferredPlay: 'Both', experience: '5 years' },
    { id: 13, name: 'Christopher Moore', rating: 2.0, location: 'Vancouver, BC', availability: 'Weekdays', preferredPlay: 'Doubles', experience: '8 months' },
    { id: 14, name: 'Michelle Clark', rating: 3.5, location: 'San Francisco, CA', availability: 'Weekends', preferredPlay: 'Singles', experience: '3 years' },
    { id: 15, name: 'Daniel Hall', rating: 4.0, location: 'Los Angeles, CA', availability: 'Evenings', preferredPlay: 'Both', experience: '4 years' },
    { id: 16, name: 'Patricia Young', rating: 2.5, location: 'Seattle, WA', availability: 'Flexible', preferredPlay: 'Doubles', experience: '1 year' },
    { id: 17, name: 'Kevin King', rating: 3.0, location: 'Portland, OR', availability: 'Weekdays', preferredPlay: 'Singles', experience: '2 years' },
    { id: 18, name: 'Nancy Wright', rating: 4.5, location: 'Vancouver, BC', availability: 'Weekends', preferredPlay: 'Both', experience: '6 years' },
    { id: 19, name: 'Steven Lopez', rating: 2.0, location: 'San Francisco, CA', availability: 'Evenings', preferredPlay: 'Doubles', experience: '6 months' },
    { id: 20, name: 'Betty Hill', rating: 3.5, location: 'Los Angeles, CA', availability: 'Flexible', preferredPlay: 'Singles', experience: '3 years' },
  ];

  // Extract unique values for filter options
  const ratingOptions = [...new Set(mockUsers.map(user => user.rating))].sort((a, b) => a - b);
  const locationOptions = [...new Set(mockUsers.map(user => user.location))];
  const availabilityOptions = [...new Set(mockUsers.map(user => user.availability))];
  const preferredPlayOptions = [...new Set(mockUsers.map(user => user.preferredPlay))];

  useEffect(() => {
    // Simulate loading data from an API
    const loadData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refreshing data
    setTimeout(() => {
      const refreshedUsers = [...mockUsers].sort(() => Math.random() - 0.5);
      setUsers(refreshedUsers);
      applyFilters(refreshedUsers, selectedRatings, selectedLocations, selectedAvailability, selectedPreferredPlay);
      setRefreshing(false);
    }, 1500);
  }, [selectedRatings, selectedLocations, selectedAvailability, selectedPreferredPlay]);

  const handleLogout = () => {
    // In a real app, this would dispatch a logout action
    router.replace('/');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleApiTestPress = () => {
    router.push('/api-test');
  };

  const applyFilters = (usersToFilter, ratings, locations, availability, preferredPlay) => {
    let filtered = [...usersToFilter];
    
    // Apply rating filter
    if (ratings.length > 0) {
      filtered = filtered.filter(user => ratings.includes(user.rating));
    }
    
    // Apply location filter
    if (locations.length > 0) {
      filtered = filtered.filter(user => locations.includes(user.location));
    }
    
    // Apply availability filter
    if (availability.length > 0) {
      filtered = filtered.filter(user => availability.includes(user.availability));
    }
    
    // Apply preferred play filter
    if (preferredPlay.length > 0) {
      filtered = filtered.filter(user => preferredPlay.includes(user.preferredPlay));
    }
    
    setFilteredUsers(filtered);
  };

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleApplyFilters = () => {
    applyFilters(users, selectedRatings, selectedLocations, selectedAvailability, selectedPreferredPlay);
    setFilterModalVisible(false);
  };

  const handleResetFilters = () => {
    setSelectedRatings([]);
    setSelectedLocations([]);
    setSelectedAvailability([]);
    setSelectedPreferredPlay([]);
    setFilteredUsers(users);
    setFilterModalVisible(false);
  };

  const toggleRating = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const toggleLocation = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(selectedLocations.filter(l => l !== location));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const toggleAvailability = (availability) => {
    if (selectedAvailability.includes(availability)) {
      setSelectedAvailability(selectedAvailability.filter(a => a !== availability));
    } else {
      setSelectedAvailability([...selectedAvailability, availability]);
    }
  };

  const togglePreferredPlay = (play) => {
    if (selectedPreferredPlay.includes(play)) {
      setSelectedPreferredPlay(selectedPreferredPlay.filter(p => p !== play));
    } else {
      setSelectedPreferredPlay([...selectedPreferredPlay, play]);
    }
  };

  // Format rating to always show decimal point
  const formatRating = (rating) => {
    return rating.toFixed(1);
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <View style={styles.headerButtons}>
            <Button 
              mode="text" 
              onPress={handleApiTestPress}
              icon="api"
              style={styles.headerButton}
            >
              API Test
            </Button>
            <Button 
              mode="text" 
              onPress={handleProfilePress}
              icon="account"
              style={styles.headerButton}
            >
              Profile
            </Button>
            <Button 
              mode="text" 
              onPress={handleLogout}
              icon="logout"
              style={styles.headerButton}
            >
              Logout
            </Button>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Card style={styles.welcomeCard}>
            <Card.Content>
              <Text style={styles.welcomeText}>
                Welcome{currentUser?.first_name ? `, ${currentUser.first_name}` : ''}!
              </Text>
              <Text style={styles.welcomeSubtext}>
                Find pickleball partners near you
              </Text>
            </Card.Content>
          </Card>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Players</Text>
            <Button 
              mode="text" 
              onPress={handleFilterPress}
              icon="filter-variant"
            >
              Filter
            </Button>
          </View>

          {/* Active filters display */}
          {(selectedRatings.length > 0 || selectedLocations.length > 0 || selectedAvailability.length > 0 || selectedPreferredPlay.length > 0) && (
            <View style={styles.activeFiltersContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedRatings.map(rating => (
                  <Chip 
                    key={`rating-${rating}`} 
                    style={styles.filterChip}
                    onClose={() => toggleRating(rating)}
                  >
                    Rating: {formatRating(rating)}
                  </Chip>
                ))}
                {selectedLocations.map(location => (
                  <Chip 
                    key={`location-${location}`} 
                    style={styles.filterChip}
                    onClose={() => toggleLocation(location)}
                  >
                    Location: {location}
                  </Chip>
                ))}
                {selectedAvailability.map(availability => (
                  <Chip 
                    key={`availability-${availability}`} 
                    style={styles.filterChip}
                    onClose={() => toggleAvailability(availability)}
                  >
                    Available: {availability}
                  </Chip>
                ))}
                {selectedPreferredPlay.map(play => (
                  <Chip 
                    key={`play-${play}`} 
                    style={styles.filterChip}
                    onClose={() => togglePreferredPlay(play)}
                  >
                    Play: {play}
                  </Chip>
                ))}
              </ScrollView>
            </View>
          )}

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#27c2a0" />
              <Text style={styles.loadingText}>Loading players...</Text>
            </View>
          ) : (
            filteredUsers.map(user => (
              <Card key={user.id} style={styles.userCard}>
                <Card.Content style={styles.userCardContent}>
                  <Avatar.Text 
                    size={50} 
                    label={user.name.split(' ').map(n => n[0]).join('')} 
                    style={styles.avatar}
                  />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userDetail}>Rating: {formatRating(user.rating)}</Text>
                    <Text style={styles.userDetail}>Location: {user.location}</Text>
                    <Text style={styles.userDetail}>Available: {user.availability}</Text>
                    <Text style={styles.userDetail}>Preferred: {user.preferredPlay}</Text>
                    <Text style={styles.userDetail}>Experience: {user.experience}</Text>
                  </View>
                </Card.Content>
                <Card.Actions>
                  <Button 
                    mode="contained" 
                    onPress={() => console.log(`Connect with ${user.name}`)}
                    style={styles.connectButton}
                  >
                    Connect
                  </Button>
                </Card.Actions>
              </Card>
            ))
          )}
        </ScrollView>

        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => console.log('Create game pressed')}
        />
      </View>

      {/* Filter Modal */}
      <Portal>
        <Dialog visible={filterModalVisible} onDismiss={() => setFilterModalVisible(false)} style={styles.filterDialog}>
          <Dialog.Title>Filter Players</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView style={styles.filterScrollView}>
              <Text style={styles.filterSectionTitle}>Skill Rating</Text>
              <View style={styles.filterOptions}>
                {ratingOptions.map(rating => (
                  <Checkbox.Item
                    key={`rating-${rating}`}
                    label={`${formatRating(rating)} ${rating >= 4.0 ? '(Advanced)' : rating >= 3.0 ? '(Intermediate)' : '(Beginner)'}`}
                    status={selectedRatings.includes(rating) ? 'checked' : 'unchecked'}
                    onPress={() => toggleRating(rating)}
                  />
                ))}
              </View>

              <Divider style={styles.divider} />

              <Text style={styles.filterSectionTitle}>Location</Text>
              <View style={styles.filterOptions}>
                {locationOptions.map(location => (
                  <Checkbox.Item
                    key={`location-${location}`}
                    label={location}
                    status={selectedLocations.includes(location) ? 'checked' : 'unchecked'}
                    onPress={() => toggleLocation(location)}
                  />
                ))}
              </View>

              <Divider style={styles.divider} />

              <Text style={styles.filterSectionTitle}>Availability</Text>
              <View style={styles.filterOptions}>
                {availabilityOptions.map(availability => (
                  <Checkbox.Item
                    key={`availability-${availability}`}
                    label={availability}
                    status={selectedAvailability.includes(availability) ? 'checked' : 'unchecked'}
                    onPress={() => toggleAvailability(availability)}
                  />
                ))}
              </View>

              <Divider style={styles.divider} />

              <Text style={styles.filterSectionTitle}>Preferred Play</Text>
              <View style={styles.filterOptions}>
                {preferredPlayOptions.map(play => (
                  <Checkbox.Item
                    key={`play-${play}`}
                    label={play}
                    status={selectedPreferredPlay.includes(play) ? 'checked' : 'unchecked'}
                    onPress={() => togglePreferredPlay(play)}
                  />
                ))}
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={handleResetFilters}>Reset</Button>
            <Button onPress={handleApplyFilters}>Apply</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004b87',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginRight: 10,
  },
  scrollView: {
    flex: 1,
  },
  welcomeCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004b87',
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  userCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  userCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#27c2a0',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  connectButton: {
    backgroundColor: '#27c2a0',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#27c2a0',
  },
  activeFiltersContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#e0f2f0',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  filterOptions: {
    marginBottom: 10,
  },
  divider: {
    marginVertical: 10,
  },
  filterDialog: {
    maxHeight: '80%',
  },
  filterScrollView: {
    maxHeight: 400,
  },
}); 