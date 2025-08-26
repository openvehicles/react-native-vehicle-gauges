import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GaugeTachometer } from '../src/components';

/**
 * Tachometer Example
 * 
 * This example demonstrates the GaugeTachometer component with different
 * configurations for various vehicle types and RPM ranges.
 */
export const TachometerExample: React.FC = () => {
  const [rpm1, setRpm1] = useState(1500); // Idle RPM
  const [rpm2, setRpm2] = useState(3500); // Cruising RPM
  const [rpm3, setRpm3] = useState(6500); // High RPM
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-animate the tachometers
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setRpm1(prev => {
        const change = (Math.random() - 0.5) * 400;
        return Math.max(800, Math.min(4000, prev + change));
      });
      
      setRpm2(prev => {
        const change = (Math.random() - 0.5) * 600;
        return Math.max(1000, Math.min(6000, prev + change));
      });
      
      setRpm3(prev => {
        const change = (Math.random() - 0.5) * 800;
        return Math.max(2000, Math.min(9000, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const resetRpms = () => {
    setRpm1(800);  // Idle
    setRpm2(1000); // Low
    setRpm3(2000); // Medium
  };

  const redlineRpms = () => {
    setRpm1(3800);  // Near redline
    setRpm2(5800);  // Near redline
    setRpm3(8500);  // Near redline
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tachometer Examples</Text>
      
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[styles.controlButton, isAnimating ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setIsAnimating(!isAnimating)}
        >
          <Text style={styles.controlButtonText}>
            {isAnimating ? '⏸️ Pause' : '▶️ Animate'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={resetRpms}>
          <Text style={styles.controlButtonText}>🔄 Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={redlineRpms}>
          <Text style={styles.controlButtonText}>🔥 Redline</Text>
        </TouchableOpacity>
      </View>

      {/* Economy Car Tachometer */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Economy Car Tachometer</Text>
        <Text style={styles.gaugeDescription}>0-4,000 RPM • Redline at 3,800 RPM</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeTachometer
            rpm={rpm1}
            minRpm={0}
            maxRpm={4000}
            redlineRpm={3800}
            size={{ width: 280, height: 280 }}
            colors={{
              background: '#2d4a2d',
              needle: '#4CAF50',
              tickMajor: '#ffffff',
              tickMinor: '#a0a0a0',
              numbers: '#ffffff',
              redline: '#ff4444',
              digitalSpeed: '#4CAF50',
              arc: '#555555',
            }}
            fonts={{
              numbers: { fontSize: 16, fontFamily: 'System', fontWeight: 'normal' },
              digitalSpeed: { fontSize: 24, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 14, fontFamily: 'System', fontWeight: 'normal' },
            }}
            showDigitalRpm={true}
          />
        </View>
        <Text style={styles.rpmDisplay}>Current: {Math.round(rpm1)} RPM</Text>
      </View>

      {/* Sports Car Tachometer */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Sports Car Tachometer</Text>
        <Text style={styles.gaugeDescription}>0-6,000 RPM • Redline at 5,800 RPM</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeTachometer
            rpm={rpm2}
            minRpm={0}
            maxRpm={6000}
            redlineRpm={5800}
            size={{ width: 280, height: 280 }}
            colors={{
              background: '#1a1a2e',
              needle: '#FF6B35',
              tickMajor: '#ffffff',
              tickMinor: '#888888',
              numbers: '#ffffff',
              redline: '#ff0000',
              digitalSpeed: '#FF6B35',
              arc: '#444444',
            }}
            fonts={{
              numbers: { fontSize: 17, fontFamily: 'System', fontWeight: 'bold' },
              digitalSpeed: { fontSize: 26, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 15, fontFamily: 'System', fontWeight: 'normal' },
            }}
            showDigitalRpm={true}
          />
        </View>
        <Text style={styles.rpmDisplay}>Current: {Math.round(rpm2)} RPM</Text>
      </View>

      {/* Racing Tachometer */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Racing Tachometer</Text>
        <Text style={styles.gaugeDescription}>0-9,000 RPM • Redline at 8,500 RPM</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeTachometer
            rpm={rpm3}
            minRpm={0}
            maxRpm={9000}
            redlineRpm={8500}
            size={{ width: 280, height: 280 }}
            colors={{
              background: '#000000',
              needle: '#00FFFF',
              tickMajor: '#ffffff',
              tickMinor: '#666666',
              numbers: '#ffffff',
              redline: '#ff0000',
              digitalSpeed: '#00FFFF',
              arc: '#333333',
            }}
            fonts={{
              numbers: { fontSize: 18, fontFamily: 'System', fontWeight: 'bold' },
              digitalSpeed: { fontSize: 28, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 16, fontFamily: 'System', fontWeight: 'bold' },
            }}
            showDigitalRpm={true}
          />
        </View>
        <Text style={styles.rpmDisplay}>Current: {Math.round(rpm3)} RPM</Text>
      </View>

      {/* RPM Ranges Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>RPM Ranges Guide</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• <Text style={styles.infoLabel}>Idle:</Text> 600-1,000 RPM</Text>
          <Text style={styles.infoText}>• <Text style={styles.infoLabel}>City Driving:</Text> 1,500-2,500 RPM</Text>
          <Text style={styles.infoText}>• <Text style={styles.infoLabel}>Highway:</Text> 2,000-3,000 RPM</Text>
          <Text style={styles.infoText}>• <Text style={styles.infoLabel}>Power Band:</Text> 3,000-5,000 RPM</Text>
          <Text style={styles.infoText}>• <Text style={styles.infoLabel}>Redline:</Text> 5,500-9,000+ RPM</Text>
        </View>
      </View>
    </ScrollView>
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
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    flexWrap: 'wrap',
    gap: 10,
  },
  controlButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  inactiveButton: {
    backgroundColor: '#6c757d',
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  gaugeSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gaugeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  gaugeDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  gaugeWrapper: {
    marginBottom: 20,
    alignItems: 'center',
  },
  rpmDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoList: {
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
});
