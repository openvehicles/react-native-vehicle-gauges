import { GaugeColors } from '../types';

// Predefined theme configurations
export const GAUGE_THEMES = {
  light: {
    background: '#ffffff',
    arc: '#e0e0e0',
    needle: '#2196f3',
    tickMajor: '#333333',
    tickMinor: '#999999',
    numbers: '#333333',
    digitalSpeed: '#2196f3',
    redline: '#f44336'
  },
  dark: {
    background: '#1a1a1a',
    arc: '#333333',
    needle: '#00ff00',
    tickMajor: '#ffffff',
    tickMinor: '#888888',
    numbers: '#ffffff',
    digitalSpeed: '#00ff00',
    redline: '#ff4444'
  }
} as const;

export type GaugeThemeMode = 'light' | 'dark' | 'auto';

// Theme detection hook
export const useGaugeTheme = () => {
  // Try to detect react-navigation theme
  let navigationTheme: any = null;
  let paperTheme: any = null;
  let isDark = false;

  try {
    // Attempt to import and use react-navigation theme
    const { useTheme } = require('@react-navigation/native');
    navigationTheme = useTheme();
    isDark = navigationTheme?.dark ?? false;
  } catch (error) {
    // React Navigation not available, try react-native-paper
    try {
      const { useTheme } = require('react-native-paper');
      paperTheme = useTheme();
      isDark = paperTheme?.dark ?? false;
    } catch (error) {
      // Neither available, default to light theme
      isDark = false;
    }
  }

  return { isDark, navigationTheme, paperTheme };
};

// Smart color resolution function
export const resolveThemeColors = (
  userColors?: Partial<GaugeColors>,
  themeMode?: GaugeThemeMode
): GaugeColors => {
  const { isDark } = useGaugeTheme();
  
  // Determine effective theme
  const effectiveTheme = themeMode === 'auto' || !themeMode 
    ? (isDark ? 'dark' : 'light')
    : themeMode;
  
  // Start with theme defaults
  const themeColors = GAUGE_THEMES[effectiveTheme];
  
  // Apply user overrides
  return {
    ...themeColors,
    ...userColors
  };
};
