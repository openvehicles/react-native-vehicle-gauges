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
