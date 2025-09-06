import React from 'react';
import { GaugeSpeedometerProps } from '../types';
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
export declare const GaugeSpeedometer: React.FC<GaugeSpeedometerProps>;
//# sourceMappingURL=GaugeSpeedometer.d.ts.map