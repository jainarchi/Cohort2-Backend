# Design System & Color Reference

## Color Palette

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Cool Aqua | `#00d4ff` | Primary buttons, links, focus states |
| Green | `#1ac8a0` | Hover states, success indicators |
| Purple | `#6c5ce7` | Accent elements, subtle highlights |

### Gradient
```scss
$gradient-primary: linear-gradient(135deg, #00d4ff 0%, #1ac8a0 50%, #6c5ce7 100%);
```

### Neutral Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Text Dark | `#2d3436` | Primary text |
| Text Light | `#ffffff` | On dark/gradient backgrounds |
| BG Light | `#f8f9fa` | Form backgrounds |
| Border | `#e0e0e0` | Input borders, dividers |
| Error | `#ff6b6b` | Error messages, validation |
| Success | `#26de81` | Success messages |

## Spacing Scale

```scss
$spacing-xs:    0.25rem   (4px)
$spacing-sm:    0.5rem    (8px)
$spacing-md:    1rem      (16px)
$spacing-lg:    1.5rem    (24px)
$spacing-xl:    2rem      (32px)
$spacing-2xl:   3rem      (48px)
```

## Typography Scale

```scss
$font-xs:      0.75rem   (12px)
$font-sm:      0.875rem  (14px)
$font-base:    1rem      (16px)
$font-lg:      1.125rem  (18px)
$font-xl:      1.25rem   (20px)
$font-2xl:     1.5rem    (24px)
```

## Border Radius

```scss
$radius-sm:    4px
$radius-md:    8px
$radius-lg:    12px
```

## Transitions

```scss
$transition-fast:    0.2s ease
$transition-normal:  0.3s ease
$transition-slow:    0.5s ease
```

## Component Colors

### Form Inputs
- **Border (default)**: `$border-color` (#e0e0e0)
- **Border (focus)**: `$primary-color` (#00d4ff)
- **Border (hover)**: `$secondary-color` (#1ac8a0)
- **Border (error)**: `$error-color` (#ff6b6b)
- **Shadow (focus)**: rgba(0, 212, 255, 0.1)

### Buttons
- **Primary Background**: `$gradient-primary`
- **Shadow**: rgba(0, 212, 255, 0.3)
- **Shadow (hover)**: rgba(0, 212, 255, 0.4)

### Links
- **Color**: `$primary-color` (#00d4ff)
- **Hover**: `$secondary-color` (#1ac8a0)
- **Underline**: Animation with gradient

### Backgrounds
- **Auth Container**: `$gradient-primary` with animated blobs
- **Cards**: White with subtle border
- **Error Banner**: rgba(255, 107, 107, 0.1)

## Font Family

Primary: `'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif`

Font weights:
- Regular: 400
- Medium: 500
- Semi-bold: 600
- Bold: 700

## Shadow System

### Elevation 1 (Cards)
```css
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
```

### Elevation 2 (Hover States)
```css
box-shadow: 0 15px 35px rgba(0, 212, 255, 0.4);
```

### Inset (Focus)
```css
box-shadow: inset 0 0 0 1px $primary-color, 0 0 0 3px rgba(0, 212, 255, 0.1);
```

## Responsive Breakpoints

```scss
// Tablet
@media (max-width: 600px) { }

// Mobile
@media (max-width: 480px) { }
```

## Animation Effects

### Fade In
```scss
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Background Float
```scss
@keyframes floatBg {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(30px, -30px);
  }
}
```

### Link Underline
```css
transition: width 0.3s ease;
width: 0 → 100% on hover
```

## Usage Examples

### Importing Color Variables
```scss
@import '../style/variables.scss';

.my-component {
  color: $primary-color;
  background: $gradient-primary;
  padding: $spacing-md;
}
```

### Using Transitions
```scss
.element {
  transition: all $transition-normal;
  
  &:hover {
    color: $secondary-color;
  }
}
```

### Responsive Design
```scss
.container {
  padding: $spacing-xl;
  
  @media (max-width: 600px) {
    padding: $spacing-md;
  }
}
```

## Consistency Guidelines

1. **Always use variables** for colors, spacing, and transitions
2. **Maintain hierarchical spacing** using the spacing scale
3. **Apply gradients** to high-emphasis elements (buttons, titles)
4. **Use subtle shadows** for depth (not harsh)
5. **Ensure sufficient contrast** for accessibility
6. **Keep animations under 0.5s** for smooth UX
7. **Test on multiple devices** using breakpoints

## Accessibility

- Text contrast ratio: Minimum 4.5:1
- Focus indicators: Always visible
- Color not the only indicator: Use icons/text too
- Error messages: Clear and actionable
- Touch targets: Minimum 44x44px
