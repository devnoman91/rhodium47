import { FontWeightName, FontStyleName, FontClass } from '@/types/fonts';

/**
 * Generate font class name based on weight and style
 * @param weight - Font weight name
 * @param style - Font style name (optional, defaults to 'normal')
 * @returns Combined font class name
 */
export function getFontClass(weight: FontWeightName, style: FontStyleName = 'normal'): FontClass {
  const baseClass = `font-${weight}`;
  return style === 'italic' ? `${baseClass}-italic` as FontClass : baseClass as FontClass;
}

/**
 * Generate multiple font classes for different weights/styles
 * @param configs - Array of font configurations
 * @returns Array of font class names
 */
export function getFontClasses(configs: Array<{ weight: FontWeightName; style?: FontStyleName }>): FontClass[] {
  return configs.map(config => getFontClass(config.weight, config.style));
}

/**
 * Common font combinations for different use cases
 */
export const FONT_COMBINATIONS = {
  // Headers
  h1: 'font-black',
  h2: 'font-heavy',
  h3: 'font-bold',
  h4: 'font-medium',
  h5: 'font-normal',
  h6: 'font-light',
  
  // Body text
  body: 'font-normal',
  bodyLight: 'font-light',
  bodyBold: 'font-bold',
  
  // Captions and small text
  caption: 'font-light',
  captionBold: 'font-medium',
  
  // Buttons
  button: 'font-medium',
  buttonBold: 'font-bold',
  
  // Navigation
  nav: 'font-medium',
  navBold: 'font-bold',
} as const;

/**
 * Get font class for a specific use case
 * @param useCase - Predefined use case
 * @returns Font class name
 */
export function getFontForUseCase(useCase: keyof typeof FONT_COMBINATIONS): FontClass {
  return FONT_COMBINATIONS[useCase] as FontClass;
}
