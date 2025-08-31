# React Native Vehicle Gauges

A comprehensive suite of React Native components for displaying vehicle gauge clusters as seen in cars and motorcycles. Create stunning, customizable dashboard displays with authentic automotive styling.

## DISCLAIMER

This is a very early version of this package, only recently released and only very
recently making its way into a late stage development application. Production ready
code is a while away. If you are not ready for this to not work, or for the next version
to change the API in ways that will break your code, then please don't use this library.

That said, contributions are welcome - via the github repository.

N.B. Any bugs are probably the Cursor AI's, not mine.

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

## API Reference

### Common Props (All Gauges)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `GaugeSize` | `{ width: '100%', height: '100%' }` | Gauge dimensions |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Theme mode with auto-detection |
| `colors` | `GaugeColors` | See below | Color customization |
| `fonts` | `GaugeFonts` | See below | Font customization |
| `padding` | `number` | `15` | Border padding as percentage |
| `label` | `string` | *varies* | Gauge label text (defaults vary by gauge type) |

### Common Props (Circular Gauges)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `needleLength` | `number` | *calculated* | Needle length in pixels from center |
| `tickLengthMajor` | `number` | `15` | Major tick length in pixels |
| `tickLengthMinor` | `number` | `8` | Minor tick length in pixels |
| `centerDotRadius` | `number` | `8` | Center dot radius in pixels |
| `digitalDisplayPosition` | `number` | *varies* | Digital display position from bottom |
| `labelPosition` | `number` | *varies* | Label position from bottom |

### GaugeSpeedometer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `speed` | `number` | `0` | Current speed value |
| `minSpeed` | `number` | `0` | Minimum speed on gauge |
| `maxSpeed` | `number` | `200` | Maximum speed on gauge |
| `redlineSpeed` | `number` | *none* | Speed at which redline zone begins |
| `units` | `'mph' \| 'kph'` | `'mph'` | Speed units |
| `label` | `string` | `'SPEED'` | Gauge label text |
| `showDigitalSpeed` | `boolean` | `true` | Show digital speed display |
| `digitalDisplayPosition` | `number` | `40` | Digital display position from bottom |
| `labelPosition` | `number` | `80` | Label position from bottom |

### GaugeTachometer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rpm` | `number` | `0` | Current RPM value |
| `minRpm` | `number` | `0` | Minimum RPM on gauge |
| `maxRpm` | `number` | `8000` | Maximum RPM on gauge |
| `redlineRpm` | `number` | *none* | RPM at which redline zone begins |
| `label` | `string` | `'RPM'` | Gauge label text |
| `showDigitalRpm` | `boolean` | `true` | Show digital RPM display |
| `digitalDisplayPosition` | `number` | `40` | Digital display position from bottom |
| `labelPosition` | `number` | `80` | Label position from bottom |
| `multiplierLabelPosition` | `number` | `120` | RPM multiplier label position from top |

### GaugeBattery Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `voltage` | `number` | `12.0` | Current voltage value |
| `minVoltage` | `number` | `10.0` | Minimum voltage on gauge |
| `maxVoltage` | `number` | `16.0` | Maximum voltage on gauge |
| `lowVoltage` | `number` | *none* | Voltage at which warning zone begins |
| `label` | `string` | `'BATTERY'` | Gauge label text |
| `showDigitalVoltage` | `boolean` | `true` | Show digital voltage display |
| `digitalDisplayPosition` | `number` | `35` | Digital display position from bottom |
| `labelPosition` | `number` | `75` | Label position from bottom |

### GaugeFuel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fuelLevel` | `number` | `50.0` | Current fuel level (0-100%) |
| `tankCapacity` | `number` | *none* | Tank capacity for volume calculations |
| `lowFuelThreshold` | `number` | `25.0` | Low fuel warning threshold |
| `units` | `'percentage' \| 'litres' \| 'gallons'` | `'percentage'` | Display units |
| `label` | `string` | `'FUEL'` | Gauge label text |
| `showDigitalLevel` | `boolean` | `true` | Show digital fuel level display |
| `digitalDisplayPosition` | `number` | `35` | Digital display position from bottom |
| `labelPosition` | `number` | `75` | Label position from bottom |

