import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GaugeSpeedometer } from 'react-native-vehicle-gauges';

/**
 * Basic Speedometer Example
 * 
 * This example demonstrates the simplest usage of the GaugeSpeedometer component
 * with minimal configuration and a simple speed animation.
 */
export const BasicSpeedometerExample: React.FC = () => {
  const [speed, setSpeed] = useState(0);

  // Simulate speed changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prevSpeed => {
        const newSpeed = prevSpeed + (Math.random() - 0.5) * 10;
        return Math.max(0, Math.min(120, newSpeed));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const increaseSpeed = () => {
    setSpeed(prevSpeed => Math.min(120, prevSpeed + 10));
  };

  const decreaseSpeed = () => {
    setSpeed(prevSpeed => Math.max(0, prevSpeed - 10));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Speedometer</Text>
      
      <View style={styles.gaugeContainer}>
        <GaugeSpeedometer
          speed={speed}
          minSpeed={0}
          maxSpeed={120}
          units="mph"
          showDigitalSpeed={true}
        />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={decreaseSpeed}>
          <Text style={styles.buttonText}>- Speed</Text>
        </TouchableOpacity>
        
        <Text style={styles.speedText}>
          Current: {Math.round(speed)} mph
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={increaseSpeed}>
          <Text style={styles.buttonText}>+ Speed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  gaugeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 300,
    marginVertical: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  speedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
