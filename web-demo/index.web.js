import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native';
import WebDemo from './App.web';

// Register the app
AppRegistry.registerComponent('WebDemo', () => WebDemo);

// Get the container
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app
AppRegistry.runApplication('WebDemo', {
  rootTag: container,
});
