import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { resolveThemeColors } from '../themes';
const DEFAULT_COLORS = {
    background: '#1a1a1a',
    needle: '#4CAF50', // Green for fuel
    tickMajor: '#ffffff',
    tickMinor: '#888888',
    numbers: '#ffffff',
    redline: '#ff4444', // Red for low fuel warning
    digitalSpeed: '#4CAF50',
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
export const GaugeFuel = ({ fuelLevel = 50.0, tankCapacity, lowFuelThreshold = 25.0, units = 'percentage', label = 'FUEL', size = { width: '100%', height: '100%' }, theme = 'auto', colors = {}, fonts = {}, showDigitalLevel = true, padding = 15, // Default 15% padding
 }) => {
    const mergedColors = resolveThemeColors(colors, theme);
    const mergedFonts = {
        numbers: { ...DEFAULT_FONTS.numbers, ...(fonts.numbers || {}) },
        digitalSpeed: { ...DEFAULT_FONTS.digitalSpeed, ...(fonts.digitalSpeed || {}) },
        units: { ...DEFAULT_FONTS.units, ...(fonts.units || {}) },
    };
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
    // Calculate needle angle based on fuel level (0-100%)
    const fuelRatio = Math.max(0, Math.min(1, fuelLevel / 100));
    const needleAngle = arcStartAngle + (fuelRatio * totalAngle); // Add because we go 180° → 270° → 0°
    // Convert degrees to radians
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    // Generate tick marks and numbers for fuel levels
    const generateTicks = () => {
        const ticks = [];
        const numbers = [];
        // Major ticks at 0%, 25%, 50%, 75%, 100%
        const majorTicks = [0, 25, 50, 75, 100];
        // Minor ticks every 12.5%
        const minorTicks = [12.5, 37.5, 62.5, 87.5];
        // Generate major ticks
        for (const level of majorTicks) {
            const angle = arcStartAngle + (level / 100) * totalAngle;
            const angleRad = toRadians(angle);
            const innerRadius = radius - 15;
            const outerRadius = radius;
            const x1 = centerX + innerRadius * Math.cos(angleRad);
            const y1 = centerY + innerRadius * Math.sin(angleRad);
            const x2 = centerX + outerRadius * Math.cos(angleRad);
            const y2 = centerY + outerRadius * Math.sin(angleRad);
            ticks.push(<Line key={`major-tick-${level}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={mergedColors.tickMajor} strokeWidth="2"/>);
            // Add number labels
            const labelRadius = radius - 25;
            const labelX = centerX + labelRadius * Math.cos(angleRad);
            const labelY = centerY + labelRadius * Math.sin(angleRad);
            // Label text based on position
            let labelText = '';
            if (level === 0)
                labelText = 'E';
            else if (level === 25)
                labelText = '¼';
            else if (level === 50)
                labelText = '½';
            else if (level === 75)
                labelText = '¾';
            else if (level === 100)
                labelText = 'F';
            numbers.push(<SvgText key={`number-${level}`} x={labelX} y={labelY} textAnchor="middle" alignmentBaseline="central" fontSize={mergedFonts.numbers.fontSize} fontFamily={mergedFonts.numbers.fontFamily} fontWeight={mergedFonts.numbers.fontWeight} fill={mergedColors.numbers}>
          {labelText}
        </SvgText>);
        }
        // Generate minor ticks
        for (const level of minorTicks) {
            const angle = arcStartAngle + (level / 100) * totalAngle;
            const angleRad = toRadians(angle);
            const innerRadius = radius - 8;
            const outerRadius = radius;
            const x1 = centerX + innerRadius * Math.cos(angleRad);
            const y1 = centerY + innerRadius * Math.sin(angleRad);
            const x2 = centerX + outerRadius * Math.cos(angleRad);
            const y2 = centerY + outerRadius * Math.sin(angleRad);
            ticks.push(<Line key={`minor-tick-${level}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={mergedColors.tickMinor} strokeWidth="1"/>);
        }
        return { ticks, numbers };
    };
    // Generate arc path
    const generateArc = () => {
        const startAngleRad = toRadians(arcStartAngle);
        const endAngleRad = toRadians(arcEndAngle);
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
        const baseX1 = centerX + baseWidth * Math.cos(needleAngleRad + Math.PI / 2);
        const baseY1 = centerY + baseWidth * Math.sin(needleAngleRad + Math.PI / 2);
        const baseX2 = centerX + baseWidth * Math.cos(needleAngleRad - Math.PI / 2);
        const baseY2 = centerY + baseWidth * Math.sin(needleAngleRad - Math.PI / 2);
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
    // Calculate digital display value
    const getDigitalValue = () => {
        if (units === 'percentage') {
            return `${Math.round(fuelLevel)}%`;
        }
        else if (units === 'litres' && tankCapacity) {
            const litres = (fuelLevel / 100) * tankCapacity;
            return `${litres.toFixed(1)}L`;
        }
        else if (units === 'gallons' && tankCapacity) {
            const gallons = (fuelLevel / 100) * tankCapacity;
            return `${gallons.toFixed(1)}gal`;
        }
        else {
            return `${Math.round(fuelLevel)}%`;
        }
    };
    const getUnitsLabel = () => {
        if (units === 'percentage')
            return '%';
        if (units === 'litres')
            return 'L';
        if (units === 'gallons')
            return 'gal';
        return '%';
    };
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
        
        {/* Digital fuel level display */}
        {showDigitalLevel && (<View style={styles.digitalFuelContainer}>
            <Text style={[
                styles.digitalFuel,
                {
                    color: fuelLevel <= lowFuelThreshold ? mergedColors.redline : mergedColors.digitalSpeed,
                    fontSize: mergedFonts.digitalSpeed.fontSize,
                    fontFamily: mergedFonts.digitalSpeed.fontFamily,
                    fontWeight: mergedFonts.digitalSpeed.fontWeight,
                },
            ]}>
              {getDigitalValue()}
            </Text>
          </View>)}

        {/* Fuel indicator */}
        <View style={styles.fuelContainer}>
          <Text style={[
            styles.fuelText,
            {
                color: mergedColors.numbers,
                fontSize: Math.max(10, (mergedFonts.units.fontSize || 14) - 2),
                fontFamily: mergedFonts.units.fontFamily,
                fontWeight: mergedFonts.units.fontWeight,
            },
        ]}>
            {label}
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
    digitalFuelContainer: {
        position: 'absolute',
        bottom: 35,
        alignItems: 'center',
    },
    digitalFuel: {
        textAlign: 'center',
    },
    fuelContainer: {
        position: 'absolute',
        bottom: 75, // Position above digital display
        alignItems: 'center',
    },
    fuelText: {
        textAlign: 'center',
        opacity: 0.7,
    },
});
//# sourceMappingURL=GaugeFuel.js.map