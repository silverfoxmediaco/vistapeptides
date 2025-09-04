# Vista RX MD Design System & Style Guide

## Overview

The Vista RX MD design system provides a comprehensive set of design tokens, components, and guidelines for building a consistent, professional medical e-commerce platform. This system emphasizes trust, professionalism, and accessibility while maintaining a modern aesthetic.

## Quick Start

### 1. Import Styles
```jsx
// In your main React app file
import '../styles/globals.css';

// Or import specific parts
import '../styles/textures.css';
import { theme } from '../styles/theme.js';
```

### 2. View Style Guide
Open `/public/style-guide.html` in your browser to see all colors, typography, components, and textures with live examples.

## Brand Colors

### Primary Blue Scale
Our primary brand color represents trust, reliability, and medical professionalism.

- **Primary 50**: `#eff9ff` - Lightest tint for backgrounds
- **Primary 500**: `#4DACF2` - **Main brand color** for CTAs and branding  
- **Primary 700**: `#1675d4` - Darker shade for hover states
- **Primary 950**: `#143253` - Darkest shade for text on light backgrounds

### Dark Scale
Our neutral dark colors provide professional contrast and readability.

- **Dark 100**: `#e7e7e7` - Light gray for borders
- **Dark 400**: `#888888` - Medium gray for secondary text  
- **Dark 700**: `#4f4f4f` - Dark gray for body text
- **Dark 950**: `#1A1A1A` - **Main dark color** for primary text

### Medical Colors
Semantic colors for status indicators and medical context.

- **Medical Green**: `#10B981` - Success, approval, healthy
- **Medical Orange**: `#F59E0B` - Warnings, pending, caution  
- **Medical Red**: `#EF4444` - Errors, critical, dangerous
- **Medical Purple**: `#8B5CF6` - Information, neutral status

## Typography

### Font Family
- **Primary**: Poppins (Google Fonts)
- **Monospace**: JetBrains Mono (for code, IDs, technical data)

### Font Scale
```css
/* Display/Hero Text */
--text-6xl: 67px; /* Hero headlines */
--text-5xl: 48px; /* Page titles */
--text-4xl: 36px; /* Section headers */

/* Headings */
--text-3xl: 30px; /* Card titles */
--text-2xl: 24px; /* Subsection headers */  
--text-xl: 20px;  /* Large body text */

/* Body Text */
--text-lg: 18px;   /* Prominent body text */
--text-base: 16px; /* Standard body text */
--text-sm: 14px;   /* Secondary information */
--text-xs: 12px;   /* Captions, metadata */
```

### Usage Guidelines
- Use **font-weight: 800** for hero text and main branding
- Use **font-weight: 700** for page titles (H1)
- Use **font-weight: 600** for section headers (H2-H4)
- Use **font-weight: 400** for body text
- Maintain **letter-spacing: -0.025em** for headings

## Spacing System

Based on an **8px base unit** for consistent rhythm and alignment.

### Scale
```css
--space-1: 8px;   /* Tight spacing */
--space-2: 16px;  /* Standard element spacing */
--space-3: 24px;  /* Standard gap between elements */
--space-4: 32px;  /* Card padding, form spacing */
--space-6: 48px;  /* Large spacing within sections */
--space-8: 64px;  /* Section margins, page spacing */
--space-12: 96px; /* Large section breaks */
```

### Common Patterns
- **Card padding**: `24px` (space-3)
- **Button padding**: `16px 32px` (space-2 space-4)  
- **Form gaps**: `16px` (space-2)
- **Section margins**: `64px` (space-8)
- **Component gaps**: `24px` (space-3)

## Background Textures

### Available Textures

#### `.texture-dots`
Subtle radial gradient dots for clean backgrounds.
```css
.hero-section {
  @apply texture-dots bg-primary-50;
}
```

#### `.texture-grid`
Medical-inspired grid lines for professional layouts.
```css
.dashboard-bg {
  @apply texture-grid bg-white;
}
```

#### `.texture-medical`
Cross pattern evoking medical/healthcare themes.
```css
.medical-section {
  @apply texture-medical bg-primary-50;
}
```

#### `.texture-waves`
Animated wave pattern for dynamic sections.
```css
.hero-banner {
  @apply texture-waves text-white;
}
```

#### `.texture-gradient-mesh`
Animated gradient mesh for premium sections.
```css
.premium-feature {
  @apply texture-gradient-mesh rounded-2xl;
}
```

### Texture Variants
- **Dense variants**: `-dense` suffix for more prominent patterns
- **Light variants**: `-light` suffix for subtle patterns  
- **Dark variants**: `-dark` suffix for dark theme compatibility

## Glass Morphism Effects

### Basic Glass Effect
```css
.glass-card {
  @apply glass rounded-xl p-6;
  /* Creates: backdrop blur, transparent background, subtle border */
}
```

### Glass Variants
- `.glass` - Standard light glass effect
- `.glass-dark` - Dark glass for dark backgrounds
- `.glass-effect-primary` - Primary color tinted glass
- `.glass-effect-strong` - More pronounced blur effect
- `.glass-effect-subtle` - Minimal glass effect

