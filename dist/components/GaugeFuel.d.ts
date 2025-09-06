import React from 'react';
import { GaugeFuelProps } from '../types';
/**
 * GaugeFuel - A half-circle fuel level gauge with traditional automotive markings
 *
 * Features:
 * - Half-circle design matching GaugeBattery layout for consistency
 * - Traditional E-¼-½-¾-F markings following automotive conventions
 * - Multiple display units: percentage, litres, gallons with tank capacity calculation
 * - Low fuel threshold warnings with color changes
 * - Smart digital display that adapts to selected units
 *
 * Design Notes:
 * - Uses fixed major tick positions: 0%, 25%, 50%, 75%, 100%
 * - Minor ticks at 12.5% intervals (8 positions total)
 * - Text labels use fractions (¼, ½, ¾) instead of percentages for authenticity
 * - Digital display shows percentage, volume (L/gal), or calculated amount
 * - Low fuel warning applies to both digital display and future analog zones
 */
export declare const GaugeFuel: React.FC<GaugeFuelProps>;
//# sourceMappingURL=GaugeFuel.d.ts.map