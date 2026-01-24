# 🧙 LogicNomad

<div align="center">

**Алгоритм + Тоглоомоор Алгоритм Сурах Платформ**

*Монгол залуус, сурагч, анхан шатны хөгжүүлэгчдэд алгоритм, логик сэтгэлгээ, програмчлалын үндсийг flowchart + тоглоомын puzzle хэлбэрээр ойлгомжтой, сонирхолтой байдлаар заах веб платформ.*

[![Status](https://img.shields.io/badge/status-MVP%20Complete-success)](./docs/MVP_STATUS.md)
[![Version](https://img.shields.io/badge/version-2.0.0-blue)](./package.json)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

[📚 Documentation](./docs/README.md) • [🚀 Quick Start](#-quick-start) • [🏗️ Architecture](./docs/ARCHITECTURE.md)

</div>

---

## ✨ Features

### 🎮 Core Game Features
- **Flowchart Editor** - Drag & drop interface with React Flow
  - 5 node types: Start, Action, Condition, Loop, End
  - Real-time validation and error checking
  - Node configuration panel
- **Game Engine** - 2D grid-based puzzle mechanics
  - Character movement (move, turn, wait)
  - Collision detection and boundary checking
  - Goal logic with step counter validation
- **Algorithm Execution** - Full control flow support
  - Loop execution with iteration tracking
  - Condition branching (true/false paths)
  - Step-by-step execution visualization
  - Success/failure detection

### 👤 User Features
- **User Authentication** - JWT-based secure authentication
- **User Profile** - Profile display with progress statistics
- **Progress Tracking** - Cloud-based progress sync (PostgreSQL)
- **15 Puzzle Levels** - 1 tutorial + 14 puzzles (easy to hard)

### ⚡ Performance
- Code splitting (4 vendor chunks)
- Lazy loading for optimal bundle size
- React memoization (8+ components)
- Tree shaking and CSS optimization
- Bundle size: ~113KB (gzipped)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ ([install via nvm](https://github.com/nvm-sh/nvm))
- **Yarn** package manager
- **PostgreSQL** 12+ (for backend API)

### Installation

```bash
# Clone repository
git clone https://github.com/kyuna0312/LogicNomad.git
cd LogicNomad

# Install dependencies
yarn install

# Build engine package (required)
yarn build:engine
```

### Environment Setup

1. **API Environment**:
   ```bash
   cp apps/api/.env.example apps/api/.env
   # Edit apps/api/.env with your database credentials
   ```

2. **Web App Environment** (optional):
   ```bash
   cp apps/web/.env.example apps/web/.env
   # Edit apps/web/.env if needed
   ```

3. **Database Setup**:
   ```bash
   # Create database (see docs/ENVIRONMENT.md for details)
   # Or use the setup script if available
   ```

### Development

```bash
# Start both frontend and backend
yarn dev

# Or start individually
yarn dev:web    # Frontend: http://localhost:5173
yarn dev:api    # Backend: http://localhost:3000
```

**Access Points**:
- 🌐 Web App: http://localhost:5173
- 🔷 GraphQL Playground: http://localhost:3000/graphql
- 📡 API: http://localhost:3000

### Production Build

```bash
# Build all packages
yarn build

# Build specific packages
yarn build:web      # Web app
yarn build:api      # API
yarn build:engine   # Engine package
yarn build:ui       # UI components
```

---

## 🏗️ Project Structure

```
LogicNomad/
├── apps/
│   ├── web/                    # Frontend (React + Vite)
│   │   ├── src/
│   │   │   ├── pages/          # Home, Game pages
│   │   │   ├── components/     # React components
│   │   │   │   ├── UserProfile.tsx
│   │   │   │   ├── AuthModal.tsx
│   │   │   │   └── LevelList.tsx
│   │   │   ├── store/          # Zustand stores
│   │   │   │   ├── authStore.ts
│   │   │   │   └── gameStore.ts
│   │   │   ├── graphql/        # GraphQL queries/mutations
│   │   │   ├── lib/            # Utilities (Apollo Client)
│   │   │   └── data/           # Level data
│   │   └── vite.config.ts
│   └── api/                    # Backend (NestJS + GraphQL)
│       ├── src/
│       │   ├── auth/           # Authentication module
│       │   ├── users/          # User management
│       │   ├── graphql/        # GraphQL resolvers, types
│       │   ├── entities/       # TypeORM entities
│       │   ├── common/         # Guards, decorators, pipes
│       │   └── config/         # Configuration files
│       └── nest-cli.json
├── packages/
│   ├── engine/                 # Algorithm execution engine
│   ├── ui/                     # Shared UI components
│   ├── flowgraph/              # Flowchart editor
│   └── reactflow/               # React Flow extensions
├── docs/                       # Documentation
└── scripts/                    # Utility scripts
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **React Flow** | Flowchart editor |
| **Zustand** | State management |
| **Apollo Client** | GraphQL client |

### Backend
| Technology | Purpose |
|-----------|---------|
| **NestJS** | Node.js framework |
| **GraphQL** | API layer (Apollo Server) |
| **PostgreSQL** | Database |
| **TypeORM** | ORM |
| **JWT + Passport** | Authentication |
| **bcrypt** | Password hashing |

### Shared Packages
- **`@logicnomad/engine`** - Algorithm execution engine
- **`@logicnomad/ui`** - Shared UI components
- **`@logicnomad/flowgraph`** - Flowchart editor
- **`@logicnomad/reactflow`** - React Flow extensions

---

## 📦 Available Scripts

### Development
```bash
yarn dev              # Start web + API in parallel
yarn dev:web          # Start web app only
yarn dev:api          # Start API only
```

### Build
```bash
yarn build            # Build all packages
yarn build:packages   # Build packages only
yarn build:apps       # Build apps only
yarn build:web        # Build web app
yarn build:api        # Build API
yarn build:engine     # Build engine package
```

### Code Quality
```bash
yarn lint             # Lint all packages
yarn format           # Format code with Prettier
```

### Cleanup
```bash
yarn clean            # Clean build outputs
yarn clean:build      # Clean dist/build folders
yarn clean:cache      # Clean cache folders
yarn clean:tsbuild    # Clean TypeScript build info
yarn clean:all        # Clean everything including node_modules
```

---

## 📚 Documentation

### 🚀 Getting Started
- **[Development Guide](./docs/DEVELOPMENT.md)** - Complete setup and workflow
- **[Environment Variables](./docs/ENVIRONMENT.md)** - Configuration guide
- **[GraphQL API](./docs/GRAPHQL.md)** - API documentation

### 🏗️ Technical
- **[Architecture Guide](./docs/ARCHITECTURE.md)** - System design
- **[Performance Optimization](./docs/OPTIMIZATION.md)** - Best practices
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Deployment instructions

### 📋 Project Info
- **[Project Specification](./docs/PROJECT_SPEC.md)** - Complete spec (Mongolian)
- **[MVP Status](./docs/MVP_STATUS.md)** - Feature completion status
- **[Roadmap](./docs/ROADMAP.md)** - Development roadmap
- **[Improvements](./docs/IMPROVEMENTS.md)** - Future enhancements

---

## 🎯 Project Status

### ✅ MVP: 100% Complete
- Flowchart editor with full validation
- Game engine with collision detection
- Algorithm execution with loops & conditions
- 15 levels (1 tutorial + 14 puzzles)
- Performance optimizations
- Mongolian UI translation

### ✅ Phase 2: 100% Complete
- GraphQL API (Apollo Server)
- PostgreSQL database integration
- User authentication (JWT)
- User profile with progress tracking
- Cloud-based progress sync

### 🚧 Phase 3: Planned
- Leaderboard system
- Community levels
- Social features

---

## 🚀 Deployment

### GitHub Pages (Automatic)
1. Push to `main` branch
2. GitHub Actions automatically deploys
3. Site available at `https://kyuna0312.github.io/LogicNomad/`

### Manual Deployment
See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

---

## 🧪 Testing

### Test User Credentials
- **Email**: `test@example.com`
- **Password**: `Test123456`

See [GraphQL API Docs](./docs/GRAPHQL.md) for testing queries.

---

## 📊 Performance Metrics

- **Bundle Size**: ~113KB (gzipped)
- **Initial Load**: < 1.5s
- **Code Splitting**: 4 vendor chunks
- **Lazy Loading**: Game page loaded on-demand
- **Memoization**: 8+ components optimized

See [Performance Guide](./docs/OPTIMIZATION.md) for details.

---

## 🤝 Contributing

Contributions are welcome! Please read the [Development Guide](./docs/DEVELOPMENT.md) first.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**kyuna0312**

- GitHub: [@kyuna0312](https://github.com/kyuna0312)
- Repository: [LogicNomad](https://github.com/kyuna0312/LogicNomad)

---

<div align="center">

**Status**: MVP Complete ✅ | Phase 2 Complete ✅ | Ready for Production 🚀

**Version**: 2.0.0 | **Last Updated**: 2026-01-18

Made with ❤️ for Mongolian learners

</div>
