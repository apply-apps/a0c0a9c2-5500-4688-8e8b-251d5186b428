// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, View, Image, ActivityIndicator, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

const workouts = [
  { id: '1', name: 'Push Ups', imageWidth: 200, imageHeight: 200 },
  { id: '2', name: 'Squats', imageWidth: 200, imageHeight: 200 },
  { id: '3', name: 'Lunges', imageWidth: 200, imageHeight: 200 },
  { id: '4', name: 'Planks', imageWidth: 200, imageHeight: 200 },
  { id: '5', name: 'Bench Press', imageWidth: 200, imageHeight: 200 },
  { id: '6', name: 'Chest Fly', imageWidth: 200, imageHeight: 200 },
  { id: '7', name: 'Incline Dumbbell Press', imageWidth: 200, imageHeight: 200 },
];

const WorkoutList = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              { role: 'system', content: 'You are a helpful assistant. Please provide motivational fitness messages.' },
              { role: 'user', content: 'Give me a motivational fitness quote' },
            ],
            model: 'gpt-4o',
          }),
        });

        const data = await response.json();
        setMessage(data.response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching message:', error);
        setMessage('Failed to load message');
        setLoading(false);
      }
    };

    fetchMessage();
  }, []);

  return (
    <LinearGradient colors={['#FFDEE9', '#B5FFFC']} style={styles.gradientContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text style={styles.motd}>{message}</Text>
      )}
      <ScrollView horizontal pagingEnabled style={styles.scrollView}>
        {workouts.map((workout) => (
          <View key={workout.id} style={styles.workoutContainer}>
            <Text style={styles.workoutName}>{workout.name}</Text>
            <Image
              source={{ uri: `https://picsum.photos/${workout.imageWidth}/${workout.imageHeight}?random=${workout.id}` }}
              style={styles.workoutImage}
            />
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fitness Workouts</Text>
      <ScrollView>
        <WorkoutList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  gradientContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  motd: {
    fontSize: 18,
    fontStyle: 'italic',
    marginVertical: 20,
    textAlign: 'center',
  },
  scrollView: {
    flexDirection: 'row',
  },
  workoutContainer: {
    marginRight: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: Dimensions.get('window').width - 60,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default App;