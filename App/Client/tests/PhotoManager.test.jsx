// Import React
import React from 'react';

// Import React Native testing utilities
import { render, screen, fireEvent } from '@testing-library/react-native';

// Import the component
import PhotoManager from '../components/PhotoManager';

// Group tests
describe('PhotoManager Component', () => {

  // Test 1: Heading renders
  it('should render the Photo Manager heading', () => {
    render(<PhotoManager />);
    expect(screen.getByText('Photo Manager')).toBeTruthy();
  });

  // Test 2: Initial state
  it('should show "No photo uploaded" initially', () => {
    render(<PhotoManager />);
    expect(screen.getByText('No photo uploaded')).toBeTruthy();
  });

  // Test 3: Upload works
  it('should upload a photo when upload button is pressed', () => {
    render(<PhotoManager />);

    fireEvent.press(screen.getByTestId('upload-button'));

    expect(screen.getByTestId('uploaded-image')).toBeTruthy();
  });

  // Test 4: Delete works
  it('should delete the photo when delete button is pressed', () => {
    render(<PhotoManager />);

    // Upload first
    fireEvent.press(screen.getByTestId('upload-button'));

    // Then delete
    fireEvent.press(screen.getByTestId('delete-button'));

    expect(screen.getByText('No photo uploaded')).toBeTruthy();
  });

  // Test 5: Error handling
  it('should show error when deleting without a photo', () => {
    render(<PhotoManager />);

    fireEvent.press(screen.getByTestId('delete-button'));

    expect(screen.getByText('No photo to delete.')).toBeTruthy();
  });

});