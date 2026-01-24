# Design System Documentation 🎨

## Overview
Comprehensive cyberpunk Edgerunner-inspired design system for LogicNomad.

## Design Tokens

### Colors
- **Neon Pink** (`#ff0066`): Primary accent, CTAs, highlights
- **Neon Cyan** (`#00ffff`): Secondary accent, borders, info
- **Neon Yellow** (`#ffff00`): Tertiary accent, warnings, progress
- **Dark Backgrounds**: Multiple shades for depth

### Spacing Scale
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

### Border Radius
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `full`: 9999px

### Typography
- **Font Family**: Inter (system fallback)
- **Font Sizes**: 12px - 60px scale
- **Font Weights**: 400, 500, 600, 700, 800
- **Line Heights**: 1.25, 1.5, 1.75

## Utility Classes

### Glass Morphism
- `.glass-effect`: Standard glass (blur 10px)
- `.glass-effect-strong`: Strong glass (blur 20px)
- `.glass-effect-subtle`: Subtle glass (blur 5px)

### Neon Effects
- `.neon-text`: Pink neon text
- `.neon-cyan-text`: Cyan neon text
- `.neon-yellow-text`: Yellow neon text
- `.neon-glow-pink`: Pink glow shadow
- `.neon-glow-cyan`: Cyan glow shadow
- `.neon-glow-yellow`: Yellow glow shadow

### Animations
- `.animate-float`: Floating animation
- `.animate-bounce-gentle`: Gentle bounce
- `.animate-pulse-glow`: Pulsing glow
- `.animate-neon-glow`: Neon glow animation
- `.animate-shimmer`: Shimmer effect
- `.animate-fade-in`: Fade in
- `.animate-scale-in`: Scale in
- `.animate-slide-in-right`: Slide from right
- `.animate-slide-in-left`: Slide from left

### Interactive
- `.hover-lift`: Lift on hover
- `.interactive`: Interactive element
- `.smooth-transition`: Smooth transitions

### Borders
- `.cyber-border`: Cyberpunk border with glow
- `.rounded-cyber`: Standard rounded (16px)
- `.rounded-cyber-lg`: Large rounded (24px)

### Text Effects
- `.gradient-text`: Gradient text
- `.text-shadow-soft`: Soft text shadow
- `.text-shadow-neon`: Neon text shadow

### Cards
- `.card-glow`: Card with glow effect
- `.cyber-card-bg`: Cyberpunk card background

## Best Practices

1. **Consistency**: Use design tokens for spacing, colors, and typography
2. **Glass Morphism**: Use for cards and overlays
3. **Neon Effects**: Use sparingly for emphasis
4. **Animations**: Keep subtle and purposeful
5. **Responsive**: Always consider mobile-first
6. **Accessibility**: Maintain contrast ratios
7. **Performance**: Optimize animations

## Component Patterns

### Card Pattern
```tsx
<Box className="glass-effect rounded-cyber-lg card-glow">
  {/* Content */}
</Box>
```

### Button Pattern
```tsx
<Button className="hover-lift smooth-transition">
  Click Me
</Button>
```

### Text Pattern
```tsx
<Text className="neon-text text-shadow-soft">
  Neon Text
</Text>
```

## Responsive Design

Use Chakra UI's responsive props:
```tsx
<Box
  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
  p={{ base: 4, md: 6, lg: 8 }}
>
  Responsive Content
</Box>
```

## Accessibility

- Focus states: Neon cyan outline
- Reduced motion: Animations disabled
- High contrast: Enhanced borders
- Screen readers: `.sr-only` class
