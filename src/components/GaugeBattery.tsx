import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { GaugeBatteryProps, GaugeColors, GaugeFonts } from '../types';
import { resolveThemeColors } from '../themes';

/**
 * Default color scheme for the battery voltage gauge
 * Uses orange for redline (low voltage) warnings instead of red
 */
const DEFAULT_COLORS: Required<GaugeColors> = {
  background: '#1a1a1a',
  needle: '#00ff00',
  tickMajor: '#ffffff',
  tickMinor: '#888888',
  numbers: '#ffffff',
  redline: '#ffaa00', // Orange for low voltage warning
  digitalSpeed: '#00ff00',
  arc: '#333333',
};

const DEFAULT_FONTS: Required<GaugeFonts> = {
  numbers: {
    fontSize: 16,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  digitalSpeed: {
    fontSize: 24,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  units: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: 'normal',
  },
};

/**
 * GaugeBattery - A half-circle voltage gauge optimized for automotive battery monitoring
 * 
 * Features:
 * - Half-circle design (180° arc) with flat base for space efficiency
 * - Optimized for 12V automotive batteries (default 10.0-16.0V range)
 * - Enhanced tick intervals with decimal precision for voltage accuracy
 * - Low voltage warning zone (typically <12.0V for automotive use)
 * - More frequent tick labels compared to other gauges for precision reading
 * - Digital voltage display with one decimal place precision
 * 
 * Design Notes:
 * - Uses 180° arc from left (9 o'clock) to right (3 o'clock)
 * - Tick intervals adapt to voltage range: ≤3V uses 0.5V steps, >10V uses 2V steps
 * - viewBox height is dynamic: 150 + extraHeight for label space
 * - Numbers positioned closer to arc (radius - 25) for better readability
 * - Orange warning color distinguishes from red redline zones in other gauges
 */
export const GaugeBattery: React.FC<GaugeBatteryProps> = ({
  voltage = 12.0,
  minVoltage = 10.0,
  maxVoltage = 16.0,
  lowVoltage,
  label = 'BATTERY',
  size = { width: '100%', height: '100%' },
  theme = 'auto',
  colors = {},
  fonts = {},
  showDigitalVoltage = true,
  padding = 15, // Default 15% padding
  needleLength,
  tickLengthMajor = 15,
  tickLengthMinor = 8,
  centerDotRadius = 8,
  digitalDisplayPosition = 35,
  labelPosition = 75,
}) => {
  const mergedColors = resolveThemeColors(colors, theme);
  const mergedFonts = {
    numbers: { ...DEFAULT_FONTS.numbers, ...(fonts.numbers || {}) },
    digitalSpeed: { ...DEFAULT_FONTS.digitalSpeed, ...(fonts.digitalSpeed || {}) },
    units: { ...DEFAULT_FONTS.units, ...(fonts.units || {}) },
  };

  // Half-circle geometry - efficient use of space for dashboard layouts
  const maxRadius = 150; // Maximum radius using full 300px width
  const paddingPixels = (maxRadius * padding) / 100; // Convert percentage to pixels  
  const radius = maxRadius - paddingPixels; // Actual gauge radius with padding
  const centerX = 150; // Horizontal center of 300px viewBox
  const centerY = 150; // Positioned at bottom edge for half-circle effect
  
  // Dynamic viewBox height - accommodates label space below arc
  const extraHeight = paddingPixels;
  
  // Half-circle arc configuration (top half of circle)
  const arcStartAngle = 180; // Left endpoint (9 o'clock position)
  const arcEndAngle = 0; // Right endpoint (3 o'clock position)  
  const totalAngle = 180; // 180° sweep creates perfect half-circle
  
  // Calculate needle angle based on voltage - use same range as ticks
  const voltageRange = maxVoltage - minVoltage;
  const voltageRatio = Math.max(0, Math.min(1, (voltage - minVoltage) / voltageRange));
  const needleAngle = arcStartAngle + (voltageRatio * totalAngle); // Add because we go 180° → 270° → 0°

  // Convert degrees to radians
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  /**
   * Generate precision tick marks for voltage measurement
   * Uses fine-grained intervals appropriate for electrical monitoring
   */
  const generateTicks = () => {
    const ticks : any[] = [];
    const numbers : any[] = [];
    
    // Voltage-specific tick intervals - precision matters for electrical systems
    let majorTickInterval: number;
    let minorTicksPerMajor = 4;
    
    if (voltageRange <= 3) {
      majorTickInterval = 0.5;    // Fine precision for small ranges (e.g., 3.3V systems)
      minorTicksPerMajor = 5;     // 0.1V minor ticks
    } else if (voltageRange <= 6) {
      majorTickInterval = 1;      // 1V steps for medium ranges (e.g., 5V systems)
      minorTicksPerMajor = 4;     // 0.25V minor ticks
    } else if (voltageRange <= 10) {
      majorTickInterval = 2;      // 2V steps for automotive ranges (8-16V)
      minorTicksPerMajor = 4;     // 0.5V minor ticks
    } else {
      majorTickInterval = 2;      // Keep 2V for very wide ranges
      minorTicksPerMajor = 4;     // 0.5V minor ticks
    }
    
    const minorTickInterval = majorTickInterval / minorTicksPerMajor;

    for (let i = minVoltage; i <= maxVoltage; i += minorTickInterval) {
      const isMajor = Math.abs((i - minVoltage) % majorTickInterval) < 0.01;
      const angle = arcStartAngle + ((i - minVoltage) / voltageRange) * totalAngle;
      const angleRad = toRadians(angle);
      
      const innerRadius = radius - (isMajor ? tickLengthMajor : tickLengthMinor);
      const outerRadius = radius;
      
      const x1 = centerX + innerRadius * Math.cos(angleRad);
      const y1 = centerY + innerRadius * Math.sin(angleRad);
      const x2 = centerX + outerRadius * Math.cos(angleRad);
      const y2 = centerY + outerRadius * Math.sin(angleRad);

      const tickColor = lowVoltage && i <= lowVoltage ? mergedColors.redline : 
                       (isMajor ? mergedColors.tickMajor : mergedColors.tickMinor);

      ticks.push(
        <Line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={tickColor}
          strokeWidth={isMajor ? 2 : 1}
          key={`tick-${i}`}
        />
      );

      // Add numbers for major ticks
      if (isMajor) {
        const numberRadius = radius - 25;
        const numberX = centerX + numberRadius * Math.cos(angleRad);
        const numberY = centerY + numberRadius * Math.sin(angleRad);

        const numberColor = lowVoltage && i <= lowVoltage ? mergedColors.redline : mergedColors.numbers;

        // Display voltage with one decimal place
        const displayNumber = i.toFixed(1);

        numbers.push(
          <SvgText
            x={numberX}
            y={numberY}
            fontSize={mergedFonts.numbers.fontSize}
            fontFamily={mergedFonts.numbers.fontFamily}
            fontWeight={mergedFonts.numbers.fontWeight}
            fill={numberColor}
            textAnchor="middle"
            alignmentBaseline="middle"
            key={`number-${i}`}
          >
            {displayNumber}
          </SvgText>
        );
      }
    }

    return { ticks, numbers };
  };

  // Generate arc path
  const generateArc = () => {
    const startAngleRad = toRadians(arcStartAngle);
    const endAngleRad = toRadians(arcEndAngle);
    
    // For elevated half circle:
    // startAngle = left point, elevated by padding
    // endAngle = right point, elevated by padding
    const startX = centerX + radius * Math.cos(startAngleRad);
    const startY = centerY + radius * Math.sin(startAngleRad);
    const endX = centerX + radius * Math.cos(endAngleRad);
    const endY = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = totalAngle >= 180 ? 1 : 0;

    // For top half circle from 180° to 0°, we want the upward arc (sweep-flag = 1 to go the long way through top)
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  // Generate needle
  const generateNeedle = () => {
    const needleAngleRad = toRadians(needleAngle);
    const actualNeedleLength = needleLength ?? (radius - 20); // Proper needle length with some clearance
    const needleTipX = centerX + actualNeedleLength * Math.cos(needleAngleRad);
    const needleTipY = centerY + actualNeedleLength * Math.sin(needleAngleRad);

    // Create needle base points
    const baseWidth = 3;
    const baseAngle1 = needleAngleRad + Math.PI / 2;
    const baseAngle2 = needleAngleRad - Math.PI / 2;
    
    const baseX1 = centerX + baseWidth * Math.cos(baseAngle1);
    const baseY1 = centerY + baseWidth * Math.sin(baseAngle1);
    const baseX2 = centerX + baseWidth * Math.cos(baseAngle2);
    const baseY2 = centerY + baseWidth * Math.sin(baseAngle2);

    return `M ${baseX1} ${baseY1} L ${needleTipX} ${needleTipY} L ${baseX2} ${baseY2} Z`;
  };

  const { ticks, numbers } = generateTicks();

  const containerStyle = [
    {
      ...styles.container,
      aspectRatio: 300 / (150 + extraHeight), // Dynamic ratio accounting for extra height
    },
    size.width ? { width: size.width as any } : {},
    size.height ? { height: size.height as any } : {},
  ];

  return (
    <View style={containerStyle}>
      <View style={[styles.gaugeContainer, { backgroundColor: mergedColors.background }]}>
        <Svg width="100%" height="100%" viewBox={`0 0 300 ${150 + extraHeight}`}>

          
          {/* Main arc */}
          <Path
            d={generateArc()}
            stroke={mergedColors.arc}
            strokeWidth="3"
            fill="none"
          />
          
          {/* Tick marks */}
          <G>{ticks}</G>
          
          {/* Numbers */}
          <G>{numbers}</G>
          
          {/* Center dot */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={centerDotRadius}
            fill={mergedColors.needle}
          />
          
          {/* Needle */}
          <Path
            d={generateNeedle()}
            fill={mergedColors.needle}
            stroke={mergedColors.needle}
            strokeWidth="1"
          />
          

        </Svg>
        
        {/* Digital voltage display */}
        {showDigitalVoltage && (
          <View style={[styles.digitalVoltageContainer, { bottom: digitalDisplayPosition }]}>
            <Text
              style={[
                styles.digitalVoltage,
                {
                  color: mergedColors.digitalSpeed,
                  fontSize: mergedFonts.digitalSpeed.fontSize,
                  fontFamily: mergedFonts.digitalSpeed.fontFamily,
                  fontWeight: mergedFonts.digitalSpeed.fontWeight,
                },
              ]}
            >
              {voltage.toFixed(1)}
            </Text>
            <Text
              style={[
                styles.digitalUnits,
                {
                  color: mergedColors.digitalSpeed,
                  fontSize: mergedFonts.units.fontSize,
                  fontFamily: mergedFonts.units.fontFamily,
                  fontWeight: mergedFonts.units.fontWeight,
                },
              ]}
            >
              V
            </Text>
          </View>
        )}

        {/* Battery indicator */}
        <View style={[styles.batteryContainer, { bottom: labelPosition }]}>
          <Text
            style={[
              styles.batteryText,
              {
                color: mergedColors.numbers,
                fontSize: Math.max(10, (mergedFonts.units.fontSize || 14) - 2),
                fontFamily: mergedFonts.units.fontFamily,
                fontWeight: mergedFonts.units.fontWeight,
              },
            ]}
          >
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // aspectRatio will be set dynamically in component
  },
  gaugeContainer: {
    flex: 1,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  digitalVoltageContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  digitalVoltage: {
    textAlign: 'center',
  },
  digitalUnits: {
    textAlign: 'center',
    opacity: 0.8,
  },
  batteryContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  batteryText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
