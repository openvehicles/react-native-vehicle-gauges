import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { resolveThemeColors } from '../themes';
const DEFAULT_COLORS = {
    background: '#1a1a1a',
    needle: '#00ff00',
    tickMajor: '#ffffff',
    tickMinor: '#888888',
    numbers: '#ffffff',
    redline: '#ff0000', // Red for high temperature warning
    digitalSpeed: '#00ff00',
    arc: '#333333',
};
const DEFAULT_FONTS = {
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
export const GaugeTemperature = ({ temperature = 20, minTemperature = -40, maxTemperature = 120, lowTemperature = 0, highTemperature = 100, units = 'celsius', size = { width: '100%', height: '100%' }, theme = 'auto', colors = {}, fonts = {}, showDigitalTemperature = true, padding = 15, // Default 15% padding
 }) => {
    const mergedColors = resolveThemeColors(colors, theme);
    const mergedFonts = {
        numbers: { ...DEFAULT_FONTS.numbers, ...(fonts.numbers || {}) },
        digitalSpeed: { ...DEFAULT_FONTS.digitalSpeed, ...(fonts.digitalSpeed || {}) },
        units: { ...DEFAULT_FONTS.units, ...(fonts.units || {}) },
    };
    // Convert temperature if needed
    const convertTemp = (temp) => {
        if (units === 'fahrenheit') {
            return (temp * 9 / 5) + 32;
        }
        return temp;
    };
    const displayMinTemp = convertTemp(minTemperature);
    const displayMaxTemp = convertTemp(maxTemperature);
    const displayTemp = convertTemp(temperature);
    const displayLowTemp = lowTemperature ? convertTemp(lowTemperature) : undefined;
    const displayHighTemp = highTemperature ? convertTemp(highTemperature) : undefined;
    // Use full available space for half-circle (150px radius from 300px width)
    const maxRadius = 150; // Use full width radius for maximum gauge size
    const paddingPixels = (maxRadius * padding) / 100; // Convert percentage to pixels  
    const radius = maxRadius - paddingPixels; // Calculate actual radius with padding
    const centerX = 150; // Center horizontally
    const centerY = 150; // Center at bottom of viewBox
    // Extra height for label padding (no rectangle, just space)
    const extraHeight = paddingPixels;
    // Standard half-circle from left to right
    const arcStartAngle = 180; // Left side (9 o'clock)
    const arcEndAngle = 0; // Right side (3 o'clock)
    const totalAngle = 180; // 180° total sweep
    // Calculate needle angle based on temperature - use same range as ticks
    const tempRange = displayMaxTemp - displayMinTemp;
    const tempRatio = Math.max(0, Math.min(1, (displayTemp - displayMinTemp) / tempRange));
    const needleAngle = arcStartAngle + (tempRatio * totalAngle); // Add because we go 180° → 270° → 0°
    // Convert degrees to radians
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    // Generate tick marks and numbers
    const generateTicks = () => {
        const ticks = [];
        const numbers = [];
        // Determine tick intervals based on temperature range for half-circle layout
        let majorTickInterval;
        let minorTicksPerMajor = 4;
        if (tempRange <= 50) {
            majorTickInterval = 10;
            minorTicksPerMajor = 2;
        }
        else if (tempRange <= 100) {
            majorTickInterval = 20;
            minorTicksPerMajor = 4;
        }
        else if (tempRange <= 200) {
            majorTickInterval = 40;
            minorTicksPerMajor = 4;
        }
        else {
            majorTickInterval = 50;
            minorTicksPerMajor = 5;
        }
        const minorTickInterval = majorTickInterval / minorTicksPerMajor;
        for (let i = displayMinTemp; i <= displayMaxTemp; i += minorTickInterval) {
            const isMajor = Math.abs((i - displayMinTemp) % majorTickInterval) < 0.01;
            const angle = arcStartAngle + ((i - displayMinTemp) / tempRange) * totalAngle;
            const angleRad = toRadians(angle);
            const innerRadius = radius - (isMajor ? 15 : 8);
            const outerRadius = radius;
            const x1 = centerX + innerRadius * Math.cos(angleRad);
            const y1 = centerY + innerRadius * Math.sin(angleRad);
            const x2 = centerX + outerRadius * Math.cos(angleRad);
            const y2 = centerY + outerRadius * Math.sin(angleRad);
            // Color logic: blue for low temps, red for high temps, normal for middle
            let tickColor = isMajor ? mergedColors.tickMajor : mergedColors.tickMinor;
            if (displayLowTemp && i <= displayLowTemp) {
                tickColor = '#0066ff'; // Blue for low temperatures
            }
            else if (displayHighTemp && i >= displayHighTemp) {
                tickColor = '#ff0000'; // Red for high temperatures
            }
            ticks.push(<Line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tickColor} strokeWidth={isMajor ? 2 : 1} key={`tick-${i}`}/>);
            // Add numbers for major ticks
            if (isMajor) {
                const numberRadius = radius - 25;
                const numberX = centerX + numberRadius * Math.cos(angleRad);
                const numberY = centerY + numberRadius * Math.sin(angleRad);
                // Color logic for numbers: blue for low temps, red for high temps, normal for middle
                let numberColor = mergedColors.numbers;
                if (displayLowTemp && i <= displayLowTemp) {
                    numberColor = '#0066ff'; // Blue for low temperatures
                }
                else if (displayHighTemp && i >= displayHighTemp) {
                    numberColor = '#ff0000'; // Red for high temperatures
                }
                // Display temperature as integer
                const displayNumber = Math.round(i).toString();
                numbers.push(<SvgText x={numberX} y={numberY} fontSize={mergedFonts.numbers.fontSize} fontFamily={mergedFonts.numbers.fontFamily} fontWeight={mergedFonts.numbers.fontWeight} fill={numberColor} textAnchor="middle" alignmentBaseline="middle" key={`number-${i}`}>
            {displayNumber}
          </SvgText>);
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
        const needleLength = radius - 20; // Proper needle length with some clearance
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
        {
            ...styles.container,
            aspectRatio: 300 / (150 + extraHeight), // Dynamic ratio accounting for extra height
        },
        size.width ? { width: size.width } : {},
        size.height ? { height: size.height } : {},
    ];
    const unitSymbol = units === 'fahrenheit' ? '°F' : '°C';
    return (<View style={containerStyle}>
      <View style={[styles.gaugeContainer, { backgroundColor: mergedColors.background }]}>
        <Svg width="100%" height="100%" viewBox={`0 0 300 ${150 + extraHeight}`}>

          
          {/* Main arc */}
          <Path d={generateArc()} stroke={mergedColors.arc} strokeWidth="3" fill="none"/>
          
          {/* Tick marks */}
          <G>{ticks}</G>
          
          {/* Numbers */}
          <G>{numbers}</G>
          
          {/* Center dot */}
          <Circle cx={centerX} cy={centerY} r="8" fill={mergedColors.needle}/>
          
          {/* Needle */}
          <Path d={generateNeedle()} fill={mergedColors.needle} stroke={mergedColors.needle} strokeWidth="1"/>
          

        </Svg>
        
        {/* Digital temperature display */}
        {showDigitalTemperature && (<View style={styles.digitalTemperatureContainer}>
            <Text style={[
                styles.digitalTemperature,
                {
                    color: mergedColors.digitalSpeed,
                    fontSize: mergedFonts.digitalSpeed.fontSize,
                    fontFamily: mergedFonts.digitalSpeed.fontFamily,
                    fontWeight: mergedFonts.digitalSpeed.fontWeight,
                },
            ]}>
              {Math.round(displayTemp)}
            </Text>
            <Text style={[
                styles.digitalUnits,
                {
                    color: mergedColors.digitalSpeed,
                    fontSize: mergedFonts.units.fontSize,
                    fontFamily: mergedFonts.units.fontFamily,
                    fontWeight: mergedFonts.units.fontWeight,
                },
            ]}>
              {unitSymbol}
            </Text>
          </View>)}

        {/* Temperature indicator */}
        <View style={styles.temperatureContainer}>
          <Text style={[
            styles.temperatureText,
            {
                color: mergedColors.numbers,
                fontSize: Math.max(10, (mergedFonts.units.fontSize || 14) - 2),
                fontFamily: mergedFonts.units.fontFamily,
                fontWeight: mergedFonts.units.fontWeight,
            },
        ]}>
            TEMP
          </Text>
        </View>
      </View>
    </View>);
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
    digitalTemperatureContainer: {
        position: 'absolute',
        bottom: 35,
        alignItems: 'center',
    },
    digitalTemperature: {
        textAlign: 'center',
    },
    digitalUnits: {
        textAlign: 'center',
        opacity: 0.8,
    },
    temperatureContainer: {
        position: 'absolute',
        bottom: 75, // Position above digital display
        alignItems: 'center',
    },
    temperatureText: {
        textAlign: 'center',
        opacity: 0.7,
    },
});
//# sourceMappingURL=GaugeTemperature.js.map