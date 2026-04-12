import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function MessagingScreen() {
  const [loading, setLoading] = useState(false);

  const handleAddTestEntry = async () => {
    try {
      setLoading(true);

      const docRef = await addDoc(collection(db, 'andre-messages'), {
        message: 'Hello from MessagingScreen',
        createdAt: serverTimestamp(),
      });

      Alert.alert('Success', `Entry added with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error adding document:', error);
      Alert.alert('Error', 'Could not add entry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Outty Main App</Text>
        <Text style={styles.subtitle}>Tap below to add a Firestore test entry.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleAddTestEntry}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Adding...' : 'Add Test Entry'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const GREEN = '#2D9B6F';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: GREEN,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});