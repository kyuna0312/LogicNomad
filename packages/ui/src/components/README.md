# UI Components

Place your shared React components here.

## Example Structure

```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   ├── Card.test.tsx
│   └── index.ts
└── ...
```

## Usage

Components should be exported from the main `src/index.ts` file:

```typescript
export { Button } from './components/Button';
export { Card } from './components/Card';
```

Then they can be imported in your apps:

```typescript
import { Button, Card } from '@logicnomad/ui';
```
