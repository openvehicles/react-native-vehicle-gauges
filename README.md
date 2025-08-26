# React Native Vehicle Gauges

A comprehensive suite of React Native components for displaying vehicle gauge clusters as seen in cars and motorcycles. Create stunning, customizable dashboard displays with authentic automotive styling.

## Features

- 🚗 **Authentic Design**: Components inspired by real vehicle dashboards
- ⚡ **High Performance**: Optimized for smooth animations and real-time updates
- 🎨 **Fully Customizable**: Colors, fonts, sizes, and styling options
- 📱 **React Native**: Works on both iOS and Android
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 🏍️ **Multiple Vehicle Types**: Support for cars, motorcycles, and custom gauges

## Installation

```bash
npm install react-native-vehicle-gauges react-native-svg
```

**Note:** If you encounter peer dependency conflicts during installation, use:
```bash
npm install react-native-vehicle-gauges react-native-svg --legacy-peer-deps
```

### iOS Setup

For iOS, you need to install pods:

```bash
cd ios && pod install
```

### Android Setup

No additional setup required for Android.

## Components

### GaugeSpeedometer

A customizable speedometer gauge with analog display and optional digital readout.

### GaugeTachometer

A customizable tachometer (RPM) gauge with analog display and optional digital readout.

### GaugeBattery

A customizable battery voltage gauge with analog display and optional digital readout.

#### Tachometer Features
- Configurable RPM range (min/max)
- Redline zone indication
- Smart tick intervals based on RPM range
- RPM display in thousands (e.g., 6000 RPM shows as "6")
- Customizable colors and fonts
- Optional digital RPM display
- Responsive sizing

#### Battery Features
- Half-circle design (180° arc from left to right, flat base)
- Configurable voltage range (min/max)
- Low voltage warning zone
- Enhanced tick intervals with more frequent labels
- Voltage display with decimal precision
- Automotive-optimized defaults (10.0-16.0V)
- Customizable colors and fonts
- Optional digital voltage display
- Responsive sizing

#### Speedometer Features
- Configurable speed range (min/max)
- Redline zone indication
- Multiple unit support (mph/kph)
- Customizable colors and fonts
- Optional digital speed display
- Responsive sizing

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | `number` | `0` | Current speed value |
| `minSpeed` | `number` | `0` | Minimum speed on the gauge |
| `maxSpeed` | `number` | `200` | Maximum speed on the gauge |
| `redlineSpeed` | `number` | `undefined` | Speed at which redline zone begins |
| `units` | `'mph' \| 'kph'` | `'mph'` | Speed units |
| `size` | `{ width?: number \| string, height?: number \| string }` | `{ width: '100%', height: '100%' }` | Gauge dimensions |
| `colors` | `GaugeColors` | See below | Color customization |
| `fonts` | `GaugeFonts` | See below | Font customization |
| `showDigitalSpeed` | `boolean` | `true` | Show digital speed display |
| `padding` | `number` | `15` | Padding around gauge as percentage of radius |

#### Tachometer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rpm` | `number` | `0` | Current RPM value |
| `minRpm` | `number` | `0` | Minimum RPM on the gauge |
| `maxRpm` | `number` | `8000` | Maximum RPM on the gauge |
| `redlineRpm` | `number` | `undefined` | RPM at which redline zone begins |
| `size` | `{ width?: number \| string, height?: number \| string }` | `{ width: '100%', height: '100%' }` | Gauge dimensions |
| `colors` | `GaugeColors` | See below | Color customization |
| `fonts` | `GaugeFonts` | See below | Font customization |
| `showDigitalRpm` | `boolean` | `true` | Show digital RPM display |
| `padding` | `number` | `15` | Padding around gauge as percentage of radius |

#### Battery Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `voltage` | `number` | `12.0` | Current voltage value |
| `minVoltage` | `number` | `10.0` | Minimum voltage on the gauge |
| `maxVoltage` | `number` | `16.0` | Maximum voltage on the gauge |
| `lowVoltage` | `number` | `undefined` | Voltage at which warning zone begins |
| `size` | `{ width?: number \| string, height?: number \| string }` | `{ width: '100%', height: '100%' }` | Gauge dimensions |
| `colors` | `GaugeColors` | See below | Color customization |
| `fonts` | `GaugeFonts` | See below | Font customization |
| `showDigitalVoltage` | `boolean` | `true` | Show digital voltage display |
| `padding` | `number` | `15` | Padding around gauge as percentage of radius |

#### Color Options

```typescript
interface GaugeColors {
  background?: string;
  needle?: string;
  tickMajor?: string;
  tickMinor?: string;
  numbers?: string;
  redline?: string;
  digitalSpeed?: string;
  arc?: string;
}
```

#### Font Options

```typescript
interface GaugeFonts {
  numbers?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
  };
  digitalSpeed?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
  };
  units?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
  };
}
```

