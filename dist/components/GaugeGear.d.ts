import React from 'react';
import { GaugeGearProps } from '../types';
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
export declare const GaugeGear: React.FC<GaugeGearProps>;
//# sourceMappingURL=GaugeGear.d.ts.map