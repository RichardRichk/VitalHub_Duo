import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button, TextButton } from '../components/Button/Style';


const LoadingButton = ({ onPress, disabled, loading, text }) => {
  return (
    <Button onPress={onPress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <TextButton>{text}</TextButton>
      )}
    </Button>
  );
};

export default LoadingButton;
