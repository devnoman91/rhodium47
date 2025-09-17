// Font weight and style types for TypeScript
export type FontWeight = '100' | '200' | '300' | '400' | '500' | '700' | '800' | '900';
export type FontStyle = 'normal' | 'italic';

// Font weight names mapping
export type FontWeightName = 
  | 'thin' 
  | 'ultraLight' 
  | 'light' 
  | 'normal' 
  | 'medium' 
  | 'bold' 
  | 'heavy' 
  | 'black';

// Font style names mapping
export type FontStyleName = 'normal' | 'italic';

// Font configuration interface
export interface FontConfig {
  weight: FontWeight;
  style: FontStyle;
  className: string;
}

// Utility type for creating font class combinations
export type FontClass = 
  | 'font-thin'
  | 'font-ultra-light'
  | 'font-light'
  | 'font-normal'
  | 'font-medium'
  | 'font-bold'
  | 'font-heavy'
  | 'font-black'
  | 'font-thin-italic'
  | 'font-ultra-light-italic'
  | 'font-light-italic'
  | 'font-normal-italic'
  | 'font-medium-italic'
  | 'font-bold-italic'
  | 'font-heavy-italic'
  | 'font-black-italic';

// Font weight to CSS class mapping
export const FONT_WEIGHT_CLASSES: Record<FontWeightName, string> = {
  thin: 'font-thin',
  ultraLight: 'font-ultra-light',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
  heavy: 'font-heavy',
  black: 'font-black',
} as const;

// Font style to CSS class mapping
export const FONT_STYLE_CLASSES: Record<FontStyleName, string> = {
  normal: 'font-normal-style',
  italic: 'font-italic',
} as const;
