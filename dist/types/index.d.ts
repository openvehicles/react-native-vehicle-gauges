export interface GaugeColors {
    background?: string;
    needle?: string;
    tickMajor?: string;
    tickMinor?: string;
    numbers?: string;
    redline?: string;
    digitalSpeed?: string;
    arc?: string;
}
type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
export interface GaugeFonts {
    numbers?: {
        fontSize?: number;
        fontFamily?: string;
        fontWeight?: FontWeight;
    };
    digitalSpeed?: {
        fontSize?: number;
        fontFamily?: string;
        fontWeight?: FontWeight;
    };
    units?: {
        fontSize?: number;
        fontFamily?: string;
        fontWeight?: FontWeight;
    };
}
export interface GaugeSize {
    width?: number | string;
    height?: number | string;
}
export type SpeedUnits = 'mph' | 'kph';
export type GaugeThemeMode = 'light' | 'dark' | 'auto';
export interface GaugeSpeedometerProps {
    speed: number;
    minSpeed?: number;
    maxSpeed?: number;
    redlineSpeed?: number;
    units?: SpeedUnits;
    label?: string;
    size?: GaugeSize;
    theme?: GaugeThemeMode;
    colors?: GaugeColors;
    fonts?: GaugeFonts;
    showDigitalSpeed?: boolean;
    padding?: number;
    needleLength?: number;
    tickLengthMajor?: number;
    tickLengthMinor?: number;
    centerDotRadius?: number;
    digitalDisplayPosition?: number;
    labelPosition?: number;
}
export interface GaugeTachometerProps {
    rpm: number;
    minRpm?: number;
    maxRpm?: number;
    redlineRpm?: number;
    label?: string;
    size?: GaugeSize;
    theme?: GaugeThemeMode;
    colors?: GaugeColors;
    fonts?: GaugeFonts;
    showDigitalRpm?: boolean;
    padding?: number;
    needleLength?: number;
    tickLengthMajor?: number;
    tickLengthMinor?: number;
    centerDotRadius?: number;
    digitalDisplayPosition?: number;
    labelPosition?: number;
    multiplierLabelPosition?: number;
}
export interface GaugeBatteryProps {
    voltage: number;
    minVoltage?: number;
    maxVoltage?: number;
    lowVoltage?: number;
    label?: string;
    size?: GaugeSize;
    theme?: GaugeThemeMode;
    colors?: GaugeColors;
    fonts?: GaugeFonts;
    showDigitalVoltage?: boolean;
    padding?: number;
    needleLength?: number;
    tickLengthMajor?: number;
    tickLengthMinor?: number;
    centerDotRadius?: number;
    digitalDisplayPosition?: number;
    labelPosition?: number;
}
export type FuelUnits = 'percentage' | 'litres' | 'gallons';
export interface GaugeFuelProps {
    fuelLevel: number;
    tankCapacity?: number;
    lowFuelThreshold?: number;
    units?: FuelUnits;
    label?: string;
    size?: GaugeSize;
    theme?: GaugeThemeMode;
    colors?: GaugeColors;
    fonts?: GaugeFonts;
    showDigitalLevel?: boolean;
    padding?: number;
    needleLength?: number;
    tickLengthMajor?: number;
    tickLengthMinor?: number;
    centerDotRadius?: number;
    digitalDisplayPosition?: number;
    labelPosition?: number;
}
export type TemperatureUnits = 'celsius' | 'fahrenheit';
export interface GaugeTemperatureProps {
    temperature: number;
    minTemperature?: number;
    maxTemperature?: number;
    lowTemperature?: number;
    highTemperature?: number;
    units?: TemperatureUnits;
    label?: string;
    size?: GaugeSize;
    theme?: GaugeThemeMode;
    colors?: GaugeColors;
    fonts?: GaugeFonts;
    showDigitalTemperature?: boolean;
    padding?: number;
    needleLength?: number;
    tickLengthMajor?: number;
    tickLengthMinor?: number;
    centerDotRadius?: number;
    digitalDisplayPosition?: number;
    labelPosition?: number;
}
export type PressureUnits = 'psi' | 'bar' | 'kpa';
export interface GaugeOilPressureProps {
    pressure: number;
    minPressure?: number;
    maxPressure?: number;
    lowPressure?: number;
    highPressure?: number;
    units?: PressureUnits;
    label?: string;
    size?: GaugeSize;
    theme?: GaugeThemeMode;
    colors?: GaugeColors;
    fonts?: GaugeFonts;
    showDigitalPressure?: boolean;
    padding?: number;
    needleLength?: number;
    tickLengthMajor?: number;
    tickLengthMinor?: number;
    centerDotRadius?: number;
    digitalDisplayPosition?: number;
    labelPosition?: number;
}
export type GaugeGearOrientation = 'portrait' | 'landscape';
export interface GaugeGearProps {
    currentGear: string;
    gears?: string[];
    orientation?: GaugeGearOrientation;
    label?: string;
    size?: GaugeSize;
    theme?: GaugeThemeMode;
    colors?: GaugeColors;
    fonts?: GaugeFonts;
    padding?: number;
    gearSize?: number;
    connectingLineThickness?: number;
    gearMargin?: number;
    borderRadius?: number;
}
export {};
//# sourceMappingURL=index.d.ts.map