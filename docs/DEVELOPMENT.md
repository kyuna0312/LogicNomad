# Development Guide

## 🚀 Quick Start

```bash
# Install dependencies
yarn install

# Build engine package first (required)
yarn build:engine

# Start development
yarn dev:web          # Start web app only
yarn dev              # Start web + API (if needed)

# Build for production
yarn build            # Build all packages
yarn build:web        # Build web app only
yarn build:engine     # Build engine package only
```

## 🏗️ Build & Deploy

```bash
# Production build
yarn build

# Test production build locally
cd apps/web
yarn preview

# Deploy (GitHub Pages)
# Push to main branch - GitHub Actions will auto-deploy
```

## 📁 Project Structure

```
logic-nomad/
├── apps/
│   ├── web/              # Frontend (React + Vite)
│   │   ├── src/
│   │   │   ├── pages/     # Page components (Home, Game)
│   │   │   ├── components/
│   │   │   │   ├── flowgraph/  # Flowchart editor
│   │   │   │   │   ├── FlowgraphEditor.tsx
│   │   │   │   │   ├── ValidationPanel.tsx
│   │   │   │   │   └── NodeConfigPanel.tsx
│   │   │   │   └── game/       # Game board
│   │   │   │       └── GameBoard.tsx
│   │   │   ├── store/     # Zustand stores
│   │   │   │   ├── gameStore.ts
│   │   │   │   └── flowgraphStore.ts
│   │   │   ├── locales/   # Translations (Mongolian)
│   │   │   │   └── mn.ts
│   │   │   └── data/      # Level data
│   │   │       └── levels.ts
│   │   └── vite.config.ts
│   └── api/              # Backend (NestJS + GraphQL)
│       ├── src/
│       │   ├── auth/     # Authentication module
│       │   ├── users/    # User management
│       │   ├── graphql/  # GraphQL resolvers, types, inputs
│       │   ├── entities/ # TypeORM entities
│       │   └── common/   # Guards, decorators, pipes
│       └── package.json
├── packages/
│   ├── engine/           # Core algorithm & flowgraph logic
│   │   ├── src/
│   │   │   ├── types/    # TypeScript types
│   │   │   │   ├── flowgraph.ts
│   │   │   │   └── game.ts
│   │   │   ├── flowgraph/ # Flowgraph utilities
│   │   │   │   └── index.ts (validation, execution order)
│   │   │   ├── executor/  # Algorithm execution engine
│   │   │   │   ├── index.ts
│   │   │   │   └── conditionEvaluator.ts
│   │   │   └── index.ts
│   │   └── package.json
│   └── ui/               # Shared UI components (optional)
├── docs/                 # Documentation
│   ├── ROADMAP.md        # Development roadmap
│   ├── MVP_STATUS.md     # MVP completion status
│   ├── OPTIMIZATION.md   # Performance optimizations
│   └── DEPLOYMENT.md     # Deployment guide
└── .github/
    └── workflows/        # CI/CD workflows
        └── deploy.yml    # GitHub Pages deployment
```

## 🎮 Core Features

### 1. Flowgraph Editor ✅
- React Flow based editor
- Node types: Start, Action, Condition, Loop, End
- Drag & drop interface
- Real-time validation
- Node configuration UI
- Click-to-configure properties

### 2. Game Engine ✅
- 2D grid-based puzzle
- Character movement simulation
- Algorithm execution
- Enhanced collision detection
- Goal detection with optimal solution tracking
- Multiple failure conditions
- Performance optimized (memoization)

### 3. State Management ✅
- Zustand for game state
- LocalStorage for progress
- Flowgraph store with validation
- Game store with execution tracking

### 4. Algorithm Execution ✅
- Full loop execution with iteration tracking
- Condition branching (true/false paths)
- Condition evaluation (wallAhead, canMove, atGoal, notAtGoal)
- Loop stack management for nested loops
- Step-by-step execution with state updates

### 5. Content & Levels ✅
- 11 levels (1 tutorial + 10 puzzle)
- Difficulty system (easy, medium, hard)
- Level progression tracking
- Hints and required actions
- Level selection UI with badges

## 📝 Development Workflow

### ✅ Week 1: Core Foundation (ДУУССАН)
- [x] Project setup ✅
- [x] Grid map render ✅
- [x] Character position & direction ✅
- [x] Basic game state management ✅
- [x] Engine package structure ✅

### ✅ Week 2: Puzzle Mechanics (ДУУССАН)
- [x] Collision detection ✅
- [x] Goal logic ✅
- [x] Level JSON structure ✅
- [x] Step counter validation ✅
- [x] Game over conditions ✅
- [x] Enhanced collision detection (wall, boundaries) ✅
- [x] Optimal solution tracking ✅

### ✅ Week 3: Flowchart Editor (ДУУССАН)
- [x] React Flow setup ✅
- [x] Node types (5 types) ✅
- [x] Drag & drop interface ✅
- [x] Basic validation ✅
- [x] Node configuration UI ✅
- [x] Real-time validation panel ✅
- [x] Click-to-configure node properties ✅

### ✅ Week 4: Algorithm Simulation (ДУУССАН)
- [x] Flowgraph → JSON ✅
- [x] Step execution ✅
- [x] Flowchart → game control ✅
- [x] Loop execution (full) ✅
- [x] Condition branching (true/false paths) ✅
- [x] Condition evaluation (wallAhead, canMove, atGoal) ✅
- [x] Loop stack management ✅

