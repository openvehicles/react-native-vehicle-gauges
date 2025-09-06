import React from 'react';
import { GaugeOilPressureProps } from '../types';
/**
 * GaugeOilPressure - A half-circle pressure gauge with dual warning zones for engine safety
 *
 * Features:
 * - Half-circle design optimized for automotive engine monitoring
 * - Dual red warning zones: low pressure (left) and high pressure (right)
 * - Multi-unit support: PSI, Bar, kPa with automatic conversion
 * - Smart tick intervals adapted to pressure ranges and units
 * - Critical safety focus with prominent warning zone coloring
 * - Precision display formatting based on selected units
 *
 * Design Notes:
 * - Unique dual-zone warning system (most gauges have single redline)
 * - Unit conversion: PSI base → Bar (*0.0689476) → kPa (*6.89476)
 * - Red zones for both dangerously low oil pressure and excessive pressure
 * - Display precision: Bar (1 decimal), kPa/PSI (integer), for readability
 * - Tick intervals: 5 (≤20), 10 (≤50), 20 (≤100), 50 (>100) based on range
 * - Color coding extends to both tick marks and number labels
 */
export declare const GaugeOilPressure: React.FC<GaugeOilPressureProps>;
//# sourceMappingURL=GaugeOilPressure.d.ts.map