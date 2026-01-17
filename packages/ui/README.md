# @logicnomad/ui

Shared UI components package for LogicNomad monorepo. Contains reusable React components that can be used across applications.

## Installation

This package is automatically available in the monorepo workspace. No installation needed.

## Usage

### In Web App

```typescript
import { Button, Card } from '@logicnomad/ui';

function MyComponent() {
  return (
    <Card>
      <Button onClick={() => console.log('clicked')}>
        Click me
      </Button>
    </Card>
  );
}
```

## Development

```bash
# Build the package
yarn workspace @logicnomad/ui build

# Watch mode
yarn workspace @logicnomad/ui dev

# Type check
yarn workspace @logicnomad/ui type-check
```

## Structure

```
src/
├── components/    # React components
└── index.ts      # Main export file
```

## Adding Components

1. Create your component in `src/components/YourComponent/`
2. Export it from `src/components/YourComponent/index.ts`
3. Add the export to `src/index.ts`
4. Build the package: `yarn workspace @logicnomad/ui build`
