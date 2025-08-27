import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GaugeBattery } from '../src/components';

/**
 * Battery Voltage Example
 * 
 * This example demonstrates the GaugeBattery component with different
 * configurations for various vehicle types and voltage ranges.
 */
export const BatteryExample: React.FC = () => {
  const [voltage1, setVoltage1] = useState(12.6); // Good battery
  const [voltage2, setVoltage2] = useState(14.2); // Charging
  const [voltage3, setVoltage3] = useState(11.8); // Low battery
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-animate the battery voltages
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setVoltage1(prev => {
        const change = (Math.random() - 0.5) * 0.4;
        return Math.max(11.0, Math.min(13.0, prev + change));
      });
      
      setVoltage2(prev => {
        const change = (Math.random() - 0.5) * 0.6;
        return Math.max(12.0, Math.min(15.0, prev + change));
      });
      
      setVoltage3(prev => {
        const change = (Math.random() - 0.5) * 0.3;
        return Math.max(10.5, Math.min(12.5, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const resetVoltages = () => {
    setVoltage1(12.6);  // Good
    setVoltage2(14.2);  // Charging
    setVoltage3(11.8);  // Low
  };

  const criticalVoltages = () => {
    setVoltage1(11.2);  // Critical
    setVoltage2(10.8);  // Very low
    setVoltage3(10.5);  // Dead
  };

  const getVoltageStatus = (voltage: number) => {
    if (voltage >= 14.0) return { status: 'Charging', color: '#4CAF50' };
    if (voltage >= 12.4) return { status: 'Good', color: '#4CAF50' };
    if (voltage >= 12.0) return { status: 'Fair', color: '#FF9800' };
    if (voltage >= 11.5) return { status: 'Low', color: '#FF5722' };
    return { status: 'Critical', color: '#F44336' };
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Battery Voltage Examples</Text>
      
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[styles.controlButton, isAnimating ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setIsAnimating(!isAnimating)}
        >
          <Text style={styles.controlButtonText}>
            {isAnimating ? '⏸️ Pause' : '▶️ Animate'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={resetVoltages}>
          <Text style={styles.controlButtonText}>🔄 Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={criticalVoltages}>
          <Text style={styles.controlButtonText}>⚠️ Critical</Text>
        </TouchableOpacity>
      </View>

      {/* 12V Standard Battery */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>12V Standard Battery</Text>
        <Text style={styles.gaugeDescription}>10.0-16.0V • Low voltage warning at 12.0V</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeBattery
            voltage={voltage1}
            minVoltage={10.0}
            maxVoltage={16.0}
            lowVoltage={12.0}
            label="BATTERY" // Default label
            size={{ width: 280, height: 140 }}
            colors={{
              background: '#1a2d1a',
              needle: '#4CAF50',
              tickMajor: '#ffffff',
              tickMinor: '#a0a0a0',
              numbers: '#ffffff',
              redline: '#FF5722',
              digitalSpeed: '#4CAF50',
              arc: '#555555',
            }}
            fonts={{
              numbers: { fontSize: 16, fontFamily: 'System', fontWeight: 'normal' },
              digitalSpeed: { fontSize: 24, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 14, fontFamily: 'System', fontWeight: 'normal' },
            }}
            showDigitalVoltage={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.voltageDisplay}>Current: {voltage1.toFixed(1)}V</Text>
          <Text style={[styles.statusText, { color: getVoltageStatus(voltage1).color }]}>
            {getVoltageStatus(voltage1).status}
          </Text>
        </View>
      </View>

      {/* Charging System Monitor */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Charging System Monitor</Text>
        <Text style={styles.gaugeDescription}>11.0-16.0V • Optimized for alternator monitoring</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeBattery
            voltage={voltage2}
            minVoltage={11.0}
            maxVoltage={16.0}
            lowVoltage={12.5}
            size={{ width: 280, height: 140 }}
            colors={{
              background: '#1a1a2e',
              needle: '#00BCD4',
              tickMajor: '#ffffff',
              tickMinor: '#888888',
              numbers: '#ffffff',
              redline: '#FF9800',
              digitalSpeed: '#00BCD4',
              arc: '#444444',
            }}
            fonts={{
              numbers: { fontSize: 17, fontFamily: 'System', fontWeight: 'bold' },
              digitalSpeed: { fontSize: 26, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 15, fontFamily: 'System', fontWeight: 'normal' },
            }}
            showDigitalVoltage={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.voltageDisplay}>Current: {voltage2.toFixed(1)}V</Text>
          <Text style={[styles.statusText, { color: getVoltageStatus(voltage2).color }]}>
            {getVoltageStatus(voltage2).status}
          </Text>
        </View>
      </View>

      {/* Critical Battery Monitor */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Critical Battery Monitor (Custom Label)</Text>
        <Text style={styles.gaugeDescription}>9.0-14.0V • High sensitivity for low voltage detection • "12V SYSTEM" label</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeBattery
            voltage={voltage3}
            minVoltage={9.0}
            maxVoltage={14.0}
            lowVoltage={11.5}
            label="12V SYSTEM" // Custom label instead of default "BATTERY"
            size={{ width: 280, height: 140 }}
            colors={{
              background: '#2d1a1a',
              needle: '#FF6B35',
              tickMajor: '#ffffff',
              tickMinor: '#666666',
              numbers: '#ffffff',
              redline: '#F44336',
              digitalSpeed: '#FF6B35',
              arc: '#333333',
            }}
            fonts={{
              numbers: { fontSize: 18, fontFamily: 'System', fontWeight: 'bold' },
              digitalSpeed: { fontSize: 28, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 16, fontFamily: 'System', fontWeight: 'bold' },
            }}
            showDigitalVoltage={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.voltageDisplay}>Current: {voltage3.toFixed(1)}V</Text>
          <Text style={[styles.statusText, { color: getVoltageStatus(voltage3).color }]}>
            {getVoltageStatus(voltage3).status}
          </Text>
        </View>
      </View>

      {/* Battery Voltage Guide */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Battery Voltage Guide</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#4CAF50' }]}>14.0-14.8V:</Text> Charging (alternator running)</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#4CAF50' }]}>12.6-13.0V:</Text> Fully charged (engine off)</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#4CAF50' }]}>12.4-12.6V:</Text> Good charge (75-100%)</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#FF9800' }]}>12.0-12.4V:</Text> Fair charge (50-75%)</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#FF5722' }]}>11.5-12.0V:</Text> Low charge (25-50%)</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#F44336' }]}>Below 11.5V:</Text> Critical - needs charging</Text>
        </View>
      </View>

      {/* Technical Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Technical Notes</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• Lead-acid batteries: 12.6V = 100% charge</Text>
          <Text style={styles.infoText}>• Voltage drops under load (headlights, starter)</Text>
          <Text style={styles.infoText}>• Temperature affects voltage readings</Text>
          <Text style={styles.infoText}>• Alternator typically outputs 14.0-14.8V</Text>
          <Text style={styles.infoText}>• Below 10.5V may damage electronics</Text>
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
  statusContainer: {
    alignItems: 'center',
    gap: 8,
  },
  voltageDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
