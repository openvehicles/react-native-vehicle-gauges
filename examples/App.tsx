/**
 * Quick Start Example
 * 
 * Copy this file to your React Native project's App.tsx to get started quickly.
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { GaugeSpeedometer } from '../src/components';

function App(): React.JSX.Element {
  const [speed, setSpeed] = useState(0);

  // Simulate realistic speed changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prevSpeed => {
        // Random walk with bounds
        const change = (Math.random() - 0.5) * 10;
        const newSpeed = prevSpeed + change;
        return Math.max(0, Math.min(120, newSpeed));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(Math.max(0, Math.min(120, newSpeed)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Vehicle Gauges Demo</Text>
        <Text style={styles.subtitle}>React Native Speedometer</Text>
      </View>

      <View style={styles.gaugeContainer}>
        <GaugeSpeedometer
          speed={speed}
          minSpeed={0}
          maxSpeed={120}
          redlineSpeed={100}
          units="mph"
          showDigitalSpeed={true}
          colors={{
            background: '#1a1a1a',
            needle: '#ff4444',
            tickMajor: '#ffffff',
            tickMinor: '#888888',
            numbers: '#ffffff',
            redline: '#ff0000',
            digitalSpeed: '#00ff00',
            arc: '#333333',
          }}
        />
      </View>

      <View style={styles.controls}>
        <Text style={styles.currentSpeedLabel}>Current Speed</Text>
        <Text style={styles.currentSpeed}>{Math.round(speed)} mph</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.slowButton]}
            onPress={() => handleSpeedChange(speed - 10)}
          >
            <Text style={styles.buttonText}>-10</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={() => setSpeed(0)}
          >
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.fastButton]}
            onPress={() => handleSpeedChange(speed + 10)}
          >
            <Text style={styles.buttonText}>+10</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.presetRow}>
          <TouchableOpacity
            style={[styles.presetButton]}
            onPress={() => setSpeed(35)}
          >
            <Text style={styles.presetText}>City (35)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.presetButton]}
            onPress={() => setSpeed(65)}
          >
            <Text style={styles.presetText}>Highway (65)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  gaugeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    maxHeight: 400,
  },
  controls: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  currentSpeedLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 4,
  },
  currentSpeed: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  slowButton: {
    backgroundColor: '#dc3545',
  },
  stopButton: {
    backgroundColor: '#6c757d',
  },
  fastButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  presetButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 6,
    alignItems: 'center',
  },
  presetText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default App;
