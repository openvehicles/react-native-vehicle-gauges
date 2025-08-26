// Main type definitions for react-native-vehicle-gauges
export * from './dist/components';
export * from './dist/types';

// Ensure react-native-svg types are available
declare module 'react-native-svg' {
  import { Component, ReactNode } from 'react';
  import { ViewStyle } from 'react-native';

  export interface SvgProps {
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    style?: ViewStyle;
    children?: ReactNode;
  }

  export interface PathProps {
    d: string;
    stroke?: string;
    strokeWidth?: string | number;
    fill?: string;
  }

  export interface CircleProps {
    cx: string | number;
    cy: string | number;
    r: string | number;
    fill?: string;
    stroke?: string;
    strokeWidth?: string | number;
  }

  export interface LineProps {
    x1: string | number;
    y1: string | number;
    x2: string | number;
    y2: string | number;
    stroke?: string;
    strokeWidth?: string | number;
  }

  export interface TextProps {
    x: string | number;
    y: string | number;
    fontSize?: string | number;
    fontFamily?: string;
    fontWeight?: string;
    fill?: string;
    textAnchor?: 'start' | 'middle' | 'end';
    alignmentBaseline?: 'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical';
    children?: ReactNode;
  }

  export interface GProps {
    children?: ReactNode;
  }

  export class Svg extends Component<SvgProps> {}
  export class Path extends Component<PathProps> {}
  export class Circle extends Component<CircleProps> {}
  export class Line extends Component<LineProps> {}
  export class Text extends Component<TextProps> {}
  export class G extends Component<GProps> {}

  export default Svg;
}
