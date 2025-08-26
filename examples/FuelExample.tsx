import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GaugeFuel } from 'react-native-vehicle-gauges';

/**
 * Fuel Level Example
 * 
 * This example demonstrates the GaugeFuel component with different
 * configurations for various vehicle types and fuel display options.
 */
export const FuelExample: React.FC = () => {
  const [fuelLevel1, setFuelLevel1] = useState(75); // Good fuel level
  const [fuelLevel2, setFuelLevel2] = useState(45); // Medium fuel level
  const [fuelLevel3, setFuelLevel3] = useState(15); // Low fuel level
  const [isAnimating, setIsAnimating] = useState(true);

  // Auto-animate the fuel levels
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setFuelLevel1(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(50, Math.min(100, prev + change));
      });
      
      setFuelLevel2(prev => {
        const change = (Math.random() - 0.5) * 15;
        return Math.max(25, Math.min(75, prev + change));
      });
      
      setFuelLevel3(prev => {
        const change = (Math.random() - 0.5) * 8;
        return Math.max(5, Math.min(35, prev + change));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const resetFuelLevels = () => {
    setFuelLevel1(75);  // Good
    setFuelLevel2(45);  // Medium
    setFuelLevel3(15);  // Low
  };

  const criticalFuelLevels = () => {
    setFuelLevel1(8);   // Critical
    setFuelLevel2(5);   // Very low
    setFuelLevel3(2);   // Empty
  };

  const fullTank = () => {
    setFuelLevel1(100); // Full
    setFuelLevel2(100); // Full
    setFuelLevel3(100); // Full
  };

  const getFuelStatus = (fuelLevel: number) => {
    if (fuelLevel >= 75) return { status: 'Full', color: '#4CAF50' };
    if (fuelLevel >= 50) return { status: 'Good', color: '#4CAF50' };
    if (fuelLevel >= 25) return { status: 'Fair', color: '#FF9800' };
    if (fuelLevel >= 10) return { status: 'Low', color: '#FF5722' };
    return { status: 'Critical', color: '#F44336' };
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Fuel Level Examples</Text>
      
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[styles.controlButton, isAnimating ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setIsAnimating(!isAnimating)}
        >
          <Text style={styles.controlButtonText}>
            {isAnimating ? '⏸️ Pause' : '▶️ Animate'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={resetFuelLevels}>
          <Text style={styles.controlButtonText}>🔄 Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={criticalFuelLevels}>
          <Text style={styles.controlButtonText}>⚠️ Low Fuel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={fullTank}>
          <Text style={styles.controlButtonText}>⛽ Fill Tank</Text>
        </TouchableOpacity>
      </View>

      {/* Percentage Display */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Fuel Level - Percentage</Text>
        <Text style={styles.gaugeDescription}>0-100% • Low fuel warning at 20%</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeFuel
            fuelLevel={fuelLevel1}
            lowFuelThreshold={20}
            units="percentage"
            size={{ width: 280, height: 140 }}
            colors={{
              background: '#1a2d1a',
              needle: '#2196F3',
              tickMajor: '#ffffff',
              tickMinor: '#a0a0a0',
              numbers: '#ffffff',
              redline: '#FF5722',
              digitalSpeed: '#2196F3',
              arc: '#555555',
            }}
            fonts={{
              numbers: { fontSize: 16, fontFamily: 'System', fontWeight: 'normal' },
              digitalSpeed: { fontSize: 24, fontFamily: 'System', fontWeight: 'bold' },
              units: { fontSize: 14, fontFamily: 'System', fontWeight: 'normal' },
            }}
            showDigitalLevel={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.fuelDisplay}>Current: {fuelLevel1.toFixed(0)}%</Text>
          <Text style={[styles.statusText, { color: getFuelStatus(fuelLevel1).color }]}>
            {getFuelStatus(fuelLevel1).status}
          </Text>
        </View>
      </View>

      {/* Litres Display */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Fuel Level - Litres</Text>
        <Text style={styles.gaugeDescription}>60L tank capacity • Low fuel warning at 25%</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeFuel
            fuelLevel={fuelLevel2}
            tankCapacity={60}
            lowFuelThreshold={25}
            units="litres"
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
            showDigitalLevel={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.fuelDisplay}>
            Current: {(fuelLevel2 * 60 / 100).toFixed(1)}L ({fuelLevel2.toFixed(0)}%)
          </Text>
          <Text style={[styles.statusText, { color: getFuelStatus(fuelLevel2).color }]}>
            {getFuelStatus(fuelLevel2).status}
          </Text>
        </View>
      </View>

      {/* Gallons Display */}
      <View style={styles.gaugeSection}>
        <Text style={styles.gaugeTitle}>Fuel Level - Gallons</Text>
        <Text style={styles.gaugeDescription}>15.8 gal tank capacity • Low fuel warning at 15%</Text>
        <View style={styles.gaugeWrapper}>
          <GaugeFuel
            fuelLevel={fuelLevel3}
            tankCapacity={15.8}
            lowFuelThreshold={15}
            units="gallons"
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
            showDigitalLevel={true}
          />
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.fuelDisplay}>
            Current: {(fuelLevel3 * 15.8 / 100).toFixed(1)} gal ({fuelLevel3.toFixed(0)}%)
          </Text>
          <Text style={[styles.statusText, { color: getFuelStatus(fuelLevel3).color }]}>
            {getFuelStatus(fuelLevel3).status}
          </Text>
        </View>
      </View>

      {/* Fuel Level Guide */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Fuel Level Guide</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#4CAF50' }]}>75-100%:</Text> Full tank - long range available</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#4CAF50' }]}>50-75%:</Text> Good fuel level - no immediate concern</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#FF9800' }]}>25-50%:</Text> Fair fuel level - consider refueling</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#FF5722' }]}>10-25%:</Text> Low fuel - refuel soon</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#F44336' }]}>Below 10%:</Text> Critical - find fuel station immediately</Text>
        </View>
      </View>

      {/* Technical Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Technical Notes</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• Fuel sensors may be less accurate at very low levels</Text>
          <Text style={styles.infoText}>• Reserve fuel typically 10-15% of tank capacity</Text>
          <Text style={styles.infoText}>• Fuel consumption varies with driving conditions</Text>
          <Text style={styles.infoText}>• Cold weather can affect fuel gauge accuracy</Text>
          <Text style={styles.infoText}>• Always maintain minimum 1/4 tank for fuel pump longevity</Text>
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
  fuelDisplay: {
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
