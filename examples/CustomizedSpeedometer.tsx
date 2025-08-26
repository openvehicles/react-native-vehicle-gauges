import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { GaugeSpeedometer } from 'react-native-vehicle-gauges';

/**
 * Customized Speedometer Example
 * 
 * This example demonstrates advanced customization options including:
 * - Custom colors for different gauge elements
 * - Font customization
 * - Redline zone configuration
 * - Different unit systems
 * - Size customization
 */
export const CustomizedSpeedometerExample: React.FC = () => {
  const [speed, setSpeed] = useState(85);
  const [units, setUnits] = useState<'mph' | 'kph'>('mph');
  const [theme, setTheme] = useState<'sport' | 'classic' | 'modern'>('sport');

  const getThemeColors = () => {
    switch (theme) {
      case 'sport':
        return {
          background: '#000000',
          needle: '#ff0040',
          tickMajor: '#ffffff',
          tickMinor: '#666666',
          numbers: '#ffffff',
          redline: '#ff0000',
          digitalSpeed: '#00ff41',
          arc: '#444444',
        };
      case 'classic':
        return {
          background: '#2d2d2d',
          needle: '#ffa500',
          tickMajor: '#f5f5dc',
          tickMinor: '#8b7d6b',
          numbers: '#f5f5dc',
          redline: '#dc143c',
          digitalSpeed: '#ffa500',
          arc: '#8b7d6b',
        };
      case 'modern':
        return {
          background: '#1e1e1e',
          needle: '#00bfff',
          tickMajor: '#e0e0e0',
          tickMinor: '#808080',
          numbers: '#e0e0e0',
          redline: '#ff4500',
          digitalSpeed: '#00bfff',
          arc: '#404040',
        };
    }
  };

  const getThemeFonts = () => {
    switch (theme) {
      case 'sport':
        return {
          numbers: { fontSize: 18, fontFamily: 'System', fontWeight: 'bold' },
          digitalSpeed: { fontSize: 28, fontFamily: 'System', fontWeight: 'bold' },
          units: { fontSize: 16, fontFamily: 'System', fontWeight: 'bold' },
        };
      case 'classic':
        return {
          numbers: { fontSize: 16, fontFamily: 'System', fontWeight: 'normal' },
          digitalSpeed: { fontSize: 24, fontFamily: 'System', fontWeight: 'normal' },
          units: { fontSize: 14, fontFamily: 'System', fontWeight: 'normal' },
        };
      case 'modern':
        return {
          numbers: { fontSize: 17, fontFamily: 'System', fontWeight: '600' },
          digitalSpeed: { fontSize: 26, fontFamily: 'System', fontWeight: '600' },
          units: { fontSize: 15, fontFamily: 'System', fontWeight: '400' },
        };
    }
  };

  const maxSpeed = units === 'mph' ? 180 : 300;
  const redlineSpeed = units === 'mph' ? 140 : 230;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Customized Speedometer</Text>
      
      <View style={styles.gaugeContainer}>
        <GaugeSpeedometer
          speed={speed}
          minSpeed={0}
          maxSpeed={maxSpeed}
          redlineSpeed={redlineSpeed}
          units={units}
          size={{ width: 320, height: 320 }}
          colors={getThemeColors()}
          fonts={getThemeFonts()}
          showDigitalSpeed={true}
        />
      </View>

      {/* Theme Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme</Text>
        <View style={styles.themeButtons}>
          {(['sport', 'classic', 'modern'] as const).map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.themeButton,
                theme === t && styles.activeThemeButton,
              ]}
              onPress={() => setTheme(t)}
            >
              <Text
                style={[
                  styles.themeButtonText,
                  theme === t && styles.activeThemeButtonText,
                ]}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Units Control */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Units</Text>
        <View style={styles.unitsButtons}>
          <TouchableOpacity
            style={[
              styles.unitButton,
              units === 'mph' && styles.activeUnitButton,
            ]}
            onPress={() => setUnits('mph')}
          >
            <Text
              style={[
                styles.unitButtonText,
                units === 'mph' && styles.activeUnitButtonText,
              ]}
            >
              MPH
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitButton,
              units === 'kph' && styles.activeUnitButton,
            ]}
            onPress={() => setUnits('kph')}
          >
            <Text
              style={[
                styles.unitButtonText,
                units === 'kph' && styles.activeUnitButtonText,
              ]}
            >
              KPH
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Speed Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Speed Control</Text>
        <View style={styles.speedControls}>
          <TouchableOpacity
            style={styles.speedButton}
            onPress={() => setSpeed(Math.max(0, speed - 20))}
          >
            <Text style={styles.speedButtonText}>-20</Text>
          </TouchableOpacity>
          
          <View style={styles.speedDisplay}>
            <Text style={styles.currentSpeed}>{Math.round(speed)}</Text>
            <Text style={styles.speedUnit}>{units}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.speedButton}
            onPress={() => setSpeed(Math.min(maxSpeed, speed + 20))}
          >
            <Text style={styles.speedButtonText}>+20</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Preset Speeds */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preset Speeds</Text>
        <View style={styles.presetButtons}>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setSpeed(0)}
          >
            <Text style={styles.presetButtonText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setSpeed(units === 'mph' ? 35 : 56)}
          >
            <Text style={styles.presetButtonText}>City</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setSpeed(units === 'mph' ? 65 : 105)}
          >
            <Text style={styles.presetButtonText}>Highway</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.presetButton}
            onPress={() => setSpeed(redlineSpeed - 10)}
          >
            <Text style={styles.presetButtonText}>Fast</Text>
          </TouchableOpacity>
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
  section: {
    marginVertical: 15,
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
  themeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  themeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  activeThemeButton: {
    backgroundColor: '#007AFF',
  },
  themeButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  activeThemeButtonText: {
    color: 'white',
  },
  unitsButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  unitButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  activeUnitButton: {
    backgroundColor: '#34C759',
  },
  unitButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activeUnitButtonText: {
    color: 'white',
  },
  speedControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  speedButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  speedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  speedDisplay: {
    alignItems: 'center',
  },
  currentSpeed: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  speedUnit: {
    fontSize: 16,
    color: '#666',
  },
  presetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 10,
  },
  presetButton: {
    backgroundColor: '#5856D6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 60,
  },
  presetButtonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});