### GaugeTemperature Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `temperature` | `number` | `20` | Current temperature value |
| `minTemperature` | `number` | `-40` | Minimum temperature on gauge |
| `maxTemperature` | `number` | `120` | Maximum temperature on gauge |
| `lowTemperature` | `number` | `0` | Low temperature threshold (blue zone) |
| `highTemperature` | `number` | `100` | High temperature threshold (red zone) |
| `units` | `'celsius' \| 'fahrenheit'` | `'celsius'` | Temperature units |
| `label` | `string` | `'TEMP'` | Gauge label text |
| `showDigitalTemperature` | `boolean` | `true` | Show digital temperature display |
| `digitalDisplayPosition` | `number` | `35` | Digital display position from bottom |
| `labelPosition` | `number` | `75` | Label position from bottom |

### GaugeOilPressure Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pressure` | `number` | `30` | Current pressure value |
| `minPressure` | `number` | `0` | Minimum pressure on gauge |
| `maxPressure` | `number` | `100` | Maximum pressure on gauge |
| `lowPressure` | `number` | `15` | Low pressure threshold (red zone) |
| `highPressure` | `number` | `80` | High pressure threshold (red zone) |
| `units` | `'psi' \| 'bar' \| 'kpa'` | `'psi'` | Pressure units |
| `label` | `string` | `'OIL PRESSURE'` | Gauge label text |
| `showDigitalPressure` | `boolean` | `true` | Show digital pressure display |
| `digitalDisplayPosition` | `number` | `35` | Digital display position from bottom |
| `labelPosition` | `number` | `75` | Label position from bottom |

### GaugeGear Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentGear` | `string` | `'P'` | Currently selected gear |
| `gears` | `string[]` | `['P', 'R', 'N', 'D']` | Available gears array |
| `orientation` | `'portrait' \| 'landscape'` | `'portrait'` | Layout orientation |
| `label` | `string` | `'GEAR'` | Gauge label text |
| `gearSize` | `number` | `45` | Individual gear circle size in pixels |
| `connectingLineThickness` | `number` | `8` | Line thickness between gears |
| `gearMargin` | `number` | `1` | Margin between gears |
| `borderRadius` | `number` | `15` | Container border radius |

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

### Basic Usage

```typescript
import React from 'react';
import { View } from 'react-native';
import { 
  GaugeSpeedometer, 
  GaugeTachometer, 
  GaugeBattery,
  GaugeFuel,
  GaugeTemperature,
  GaugeOilPressure,
  GaugeGear 
} from 'react-native-vehicle-gauges';

export default function App() {
  const [speed, setSpeed] = React.useState(65);
  const [rpm, setRpm] = React.useState(3500);
  const [voltage, setVoltage] = React.useState(12.6);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GaugeSpeedometer
        speed={speed}
        maxSpeed={180}
        redlineSpeed={140}
        units="mph"
        size={{ width: 300, height: 300 }}
      />
      
      <GaugeTachometer
        rpm={rpm}
        maxRpm={8000}
        redlineRpm={6500}
        size={{ width: 300, height: 300 }}
      />
      
      <GaugeBattery
        voltage={voltage}
        lowVoltage={12.0}
        size={{ width: 300, height: 150 }}
      />
    </View>
  );
}
```

### Advanced Customization

