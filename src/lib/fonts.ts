import localFont from 'next/font/local';

// Helvetica Neue font configuration
export const helveticaNeue = localFont({
  src: [
    {
      path: '../font/HelveticaNeueThin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../font/HelveticaNeueThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../font/HelveticaNeueUltraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../font/HelveticaNeueUltraLightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../font/HelveticaNeueLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../font/HelveticaNeueLightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../font/HelveticaNeueRoman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/HelveticaNeueItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../font/HelveticaNeueMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../font/HelveticaNeueMediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../font/HelveticaNeueBold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../font/HelveticaNeueBoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../font/HelveticaNeueHeavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../font/HelveticaNeueHeavyItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../font/HelveticaNeueBlack.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../font/HelveticaNeueBlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-helvetica-neue',
  display: 'swap',
  preload: true,
});

// Font weight and style types for TypeScript
export type FontWeight = '100' | '200' | '300' | '400' | '500' | '700' | '800' | '900';
export type FontStyle = 'normal' | 'italic';

// Font utility classes mapping
export const fontWeights = {
  thin: '100',
  ultraLight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  bold: '700',
  heavy: '800',
  black: '900',
} as const;

export const fontStyles = {
  normal: 'normal',
  italic: 'italic',
} as const;
