# @logicnomad/engine

Shared engine package for LogicNomad monorepo. Contains common types, utilities, and constants used across applications.

## Installation

This package is automatically available in the monorepo workspace. No installation needed.

## Usage

### In API (NestJS)

```typescript
import { createSuccessResponse, ApiResponse, User } from '@logicnomad/engine';

@Get()
getUsers(): ApiResponse<User[]> {
  const users = []; // your logic
  return createSuccessResponse(users, 'Users retrieved successfully');
}
```

### In Web (React)

```typescript
import { isValidEmail, formatDate, API_ENDPOINTS } from '@logicnomad/engine';

// Use utilities
const email = 'user@example.com';
if (isValidEmail(email)) {
  // valid email
}

// Use constants
fetch(`${API_ENDPOINTS.USERS}`)
```

## Structure

```
src/
├── types/        # Shared TypeScript types
├── utils/        # Utility functions
├── constants/    # Shared constants
└── index.ts      # Main export file
```

## Development

```bash
# Build the package
yarn workspace @logicnomad/engine build

# Watch mode
yarn workspace @logicnomad/engine dev

# Type check
yarn workspace @logicnomad/engine type-check
```

## Exports

The package exports can be imported in several ways:

```typescript
// Main exports (everything)
import { User, createSuccessResponse, API_ENDPOINTS } from '@logicnomad/engine';

// Specific exports
import { User, ApiResponse } from '@logicnomad/engine/types';
import { isValidEmail, formatDate } from '@logicnomad/engine/utils';
import { API_ENDPOINTS, HTTP_STATUS } from '@logicnomad/engine/constants';
```
