import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { resolveThemeColors } from '../themes';
/**
 * Default color scheme for the tachometer gauge
 * Uses automotive-style red needle with distinctive redline zone
 */
const DEFAULT_COLORS = {
    background: '#1a1a1a',
    needle: '#ff4444',
    tickMajor: '#ffffff',
    tickMinor: '#888888',
    numbers: '#ffffff',
    redline: '#ff0000',
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
/**
 * GaugeTachometer - A circular RPM gauge with automotive-style design
 *
 * Features:
 * - Full circle design with 270° sweep, identical to speedometer
 * - RPM display in thousands (6000 shows as "6") for automotive convention
 * - Smart tick intervals that adapt to RPM range (500/1000/2000 based on max RPM)
 * - Redline zone support for engine protection warnings
 * - "RPM × 1000" multiplier label positioned at top
 * - Digital RPM display and gauge label positioned at bottom
 * - All visual elements scale proportionally with gauge size
 *
 * Design Notes:
 * - Uses same polar coordinate system as speedometer for consistency
 * - Three separate text displays: numbers (arc), digital (bottom), multiplier (top)
 * - Tick intervals: 500 RPM (≤4000), 1000 RPM (≤8000), 2000 RPM (>8000)
 * - Numbers display simplified format (e.g., "6" instead of "6000")
 */
export const GaugeTachometer = ({ rpm = 0, minRpm = 0, maxRpm = 8000, redlineRpm, label = 'RPM', size = { width: '100%', height: '100%' }, theme = 'auto', colors = {}, fonts = {}, showDigitalRpm = true, padding = 15, // Default 15% padding
needleLength, tickLengthMajor = 15, tickLengthMinor = 8, centerDotRadius = 8, digitalDisplayPosition = 40, labelPosition = 80, multiplierLabelPosition = 120, }) => {
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
    // Calculate needle angle based on RPM
    const rpmRange = maxRpm - minRpm;
    const rpmRatio = Math.max(0, Math.min(1, (rpm - minRpm) / rpmRange));
    const needleAngle = startAngle + (rpmRatio * totalAngle);
    // Convert degrees to radians
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
    /**
     * Generate tick marks and RPM numbers with automotive-style formatting
     * Uses adaptive intervals based on RPM range for optimal readability
     */
    const generateTicks = () => {
        const ticks = [];
        const numbers = [];
        // Smart tick intervals - automotive tachometers use specific intervals
        let majorTickInterval;
        let minorTicksPerMajor = 5;
        if (rpmRange <= 4000) {
            majorTickInterval = 500; // 500 RPM steps for low-rev engines
        }
        else if (rpmRange <= 8000) {
            majorTickInterval = 1000; // 1000 RPM steps for standard engines
        }
        else {
            majorTickInterval = 2000; // 2000 RPM steps for high-rev engines
        }
        const minorTickInterval = majorTickInterval / minorTicksPerMajor;
        for (let i = minRpm; i <= maxRpm; i += minorTickInterval) {
            const isMajor = i % majorTickInterval === 0;
            const angle = startAngle + ((i - minRpm) / rpmRange) * totalAngle;
            const angleRad = toRadians(angle);
            const innerRadius = radius - (isMajor ? tickLengthMajor : tickLengthMinor);
            const outerRadius = radius;
            const x1 = centerX + innerRadius * Math.cos(angleRad);
            const y1 = centerY + innerRadius * Math.sin(angleRad);
            const x2 = centerX + outerRadius * Math.cos(angleRad);
            const y2 = centerY + outerRadius * Math.sin(angleRad);
            const tickColor = redlineRpm && i >= redlineRpm ? mergedColors.redline :
                (isMajor ? mergedColors.tickMajor : mergedColors.tickMinor);
            ticks.push(<Line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tickColor} strokeWidth={isMajor ? 2 : 1} key={`tick-${i}`}/>);
            // Add numbers for major ticks
            if (isMajor) {
                const numberRadius = radius - 25;
                const numberX = centerX + numberRadius * Math.cos(angleRad);
                const numberY = centerY + numberRadius * Math.sin(angleRad);
                const numberColor = redlineRpm && i >= redlineRpm ? mergedColors.redline : mergedColors.numbers;
                // Automotive convention: display RPM in thousands (e.g., 6000 -> "6")
                // This reduces visual clutter and follows industry standards
                const displayNumber = i >= 1000 ? (i / 1000).toString() : i.toString();
                numbers.push(<SvgText x={numberX} y={numberY} fontSize={mergedFonts.numbers.fontSize} fontFamily={mergedFonts.numbers.fontFamily} fontWeight={mergedFonts.numbers.fontWeight} fill={numberColor} textAnchor="middle" alignmentBaseline="middle" key={`number-${i}`}>
            {displayNumber}
          </SvgText>);
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
        const actualNeedleLength = needleLength !== null && needleLength !== void 0 ? needleLength : (radius - 20);
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
        styles.container,
        size.width ? { width: size.width } : {},
        size.height ? { height: size.height } : {},
    ];
    return (<View style={containerStyle}>
      <View style={[styles.gaugeContainer, { backgroundColor: mergedColors.background }]}>
        <Svg width="100%" height="100%" viewBox="0 0 300 300">
          {/* Main arc */}
          <Path d={generateArc()} stroke={mergedColors.arc} strokeWidth="3" fill="none"/>
          
          {/* Tick marks */}
          <G>{ticks}</G>
          
          {/* Numbers */}
          <G>{numbers}</G>
          
          {/* Center dot */}
          <Circle cx={centerX} cy={centerY} r={centerDotRadius} fill={mergedColors.needle}/>
          
          {/* Needle */}
          <Path d={generateNeedle()} fill={mergedColors.needle} stroke={mergedColors.needle} strokeWidth="1"/>
        </Svg>
        
        {/* Digital RPM display */}
        {showDigitalRpm && (<View style={[styles.digitalRpmContainer, { bottom: digitalDisplayPosition }]}>
            <Text style={[
                styles.digitalRpm,
                {
                    color: mergedColors.digitalSpeed,
                    fontSize: mergedFonts.digitalSpeed.fontSize,
                    fontFamily: mergedFonts.digitalSpeed.fontFamily,
                    fontWeight: mergedFonts.digitalSpeed.fontWeight,
                },
            ]}>
              {Math.round(rpm)}
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
              RPM
            </Text>
          </View>)}

        {/* RPM x1000 indicator */}
        <View style={[styles.multiplierContainer, { top: multiplierLabelPosition }]}>
          <Text style={[
            styles.multiplierText,
            {
                color: mergedColors.numbers,
                fontSize: Math.max(10, (mergedFonts.units.fontSize || 14) - 2),
                fontFamily: mergedFonts.units.fontFamily,
                fontWeight: mergedFonts.units.fontWeight,
            },
        ]}>
            RPM × 1000
          </Text>
        </View>

        {/* RPM label */}
        <View style={[styles.rpmContainer, { bottom: labelPosition }]}>
          <Text style={[
            styles.rpmText,
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
        aspectRatio: 1,
    },
    gaugeContainer: {
        flex: 1,
        borderRadius: 150,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    digitalRpmContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    digitalRpm: {
        textAlign: 'center',
    },
    digitalUnits: {
        textAlign: 'center',
        opacity: 0.8,
    },
    multiplierContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    multiplierText: {
        textAlign: 'center',
        opacity: 0.7,
    },
    rpmContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    rpmText: {
        textAlign: 'center',
        opacity: 0.7,
    },
});
//# sourceMappingURL=GaugeTachometer.js.map