# @logicnomad/ui

Shared UI components package for LogicNomad monorepo. Contains reusable React components built with Tailwind CSS.

## Installation

This package is part of the LogicNomad monorepo and is automatically available to workspace packages.

```bash
# From workspace root
yarn workspace @logicnomad/ui build
```

## Usage

### Main Import

```typescript
import { Button, Badge, Alert, Card, LoadingSpinner } from '@logicnomad/ui';
```

### Subpath Imports (Recommended for Tree-Shaking)

```typescript
// Individual components
import { Button } from '@logicnomad/ui/Button';
import { Badge } from '@logicnomad/ui/Badge';
import { Alert } from '@logicnomad/ui/Alert';
import { Card } from '@logicnomad/ui/Card';
import { LoadingSpinner } from '@logicnomad/ui/LoadingSpinner';

// Types only
import type { ButtonProps, BadgeProps } from '@logicnomad/ui/types';
```

## Components

### Button

A flexible button component with multiple variants and sizes.

```typescript
import { Button } from '@logicnomad/ui';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

<Button variant="success" isLoading={loading} leftIcon="▶️">
  Execute
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- `leftIcon`: React.ReactNode
- `rightIcon`: React.ReactNode
- `fullWidth`: boolean

### Badge

A badge component for displaying labels and status indicators.

```typescript
import { Badge } from '@logicnomad/ui';

<Badge variant="success" size="md">Хялбар</Badge>
<Badge variant="warning">Дунд</Badge>
<Badge variant="danger">Хэцүү</Badge>
```

**Props:**
- `variant`: 'success' | 'warning' | 'danger' | 'info' | 'default'
- `size`: 'sm' | 'md' | 'lg'

### Alert

An alert component for displaying messages and notifications.

```typescript
import { Alert } from '@logicnomad/ui';

<Alert variant="success" title="Амжилттай">
  Алгоритм зөв байна
</Alert>

<Alert variant="error" title="Алдаа">
  <ul>
    <li>Error 1</li>
    <li>Error 2</li>
  </ul>
</Alert>
```

**Props:**
- `variant`: 'success' | 'error' | 'warning' | 'info'
- `title`: string (optional)
- `icon`: React.ReactNode (optional, defaults to variant icon)

### Card

A card component for displaying content in containers.

```typescript
import { Card } from '@logicnomad/ui';

<Card variant="glass" padding="md" hover>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

**Props:**
- `variant`: 'default' | 'bordered' | 'elevated' | 'glass'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hover`: boolean (enables hover effects)

### LoadingSpinner

A loading spinner component.

```typescript
import { LoadingSpinner } from '@logicnomad/ui';

<LoadingSpinner size="md" text="Ачааллаж байна..." />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `text`: string (optional)

## Development

```bash
# Build
yarn build

# Watch mode
yarn dev

# Type check
yarn type-check

# Lint
yarn lint

# Clean
yarn clean
```

## Package Structure

```
ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── Alert/
│   │   ├── Card/
│   │   └── LoadingSpinner/
│   ├── types/
│   └── index.ts
└── dist/               # Compiled output
```

## Styling

All components use Tailwind CSS and are designed to work with the LogicNomad design system. Components support:

- Gradient backgrounds
- Backdrop blur effects
- Smooth transitions
- Responsive design
- Accessibility features

## Peer Dependencies

This package requires:
- `react` ^19.2.0
- `react-dom` ^19.2.0

Tailwind CSS should be configured in the consuming application.

## License

MIT
