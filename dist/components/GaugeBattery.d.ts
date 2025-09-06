import React from 'react';
import { GaugeBatteryProps } from '../types';
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
export declare const GaugeBattery: React.FC<GaugeBatteryProps>;
//# sourceMappingURL=GaugeBattery.d.ts.map