## Usage

```typescript
import React from 'react';
import { View } from 'react-native';
import { GaugeSpeedometer, GaugeTachometer, GaugeBattery, GaugeFuel, GaugeTemperature } from 'react-native-vehicle-gauges';

export default function App() {
  const [speed, setSpeed] = React.useState(65);
  const [rpm, setRpm] = React.useState(3500);
  const [voltage, setVoltage] = React.useState(12.6);
  const [fuelLevel, setFuelLevel] = React.useState(75);
  const [temperature, setTemperature] = React.useState(85);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <GaugeSpeedometer
        speed={speed}
        minSpeed={0}
        maxSpeed={180}
        redlineSpeed={140}
        units="mph"
        size={{ width: 300, height: 300 }}
        theme="auto" // Automatic theme detection
        showDigitalSpeed={true}
        padding={10} // 10% padding for tighter appearance
        colors={{
          needle: '#FF4444',
          redline: '#FF0000',
          digitalSpeed: '#00FF00'
        }}
      />
      
      <GaugeTachometer
        rpm={rpm}
        minRpm={0}
        maxRpm={8000}
        redlineRpm={6500}
        size={{ width: 300, height: 300 }}
        showDigitalRpm={true}
        colors={{
          needle: '#FF6B35',
          redline: '#FF0000',
          digitalSpeed: '#FF6B35'
        }}
      />
      
      <GaugeBattery
        voltage={voltage}
        minVoltage={10.0}
        maxVoltage={16.0}
        lowVoltage={12.0}
        size={{ width: 300, height: 150 }}
        showDigitalVoltage={true}
        colors={{
          needle: '#4CAF50',
          redline: '#FF5722',
          digitalSpeed: '#4CAF50'
        }}
      />
      
      <GaugeFuel
        fuelLevel={fuelLevel}
        tankCapacity={60} // 60 litres
        lowFuelThreshold={20}
        units="litres"
        size={{ width: 300, height: 150 }}
        showDigitalLevel={true}
        colors={{
          needle: '#2196F3',
          redline: '#FF5722',
          digitalSpeed: '#2196F3'
        }}
      />
      
      <GaugeTemperature
        temperature={temperature}
        minTemperature={60}
        maxTemperature={120}
        lowTemperature={75}
        highTemperature={105}
        units="celsius"
        size={{ width: 300, height: 150 }}
        showDigitalTemperature={true}
        colors={{
          needle: '#FF9800',
          redline: '#F44336',
          digitalSpeed: '#FF9800'
        }}
      />
    </View>
  );
}
```

## Theming

The gauge library includes a powerful theming system that automatically detects your app's theme and provides beautiful defaults while allowing full customization.

### Automatic Theme Detection

The gauges automatically detect themes from:
- **React Navigation**: `@react-navigation/native`
- **React Native Paper**: `react-native-paper`

### Theme Usage

```typescript
// Automatic theme detection (recommended)
<GaugeSpeedometer speed={65} />

// Explicit theme
<GaugeSpeedometer speed={65} theme="dark" />

// Theme with custom colors
<GaugeSpeedometer 
  speed={65}
  theme="auto"
  colors={{
    needle: '#ff6b35', // Custom orange needle
    redline: '#ff1744'  // Custom red redline
  }}
/>
```

### Theme Options

- `'auto'` (default): Automatically detects current app theme
- `'light'`: Forces light theme
- `'dark'`: Forces dark theme

### Built-in Themes

**Light Theme:**
- Background: `#ffffff`
- Arc: `#e0e0e0`
- Needle: `#2196f3`
- Text: `#333333`

**Dark Theme:**
- Background: `#1a1a1a`
- Arc: `#333333`
- Needle: `#00ff00`
- Text: `#ffffff`

## Examples

Check out the `examples/` directory for complete implementation examples:

- **BasicSpeedometer**: Simple speedometer setup
- **CustomizedSpeedometer**: Advanced customization options
- **AnimatedSpeedometer**: Animated speed changes
- **TachometerExample**: Complete tachometer demonstrations
- **BatteryExample**: Battery voltage monitoring with status indicators

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch for changes during development
npm run dev

# Run linting
npm run lint

# Run tests
npm run test
```

## Contributing

We welcome contributions! Please read our contributing guidelines and submit pull requests to help improve this library.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [x] ~~Tachometer gauge~~ ✅ **Completed**
- [x] ~~Battery voltage gauge~~ ✅ **Completed**
- [x] ~~Theme system~~ ✅ **Completed**
- [x] ~~Fuel gauge~~ ✅ **Completed**
- [x] ~~Temperature gauge~~ ✅ **Completed**
- [ ] Oil pressure gauge

## Support

If you encounter any issues or have questions, please file an issue on our [GitHub repository](https://github.com/yourusername/react-native-vehicle-gauges/issues).
