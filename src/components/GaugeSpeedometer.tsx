import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { GaugeSpeedometerProps, GaugeColors, GaugeFonts } from '../types';
import { resolveThemeColors } from '../themes';

/**
 * Default color scheme for the speedometer gauge
 * Uses automotive-style colors with red needle and redline zone
 */
const DEFAULT_COLORS: Required<GaugeColors> = {
  background: '#1a1a1a',
  needle: '#ff4444',
  tickMajor: '#ffffff',
  tickMinor: '#888888',
  numbers: '#ffffff',
  redline: '#ff0000',
  digitalSpeed: '#00ff00',
  arc: '#333333',
};

/**
 * Default font configuration for all text elements in the speedometer
 * Provides consistent typography across the gauge
 */
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
 * GaugeSpeedometer - A circular speedometer component with 270° arc design
 * 
 * Features:
 * - Full circle design with 270° sweep from bottom-left to bottom-right
 * - Configurable speed range with smart tick intervals
 * - Redline zone support for speed warnings
 * - Digital speed display with units
 * - Customizable needle, ticks, and center dot dimensions
 * - Support for mph/kph units with automatic tick spacing
 * 
 * Design Notes:
 * - Uses polar coordinates for arc and needle positioning
 * - Needle angle calculation: startAngle + (speedRatio * totalAngle)
 * - Tick intervals automatically adjust based on speed range
 * - All visual elements scale proportionally with gauge size
 */
