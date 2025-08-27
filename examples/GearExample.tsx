import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GaugeGear } from '../src/components';

/**
 * Gear Selector Example
 * 
 * This example demonstrates the GaugeGear component with different
 * configurations for various vehicle transmission types.
 */
export const GearExample: React.FC = () => {
  const [gear1, setGear1] = useState('P'); // Standard automatic
  const [gear2, setGear2] = useState('1'); // Manual transmission
  const [gear3, setGear3] = useState('D'); // CVT transmission
  const [isAnimating, setIsAnimating] = useState(true);

  const standardGears = ['P', 'R', 'N', 'D'];
  const manualGears = ['P', 'R', 'N', '1', '2', 'D'];
  const cvtGears = ['P', 'R', 'N', 'D', 'S', 'L'];

  // Auto-cycle through gears
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      // Standard automatic transmission
      setGear1(prev => {
        const currentIndex = standardGears.indexOf(prev);
        const nextIndex = (currentIndex + 1) % standardGears.length;
        return standardGears[nextIndex];
      });
      
      // Manual transmission
      setGear2(prev => {
        const currentIndex = manualGears.indexOf(prev);
        const nextIndex = (currentIndex + 1) % manualGears.length;
        return manualGears[nextIndex];
      });
      
      // CVT transmission
      setGear3(prev => {
        const currentIndex = cvtGears.indexOf(prev);
        const nextIndex = (currentIndex + 1) % cvtGears.length;
        return cvtGears[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const resetGears = () => {
    setGear1('P');  // Park
    setGear2('1');  // 1st gear
    setGear3('D');  // Drive
  };

  const parkingGears = () => {
    setGear1('P');  // Park
    setGear2('N');  // Neutral
    setGear3('P');  // Park
  };

  const drivingGears = () => {
    setGear1('D');  // Drive
    setGear2('2');  // 2nd gear
    setGear3('D');  // Drive
  };

  const reverseGears = () => {
    setGear1('R');  // Reverse
    setGear2('R');  // Reverse
    setGear3('R');  // Reverse
  };

  const getGearDescription = (gear: string, type: 'automatic' | 'manual' | 'cvt') => {
    switch (type) {
      case 'automatic':
        switch (gear) {
          case 'P': return 'Park - Vehicle locked';
          case 'R': return 'Reverse - Backing up';
          case 'N': return 'Neutral - No gear engaged';
          case 'D': return 'Drive - Forward automatic';
          default: return 'Unknown gear';
        }
      
      case 'manual':
        switch (gear) {
          case 'P': return 'Park - Vehicle locked';
          case 'R': return 'Reverse - Backing up';
          case 'N': return 'Neutral - Clutch disengaged';
          case '1': return '1st Gear - Starting/Low speed';
          case '2': return '2nd Gear - Acceleration';
          case 'D': return 'Drive - High gear/Overdrive';
          default: return 'Unknown gear';
        }
      
      case 'cvt':
        switch (gear) {
          case 'P': return 'Park - Vehicle locked';
          case 'R': return 'Reverse - Backing up';
          case 'N': return 'Neutral - No gear engaged';
          case 'D': return 'Drive - Automatic CVT';
          case 'S': return 'Sport - Performance mode';
          case 'L': return 'Low - Engine braking';
          default: return 'Unknown gear';
        }
      
      default:
        return 'Unknown transmission type';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gear Selector Examples</Text>
      
      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[styles.controlButton, isAnimating ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setIsAnimating(!isAnimating)}
        >
          <Text style={styles.controlButtonText}>
            {isAnimating ? '⏸️ Pause' : '▶️ Animate'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={resetGears}>
          <Text style={styles.controlButtonText}>🔄 Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={parkingGears}>
          <Text style={styles.controlButtonText}>🅿️ Park</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={drivingGears}>
          <Text style={styles.controlButtonText}>🚗 Drive</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={reverseGears}>
          <Text style={styles.controlButtonText}>↩️ Reverse</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gaugesRow}>
        {/* Standard Automatic Transmission - Portrait */}
        <View style={styles.gaugeSection}>
          <Text style={styles.gaugeTitle}>Automatic - Portrait</Text>
          <Text style={styles.gaugeDescription}>Standard PRND layout</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeGear
              currentGear={gear1}
              gears={standardGears}
              orientation="portrait"
              size={{ width: 120, height: 300 }}
              colors={{
                background: '#1a2d1a',
                digitalSpeed: '#4CAF50',
                numbers: '#ffffff',
                arc: '#555555',
                tickMinor: '#888888',
              }}
              fonts={{
                numbers: { fontSize: 28, fontFamily: 'System', fontWeight: 'bold' },
                digitalSpeed: { fontSize: 32, fontFamily: 'System', fontWeight: 'bold' },
                units: { fontSize: 12, fontFamily: 'System', fontWeight: 'normal' },
              }}
            />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.gearDisplay}>Current: {gear1}</Text>
            <Text style={styles.gearDescription}>
              {getGearDescription(gear1, 'automatic')}
            </Text>
          </View>
        </View>

        {/* Manual Transmission */}
        <View style={styles.gaugeSection}>
          <Text style={styles.gaugeTitle}>Manual Transmission</Text>
          <Text style={styles.gaugeDescription}>Simplified PRN12D layout</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeGear
              currentGear={gear2}
              gears={manualGears}
              size={{ width: 120, height: 300 }}
              colors={{
                background: '#1a1a2e',
                digitalSpeed: '#FF9800',
                numbers: '#ffffff',
                arc: '#444444',
                tickMinor: '#666666',
              }}
              fonts={{
                numbers: { fontSize: 26, fontFamily: 'System', fontWeight: 'bold' },
                digitalSpeed: { fontSize: 30, fontFamily: 'System', fontWeight: 'bold' },
                units: { fontSize: 12, fontFamily: 'System', fontWeight: 'normal' },
              }}
            />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.gearDisplay}>Current: {gear2}</Text>
            <Text style={styles.gearDescription}>
              {getGearDescription(gear2, 'manual')}
            </Text>
          </View>
        </View>

        {/* CVT Transmission */}
        <View style={styles.gaugeSection}>
          <Text style={styles.gaugeTitle}>CVT Transmission (Custom Label)</Text>
          <Text style={styles.gaugeDescription}>Continuously Variable Transmission • "CVT" label</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeGear
              currentGear={gear3}
              gears={cvtGears}
              label="CVT" // Custom label instead of default "GEAR"
              size={{ width: 120, height: 300 }}
              colors={{
                background: '#2d1a1a',
                digitalSpeed: '#2196F3',
                numbers: '#ffffff',
                arc: '#333333',
                tickMinor: '#555555',
              }}
              fonts={{
                numbers: { fontSize: 28, fontFamily: 'System', fontWeight: 'bold' },
                digitalSpeed: { fontSize: 32, fontFamily: 'System', fontWeight: 'bold' },
                units: { fontSize: 12, fontFamily: 'System', fontWeight: 'normal' },
              }}
            />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.gearDisplay}>Current: {gear3}</Text>
            <Text style={styles.gearDescription}>
              {getGearDescription(gear3, 'cvt')}
            </Text>
          </View>
        </View>
      </View>

      {/* Landscape Examples */}
      <View style={styles.landscapeRow}>
        {/* Automatic Transmission - Landscape */}
        <View style={styles.landscapeSection}>
          <Text style={styles.gaugeTitle}>Automatic - Landscape</Text>
          <Text style={styles.gaugeDescription}>Standard PRND horizontal layout</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeGear
              currentGear={gear1}
              gears={standardGears}
              orientation="landscape"
              size={{ width: 300, height: 120 }}
              colors={{
                background: '#1a2d1a',
                digitalSpeed: '#4CAF50',
                numbers: '#ffffff',
                arc: '#555555',
                tickMinor: '#888888',
              }}
              fonts={{
                numbers: { fontSize: 28, fontFamily: 'System', fontWeight: 'bold' },
                digitalSpeed: { fontSize: 32, fontFamily: 'System', fontWeight: 'bold' },
                units: { fontSize: 12, fontFamily: 'System', fontWeight: 'normal' },
              }}
            />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.gearDisplay}>Current: {gear1}</Text>
            <Text style={styles.gearDescription}>
              {getGearDescription(gear1, 'automatic')}
            </Text>
          </View>
        </View>

        {/* Manual Transmission - Landscape */}
        <View style={styles.landscapeSection}>
          <Text style={styles.gaugeTitle}>Manual - Landscape</Text>
          <Text style={styles.gaugeDescription}>PRN12D horizontal layout</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeGear
              currentGear={gear2}
              gears={manualGears}
              orientation="landscape"
              size={{ width: 300, height: 120 }}
              colors={{
                background: '#1a1a2e',
                digitalSpeed: '#FF9800',
                numbers: '#ffffff',
                arc: '#444444',
                tickMinor: '#666666',
              }}
              fonts={{
                numbers: { fontSize: 26, fontFamily: 'System', fontWeight: 'bold' },
                digitalSpeed: { fontSize: 30, fontFamily: 'System', fontWeight: 'bold' },
                units: { fontSize: 12, fontFamily: 'System', fontWeight: 'normal' },
              }}
            />
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.gearDisplay}>Current: {gear2}</Text>
            <Text style={styles.gearDescription}>
              {getGearDescription(gear2, 'manual')}
            </Text>
          </View>
        </View>
      </View>

      {/* Gear Guide */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Transmission Guide</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#4CAF50' }]}>Active Gear:</Text> Highlighted with bright color and larger text</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#888888' }]}>Inactive Gears:</Text> Dimmed with gray color for visual clarity</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#2196F3' }]}>Vertical Layout:</Text> Optimized for dashboard integration</Text>
          <Text style={styles.infoText}>• <Text style={[styles.infoLabel, { color: '#FF9800' }]}>Connecting Lines:</Text> Show relationship between gear positions</Text>
        </View>
      </View>

      {/* Technical Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Technical Notes</Text>
        <View style={styles.infoList}>
          <Text style={styles.infoText}>• Gear positions are fully customizable via props</Text>
          <Text style={styles.infoText}>• Supports any number of gears (2-10 recommended)</Text>
          <Text style={styles.infoText}>• Automatic theme detection with manual override</Text>
          <Text style={styles.infoText}>• Responsive vertical layout adapts to container size</Text>
          <Text style={styles.infoText}>• Current gear displayed prominently at bottom</Text>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 80,
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
    fontSize: 12,
  },
  gaugesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 30,
    flexWrap: 'wrap',
    gap: 20,
  },
  landscapeRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
    gap: 20,
  },
  landscapeSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    maxWidth: 400,
  },
  gaugeSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 160,
  },
  gaugeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  gaugeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  gaugeWrapper: {
    marginBottom: 15,
    alignItems: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    gap: 6,
  },
  gearDisplay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 12,
  },
  gearDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    maxWidth: 140,
    lineHeight: 16,
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
