import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { GaugeSpeedometerProps, GaugeColors, GaugeFonts } from '../types';
import { resolveThemeColors } from '../themes';

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

export const GaugeSpeedometer: React.FC<GaugeSpeedometerProps> = ({
  speed = 0,
  minSpeed = 0,
  maxSpeed = 200,
  redlineSpeed,
  units = 'mph',
  size = { width: '100%', height: '100%' },
  theme = 'auto',
  colors = {},
  fonts = {},
  showDigitalSpeed = true,
  padding = 15, // Default 15% padding
}) => {
  const mergedColors = resolveThemeColors(colors, theme);
  const mergedFonts = {
    numbers: { ...DEFAULT_FONTS.numbers, ...(fonts.numbers || {}) },
    digitalSpeed: { ...DEFAULT_FONTS.digitalSpeed, ...(fonts.digitalSpeed || {}) },
    units: { ...DEFAULT_FONTS.units, ...(fonts.units || {}) },
  };

  // Gauge parameters
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 150; // Maximum possible radius (half of 300px viewbox)
  const paddingPixels = (maxRadius * padding) / 100; // Convert percentage to pixels
  const radius = maxRadius - paddingPixels; // Calculate actual radius with padding
  const startAngle = -225; // Start at 45 degrees left of bottom
  const endAngle = -45; // End at 45 degrees right of bottom
  const totalAngle = 270; // 270 degrees exactly

  // Calculate needle angle based on speed
  const speedRange = maxSpeed - minSpeed;
  const speedRatio = Math.max(0, Math.min(1, (speed - minSpeed) / speedRange));
  const needleAngle = startAngle + (speedRatio * totalAngle);

  // Convert degrees to radians
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  // Generate tick marks and numbers
  const generateTicks = () => {
    const ticks : any[] = [];
    const numbers : any[] = [];
    const majorTickInterval = speedRange <= 100 ? 10 : speedRange <= 200 ? 20 : 50;
    const minorTickInterval = majorTickInterval / 5;

    for (let i = minSpeed; i <= maxSpeed; i += minorTickInterval) {
      const isMajor = i % majorTickInterval === 0;
      const angle = startAngle + ((i - minSpeed) / speedRange) * totalAngle;
      const angleRad = toRadians(angle);
      
      const innerRadius = radius - (isMajor ? 15 : 8);
      const outerRadius = radius;
      
      const x1 = centerX + innerRadius * Math.cos(angleRad);
      const y1 = centerY + innerRadius * Math.sin(angleRad);
      const x2 = centerX + outerRadius * Math.cos(angleRad);
      const y2 = centerY + outerRadius * Math.sin(angleRad);

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

      // Add numbers for major ticks
      if (isMajor) {
        const numberRadius = radius - 25;
        const numberX = centerX + numberRadius * Math.cos(angleRad);
        const numberY = centerY + numberRadius * Math.sin(angleRad);

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

  // Generate arc path
  const generateArc = () => {
    const startAngleRad = toRadians(startAngle);
    const endAngleRad = toRadians(endAngle);
    
    const startX = centerX + radius * Math.cos(startAngleRad);
    const startY = centerY + radius * Math.sin(startAngleRad);
    const endX = centerX + radius * Math.cos(endAngleRad);
    const endY = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = totalAngle > 180 ? 1 : 0;

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  // Generate needle
  const generateNeedle = () => {
    const needleAngleRad = toRadians(needleAngle);
    const needleLength = radius - 20;
    const needleTipX = centerX + needleLength * Math.cos(needleAngleRad);
    const needleTipY = centerY + needleLength * Math.sin(needleAngleRad);

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
            r="8"
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
          <View style={styles.digitalSpeedContainer}>
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
    bottom: 40,
    alignItems: 'center',
  },
  digitalSpeed: {
    textAlign: 'center',
  },
  digitalUnits: {
    textAlign: 'center',
    opacity: 0.8,
  },
});
