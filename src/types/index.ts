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
  size?: GaugeSize;
  theme?: GaugeThemeMode;
  colors?: GaugeColors;
  fonts?: GaugeFonts;
  showDigitalSpeed?: boolean;
  padding?: number; // Padding as percentage of radius (default 15%)
}

export interface GaugeTachometerProps {
  rpm: number;
  minRpm?: number;
  maxRpm?: number;
  redlineRpm?: number;
  size?: GaugeSize;
  theme?: GaugeThemeMode;
  colors?: GaugeColors;
  fonts?: GaugeFonts;
  showDigitalRpm?: boolean;
  padding?: number; // Padding as percentage of radius (default 15%)
}

export interface GaugeBatteryProps {
  voltage: number;
  minVoltage?: number;
  maxVoltage?: number;
  lowVoltage?: number; // Warning zone threshold
  size?: GaugeSize;
  theme?: GaugeThemeMode;
  colors?: GaugeColors;
  fonts?: GaugeFonts;
  showDigitalVoltage?: boolean;
  padding?: number; // Padding as percentage of radius (default 15%)
}

export type FuelUnits = 'percentage' | 'litres' | 'gallons';

export interface GaugeFuelProps {
  fuelLevel: number; // Fuel level as percentage (0-100)
  tankCapacity?: number; // Tank capacity in litres or gallons (for display)
  lowFuelThreshold?: number; // Warning zone threshold (default 25%)
  units?: FuelUnits; // Display units (default 'percentage')
  size?: GaugeSize;
  theme?: GaugeThemeMode;
  colors?: GaugeColors;
  fonts?: GaugeFonts;
  showDigitalLevel?: boolean;
  padding?: number; // Padding as percentage of radius (default 15%)
}

export type TemperatureUnits = 'celsius' | 'fahrenheit';

export interface GaugeTemperatureProps {
  temperature: number; // Current temperature
  minTemperature?: number; // Minimum temperature (default -40°C/-40°F)
  maxTemperature?: number; // Maximum temperature (default 120°C/250°F)
  lowTemperature?: number; // Low temperature threshold (blue zone)
  highTemperature?: number; // High temperature threshold (red zone)
  units?: TemperatureUnits; // Display units (default 'celsius')
  size?: GaugeSize;
  theme?: GaugeThemeMode;
  colors?: GaugeColors;
  fonts?: GaugeFonts;
  showDigitalTemperature?: boolean;
  padding?: number; // Padding as percentage of radius (default 15%)
}

export type PressureUnits = 'psi' | 'bar' | 'kpa';

export interface GaugeOilPressureProps {
  pressure: number; // Current oil pressure
  minPressure?: number; // Minimum pressure (default 0)
  maxPressure?: number; // Maximum pressure (default 100 psi/7 bar/700 kPa)
  lowPressure?: number; // Low pressure threshold (red zone on left)
  highPressure?: number; // High pressure threshold (red zone on right)
  units?: PressureUnits; // Display units (default 'psi')
  size?: GaugeSize;
  theme?: GaugeThemeMode;
  colors?: GaugeColors;
  fonts?: GaugeFonts;
  showDigitalPressure?: boolean;
  padding?: number; // Padding as percentage of radius (default 15%)
}

export type GaugeGearOrientation = 'portrait' | 'landscape';

export interface GaugeGearProps {
  currentGear: string; // Current selected gear (e.g., 'P', 'R', 'N', 'D')
  gears?: string[]; // Available gears (default ['P', 'R', 'N', 'D'])
  orientation?: GaugeGearOrientation; // Layout orientation (default 'portrait')
  size?: GaugeSize;
  theme?: GaugeThemeMode;
  colors?: GaugeColors;
  fonts?: GaugeFonts;
  padding?: number; // Padding as percentage of width/height (default 10%)
}


