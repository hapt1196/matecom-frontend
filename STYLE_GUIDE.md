# MATECOM Style Guide

## 🎨 Design System inspired by MarcomMate - Single Theme

### Color Palette

#### Primary Colors (MarcomMate Inspired)
- **Primary Blue**: `#1E3A8A` - Main brand color (MarcomMate primary)
- **Primary Blue Light**: `#3B82F6` - Secondary brand color (MarcomMate secondary)
- **Accent Orange**: `#F59E0B` - Call-to-action color (MarcomMate accent)
- **Accent Green**: `#10B981` - Success/positive color (MarcomMate success)

#### Text Colors (MarcomMate Inspired)
- **Text Primary**: `#1F2937` - Primary text (dark gray)
- **Text Secondary**: `#6B7280` - Secondary text (medium gray)
- **Text Muted**: `#9CA3AF` - Muted text (light gray)

#### Background Colors (MarcomMate Inspired)
- **Background**: `#FFFFFF` - Main background (white)
- **Surface**: `#F8FAFC` - Surface background (light gray)
- **Border**: `#E2E8F0` - Border color (light gray)

### Typography

#### Font Family (MarcomMate Inspired)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

#### Font Sizes
- **XS**: `0.75rem` (12px)
- **SM**: `0.875rem` (14px)
- **Base**: `1rem` (16px)
- **LG**: `1.125rem` (18px)
- **XL**: `1.25rem` (20px)
- **2XL**: `1.5rem` (24px)
- **3XL**: `1.875rem` (30px)
- **4XL**: `2.25rem` (36px)
- **5XL**: `3rem` (48px)

### Spacing System

Based on 8px grid:
- **XS**: `0.5rem` (8px)
- **SM**: `1rem` (16px)
- **MD**: `1.5rem` (24px)
- **LG**: `2rem` (32px)
- **XL**: `3rem` (48px)
- **2XL**: `5rem` (80px)
- **3XL**: `7.5rem` (120px)

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

### Transitions

```css
--transition-fast: 150ms ease-in-out;
--transition-normal: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;
```

## 🚀 Animation Classes

### Fade Animations
```html
<div class="fade-in">Content</div>
<div class="fade-in-up">Content</div>
<div class="fade-in-left">Content</div>
<div class="fade-in-right">Content</div>
```

### Scale Animations
```html
<div class="scale-in">Content</div>
<div class="scale-in-up">Content</div>
```

### Slide Animations
```html
<div class="slide-up">Content</div>
<div class="slide-down">Content</div>
```

### Staggered Animations
```html
<div class="stagger-item">Item 1</div>
<div class="stagger-item">Item 2</div>
<div class="stagger-item">Item 3</div>
```

### Hover Effects
```html
<div class="hover-lift">Lift on hover</div>
<div class="hover-scale">Scale on hover</div>
<div class="hover-glow">Glow on hover</div>
```

### Special Animations
```html
<div class="pulse">Pulsing element</div>
<div class="bounce">Bouncing element</div>
<div class="float">Floating element</div>
<div class="rotate">Rotating element</div>
<div class="gradient-text">Animated gradient text</div>
```

## 🎯 Usage Examples

### Hero Section
```vue
<template>
  <section class="hero-section">
    <h1 class="hero-title fade-in">Main Title</h1>
    <p class="hero-subtitle slide-up">Subtitle with slide animation</p>
    <div class="hero-cta slide-up">
      <v-btn class="hero-btn primary-btn">Get Started</v-btn>
    </div>
  </section>
</template>
```

### Service Cards
```vue
<template>
  <div class="service-card scale-in hover-lift">
    <div class="service-icon">
      <v-icon>mdi-rocket</v-icon>
    </div>
    <h3 class="service-name">Service Name</h3>
    <p class="service-description">Description</p>
  </div>
</template>
```

### Navigation
```vue
<template>
  <v-btn 
    class="nav-btn hover-scale"
    :class="{ 'active': isActive }"
  >
    Navigation Item
  </v-btn>
</template>
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: `< 480px`
- **Tablet**: `480px - 768px`
- **Desktop**: `768px - 1024px`
- **Large Desktop**: `> 1024px`

### Responsive Utilities
```css
@media (max-width: 768px) {
  .section-title {
    font-size: var(--font-size-3xl);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
}
```

## 🎨 Single Theme Support

### Vuetify Theme Configuration (MarcomMate Inspired)
```javascript
light: {
  colors: {
    primary: '#1E3A8A',        // MarcomMate primary blue
    secondary: '#3B82F6',      // MarcomMate secondary blue
    accent: '#F59E0B',         // MarcomMate accent orange
    success: '#10B981',        // MarcomMate success green
    background: '#FFFFFF',     // White background
    surface: '#F8FAFC',        // Light surface
    'on-background': '#1F2937', // Text on background
    'on-surface': '#1F2937',    // Text on surface
  }
}
```

### CSS Variables for Single Theme
```css
:root {
  --primary-blue: #1E3A8A;
  --primary-blue-light: #3B82F6;
  --accent-orange: #F59E0B;
  --accent-green: #10B981;
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  --background: #FFFFFF;
  --surface: #F8FAFC;
  --border: #E2E8F0;
}
```

## 🔧 Implementation Notes

### Intersection Observer
All animations use Intersection Observer for performance:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});
```

### Performance Optimization
- Use `transform` and `opacity` for animations
- Add `will-change` for GPU acceleration
- Respect `prefers-reduced-motion` user preference

### Accessibility
- All animations respect user motion preferences
- Smooth scrolling with `scroll-behavior: smooth`
- Focus states for interactive elements

## 📚 Component Guidelines

### Buttons
- Use `v-btn` with custom styling
- Primary buttons: `color="primary"`
- Secondary buttons: `variant="outlined"`
- Add hover effects with `hover-lift` or `hover-scale`

### Cards
- Use `service-card` class for service items
- Add `hover-lift` for interactive cards
- Include proper spacing with CSS variables

### Typography
- Use semantic HTML (`h1`, `h2`, `h3`, etc.)
- Apply appropriate font sizes from CSS variables
- Maintain proper contrast ratios

## 🎨 Customization

### Adding New Colors
```css
:root {
  --custom-color: #your-color;
}
```

### Creating New Animations
```css
.custom-animation {
  opacity: 0;
  transform: translateX(-100px);
  transition: all 0.6s ease-out;
}

.custom-animation.visible {
  opacity: 1;
  transform: translateX(0);
}
```

### Modifying Transitions
```css
.custom-transition {
  transition: all var(--transition-normal);
}
```

---

*This style guide is inspired by the modern design principles from MarcomMate and follows Vue.js + Vuetify best practices.*