export const GaugeSpeedometer: React.FC<GaugeSpeedometerProps> = ({
  speed = 0,
  minSpeed = 0,
  maxSpeed = 200,
  redlineSpeed,
  units = 'mph',
  label = 'SPEED',
  size = { width: '100%', height: '100%' },
  theme = 'auto',
  colors = {},
  fonts = {},
  showDigitalSpeed = true,
  padding = 15, // Default 15% padding
  needleLength,
  tickLengthMajor = 15,
  tickLengthMinor = 8,
  centerDotRadius = 8,
  digitalDisplayPosition = 40,
  labelPosition = 80,
}) => {
  const mergedColors = resolveThemeColors(colors, theme);
  const mergedFonts = {
    numbers: { ...DEFAULT_FONTS.numbers, ...(fonts.numbers || {}) },
    digitalSpeed: { ...DEFAULT_FONTS.digitalSpeed, ...(fonts.digitalSpeed || {}) },
    units: { ...DEFAULT_FONTS.units, ...(fonts.units || {}) },
  };

  // Gauge geometry - uses 300x300 viewBox with center at (150,150)
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 150; // Maximum possible radius (half of 300px viewbox)
  const paddingPixels = (maxRadius * padding) / 100; // Convert percentage to pixels
  const radius = maxRadius - paddingPixels; // Calculate actual radius with padding
  
  // Arc configuration - 270° sweep for automotive speedometer look
  const startAngle = -225; // Start at 45 degrees left of bottom (7:30 position)
  const endAngle = -45; // End at 45 degrees right of bottom (4:30 position)
  const totalAngle = 270; // 270 degrees total sweep

  // Calculate needle position based on current speed
  const speedRange = maxSpeed - minSpeed;
  const speedRatio = Math.max(0, Math.min(1, (speed - minSpeed) / speedRange)); // Clamp to 0-1
  const needleAngle = startAngle + (speedRatio * totalAngle); // Linear interpolation

  // Utility function for polar coordinate conversion
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  /**
   * Generate tick marks and number labels around the arc
   * Uses smart intervals based on speed range for optimal readability
   */
  const generateTicks = () => {
    const ticks : any[] = [];
    const numbers : any[] = [];
    
    // Smart tick intervals - adjust based on speed range for readability
    const majorTickInterval = speedRange <= 100 ? 10 : speedRange <= 200 ? 20 : 50;
    const minorTickInterval = majorTickInterval / 5; // 5 minor ticks per major tick

    for (let i = minSpeed; i <= maxSpeed; i += minorTickInterval) {
      const isMajor = i % majorTickInterval === 0;
      const angle = startAngle + ((i - minSpeed) / speedRange) * totalAngle; // Position on arc
      const angleRad = toRadians(angle);
      
      // Calculate tick line positions (inner to outer radius)
      const innerRadius = radius - (isMajor ? tickLengthMajor : tickLengthMinor);
      const outerRadius = radius;
      
      const x1 = centerX + innerRadius * Math.cos(angleRad);
      const y1 = centerY + innerRadius * Math.sin(angleRad);
      const x2 = centerX + outerRadius * Math.cos(angleRad);
      const y2 = centerY + outerRadius * Math.sin(angleRad);

      // Color logic - redline zone uses warning color, otherwise normal colors
      const tickColor = redlineSpeed && i >= redlineSpeed ? mergedColors.redline : 
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

      // Add number labels for major ticks only
      if (isMajor) {
        const numberRadius = radius - 25; // Position numbers inside the tick marks
        const numberX = centerX + numberRadius * Math.cos(angleRad);
        const numberY = centerY + numberRadius * Math.sin(angleRad);

        // Numbers use redline color in danger zone, normal color elsewhere
        const numberColor = redlineSpeed && i >= redlineSpeed ? mergedColors.redline : mergedColors.numbers;

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
            {i}
          </SvgText>
        );
      }
    }

    return { ticks, numbers };
  };

  /**
   * Generate the main arc path using SVG path syntax
   * Creates a circular arc from start to end angle
   */
  const generateArc = () => {
    const startAngleRad = toRadians(startAngle);
    const endAngleRad = toRadians(endAngle);
    
    // Calculate start and end points on the circle
    const startX = centerX + radius * Math.cos(startAngleRad);
    const startY = centerY + radius * Math.sin(startAngleRad);
    const endX = centerX + radius * Math.cos(endAngleRad);
    const endY = centerY + radius * Math.sin(endAngleRad);

    // Use large-arc-flag for arcs > 180 degrees
    const largeArcFlag = totalAngle > 180 ? 1 : 0;

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  /**
   * Generate the needle shape as an SVG path
   * Creates a triangular needle pointing from center to current speed position
   */
  const generateNeedle = () => {
    const needleAngleRad = toRadians(needleAngle);
    const actualNeedleLength = needleLength ?? (radius - 20); // Default with clearance from edge
    
    // Calculate needle tip position
    const needleTipX = centerX + actualNeedleLength * Math.cos(needleAngleRad);
    const needleTipY = centerY + actualNeedleLength * Math.sin(needleAngleRad);

    // Create needle base - perpendicular to needle direction
    const baseWidth = 3; // Half-width of needle base
    const baseAngle1 = needleAngleRad + Math.PI / 2; // 90° clockwise
    const baseAngle2 = needleAngleRad - Math.PI / 2; // 90° counter-clockwise
    
    const baseX1 = centerX + baseWidth * Math.cos(baseAngle1);
    const baseY1 = centerY + baseWidth * Math.sin(baseAngle1);
    const baseX2 = centerX + baseWidth * Math.cos(baseAngle2);
    const baseY2 = centerY + baseWidth * Math.sin(baseAngle2);

    // Create triangular path: base1 -> tip -> base2 -> close
    return `M ${baseX1} ${baseY1} L ${needleTipX} ${needleTipY} L ${baseX2} ${baseY2} Z`;
  };

  const { ticks, numbers } = generateTicks();

  const containerStyle = [
    styles.container,
    size.width ? { width: size.width as any } : {},
    size.height ? { height: size.height as any } : {},
  ];

  return (
    <View style={containerStyle}>
      <View style={[styles.gaugeContainer, { backgroundColor: mergedColors.background }]}>
        <Svg width="100%" height="100%" viewBox="0 0 300 300">
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
        
        {/* Digital speed display */}
        {showDigitalSpeed && (
          <View style={[styles.digitalSpeedContainer, { bottom: digitalDisplayPosition }]}>
            <Text
              style={[
                styles.digitalSpeed,
                {
                  color: mergedColors.digitalSpeed,
                  fontSize: mergedFonts.digitalSpeed.fontSize,
                  fontFamily: mergedFonts.digitalSpeed.fontFamily,
                  fontWeight: mergedFonts.digitalSpeed.fontWeight,
                },
              ]}
            >
              {Math.round(speed)}
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
              {units}
            </Text>
          </View>
        )}

        {/* Speed label */}
        <View style={[styles.speedContainer, { bottom: labelPosition }]}>
          <Text
            style={[
              styles.speedText,
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
    aspectRatio: 1,
  },
  gaugeContainer: {
    flex: 1,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  digitalSpeedContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  digitalSpeed: {
    textAlign: 'center',
  },
  digitalUnits: {
    textAlign: 'center',
    opacity: 0.8,
  },
  speedContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  speedText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});
