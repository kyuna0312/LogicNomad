# Design System Documentation 🎨

## Overview
Professional HackerRank-inspired design system for LogicNomad. Clean, modern, and focused on code learning.

## Design Principles

1. **Clarity**: Clear visual hierarchy and readable typography
2. **Consistency**: Unified design language across all components
3. **Performance**: Optimized for fast rendering and smooth interactions
4. **Accessibility**: WCAG 2.1 AA compliant
5. **Professional**: Clean, modern aesthetic suitable for learning

## Design Tokens

### Colors

#### Primary Colors
- **Primary Blue** (`#0073e6`): Main brand color, CTAs, links
- **Success Green** (`#5cb85c`): Success states, completed items
- **Warning Orange** (`#f0ad4e`): Warnings, medium difficulty
- **Danger Red** (`#d9534f`): Errors, hard difficulty

#### Background Colors
- **Dark 50** (`#2d2d2d`): Lightest dark background
- **Dark 100** (`#232323`): Main dark background
- **Dark 200** (`#1e1e1e`): Darker background
- **Dark 300** (`#1a1a1a`): Darkest background

#### Text Colors
- **Primary Text** (`#e8e8e8`): Main text color
- **Secondary Text** (`#b0b0b0`): Secondary text, labels
- **Tertiary Text** (`#888888`): Tertiary text, hints

#### Border Colors
- **Primary Border** (`#3a3a3a`): Default borders
- **Secondary Border** (`#4a4a4a`): Hover borders
- **Accent Border** (`#5cb85c`): Success/accent borders

### Typography

#### Font Families
- **Sans**: `'Inter', system-ui, -apple-system, sans-serif`
- **Mono**: `'Fira Code', 'Courier New', monospace`

#### Font Sizes
- `xs`: 12px
- `sm`: 14px
- `base`: 16px
- `lg`: 18px
- `xl`: 20px
- `2xl`: 24px
- `3xl`: 30px
- `4xl`: 36px
- `5xl`: 48px
- `6xl`: 60px

#### Font Weights
- `normal`: 400
- `medium`: 500
- `semibold`: 600
- `bold`: 700
- `extrabold`: 800

#### Line Heights
- `tight`: 1.25
- `normal`: 1.5
- `relaxed`: 1.75

### Spacing Scale

- `xs`: 4px (0.25rem)
- `sm`: 8px (0.5rem)
- `md`: 16px (1rem)
- `lg`: 24px (1.5rem)
- `xl`: 32px (2rem)
- `2xl`: 48px (3rem)
- `3xl`: 64px (4rem)

### Border Radius

- `none`: 0
- `sm`: 4px (0.25rem)
- `md`: 8px (0.5rem)
- `lg`: 12px (0.75rem)
- `xl`: 16px (1rem)
- `2xl`: 24px (1.5rem)
- `full`: 9999px

### Shadows

- `sm`: `0 1px 2px rgba(0, 0, 0, 0.3)`
- `md`: `0 2px 8px rgba(0, 0, 0, 0.3)`
- `lg`: `0 4px 12px rgba(0, 0, 0, 0.4)`
- `xl`: `0 8px 24px rgba(0, 0, 0, 0.5)`
- `card`: `0 2px 8px rgba(0, 0, 0, 0.3)`
- `card-hover`: `0 4px 12px rgba(0, 0, 0, 0.4)`
- `success`: `0 0 8px rgba(92, 184, 92, 0.3)`
- `primary`: `0 0 8px rgba(0, 115, 230, 0.3)`

### Transitions

- `fast`: 0.15s ease-out
- `normal`: 0.2s ease-out
- `slow`: 0.3s ease-out
- `bounce`: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)

## Component Patterns

### Professional Card

```tsx
import { ProfessionalCard } from '../components/common/DesignComponents';

<ProfessionalCard
  title="Card Title"
  subtitle="Card subtitle"
  badge="New"
  badgeColor="success"
  hover
>
  {/* Content */}
</ProfessionalCard>
```

### Stat Card

```tsx
import { StatCard } from '../components/common/DesignComponents';

<StatCard
  label="Completed"
  value={42}
  icon="✓"
  color="success"
  trend="up"
/>
```

### Section Header

```tsx
import { SectionHeader } from '../components/common/DesignComponents';

<SectionHeader
  title="Section Title"
  subtitle="Section description"
  badge="5"
  action={<Button>Action</Button>}
/>
```

### Code Block

```tsx
import { CodeBlock } from '../components/common/DesignComponents';

<CodeBlock
  code="const example = 'code';"
  language="javascript"
  title="Example"
/>
```

## Responsive Design

### Breakpoints

- `sm`: 480px (30em)
- `md`: 768px (48em)
- `lg`: 992px (62em)
- `xl`: 1280px (80em)
- `2xl`: 1536px (96em)

### Usage

```tsx
<Box
  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
  p={{ base: 4, md: 6, lg: 8 }}
>
  Responsive Content
</Box>
```

## Accessibility

### Focus States
- All interactive elements have visible focus indicators
- Focus color: Primary blue with 2px outline
- Focus offset: 2px

### Color Contrast
- Text on dark backgrounds: Minimum 4.5:1 ratio
- Interactive elements: Minimum 3:1 ratio
- Success/Error states: Color + icon for clarity

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows visual hierarchy
- Skip links for main content

### Screen Readers
- Semantic HTML elements
- ARIA labels where needed
- `.sr-only` class for screen reader only content

## Best Practices

1. **Use Design Tokens**: Always use tokens from `design-tokens.ts`
2. **Consistent Spacing**: Use spacing scale (xs, sm, md, lg, xl)
3. **Professional Cards**: Use `ProfessionalCard` for consistent card styling
4. **Responsive First**: Design mobile-first, enhance for larger screens
5. **Accessibility**: Always consider keyboard navigation and screen readers
6. **Performance**: Minimize animations, use CSS transforms
7. **Semantic HTML**: Use proper HTML elements for better SEO and accessibility

## Component Library

### Reusable Components

- `ProfessionalCard`: Consistent card styling
- `StatCard`: Statistics display
- `SectionHeader`: Section headers with actions
- `CodeBlock`: Code display with syntax highlighting
- `ProfessionalDivider`: Consistent dividers

### Usage Examples

See `apps/web/src/components/common/DesignComponents.tsx` for implementation details.

## Migration Guide

### From Cyberpunk to Professional

1. Replace neon colors with professional colors
2. Update shadows to professional shadows
3. Use `ProfessionalCard` instead of custom cards
4. Update borders to use `border-primary`
5. Replace gradient text with solid colors
6. Remove excessive animations

## Resources

- Design Tokens: `apps/web/src/styles/design-tokens.ts`
- Theme: `apps/web/src/theme.ts`
- Design Components: `apps/web/src/components/common/DesignComponents.tsx`
- Utilities: `apps/web/src/utils/design-utils.ts`
