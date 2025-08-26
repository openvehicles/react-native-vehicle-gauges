# Examples

This directory contains comprehensive examples demonstrating how to use the React Native Vehicle Gauges library.

## Available Examples

### 1. BasicSpeedometer.tsx
A simple implementation showing the basic usage of the GaugeSpeedometer component with:
- Minimal configuration
- Default styling
- Simple speed controls
- Auto-animation demo

### 2. CustomizedSpeedometer.tsx
Advanced customization example featuring:
- Multiple theme presets (Sport, Classic, Modern)
- Custom colors and fonts
- Unit switching (MPH/KPH)
- Redline zone configuration
- Interactive speed controls
- Preset speed scenarios

### 3. AnimatedSpeedometer.tsx
Smooth animation demonstrations including:
- Realistic driving scenarios (City, Highway, Race)
- Emergency brake simulation
- Dynamic color changes based on speed
- Real-time animation status
- Manual speed controls

### 4. TachometerExample.tsx
Comprehensive tachometer demonstrations featuring:
- Multiple vehicle types (Economy, Sports, Racing)
- Different RPM ranges (4K, 6K, 9K)
- Smart tick intervals based on range
- RPM display in thousands notation
- Redline zone demonstrations
- Interactive controls and presets
- RPM ranges guide and educational content

## Running the Examples

### Method 1: Copy into your React Native project

1. Copy the example file you want to use into your React Native project
2. Install the required dependencies:
   ```bash
   npm install react-native-vehicle-gauges react-native-svg
   ```
3. Import and use the example component in your app:
   ```typescript
   import { BasicSpeedometerExample } from './examples/BasicSpeedometer';
   
   export default function App() {
     return <BasicSpeedometerExample />;
   }
   ```

### Method 2: Create a demo app

1. Create a new React Native project:
   ```bash
   npx react-native init VehicleGaugesDemo
   cd VehicleGaugesDemo
   ```

2. Install dependencies:
   ```bash
   npm install react-native-vehicle-gauges react-native-svg
   ```

3. For iOS, install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

4. Replace the contents of `App.tsx` with one of the example files

5. Run the app:
   ```bash
   npx react-native run-ios
   # or
   npx react-native run-android
   ```

## Example Features

### BasicSpeedometer
- ✅ Simple setup
- ✅ Default styling
- ✅ Basic controls
- ✅ Auto-animation

### CustomizedSpeedometer
- ✅ Theme system
- ✅ Color customization
- ✅ Font customization
- ✅ Unit conversion
- ✅ Redline zones
- ✅ Preset speeds

### AnimatedSpeedometer
- ✅ Smooth transitions
- ✅ Driving scenarios
- ✅ Emergency brake
- ✅ Dynamic colors
- ✅ Animation status

## Tips for Implementation

1. **Performance**: The gauges are optimized for 60fps animations
2. **Customization**: All colors, fonts, and sizes are customizable
3. **Responsiveness**: Use percentage-based sizing for responsive layouts
4. **Accessibility**: Consider adding accessibility labels for screen readers
5. **Testing**: Test on both iOS and Android devices for consistent behavior

## Troubleshooting

### Common Issues

**SVG not rendering:**
- Ensure `react-native-svg` is properly installed and linked
- For iOS, run `pod install` after installing the SVG library

**Performance issues:**
- Avoid updating speed too frequently (limit to 30-60fps)
- Use `useNativeDriver: false` for Animated values that affect layout

**Styling issues:**
- Check that container dimensions are properly set
- Ensure parent view has sufficient space for the gauge

## Contributing

If you create additional examples or improvements, please consider contributing them back to the project!
