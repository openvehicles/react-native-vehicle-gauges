import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GaugeOilPressure } from '../src/components';

/**
 * Oil Pressure Example
 * 
 * This example demonstrates the GaugeOilPressure component with different
 * configurations for various oil pressure monitoring applications.
 */
export const OilPressureExample: React.FC = () => {
  const [pressure1, setPressure1] = useState(35); // Normal pressure
  const [pressure2, setPressure2] = useState(45); // High performance
  const [pressure3, setPressure3] = useState(2.5); // Metric (bar)
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-animate the pressures
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setPressure1(prev => {
        const change = (Math.random() - 0.5) * 8;
        return Math.max(10, Math.min(60, prev + change));
      });
      
      setPressure2(prev => {
        const change = (Math.random() - 0.5) * 12;
        return Math.max(20, Math.min(80, prev + change));
      });
      
      setPressure3(prev => {
        const change = (Math.random() - 0.5) * 0.8;
        return Math.max(1.0, Math.min(5.5, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const resetPressures = () => {
    setPressure1(35);  // Normal
    setPressure2(45);  // High performance
    setPressure3(2.5); // Metric
  };

  const criticalPressures = () => {
    setPressure1(8);   // Critically low
    setPressure2(85);  // Dangerously high
    setPressure3(0.5); // Very low
  };

  const normalPressures = () => {
    setPressure1(40);  // Good
    setPressure2(55);  // Good performance
    setPressure3(3.5); // Good metric
  };

  const getPressureStatus = (pressure: number, type: 'standard' | 'performance' | 'metric') => {
    switch (type) {
      case 'standard':
        if (pressure < 15) return { status: 'Critical Low', color: '#F44336' };
        if (pressure > 70) return { status: 'Too High', color: '#F44336' };
        if (pressure >= 25 && pressure <= 50) return { status: 'Normal', color: '#4CAF50' };
        if (pressure < 25) return { status: 'Low', color: '#FF9800' };
        return { status: 'High', color: '#FF9800' };
      
      case 'performance':
        if (pressure < 20) return { status: 'Critical Low', color: '#F44336' };
        if (pressure > 75) return { status: 'Too High', color: '#F44336' };
        if (pressure >= 35 && pressure <= 65) return { status: 'Optimal', color: '#4CAF50' };
        if (pressure < 35) return { status: 'Low', color: '#FF9800' };
        return { status: 'High', color: '#FF9800' };
      
      case 'metric':
        if (pressure < 1.0) return { status: 'Critical Low', color: '#F44336' };
        if (pressure > 4.8) return { status: 'Too High', color: '#F44336' };
        if (pressure >= 1.7 && pressure <= 3.5) return { status: 'Normal', color: '#4CAF50' };
        if (pressure < 1.7) return { status: 'Low', color: '#FF9800' };
        return { status: 'High', color: '#FF9800' };
      
      default:
        return { status: 'Unknown', color: '#666666' };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Oil Pressure Gauge Examples</Text>
      
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[styles.controlButton, isAnimating ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setIsAnimating(!isAnimating)}
        >
          <Text style={styles.controlButtonText}>
            {isAnimating ? '⏸️ Pause' : '▶️ Animate'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={resetPressures}>
          <Text style={styles.controlButtonText}>🔄 Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={criticalPressures}>
          <Text style={styles.controlButtonText}>⚠️ Critical</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={normalPressures}>
          <Text style={styles.controlButtonText}>✅ Normal</Text>
        </TouchableOpacity>
      </View>

      {/* Standard Engine - PSI */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Standard Engine Oil Pressure</Text>
        <Text style={styles.gaugeDescription}>0-80 PSI • Warning zones: &lt;15 PSI, &gt;70 PSI</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeOilPressure
            pressure={pressure1}
            minPressure={0}
            maxPressure={80}
            lowPressure={15}
            highPressure={70}
            units="psi"
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
            showDigitalPressure={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.pressureDisplay}>Current: {pressure1.toFixed(0)} PSI</Text>
          <Text style={[styles.statusText, { color: getPressureStatus(pressure1, 'standard').color }]}>
            {getPressureStatus(pressure1, 'standard').status}
          </Text>
        </View>
      </View>

      {/* Performance Engine - PSI */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Performance Engine Oil Pressure</Text>
        <Text style={styles.gaugeDescription}>0-100 PSI • Warning zones: &lt;20 PSI, &gt;75 PSI</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeOilPressure
            pressure={pressure2}
            minPressure={0}
            maxPressure={100}
            lowPressure={20}
            highPressure={75}
            units="psi"
            size={{ width: 280, height: 140 }}
            colors={{
              background: '#1a1a2e',
              needle: '#FF9800',
              tickMajor: '#ffffff',
              tickMinor: '#888888',
              numbers: '#ffffff',
              redline: '#F44336',
              digitalSpeed: '#FF9800',
              arc: '#444444',
            }}
            fonts={{
              numbers: { fontSize: 17, fontFamily: 'System', fontWeight: 'bold' },
              digitalSpeed: { fontSize: 26, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 15, fontFamily: 'System', fontWeight: 'normal' },
            }}
            showDigitalPressure={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.pressureDisplay}>Current: {pressure2.toFixed(0)} PSI</Text>
          <Text style={[styles.statusText, { color: getPressureStatus(pressure2, 'performance').color }]}>
            {getPressureStatus(pressure2, 'performance').status}
          </Text>
        </View>
      </View>

      {/* Metric Engine - Bar */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Oil Pressure - Metric (Bar)</Text>
        <Text style={styles.gaugeDescription}>0-5.5 bar • Warning zones: &lt;1.0 bar, &gt;4.8 bar</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeOilPressure
            pressure={pressure3 * 14.5038} // Convert bar to PSI for internal calculation
            minPressure={0}
            maxPressure={5.5 * 14.5038} // Convert to PSI
            lowPressure={1.0 * 14.5038} // Convert to PSI
            highPressure={4.8 * 14.5038} // Convert to PSI
            units="bar"
            size={{ width: 280, height: 140 }}
            colors={{
              background: '#2d1a1a',
              needle: '#2196F3',
              tickMajor: '#ffffff',
              tickMinor: '#666666',
              numbers: '#ffffff',
              redline: '#F44336',
              digitalSpeed: '#2196F3',
              arc: '#333333',
            }}
            fonts={{
              numbers: { fontSize: 18, fontFamily: 'System', fontWeight: 'bold' },
              digitalSpeed: { fontSize: 28, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 16, fontFamily: 'System', fontWeight: 'bold' },
            }}
            showDigitalPressure={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.pressureDisplay}>Current: {pressure3.toFixed(1)} bar</Text>
          <Text style={[styles.statusText, { color: getPressureStatus(pressure3, 'metric').color }]}>
            {getPressureStatus(pressure3, 'metric').status}
          </Text>
        </View>
      </View>

      {/* Oil Pressure Guide */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Oil Pressure Guide</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#ff0000' }]}>Red Zones (Left):</Text> Dangerously low pressure - engine damage risk</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#4CAF50' }]}>Normal Zone:</Text> Optimal operating pressure range</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#ff0000' }]}>Red Zones (Right):</Text> Excessively high pressure - system malfunction</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#FF9800' }]}>Needle Color:</Text> Indicates current pressure position</Text>
        </View>
      </View>

      {/* Technical Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Technical Notes</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• Oil pressure varies with engine RPM and temperature</Text>
          <Text style={styles.infoText}>• Low pressure at idle is normal for some engines</Text>
          <Text style={styles.infoText}>• High pressure may indicate blocked oil filter or passages</Text>
          <Text style={styles.infoText}>• Conversion: 1 bar = 14.5 PSI, 1 PSI = 6.89 kPa</Text>
          <Text style={styles.infoText}>• Always refer to manufacturer specifications</Text>
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
  pressureDisplay: {
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
