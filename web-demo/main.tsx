import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native-web';
import WebDemo from './App.web';

// Register the app
AppRegistry.registerComponent('WebDemo', () => WebDemo);

// Get the container and render
const container = document.getElementById('root')!;
const root = createRoot(container);

// Run the React Native Web app
AppRegistry.runApplication('WebDemo', {
  rootTag: container,
});
