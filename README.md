# LogicNomad

**Алгоритм + Тоглоомоор Алгоритм Сурах Платформ**

Монгол залуус, сурагч, анхан шатны хөгжүүлэгчдэд алгоритм, логик сэтгэлгээ, програмчлалын үндсийг flowchart + тоглоомын puzzle хэлбэрээр ойлгомжтой, сонирхолтой байдлаар заах веб платформ.

## 🎯 MVP Status

**✅ MVP 100% Complete!**

- ✅ Flowchart Editor (React Flow) - Full validation, node configuration
- ✅ Game Engine - Enhanced mechanics, collision detection
- ✅ Algorithm Execution - Loops, conditions, full control flow
- ✅ Content & Levels - 15 levels (1 tutorial + 14 puzzles)
- ✅ Performance Optimization - Code splitting, memoization
- ✅ Deployment Ready - GitHub Actions configured

[View Full MVP Status →](./docs/MVP_STATUS.md)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- Yarn (package manager)

### Installation

```bash
# Install all dependencies
yarn install

# Build engine package first (required)
yarn build:engine
```

### Development

```bash
# Run both frontend and backend in parallel
yarn dev

# Or run individually
yarn dev:web    # Frontend on http://localhost:5173
yarn dev:api    # Backend on http://localhost:3000
```

### Production Build

```bash
# Build all packages
yarn build

# Build specific package
yarn build:web      # Web app
yarn build:engine   # Engine package
yarn build:api      # API
```

## 🏗️ Project Structure

```
logic-nomad/
├── apps/
│   ├── web/              # Frontend (React + Vite + Tailwind)
│   │   ├── src/
│   │   │   ├── pages/     # Home, Game pages
│   │   │   ├── components/
│   │   │   │   ├── flowgraph/  # Flowchart editor
│   │   │   │   └── game/       # Game board
│   │   │   ├── store/     # Zustand stores
│   │   │   ├── locales/   # Translations
│   │   │   └── data/      # Level data
│   │   └── vite.config.ts
│   └── api/              # Backend (NestJS) - Phase 2
├── packages/
│   ├── engine/           # Algorithm + Flowgraph core
│   │   ├── src/
│   │   │   ├── types/    # TypeScript types
│   │   │   ├── flowgraph/ # Validation, execution
│   │   │   └── executor/  # Algorithm engine
│   │   └── package.json
│   └── ui/               # Shared UI components (optional)
├── docs/                 # Documentation
│   ├── README.md         # This file
│   ├── DEVELOPMENT.md    # Development guide
│   ├── DEPLOYMENT.md     # Deployment guide
│   ├── OPTIMIZATION.md   # Performance guide
│   ├── PROJECT_SPEC.md   # Project specification
│   ├── ROADMAP.md        # Development roadmap
│   └── MVP_STATUS.md     # MVP status
├── .github/
│   └── workflows/        # CI/CD
│       └── deploy.yml    # GitHub Pages deployment
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Flow** - Flowchart editor
- **Zustand** - State management

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **GraphQL** - Apollo Server with NestJS
- **PostgreSQL** - Database with TypeORM
- **JWT** - Authentication (Passport)
- **bcrypt** - Password hashing

### Shared Packages

#### Engine (`@logicnomad/engine`)
- Algorithm execution engine
- Flowgraph validation and execution
- Game state types and utilities
- Condition evaluation

#### UI (`@logicnomad/ui`)
- Shared UI components (Button, Badge, Alert, Card, LoadingSpinner)
- Consistent design system
- TypeScript support

#### Flowgraph (`@logicnomad/flowgraph`)
- Flowchart editor component
- Node configuration panel
- Validation panel
- Zustand store integration

## 📦 Available Scripts

### Root Level

```bash
# Development
yarn dev              # Start web + API
yarn dev:web          # Start web app only
yarn dev:api          # Start API only

# Build
yarn build            # Build all packages
yarn build:web        # Build web app
yarn build:engine     # Build engine package
yarn build:api        # Build API

# Lint & Format
yarn lint             # Lint all packages
yarn format           # Format code with Prettier

# Clean
yarn clean            # Clean build outputs
yarn clean:all        # Clean all node_modules and builds
```

## 📚 Documentation

### Core Documentation

- **[Development Guide](./docs/DEVELOPMENT.md)** - Complete development workflow, setup, and troubleshooting
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Deploy to GitHub Pages or Vercel
- **[Performance Optimization](./docs/OPTIMIZATION.md)** - Performance optimizations and best practices
- **[Improvement Suggestions](./docs/IMPROVEMENTS.md)** - Comprehensive improvement roadmap
- **[Project Specification](./docs/PROJECT_SPEC.md)** - Complete project specification (Mongolian)
- **[Development Roadmap](./docs/ROADMAP.md)** - 5-week development roadmap (completed)
- **[MVP Status](./docs/MVP_STATUS.md)** - Detailed MVP completion status

### Quick Links

- **Getting Started**: See [Development Guide](./docs/DEVELOPMENT.md#-quick-start)
- **Deploy**: See [Deployment Guide](./docs/DEPLOYMENT.md)
- **Optimize**: See [Performance Guide](./docs/OPTIMIZATION.md)
- **Project Spec**: See [Project Specification](./docs/PROJECT_SPEC.md)

## 🎮 Features

### ✅ Implemented (MVP)

- **Flowchart Editor**: Drag & drop interface with React Flow
  - 5 node types: Start, Action, Condition, Loop, End
  - Real-time validation
  - Node configuration panel
  
- **Game Engine**: 2D grid-based puzzle
  - Character movement (move, turn)
  - Collision detection
  - Goal logic
  - Step counter validation
  
- **Algorithm Execution**: Full control flow
  - Loop execution with iteration tracking
  - Condition branching (true/false paths)
  - Step-by-step execution
  - Success/failure detection
  
- **Content**: 15 puzzle levels
  - 1 tutorial level
  - 14 puzzle levels (easy to hard)
  - Difficulty filtering
  - Progress tracking (localStorage)
  
- **Performance**: Optimized bundle
  - Code splitting (3 vendor chunks)
  - Lazy loading
  - React memoization (8 components)
  - CSS optimization

### ✅ Implemented (Phase 2)

- ✅ **Backend API** - NestJS with GraphQL
- ✅ **User Authentication** - JWT-based auth system
- ✅ **PostgreSQL Database** - User data and progress storage
- ✅ **User Profile** - Profile display with progress stats
- ✅ **Progress Sync** - Cloud-based progress tracking
- ✅ **GraphQL API** - Type-safe API with Apollo Client

### 🚧 Future (Phase 3)

- Leaderboard
- Community levels
- Social features

## 📊 Performance

**Current Bundle Size**:
- Total: ~353KB (uncompressed) / ~113KB (gzipped)
- Main bundle: 15.81 KB (gzip: 4.68 KB)
- Vendor chunks: Optimized and split

See [Performance Optimization Guide](./docs/OPTIMIZATION.md) for details.

## 🚀 Deployment

### GitHub Pages (Automatic)

1. Push to `main` branch
2. GitHub Actions automatically deploys
3. Site available at `https://<username>.github.io/LogicNomad/`

### Vercel

1. Connect repository to Vercel
2. Configure build settings
3. Deploy automatically

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## 🎯 Success Metrics

- ✅ 10+ puzzle levels (15 levels implemented)
- ✅ Flowchart → puzzle fully connected
- ✅ Mongolian UI (fully translated)
- ✅ Public demo ready (deployment configured)

## 📝 License

MIT

## 👤 Author

kyuna0312

---

**Status**: MVP Complete ✅ | Ready for Deployment 🚀
