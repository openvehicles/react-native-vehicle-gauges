import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { GaugeSpeedometer } from 'react-native-vehicle-gauges';

/**
 * Animated Speedometer Example
 * 
 * This example demonstrates smooth speed transitions and realistic driving scenarios
 * with different animation patterns and automatic speed changes.
 */
export const AnimatedSpeedometerExample: React.FC = () => {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [targetSpeed, setTargetSpeed] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scenario, setScenario] = useState<'manual' | 'city' | 'highway' | 'race'>('manual');
  
  const animatedSpeed = useRef(new Animated.Value(0)).current;
  const scenarioInterval = useRef<NodeJS.Timeout | null>(null);

  // Animate speed changes smoothly
  const animateToSpeed = (newSpeed: number, duration: number = 2000) => {
    setIsAnimating(true);
    setTargetSpeed(newSpeed);
    
    Animated.timing(animatedSpeed, {
      toValue: newSpeed,
      duration,
      useNativeDriver: false,
    }).start(() => {
      setIsAnimating(false);
    });
  };

  // Listen to animated value changes
  useEffect(() => {
    const listener = animatedSpeed.addListener(({ value }) => {
      setCurrentSpeed(value);
    });

    return () => {
      animatedSpeed.removeListener(listener);
    };
  }, [animatedSpeed]);

  // Scenario automation
  useEffect(() => {
    if (scenarioInterval.current) {
      clearInterval(scenarioInterval.current);
    }

    switch (scenario) {
      case 'city':
        // City driving: frequent stops and starts
        scenarioInterval.current = setInterval(() => {
          const speeds = [0, 15, 25, 35, 20, 0, 30, 25];
          const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
          animateToSpeed(randomSpeed, 3000);
        }, 4000);
        break;

      case 'highway':
        // Highway driving: steady speeds with occasional changes
        scenarioInterval.current = setInterval(() => {
          const speeds = [65, 70, 75, 60, 80, 70];
          const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
          animateToSpeed(randomSpeed, 2500);
        }, 5000);
        break;

      case 'race':
        // Racing: rapid acceleration and high speeds
        scenarioInterval.current = setInterval(() => {
          const speeds = [0, 60, 120, 150, 180, 100, 140];
          const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
          animateToSpeed(randomSpeed, 1500);
        }, 3000);
        break;

      default:
        // Manual mode - stop automation
        break;
    }

    return () => {
      if (scenarioInterval.current) {
        clearInterval(scenarioInterval.current);
      }
    };
  }, [scenario]);

  // Manual speed controls
  const setManualSpeed = (speed: number) => {
    setScenario('manual');
    animateToSpeed(speed);
  };

  const emergencyBrake = () => {
    setScenario('manual');
    animateToSpeed(0, 500); // Very quick stop
  };

  const getSpeedColor = () => {
    if (currentSpeed < 30) return '#00ff00'; // Green for low speeds
    if (currentSpeed < 60) return '#ffff00'; // Yellow for moderate speeds
    if (currentSpeed < 100) return '#ff8000'; // Orange for high speeds
    return '#ff0000'; // Red for very high speeds
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animated Speedometer</Text>
      
      <View style={styles.gaugeContainer}>
        <GaugeSpeedometer
          speed={currentSpeed}
          minSpeed={0}
          maxSpeed={200}
          redlineSpeed={160}
          units="mph"
          size={{ width: 300, height: 300 }}
          colors={{
            background: '#1a1a1a',
            needle: '#ff4444',
            tickMajor: '#ffffff',
            tickMinor: '#888888',
            numbers: '#ffffff',
            redline: '#ff0000',
            digitalSpeed: getSpeedColor(),
            arc: '#333333',
          }}
          showDigitalSpeed={true}
        />
      </View>

      {/* Animation Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Current: {Math.round(currentSpeed)} mph
        </Text>
        <Text style={styles.statusText}>
          Target: {targetSpeed} mph
        </Text>
        <Text style={[styles.statusText, { color: isAnimating ? '#ff6600' : '#00aa00' }]}>
          {isAnimating ? 'Animating...' : 'Steady'}
        </Text>
      </View>

      {/* Scenario Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Driving Scenarios</Text>
        <View style={styles.scenarioButtons}>
          {([
            { key: 'manual', label: 'Manual', color: '#007AFF' },
            { key: 'city', label: 'City', color: '#34C759' },
            { key: 'highway', label: 'Highway', color: '#FF9500' },
            { key: 'race', label: 'Race', color: '#FF3B30' },
          ] as const).map(({ key, label, color }) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.scenarioButton,
                { backgroundColor: scenario === key ? color : '#e0e0e0' },
              ]}
              onPress={() => setScenario(key)}
            >
              <Text
                style={[
                  styles.scenarioButtonText,
                  { color: scenario === key ? 'white' : '#333' },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Manual Controls */}
      {scenario === 'manual' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Manual Control</Text>
          <View style={styles.manualControls}>
            <View style={styles.speedButtonsRow}>
              <TouchableOpacity
                style={[styles.speedButton, { backgroundColor: '#34C759' }]}
                onPress={() => setManualSpeed(25)}
              >
                <Text style={styles.speedButtonText}>25</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.speedButton, { backgroundColor: '#007AFF' }]}
                onPress={() => setManualSpeed(55)}
              >
                <Text style={styles.speedButtonText}>55</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.speedButton, { backgroundColor: '#FF9500' }]}
                onPress={() => setManualSpeed(75)}
              >
                <Text style={styles.speedButtonText}>75</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.speedButton, { backgroundColor: '#FF3B30' }]}
                onPress={() => setManualSpeed(120)}
              >
                <Text style={styles.speedButtonText}>120</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={[styles.emergencyButton]}
              onPress={emergencyBrake}
            >
              <Text style={styles.emergencyButtonText}>🛑 EMERGENCY BRAKE</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Animation Tips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Animation Features</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tipText}>• Smooth needle transitions</Text>
          <Text style={styles.tipText}>• Dynamic digital display colors</Text>
          <Text style={styles.tipText}>• Realistic driving scenarios</Text>
          <Text style={styles.tipText}>• Emergency brake simulation</Text>
          <Text style={styles.tipText}>• Real-time animation status</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  scenarioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 10,
  },
  scenarioButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 70,
  },
  scenarioButtonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  manualControls: {
    gap: 15,
  },
  speedButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  speedButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 50,
  },
  speedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emergencyButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tipsList: {
    gap: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
