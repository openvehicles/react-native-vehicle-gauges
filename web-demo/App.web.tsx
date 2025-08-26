import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native-web';

// Import our gauge components directly - React Native Web handles the conversion
import { GaugeSpeedometer, GaugeTachometer, GaugeBattery } from '../src';
import { GaugeThemeMode } from '../src/types';

const WebDemo: React.FC = () => {
  const [speed1, setSpeed1] = useState(45);
  const [speed2, setSpeed2] = useState(85);
  const [speed3, setSpeed3] = useState(120);
  const [rpm1, setRpm1] = useState(1500);
  const [rpm2, setRpm2] = useState(3500);
  const [rpm3, setRpm3] = useState(6500);
  const [voltage1, setVoltage1] = useState(12.6);
  const [voltage2, setVoltage2] = useState(14.2);
  const [voltage3, setVoltage3] = useState(11.8);
  const [isAnimating, setIsAnimating] = useState(true);
  const [theme, setTheme] = useState<GaugeThemeMode>('dark');

  // Auto-animate the gauges
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setSpeed1(prev => {
        const change = (Math.random() - 0.5) * 15;
        return Math.max(0, Math.min(120, prev + change));
      });
      
      setSpeed2(prev => {
        const change = (Math.random() - 0.5) * 20;
        return Math.max(0, Math.min(180, prev + change));
      });
      
      setSpeed3(prev => {
        const change = (Math.random() - 0.5) * 25;
        return Math.max(0, Math.min(200, prev + change));
      });

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

      setVoltage1(prev => {
        const change = (Math.random() - 0.5) * 0.4;
        return Math.max(11.0, Math.min(13.0, prev + change));
      });
      
      setVoltage2(prev => {
        const change = (Math.random() - 0.5) * 0.6;
        return Math.max(11.0, Math.min(16.0, prev + change));
      });
      
      setVoltage3(prev => {
        const change = (Math.random() - 0.5) * 0.4;
        return Math.max(9.0, Math.min(14.0, prev + change));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const resetSpeeds = () => {
    setSpeed1(0);
    setSpeed2(0);
    setSpeed3(0);
    setRpm1(800);
    setRpm2(1000);
    setRpm3(2000);
    setVoltage1(12.6);
    setVoltage2(14.2);
    setVoltage3(11.8);
  };

  const maxSpeeds = () => {
    setSpeed1(120);
    setSpeed2(180);
    setSpeed3(200);
    setRpm1(3800);
    setRpm2(5800);
    setRpm3(8500);
    setVoltage1(11.2);
    setVoltage2(11.5);
    setVoltage3(9.5);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Interactive Vehicle Gauges Demo</Text>
        <Text style={styles.subtitle}>
          Real-time Speedometers, Tachometers & Battery Gauges running in your browser
        </Text>
      </View>

      <View style={styles.themePanel}>
        <Text style={styles.themePanelTitle}>Theme Settings</Text>
        <View style={styles.themeButtons}>
          <TouchableOpacity
            style={[styles.themeButton, theme === 'light' && styles.activeThemeButton]}
            onPress={() => setTheme('light')}
          >
            <Text style={[styles.themeButtonText, theme === 'light' && styles.activeThemeButtonText]}>
              ☀️ Light
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeButton, theme === 'dark' && styles.activeThemeButton]}
            onPress={() => setTheme('dark')}
          >
            <Text style={[styles.themeButtonText, theme === 'dark' && styles.activeThemeButtonText]}>
              🌙 Dark
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeButton, theme === 'auto' && styles.activeThemeButton]}
            onPress={() => setTheme('auto')}
          >
            <Text style={[styles.themeButtonText, theme === 'auto' && styles.activeThemeButtonText]}>
              🔄 Auto
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.controlPanel}>
        <TouchableOpacity
          style={[styles.controlButton, isAnimating ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setIsAnimating(!isAnimating)}
        >
          <Text style={styles.controlButtonText}>
            {isAnimating ? '⏸️ Pause Animation' : '▶️ Start Animation'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={resetSpeeds}>
          <Text style={styles.controlButtonText}>🛑 Reset All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton} onPress={maxSpeeds}>
          <Text style={styles.controlButtonText}>🏁 Max Speed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gaugesContainer}>
        {/* Classic Car Speedometer */}
        <View style={styles.gaugeSection}>
          <Text style={styles.gaugeTitle}>Classic Car Speedometer</Text>
          <Text style={styles.gaugeDescription}>0-120 mph • City driving simulation</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeSpeedometer
              speed={speed1}
              minSpeed={0}
              maxSpeed={120}
              redlineSpeed={100}
              units="mph"
              size={{ width: 280, height: 280 }}
              theme={theme}
              colors={{
                needle: '#ffa500',
                redline: '#dc143c',
                digitalSpeed: '#ffa500',
              }}
              fonts={{
                numbers: { fontSize: 16, fontFamily: 'Georgia', fontWeight: 'normal' },
                digitalSpeed: { fontSize: 24, fontFamily: 'Georgia', fontWeight: 'normal' },
                units: { fontSize: 14, fontFamily: 'Georgia', fontWeight: 'normal' },
              }}
              showDigitalSpeed={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {Math.round(speed1)} mph</Text>
        </View>

        {/* Sports Car Speedometer */}
        <View style={styles.gaugeSection}>
          <Text style={styles.gaugeTitle}>Sports Car Speedometer</Text>
          <Text style={styles.gaugeDescription}>0-180 mph • Highway performance</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeSpeedometer
              speed={speed2}
              minSpeed={0}
              maxSpeed={180}
              redlineSpeed={140}
              units="mph"
              size={{ width: 280, height: 280 }}
              theme={theme}
              colors={{
                needle: '#ff0040',
                redline: '#ff0000',
                digitalSpeed: '#00ff41',
              }}
              fonts={{
                numbers: { fontSize: 18, fontFamily: 'Arial', fontWeight: 'bold' },
                digitalSpeed: { fontSize: 28, fontFamily: 'Arial', fontWeight: 'bold' },
                units: { fontSize: 16, fontFamily: 'Arial', fontWeight: 'bold' },
              }}
              showDigitalSpeed={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {Math.round(speed2)} mph</Text>
        </View>

        {/* Motorcycle Speedometer */}
        <View style={styles.gaugeSection}>
          <Text style={styles.gaugeTitle}>Motorcycle Speedometer</Text>
          <Text style={styles.gaugeDescription}>0-200 mph • Racing configuration</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeSpeedometer
              speed={speed3}
              minSpeed={0}
              maxSpeed={200}
              redlineSpeed={160}
              units="mph"
              size={{ width: 280, height: 280 }}
              theme={theme}
              colors={{
                needle: '#00bfff',
                redline: '#ff4500',
                digitalSpeed: '#00bfff',
              }}
              fonts={{
                numbers: { fontSize: 17, fontFamily: 'Helvetica', fontWeight: '600' },
                digitalSpeed: { fontSize: 26, fontFamily: 'Helvetica', fontWeight: '600' },
                units: { fontSize: 15, fontFamily: 'Helvetica', fontWeight: '400' },
              }}
              showDigitalSpeed={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {Math.round(speed3)} mph</Text>
        </View>

        {/* KPH Example */}
        <View style={styles.gaugeSection}>
          <Text style={styles.gaugeTitle}>European Style (KPH)</Text>
          <Text style={styles.gaugeDescription}>0-300 kph • Metric system</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeSpeedometer
              speed={speed2 * 1.60934} // Convert mph to kph
              minSpeed={0}
              maxSpeed={300}
              redlineSpeed={220}
              units="kph"
              size={{ width: 280, height: 280 }}
              theme={theme}
              colors={{
                needle: '#e94560',
                redline: '#ff073a',
                digitalSpeed: '#39ff14',
              }}
              showDigitalSpeed={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {Math.round(speed2 * 1.60934)} kph</Text>
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
              theme={theme}
              colors={{
                needle: '#4CAF50',
                redline: '#ff4444',
                digitalSpeed: '#4CAF50',
              }}
              showDigitalRpm={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {Math.round(rpm1)} RPM</Text>
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
              theme={theme}
              colors={{
                needle: '#FF6B35',
                redline: '#ff0000',
                digitalSpeed: '#FF6B35',
              }}
              showDigitalRpm={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {Math.round(rpm2)} RPM</Text>
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
              theme={theme}
              colors={{
                // background: '#000000',
                needle: '#00FFFF',
                // tickMajor: '#ffffff',
                // tickMinor: '#666666',
                // numbers: '#ffffff',
                redline: '#ff0000',
                digitalSpeed: '#00FFFF',
                // arc: '#333333',
              }}
              showDigitalRpm={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {Math.round(rpm3)} RPM</Text>
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
              size={{ width: 280, height: 140 }}
              theme={theme}
              colors={{
                // background: '#1a2d1a',
                needle: '#4CAF50',
                // tickMajor: '#ffffff',
                // tickMinor: '#a0a0a0',
                // numbers: '#ffffff',
                redline: '#FF5722',
                digitalSpeed: '#4CAF50',
                // arc: '#555555',
              }}
              showDigitalVoltage={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {voltage1.toFixed(1)}V</Text>
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
              theme={theme}
              colors={{
                // background: '#1a1a2e',
                needle: '#00BCD4',
                // tickMajor: '#ffffff',
                // tickMinor: '#888888',
                // numbers: '#ffffff',
                redline: '#FF9800',
                digitalSpeed: '#00BCD4',
                // arc: '#444444',
              }}
              showDigitalVoltage={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {voltage2.toFixed(1)}V</Text>
        </View>

        {/* Critical Battery Monitor */}
        <View style={styles.gaugeSection}>
          <Text style={styles.gaugeTitle}>Critical Battery Monitor</Text>
          <Text style={styles.gaugeDescription}>9.0-14.0V • High sensitivity for low voltage detection</Text>
          <View style={styles.gaugeWrapper}>
            <GaugeBattery
              voltage={voltage3}
              minVoltage={9.0}
              maxVoltage={14.0}
              lowVoltage={11.5}
              size={{ width: 280, height: 140 }}
              theme={theme}
              colors={{
                // background: '#2d1a1a',
                needle: '#FF6B35',
                // tickMajor: '#ffffff',
                // tickMinor: '#666666',
                // numbers: '#ffffff',
                redline: '#F44336',
                digitalSpeed: '#FF6B35',
                // arc: '#333333',
              }}
              showDigitalVoltage={true}
            />
          </View>
          <Text style={styles.speedDisplay}>Current: {voltage3.toFixed(1)}V</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          🚀 Built with React Native • Running on React Native Web
        </Text>
        <Text style={styles.footerSubtext}>
          This demo shows real-time animated speedometers, tachometers, and battery gauges with different themes and configurations
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    flexWrap: 'wrap',
    gap: 10,
  },
  controlButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
  },
  activeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  inactiveButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  gaugesContainer: {
    paddingHorizontal: 20,
    gap: 40,
  },
  gaugeSection: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    backdropFilter: 'blur(10px)',
  },
  gaugeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  gaugeDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    textAlign: 'center',
  },
  gaugeWrapper: {
    marginBottom: 20,
    alignItems: 'center',
  },
  speedDisplay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  footer: {
    padding: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  themePanel: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    backdropFilter: 'blur(10px)',
  },
  themePanelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  themeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  themeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 80,
  },
  activeThemeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  themeButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
  activeThemeButtonText: {
    color: 'white',
  },
});

export default WebDemo;