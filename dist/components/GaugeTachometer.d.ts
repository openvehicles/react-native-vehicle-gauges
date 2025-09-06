import React from 'react';
import { GaugeTachometerProps } from '../types';
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
export declare const GaugeTachometer: React.FC<GaugeTachometerProps>;
//# sourceMappingURL=GaugeTachometer.d.ts.map