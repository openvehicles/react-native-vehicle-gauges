import { GaugeColors } from '../types';
export declare const GAUGE_THEMES: {
    readonly light: {
        readonly background: "#ffffff";
        readonly arc: "#e0e0e0";
        readonly needle: "#2196f3";
        readonly tickMajor: "#333333";
        readonly tickMinor: "#999999";
        readonly numbers: "#333333";
        readonly digitalSpeed: "#2196f3";
        readonly redline: "#f44336";
    };
    readonly dark: {
        readonly background: "#1a1a1a";
        readonly arc: "#333333";
        readonly needle: "#00ff00";
        readonly tickMajor: "#ffffff";
        readonly tickMinor: "#888888";
        readonly numbers: "#ffffff";
        readonly digitalSpeed: "#00ff00";
        readonly redline: "#ff4444";
    };
};
export type GaugeThemeMode = 'light' | 'dark' | 'auto';
export declare const useGaugeTheme: () => {
    isDark: boolean;
    navigationTheme: any;
    paperTheme: any;
};
export declare const resolveThemeColors: (userColors?: Partial<GaugeColors>, themeMode?: GaugeThemeMode) => GaugeColors;
//# sourceMappingURL=index.d.ts.map