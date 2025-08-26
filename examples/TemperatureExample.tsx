import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GaugeTemperature } from 'react-native-vehicle-gauges';

/**
 * Temperature Example
 * 
 * This example demonstrates the GaugeTemperature component with different
 * configurations for various temperature monitoring applications.
 */
export const TemperatureExample: React.FC = () => {
  const [temp1, setTemp1] = useState(22); // Room temperature
  const [temp2, setTemp2] = useState(85); // Engine temperature
  const [temp3, setTemp3] = useState(-15); // Outside temperature
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-animate the temperatures
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setTemp1(prev => {
        const change = (Math.random() - 0.5) * 6;
        return Math.max(15, Math.min(35, prev + change));
      });
      
      setTemp2(prev => {
        const change = (Math.random() - 0.5) * 15;
        return Math.max(60, Math.min(110, prev + change));
      });
      
      setTemp3(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(-30, Math.min(10, prev + change));
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const resetTemperatures = () => {
    setTemp1(22);  // Room temp
    setTemp2(85);  // Engine temp
    setTemp3(-15); // Outside temp
  };

  const extremeTemperatures = () => {
    setTemp1(45);  // Hot room
    setTemp2(115); // Overheating
    setTemp3(-35); // Freezing
  };

  const normalTemperatures = () => {
    setTemp1(20);  // Comfortable
    setTemp2(90);  // Normal operating
    setTemp3(5);   // Cool outside
  };

  const getTemperatureStatus = (temp: number, type: 'room' | 'engine' | 'outside') => {
    switch (type) {
      case 'room':
        if (temp >= 30) return { status: 'Hot', color: '#FF5722' };
        if (temp >= 20) return { status: 'Comfortable', color: '#4CAF50' };
        if (temp >= 15) return { status: 'Cool', color: '#2196F3' };
        return { status: 'Cold', color: '#0066ff' };
      
      case 'engine':
        if (temp >= 105) return { status: 'Overheating', color: '#F44336' };
        if (temp >= 95) return { status: 'Hot', color: '#FF5722' };
        if (temp >= 80) return { status: 'Normal', color: '#4CAF50' };
        if (temp >= 60) return { status: 'Warming', color: '#FF9800' };
        return { status: 'Cold', color: '#2196F3' };
      
      case 'outside':
        if (temp >= 25) return { status: 'Hot', color: '#FF5722' };
        if (temp >= 10) return { status: 'Mild', color: '#4CAF50' };
        if (temp >= 0) return { status: 'Cool', color: '#2196F3' };
        if (temp >= -10) return { status: 'Cold', color: '#0066ff' };
        return { status: 'Freezing', color: '#673AB7' };
      
      default:
        return { status: 'Unknown', color: '#666666' };
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Temperature Gauge Examples</Text>
      
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[styles.controlButton, isAnimating ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setIsAnimating(!isAnimating)}
        >
          <Text style={styles.controlButtonText}>
            {isAnimating ? '⏸️ Pause' : '▶️ Animate'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={resetTemperatures}>
          <Text style={styles.controlButtonText}>🔄 Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={extremeTemperatures}>
          <Text style={styles.controlButtonText}>🔥 Extreme</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={normalTemperatures}>
          <Text style={styles.controlButtonText}>❄️ Normal</Text>
        </TouchableOpacity>
      </View>

      {/* Room Temperature - Celsius */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Room Temperature</Text>
        <Text style={styles.gaugeDescription}>15-35°C • Comfort zone 20-25°C</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeTemperature
            temperature={temp1}
            minTemperature={15}
            maxTemperature={35}
            lowTemperature={18}
            highTemperature={28}
            units="celsius"
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
            showDigitalTemperature={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.tempDisplay}>Current: {temp1.toFixed(0)}°C</Text>
          <Text style={[styles.statusText, { color: getTemperatureStatus(temp1, 'room').color }]}>
            {getTemperatureStatus(temp1, 'room').status}
          </Text>
        </View>
      </View>

      {/* Engine Temperature - Celsius */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Engine Temperature</Text>
        <Text style={styles.gaugeDescription}>60-120°C • Operating range 80-100°C</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeTemperature
            temperature={temp2}
            minTemperature={60}
            maxTemperature={120}
            lowTemperature={75}
            highTemperature={105}
            units="celsius"
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
            showDigitalTemperature={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.tempDisplay}>Current: {temp2.toFixed(0)}°C</Text>
          <Text style={[styles.statusText, { color: getTemperatureStatus(temp2, 'engine').color }]}>
            {getTemperatureStatus(temp2, 'engine').status}
          </Text>
        </View>
      </View>

      {/* Outside Temperature - Fahrenheit */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Outside Temperature</Text>
        <Text style={styles.gaugeDescription}>-22 to 50°F • Freezing point 32°F</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeTemperature
            temperature={temp3}
            minTemperature={-30}
            maxTemperature={10}
            lowTemperature={-10}
            highTemperature={5}
            units="fahrenheit"
            size={{ width: 280, height: 140 }}
            colors={{
              background: '#2d1a1a',
              needle: '#2196F3',
              tickMajor: '#ffffff',
              tickMinor: '#666666',
              numbers: '#ffffff',
              redline: '#0066ff',
              digitalSpeed: '#2196F3',
              arc: '#333333',
            }}
            fonts={{
              numbers: { fontSize: 18, fontFamily: 'System', fontWeight: 'bold' },
              digitalSpeed: { fontSize: 28, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 16, fontFamily: 'System', fontWeight: 'bold' },
            }}
            showDigitalTemperature={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.tempDisplay}>
            Current: {temp3.toFixed(0)}°C ({((temp3 * 9/5) + 32).toFixed(0)}°F)
          </Text>
          <Text style={[styles.statusText, { color: getTemperatureStatus(temp3, 'outside').color }]}>
            {getTemperatureStatus(temp3, 'outside').status}
          </Text>
        </View>
      </View>

      {/* Temperature Guide */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Temperature Guide</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#0066ff' }]}>Blue Zone:</Text> Low temperature range - may indicate cold conditions</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#4CAF50' }]}>Normal Zone:</Text> Optimal operating temperature range</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#ff0000' }]}>Red Zone:</Text> High temperature range - may require attention</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#FF9800' }]}>Needle Color:</Text> Indicates current temperature position</Text>
        </View>
      </View>

      {/* Technical Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Technical Notes</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• Temperature sensors may have ±2°C accuracy</Text>
          <Text style={styles.infoText}>• Engine temperature varies with load and ambient conditions</Text>
          <Text style={styles.infoText}>• Extreme temperatures can affect sensor readings</Text>
          <Text style={styles.infoText}>• Conversion: °F = (°C × 9/5) + 32</Text>
          <Text style={styles.infoText}>• Digital display shows rounded temperature values</Text>
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
  tempDisplay: {
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
