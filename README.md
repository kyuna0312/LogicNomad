# LogicNomad

A modern monorepo project with React frontend and NestJS backend.

## 🏗️ Project Structure

```
logic-nomad/
├── apps/
│   ├── web/          # Frontend (React)
│   └── api/          # Backend (NestJS)
├── packages/
│   ├── engine/       # Algorithm + Flowgraph core (shared)
│   └── ui/           # Shared UI components (optional)
├── docs/             # Design docs, devlogs
├── scripts/           # Dev scripts
├── .editorconfig
├── .gitignore
├── package.json      # Yarn workspace root
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- Yarn (package manager)

### Installation

```bash
# Install all dependencies
yarn install
```

### Development

```bash
# Run both frontend and backend in parallel
yarn dev

# Or run individually
yarn dev:web    # Frontend on http://localhost:5173
yarn dev:api    # Backend on http://localhost:3000
```

## 📦 Available Scripts

### Root Level

- `yarn dev` - Run both web and API in parallel
- `yarn build` - Build all packages (engine, ui, api, web)
- `yarn build:engine` - Build shared engine package
- `yarn build:ui` - Build shared UI components package
- `yarn lint` - Lint all applications and packages
- `yarn format` - Format code with Prettier
- `yarn clean` - Clean build outputs
- `yarn clean:all` - Clean all node_modules and builds

### Scripts Directory

The `scripts/` directory contains shell scripts for common tasks:

- `./scripts/setup.sh` - Initial project setup
- `./scripts/dev.sh` - Start development environment
- `./scripts/build.sh` - Build all packages
- `./scripts/clean.sh` - Clean build artifacts

### Web App (`apps/web`)

- `yarn workspace web dev` - Start development server
- `yarn workspace web build` - Build for production
- `yarn workspace web lint` - Run ESLint

### API (`apps/api`)

- `yarn workspace api start:dev` - Start development server with hot reload
- `yarn workspace api build` - Build for production
- `yarn workspace api start:prod` - Run production build
- `yarn workspace api test` - Run unit tests
- `yarn workspace api lint` - Run ESLint

## 🛠️ Tech Stack

### Frontend (Web)
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **ESLint** - Code linting

### Backend (API)
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **Express** - HTTP server
- **Jest** - Testing framework

### Shared Packages

#### Engine (`@logicnomad/engine`)
- **Algorithm + Flowgraph core** - Shared types, utilities, and constants
  - Common TypeScript types (ApiResponse, User, etc.)
  - Utility functions (email validation, date formatting, etc.)
  - Shared constants (API endpoints, HTTP status codes, etc.)

#### UI (`@logicnomad/ui`)
- **Shared UI components** - Reusable React components
  - Common UI components that can be used across applications
  - Styled with Tailwind CSS
  - Type-safe with TypeScript

## 📦 Shared Packages

### Engine Package

The `@logicnomad/engine` package contains shared code used across all applications:

```typescript
// Import types
import { ApiResponse, User } from '@logicnomad/engine';

// Import utilities
import { isValidEmail, formatDate, createSuccessResponse } from '@logicnomad/engine';

// Import constants
import { API_ENDPOINTS, HTTP_STATUS } from '@logicnomad/engine';
```

See [packages/engine/README.md](./packages/engine/README.md) for detailed documentation.

### UI Package

The `@logicnomad/ui` package contains shared React components:

```typescript
import { Button, Card } from '@logicnomad/ui';
```

See [packages/ui/README.md](./packages/ui/README.md) for detailed documentation.

## 📝 Code Quality

- **Prettier** - Code formatting (configured at root)
- **ESLint** - Linting (configured per app)
- **TypeScript** - Shared base config at root

## 🔧 Configuration

- TypeScript base config: `tsconfig.base.json`
- Prettier config: `.prettierrc`
- Git ignore: `.gitignore`

## 📚 Documentation

- [Development Guide](./docs/DEVELOPMENT.md) - Development workflow
- [Project Specification](./docs/PROJECT_SPEC.md) - Full project spec
- [Roadmap](./docs/ROADMAP.md) - 5-week development roadmap
- [MVP Status](./docs/MVP_STATUS.md) - MVP completion status

## 🎯 MVP Status

**Core Features**: 100% ✅  
**Success Metrics**: 75% 🔄  
**Overall**: ~80% complete

See [MVP Status Report](./docs/MVP_STATUS.md) for details.

## 📄 License

MIT

## 👤 Author

kyuna0312
