import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GaugeGearProps, GaugeColors, GaugeFonts } from '../types';
import { resolveThemeColors } from '../themes';

const DEFAULT_COLORS: Required<GaugeColors> = {
  background: '#1a1a1a',
  needle: '#00ff00', // Not used for gear gauge
  tickMajor: '#ffffff',
  tickMinor: '#888888',
  numbers: '#ffffff',
  redline: '#ff0000', // Not used for gear gauge
  digitalSpeed: '#00ff00', // Used for active gear color
  arc: '#333333', // Used for inactive gear color
};

const DEFAULT_FONTS: Required<GaugeFonts> = {
  numbers: {
    fontSize: 32,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  digitalSpeed: {
    fontSize: 36,
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
 * GaugeGear - A rectangular gear selector with dynamic scaling and dual orientation support
 * 
 * Features:
 * - Portrait (vertical) or landscape (horizontal) orientation modes
 * - Dynamic sizing that automatically adapts to gear count (3-8+ gears)
 * - Customizable gear sets: PRND (automatic), 1-6 (manual), CVT, etc.
 * - Visual feedback: active gear highlighting with color and size changes
 * - Connecting lines between gears for visual continuity
 * - Responsive typography that scales with gear count
 * 
 * Design Notes:
 * - Base sizing optimized for 4 gears (PRND), scales down for more gears
 * - Size scale calculation: currentGearCount > 4 ? 4/currentGearCount : 1
 * - Active gear: larger size, filled background, different text color
 * - Inactive gears: smaller size, transparent background, border only
 * - Layout: flexDirection changes based on orientation (row/column)
 * - Connecting lines positioned between gears, skip first/last positions
 * - Typography scales: larger font for active gear, smaller for inactive
 * 
 * Unique Aspects:
 * - Only non-circular gauge in the library
 * - Only gauge with dramatic visual state changes (active vs inactive)
 * - Only gauge with completely dynamic element count
 * - Uses View/Text instead of SVG for better text rendering flexibility
 */
export const GaugeGear: React.FC<GaugeGearProps> = ({
  currentGear = 'P',
  gears = ['P', 'R', 'N', 'D'],
  orientation = 'portrait',
  label = 'GEAR',
  size = { width: '100%', height: '100%' },
  theme = 'auto',
  colors = {},
  fonts = {},
  padding = 10, // Default 10% padding
  gearSize = 45,
  connectingLineThickness = 8,
  gearMargin = 1,
  borderRadius = 15,
}) => {
  const mergedColors = resolveThemeColors(colors, theme);
  const mergedFonts = {
    numbers: { ...DEFAULT_FONTS.numbers, ...(fonts.numbers || {}) },
    digitalSpeed: { ...DEFAULT_FONTS.digitalSpeed, ...(fonts.digitalSpeed || {}) },
    units: { ...DEFAULT_FONTS.units, ...(fonts.units || {}) },
  };

  const containerStyle = [
    styles.container,
    {
      backgroundColor: mergedColors.background,
      aspectRatio: orientation === 'landscape' ? 2.5 : 1 / 2.5, // Flip aspect ratio for landscape
      borderRadius: borderRadius,
    },
    size.width ? { width: size.width as any } : {},
    size.height ? { height: size.height as any } : {},
  ];

  // Calculate padding
  const paddingPercentage = padding / 100;

  // Calculate dynamic sizes based on number of gears
  // Base sizes are optimized for 4 gears (PRND)
  const baseGearCount = 4;
  const currentGearCount = gears.length;
  
  // Scale down proportionally if more than 4 gears
  const sizeScale = currentGearCount > baseGearCount ? baseGearCount / currentGearCount : 1;
  
  // Dynamic sizes
  const actualGearSize = Math.round(gearSize * sizeScale);
  const gearRadius = actualGearSize / 2;
  const connectingLineHeight = Math.max(4, Math.round(connectingLineThickness * sizeScale));
  const marginVertical = Math.max(1, Math.round(gearMargin * sizeScale));
  
  // Dynamic font sizes
  const activeFontSize = Math.round((mergedFonts.digitalSpeed.fontSize || 32) * sizeScale);
  const inactiveFontSize = Math.round((mergedFonts.numbers.fontSize || 28) * sizeScale);

  return (
    <View style={containerStyle}>
      <View style={[styles.gearContainer, { backgroundColor: mergedColors.background }]}>
        {/* GEAR label at top */}
        <View style={styles.labelContainer}>
          <Text
            style={[
              styles.labelText,
              {
                color: mergedColors.numbers,
                fontSize: mergedFonts.units.fontSize,
                fontFamily: mergedFonts.units.fontFamily,
                fontWeight: mergedFonts.units.fontWeight,
              },
            ]}
          >
            {label}
          </Text>
        </View>

        {/* Gear positions */}
        <View style={[
          styles.gearsContainer,
          {
            flexDirection: orientation === 'landscape' ? 'row' : 'column',
          }
        ]}>
          {gears.map((gear, index) => {
            const isActive = gear === currentGear;
            const isFirst = index === 0;
            const isLast = index === gears.length - 1;
            
            return (
              <View key={gear} style={[
                styles.gearItemContainer,
                {
                  flexDirection: orientation === 'landscape' ? 'row' : 'column',
                  ...(orientation === 'landscape' 
                    ? { height: '100%', width: undefined } 
                    : { width: '100%', height: undefined }
                  ),
                }
              ]}>
                {/* Connecting line before (except for first item) */}
                {!isFirst && (
                  <View
                    style={[
                      styles.connectingLine,
                      {
                        backgroundColor: mergedColors.tickMinor,
                        ...(orientation === 'landscape' 
                          ? { width: connectingLineHeight, height: 2 } 
                          : { width: 2, height: connectingLineHeight }
                        ),
                      },
                    ]}
                  />
                )}
                
                {/* Gear position */}
                <View
                  style={[
                    styles.gearItem,
                    {
                      backgroundColor: isActive ? mergedColors.digitalSpeed : 'transparent',
                      borderColor: isActive ? mergedColors.digitalSpeed : mergedColors.arc,
                      borderWidth: 2,
                      width: actualGearSize,
                      height: actualGearSize,
                      borderRadius: gearRadius,
                      ...(orientation === 'landscape' 
                        ? { marginHorizontal: marginVertical } 
                        : { marginVertical: marginVertical }
                      ),
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.gearText,
                      {
                        color: isActive ? mergedColors.background : mergedColors.arc,
                        fontSize: isActive ? activeFontSize : inactiveFontSize,
                        fontFamily: isActive ? mergedFonts.digitalSpeed.fontFamily : mergedFonts.numbers.fontFamily,
                        fontWeight: isActive ? mergedFonts.digitalSpeed.fontWeight : mergedFonts.numbers.fontWeight,
                      },
                    ]}
                  >
                    {gear}
                  </Text>
                </View>

                {/* Connecting line after (except for last item) */}
                {!isLast && (
                  <View
                    style={[
                      styles.connectingLine,
                      {
                        backgroundColor: mergedColors.tickMinor,
                        ...(orientation === 'landscape' 
                          ? { width: connectingLineHeight, height: 2 } 
                          : { width: 2, height: connectingLineHeight }
                        ),
                      },
                    ]}
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gearContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  labelText: {
    textAlign: 'center',
    opacity: 0.7,
    letterSpacing: 2,
  },
  gearsContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  gearItemContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  connectingLine: {
    width: 2,
    opacity: 0.5,
  },
  gearItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gearText: {
    textAlign: 'center',
    letterSpacing: 1,
  },
});