```typescript
import React from 'react';
import { View } from 'react-native';
import { GaugeSpeedometer } from 'react-native-vehicle-gauges';

export default function CustomSpeedometer() {
  const [speed, setSpeed] = React.useState(85);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GaugeSpeedometer
        speed={speed}
        minSpeed={0}
        maxSpeed={200}
        redlineSpeed={160}
        units="kph"
        size={{ width: 350, height: 350 }}
        theme="dark"
        
        // Visual customization
        needleLength={120}         // Custom needle length
        tickLengthMajor={20}       // Longer major ticks
        tickLengthMinor={10}       // Longer minor ticks
        centerDotRadius={12}       // Larger center dot
        digitalDisplayPosition={45} // Move digital display
        padding={10}               // Tighter padding
        
        // Colors
        colors={{
          background: '#000000',
          needle: '#FF6B35',
          tickMajor: '#FFFFFF',
          tickMinor: '#888888',
          numbers: '#FFFFFF',
          redline: '#FF1744',
          digitalSpeed: '#00E676',
          arc: '#424242'
        }}
        
        // Fonts
        fonts={{
          numbers: {
            fontSize: 18,
            fontFamily: 'System',
            fontWeight: 'bold'
          },
          digitalSpeed: {
            fontSize: 28,
            fontFamily: 'System',
            fontWeight: 'bold'
          }
        }}
      />
    </View>
  );
}
```

### Multi-Gauge Dashboard

```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  GaugeSpeedometer,
  GaugeTachometer,
  GaugeFuel,
  GaugeTemperature,
  GaugeGear 
} from 'react-native-vehicle-gauges';

export default function Dashboard() {
  return (
    <View style={styles.dashboard}>
      {/* Main gauges */}
      <View style={styles.mainGauges}>
        <GaugeSpeedometer
          speed={75}
          maxSpeed={180}
          size={{ width: 200, height: 200 }}
          padding={10}
        />
        <GaugeTachometer
          rpm={3500}
          maxRpm={8000}
          redlineRpm={6500}
          size={{ width: 200, height: 200 }}
          padding={10}
        />
      </View>
      
      {/* Secondary gauges */}
      <View style={styles.secondaryGauges}>
        <GaugeFuel
          fuelLevel={65}
          lowFuelThreshold={20}
          units="percentage"
          size={{ width: 150, height: 100 }}
          digitalDisplayPosition={25}
          labelPosition={50}
        />
        <GaugeTemperature
          temperature={85}
          highTemperature={100}
          units="celsius"
          size={{ width: 150, height: 100 }}
          digitalDisplayPosition={25}
          labelPosition={50}
        />
      </View>
      
      {/* Gear selector */}
      <GaugeGear
        currentGear="D"
        gears={['P', 'R', 'N', 'D', 'S']}
        orientation="landscape"
        size={{ width: 250, height: 80 }}
        gearSize={35}
        connectingLineThickness={6}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainGauges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  secondaryGauges: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
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

## Development

### Building the Library

```bash
# Build TypeScript to dist/
npm run build

# Watch mode for development
npm run dev
```

### Running Examples

```bash
# Start web demo
npm run web

# Build web demo for production
npm run web:build
```

### Publishing

The library follows npm best practices:

1. **Build files are included in Git** for reliability
2. **Automatic build before publish** via `prepublishOnly` script
3. **Full TypeScript support** with declaration files

To publish a new version:

```bash
# Update version in package.json
npm version patch  # or minor, major

# Build and publish (build runs automatically)
npm publish

# Push version tag to Git
git push --tags
```

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [x] ~~Speedometer gauge~~ ✅ **Completed**
- [x] ~~Tachometer gauge~~ ✅ **Completed**
- [x] ~~Battery voltage gauge~~ ✅ **Completed**
- [x] ~~Fuel gauge~~ ✅ **Completed**
- [x] ~~Temperature gauge~~ ✅ **Completed**
- [x] ~~Oil pressure gauge~~ ✅ **Completed**
- [x] ~~Gear selector~~ ✅ **Completed**
- [x] ~~Theme system~~ ✅ **Completed**
- [x] ~~Advanced customization~~ ✅ **Completed**
- [x] ~~Production-ready library~~ ✅ **Completed**

### Future Enhancements
- [ ] Multi-gauge cluster layouts
- [ ] Animation presets and transitions
- [ ] Additional vehicle-specific gauges
- [ ] Performance monitoring and analytics

## Support

If you encounter any issues or have questions, please file an issue on our [GitHub repository](https://github.com/yourusername/react-native-vehicle-gauges/issues).
