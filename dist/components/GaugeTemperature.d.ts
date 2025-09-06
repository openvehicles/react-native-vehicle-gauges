import React from 'react';
import { GaugeTemperatureProps } from '../types';
/**
 * GaugeTemperature - A half-circle temperature gauge with color-coded safety zones
 *
 * Features:
 * - Half-circle design for space-efficient dashboard integration
 * - Color-coded safety zones: blue (cold), normal (middle), red (hot)
 * - Celsius/Fahrenheit support with automatic unit conversion
 * - Configurable temperature thresholds for safety warnings
 * - Smart tick intervals adapted for temperature ranges
 * - Digital temperature display with unit symbol (°C/°F)
 *
 * Design Notes:
 * - Uses blue color (#0066ff) for low temperatures, red for high temperatures
 * - Tick intervals: 10° (≤50°), 20° (≤100°), 40° (≤200°), 50° (>200°)
 * - Temperature conversion handled internally, users provide Celsius values
 * - Numbers display as integers for cleaner appearance
 * - Color coding applies to both tick marks and number labels
 * - Supports wide range: -40°C to 120°C default (automotive applications)
 */
export declare const GaugeTemperature: React.FC<GaugeTemperatureProps>;
//# sourceMappingURL=GaugeTemperature.d.ts.map