### Usage Examples
```jsx
// Product card with glass effect
<div className="glass rounded-2xl p-6 card-hover">
  <h3 className="text-xl font-semibold mb-3">Product Name</h3>
  <p className="text-dark-600 mb-4">Description...</p>
  <Button variant="primary">Add to Cart</Button>
</div>

// Modal with strong glass effect
<div className="glass-effect-strong rounded-2xl p-8 max-w-md mx-auto">
  <h2 className="text-2xl font-bold mb-4">Confirm Order</h2>
  {/* Modal content */}
</div>
```

## Component Guidelines

### Buttons
```jsx
// Primary action button
<Button variant="primary" size="lg">
  Order Now
</Button>

// Secondary button  
<Button variant="secondary">
  Learn More
</Button>

// Medical semantic buttons
<Button variant="success">Approve Order</Button>
<Button variant="warning">Review Required</Button>
<Button variant="danger">Cancel Order</Button>
```

### Cards
```jsx
// Standard product card
<div className="bg-white rounded-2xl p-6 border border-dark-100 card-hover">
  <img className="w-full h-48 object-cover rounded-xl mb-4" />
  <h3 className="text-xl font-semibold mb-2">Product Name</h3>
  <p className="text-dark-600 text-sm mb-4">Description...</p>
  <div className="flex items-center justify-between">
    <span className="text-2xl font-bold text-primary-600">$299</span>
    <Button variant="primary">Add to Cart</Button>
  </div>
</div>

// Glass card for premium sections
<div className="glass rounded-2xl p-6 card-hover">
  {/* Content */}
</div>
```

### Forms
```jsx
// Input field with proper styling
<div className="space-y-2">
  <label className="text-sm font-medium text-dark-700">
    Email Address
  </label>
  <input 
    type="email"
    className="w-full px-4 py-3 rounded-xl border border-dark-200 
               focus:border-primary-500 focus:ring-2 focus:ring-primary-100
               transition-all duration-200"
    placeholder="doctor@example.com"
  />
</div>
```

## Animation & Interactions

### Hover Effects
```css
.card-hover {
  @apply transition-all duration-300 ease-out;
}

.card-hover:hover {
  @apply transform -translate-y-1 shadow-hover;
}
```

### Available Animations
- `.animate-fade-in` - Fade in effect  
- `.animate-slide-up` - Slide up from bottom
- `.animate-slide-down` - Slide down from top
- `.animate-scale-in` - Scale in effect
- `.animate-pulse-slow` - Slow pulsing effect

### Texture Animations
- `.texture-pulse` - Pulsing texture opacity
- `.texture-float` - Floating up/down motion
- `.texture-rotate` - Slow rotation effect

## Accessibility

### Color Contrast
- All text meets WCAG 2.1 AA standards (4.5:1 contrast ratio)
- Interactive elements have clear hover and focus states
- Color is never the only way to convey information

### Focus Management  
- All interactive elements have visible focus indicators
- Focus indicators use the primary brand color
- Tab order follows logical content flow

### Responsive Design
- Design scales appropriately across all device sizes
- Touch targets are minimum 44px for mobile
- Text remains readable at all zoom levels up to 200%

## Code Examples

### Theme Usage in Components
```jsx
import { theme } from '../styles/theme.js';

const ProductCard = ({ product }) => {
  return (
    <div 
      className="bg-white rounded-2xl p-6 texture-dots card-hover"
      style={{ 
        borderColor: theme.colors.dark[200],
        boxShadow: theme.boxShadow.card 
      }}
    >
      <h3 className="text-primary-700 text-xl font-semibold mb-3">
        {product.name}
      </h3>
      <p className="text-dark-600 mb-4">{product.description}</p>
      <Button variant="primary">Add to Cart</Button>
    </div>
  );
};
```

### Responsive Texture Usage
```jsx
const HeroSection = () => {
  return (
    <section className="texture-gradient-mesh min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="glass-effect-primary rounded-2xl p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gradient mb-6">
            Vista RX MD
          </h1>
          <p className="text-lg md:text-xl text-dark-700 mb-8 max-w-2xl mx-auto">
            Professional-grade peptides and GLP-1 medications for verified physicians
          </p>
          <Button variant="primary" size="xl">
            Start Shopping
          </Button>
        </div>
      </div>
    </section>
  );
};
```

## Best Practices

### Do's
- ✅ Use the 8px spacing system consistently
- ✅ Combine textures with glass effects for premium feel
- ✅ Maintain proper color contrast for accessibility
- ✅ Use semantic medical colors for status indicators
- ✅ Apply consistent hover and focus states
- ✅ Use the card-hover utility for interactive elements

### Don'ts  
- ❌ Mix random spacing values outside the scale
- ❌ Use too many texture patterns in one view
- ❌ Ignore accessibility requirements
- ❌ Use bright colors for large background areas
- ❌ Skip hover states on interactive elements
- ❌ Combine conflicting animation effects

### Performance Considerations
- Textures use efficient CSS patterns and SVG data URIs
- Glass effects are optimized with `will-change: transform`
- Animations respect `prefers-reduced-motion` settings
- All images and assets should be optimized and served via CDN

## Browser Support
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Backdrop-filter support with graceful fallbacks
- CSS Grid and Flexbox required
- ES6+ JavaScript features used in theme object

## Development Tools
- **Style Guide**: Open `/public/style-guide.html` for visual reference
- **Theme Object**: Import `theme.js` for programmatic access to design tokens
- **Texture Classes**: All texture utilities available in `textures.css`
- **Linting**: ESLint rules enforce consistent class usage

---

For questions or updates to the design system, please refer to the GitHub repository or contact the design team.