### ✅ Week 5: Content & Release (ДУУССАН)
- [x] 10–15 puzzle levels (11 levels) ✅
- [x] Mongolian UI text ✅
- [x] Tutorial level ✅
- [x] Demo deploy configuration ✅
- [x] Level selection UI ✅
- [x] Progress tracking ✅

### ✅ Performance Optimization (ДУУССАН)
- [x] Code splitting & lazy loading ✅
- [x] React memoization ✅
- [x] Bundle optimization ✅
- [x] Vite build optimization ✅

## 🛠️ Technology Stack

### Frontend
- **React 19** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **React Flow** - Flowchart editor
- **Zustand** - State management

### Engine Package
- **TypeScript** - Type safety
- **ES Modules** - Modern JS
- **Shared types** - Between frontend/backend

### Build & Deploy
- **Yarn Workspaces** - Monorepo management
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Hosting

## 📦 Available Scripts

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
yarn clean            # Clean all build artifacts
yarn clean:all        # Clean everything including node_modules
```

## 🐛 Troubleshooting

### Engine package not found
```bash
# Rebuild engine package
yarn build:engine
```

### Vite module resolution issues
```bash
# Clear Vite cache
rm -rf apps/web/node_modules/.vite
# Restart dev server
```

### TypeScript errors
```bash
# Rebuild all packages
yarn build
```

## 📚 Documentation

- [README.md](./README.md) - Documentation index and overview
- [ROADMAP.md](./ROADMAP.md) - Full development roadmap (5 weeks completed)
- [MVP_STATUS.md](./MVP_STATUS.md) - MVP completion status (100% complete)
- [OPTIMIZATION.md](./OPTIMIZATION.md) - Performance optimizations guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide (GitHub Pages / Vercel)
- [PROJECT_SPEC.md](./PROJECT_SPEC.md) - Complete project specification

## 🎯 Current Status

**MVP Status**: 100% Complete! 🎉

All core features implemented:
- ✅ Flowchart Editor (100%) - Full validation, node configuration
- ✅ Game Engine (100%) - Enhanced mechanics, collision detection
- ✅ Algorithm Execution (100%) - Loops, conditions, full control flow
- ✅ Content & Levels (100%) - 11 levels with tutorial
- ✅ Performance Optimization (100%) - Code splitting, memoization

**Deployment Status**:
- ✅ GitHub Actions workflow configured
- ✅ Vite base path set for GitHub Pages
- ✅ Build configuration optimized
- 📝 Ready to deploy (push to main branch)

**Next Step**: Deploy to production (GitHub Pages / Vercel) - 1–2 цаг

---

## 🎓 Learning Resources

### For New Developers

1. **Understanding the Architecture**
   - Start with [PROJECT_SPEC.md](./PROJECT_SPEC.md) for overview
   - Read [ROADMAP.md](./ROADMAP.md) for development history
   - Check [DEVELOPMENT.md](./DEVELOPMENT.md) (this file) for setup

2. **Key Concepts**
   - **Flowgraph**: Visual representation of algorithms
   - **Executor**: Engine that runs flowgraphs on game state
   - **Game State**: Current position, direction, grid, step count
   - **Validation**: Ensures flowgraph is valid before execution

3. **Code Structure**
   - `packages/engine/` - Core logic (shared)
   - `apps/web/src/` - Frontend React app
   - `apps/web/src/store/` - State management (Zustand)
   - `apps/web/src/components/` - UI components

### Common Patterns

- **State Management**: Zustand stores for game and flowgraph state
- **Component Memoization**: Use `memo`, `useMemo`, `useCallback`
- **Lazy Loading**: Route-based code splitting
- **Type Safety**: TypeScript types in `@logicnomad/engine`

---

## 🔍 Code Examples

### Adding a New Level

```typescript
// apps/web/src/data/levels.ts
export const levels: PuzzleLevel[] = [
  // ... existing levels
  {
    id: 'level-11',
    name: 'Түвшин 11: Шинэ түвшин',
    description: 'Тайлбар',
    difficulty: 'medium',
    grid: [
      // Grid definition
    ],
    startPosition: { x: 0, y: 0 },
    startDirection: 'east',
    goalPosition: { x: 5, y: 5 },
    maxSteps: 30,
    minSteps: 15,
    hints: ['Зааварчилгаа'],
    requiredActions: ['move', 'turnRight'],
  },
];
```

### Adding a New Condition

```typescript
// packages/engine/src/executor/conditionEvaluator.ts
export function evaluateCondition(
  condition: string,
  state: GameState,
  level: PuzzleLevel,
): boolean {
  // ... existing conditions
  case 'newCondition':
    // Your condition logic
    return true;
}
```

### Creating a New Component

```typescript
// apps/web/src/components/NewComponent.tsx
import { memo } from 'react';

export const NewComponent = memo(() => {
  // Component logic
  return <div>Content</div>;
});

NewComponent.displayName = 'NewComponent';
```

---

## 🧪 Testing (Future)

When adding tests:

```bash
# Install testing dependencies
yarn add -D vitest @testing-library/react

# Run tests
yarn test

# Test coverage
yarn test:coverage
```

---

## 📝 Contributing Guidelines

### Code Style

- Use TypeScript strict mode
- Follow existing component patterns
- Use memoization for expensive components
- Keep functions small and focused

### Commit Messages

- Use clear, descriptive messages
- Reference issue numbers if applicable
- Follow conventional commits format

### Pull Requests

- Ensure all builds pass
- Update documentation if needed
- Test on multiple browsers
- Check performance impact
