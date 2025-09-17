# Helvetica Neue Font Usage Guide

This guide shows you how to use the configured Helvetica Neue fonts throughout your design.

## Quick Start

The Helvetica Neue font is now configured and available throughout your application. It's set as the default font for the body element.

## Available Font Weights

- **Thin**: 100
- **Ultra Light**: 200  
- **Light**: 300
- **Normal**: 400
- **Medium**: 500
- **Bold**: 700
- **Heavy**: 800
- **Black**: 900

## Available Font Styles

- **Normal**: Regular style
- **Italic**: Italic style

## Usage Methods

### 1. CSS Classes (Recommended)

```tsx
// Basic usage
<h1 className="font-helvetica font-black">Main Heading</h1>
<p className="font-helvetica font-normal">Body text</p>

// With different weights
<h2 className="font-helvetica font-heavy">Subheading</h2>
<p className="font-helvetica font-light">Light text</p>

// With italic styles
<em className="font-helvetica font-normal-italic">Italic text</em>
<strong className="font-helvetica font-bold-italic">Bold italic text</strong>
```

### 2. Using Font Utilities

```tsx
import { getFontClass, getFontForUseCase } from '@/lib/font-utils';

// Generate font class dynamically
const headingClass = getFontClass('black', 'normal'); // 'font-black'
const italicClass = getFontClass('medium', 'italic'); // 'font-medium-italic'

// Use predefined combinations
const h1Class = getFontForUseCase('h1'); // 'font-black'
const bodyClass = getFontForUseCase('body'); // 'font-normal'
```

### 3. Inline Styles

```tsx
<div style={{ fontFamily: 'var(--font-helvetica-neue)', fontWeight: 700 }}>
  Custom styled text
</div>
```

### 4. Tailwind CSS Integration

The font is available as a CSS variable `--font-helvetica-neue` and can be used in Tailwind config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'helvetica': ['var(--font-helvetica-neue)', 'Arial', 'sans-serif'],
      }
    }
  }
}
```

## Common Use Cases

### Headers
```tsx
<h1 className="font-helvetica font-black text-4xl">Main Title</h1>
<h2 className="font-helvetica font-heavy text-3xl">Section Title</h2>
<h3 className="font-helvetica font-bold text-2xl">Subsection</h3>
```

### Body Text
```tsx
<p className="font-helvetica font-normal text-base">Regular paragraph text</p>
<p className="font-helvetica font-light text-sm">Light descriptive text</p>
<p className="font-helvetica font-medium text-lg">Emphasized text</p>
```

### Navigation
```tsx
<nav className="font-helvetica font-medium">
  <a href="#" className="font-helvetica font-bold">Active Link</a>
  <a href="#" className="font-helvetica font-normal">Regular Link</a>
</nav>
```

### Buttons
```tsx
<button className="font-helvetica font-medium px-4 py-2 bg-blue-500 text-white">
  Primary Button
</button>
<button className="font-helvetica font-bold px-4 py-2 border border-gray-300">
  Secondary Button
</button>
```

## All Available Classes

### Font Family
- `font-helvetica` - Apply Helvetica Neue font

### Font Weights
- `font-thin` (100)
- `font-ultra-light` (200)
- `font-light` (300)
- `font-normal` (400)
- `font-medium` (500)
- `font-bold` (700)
- `font-heavy` (800)
- `font-black` (900)

### Font Styles
- `font-italic` - Italic style
- `font-normal-style` - Normal style

### Combined Classes
- `font-thin-italic`
- `font-ultra-light-italic`
- `font-light-italic`
- `font-normal-italic`
- `font-medium-italic`
- `font-bold-italic`
- `font-heavy-italic`
- `font-black-italic`

## TypeScript Support

The font system includes full TypeScript support with type definitions for font weights, styles, and utility functions.

```tsx
import { FontWeightName, FontStyleName } from '@/types/fonts';

const weight: FontWeightName = 'bold';
const style: FontStyleName = 'italic';
```

## Performance

- All font files are preloaded for optimal performance
- Fonts use `display: swap` for better loading experience
- Local font files are served from your domain for faster loading
