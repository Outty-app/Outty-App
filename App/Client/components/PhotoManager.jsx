// Import React and state hook
import React, { useState } from 'react';

// Import React Native components
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function PhotoManager() {
  // Store uploaded photo URL
  const [photo, setPhoto] = useState(null);

  // Store error message
  const [error, setError] = useState('');

  const handleUpload = () => {
    // Clear previous error
    setError('');

    // Simulated file object for now
    const simulatedFile = {
      type: 'image/jpeg',
      size: 500000,
      url: 'https://via.placeholder.com/150',
    };

    // Validation: no file selected
    if (!simulatedFile) {
      setError('No file selected.');
      return;
    }

    // Validation: must be an image
    if (!simulatedFile.type.startsWith('image/')) {
      setError('Invalid file type. Please upload an image.');
      return;
    }

    // Validation: file too large
    if (simulatedFile.size > 2000000) {
      setError('File is too large.');
      return;
    }

    // Save uploaded photo
    setPhoto(simulatedFile.url);
  };

  const handleDelete = () => {
    // Show error if there is no photo to delete
    if (!photo) {
      setError('No photo to delete.');
      return;
    }

    // Clear error and remove photo
    setError('');
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Photo Manager</Text>

      {/* Error message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Show uploaded photo or placeholder text */}
      {photo ? (
        <Image
          testID="uploaded-image"
          source={{ uri: photo }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Text>No photo uploaded</Text>
      )}

      {/* Upload button */}
      <TouchableOpacity testID="upload-button" style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>

      {/* Delete button */}
      <TouchableOpacity testID="delete-button" style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PhotoManager;

// Component styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 12,
    borderRadius: 8,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});