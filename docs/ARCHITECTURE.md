# 🏗️ LogicNomad Architecture

This document describes the architecture and design decisions of the LogicNomad project.

## 📐 System Overview

LogicNomad is a monorepo-based educational platform that teaches algorithms through interactive flowcharts and puzzle games.

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Home Page  │  │  Game Page   │  │ Level List   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Shared Packages Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Flowgraph  │  │     UI       │  │   Engine     │ │
│  │   Package    │  │   Package    │  │   Package    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              State Management (Zustand)                  │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │ Game Store   │  │ Flowgraph     │                    │
│  │              │  │ Store         │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Data Layer                                  │
│  ┌──────────────┐  ┌──────────────┐                    │
│  │  Levels Data │  │  LocalStorage│                    │
│  │  (Static)    │  │  (Progress)  │                    │
│  └──────────────┘  └──────────────┘                    │
└─────────────────────────────────────────────────────────┘
```

## 📦 Package Architecture

### 1. `@logicnomad/engine`

**Purpose**: Core algorithm execution and game logic

**Structure**:
```
engine/
├── src/
│   ├── types/          # TypeScript type definitions
│   │   ├── flowgraph.ts
│   │   └── game.ts
│   ├── flowgraph/      # Flowgraph validation
│   │   └── index.ts
│   ├── executor/       # Algorithm execution engine
│   │   ├── index.ts
│   │   └── conditionEvaluator.ts
│   ├── constants/      # Game constants
│   └── utils/          # Utility functions
└── package.json
```

**Key Responsibilities**:
- Flowgraph validation
- Algorithm execution (loops, conditions)
- Game state management
- Condition evaluation
- Step counting

**Dependencies**: None (pure TypeScript)

---

### 2. `@logicnomad/ui`

**Purpose**: Shared UI components

**Structure**:
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
└── package.json
```

**Key Responsibilities**:
- Reusable UI components
- Consistent design system
- TypeScript type definitions

**Dependencies**: React (peer dependency)

---

### 3. `@logicnomad/flowgraph`

**Purpose**: Flowchart editor component

**Structure**:
```
flowgraph/
├── src/
│   ├── components/
│   │   ├── FlowgraphEditor.tsx
│   │   ├── NodeConfigPanel.tsx
│   │   └── ValidationPanel.tsx
│   ├── store/
│   │   └── index.ts      # Zustand store
│   └── index.ts
└── package.json
```

**Key Responsibilities**:
- Flowchart editing interface
- Node management
- Edge connections
- Real-time validation

**Dependencies**: 
- React Flow
- Zustand
- @logicnomad/engine
- @logicnomad/ui

---

## 🏛️ Application Architecture

### Frontend (`apps/web`)

**Technology Stack**:
- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- Zustand

**Structure**:
```
web/
├── src/
│   ├── pages/           # Route pages
│   │   ├── Home.tsx
│   │   └── Game.tsx
│   ├── components/      # Feature components
│   │   ├── game/
│   │   └── LevelList.tsx
│   ├── store/          # Application state
│   │   └── gameStore.ts
│   ├── data/           # Static data
│   │   └── levels.ts
│   ├── locales/        # Translations
│   │   └── mn.ts
│   └── App.tsx         # Root component
└── vite.config.ts
```

**State Management**:
- **Zustand**: Lightweight state management
- **Game Store**: Game state, progress, execution
- **Flowgraph Store**: Flowchart state (in package)

**Routing**:
- Simple state-based routing (no React Router needed for MVP)
- Two main pages: Home and Game

---

## 🔄 Data Flow

### Algorithm Execution Flow

```
User creates flowchart
    │
    ▼
Flowgraph Store (nodes, edges)
    │
    ▼
Validation (engine package)
    │
    ▼
Execution (engine package)
    │
    ▼
Game State Update
    │
    ▼
UI Update (GameBoard)
```

### Level Selection Flow

```
User selects level
    │
    ▼
Game Store (setCurrentLevel)
    │
    ▼
Initialize game state
    │
    ▼
Load level data
    │
    ▼
Render GameBoard
```

---

## 🎨 Design Patterns

### 1. **Monorepo Pattern**
- Shared packages for code reuse
- Independent versioning
- Workspace dependencies

### 2. **Component Composition**
- Small, focused components
- Composition over inheritance
- Reusable UI components

### 3. **State Management**
- Zustand for global state
- Local state for component-specific data
- Derived state with useMemo

### 4. **Code Splitting**
- Lazy loading for routes
- Dynamic imports for heavy components
- Vendor chunk separation

### 5. **Type Safety**
- TypeScript throughout
- Shared types in engine package
- Strict type checking

---

## 🔌 Integration Points

### Package Integration

```
apps/web
    ├── @logicnomad/engine      (core logic)
    ├── @logicnomad/ui          (components)
    └── @logicnomad/flowgraph   (editor)
```

### External Dependencies

- **React Flow**: Flowchart visualization
- **Zustand**: State management
- **Tailwind CSS**: Styling
- **Vite**: Build tool

---

## 📊 Performance Considerations

### Bundle Optimization
- Code splitting by route
- Vendor chunk separation
- Lazy loading for heavy components
- Tree shaking enabled

### Runtime Optimization
- React.memo for expensive components
- useMemo for derived state
- useCallback for event handlers
- Virtual scrolling (if needed)

### Loading Strategy
- Preload on hover
- Progressive loading
- Skeleton loaders
- Optimistic updates

---

## 🔒 Security Considerations

### Current (MVP)
- Client-side only
- No authentication
- LocalStorage for progress
- No sensitive data

### Future (Phase 2)
- Backend authentication
- Encrypted data transmission
- Input validation
- Rate limiting

---

## 🧪 Testing Strategy

### Current
- Manual testing
- TypeScript type checking

### Recommended
- Unit tests (Jest/Vitest)
- Component tests (React Testing Library)
- Integration tests
- E2E tests (Playwright)

---

## 📈 Scalability

### Current Architecture
- Monorepo supports growth
- Package separation enables reuse
- Modular components

### Future Considerations
- Backend API integration
- Database for user data
- CDN for static assets
- Microservices (if needed)

---

## 🛠️ Development Workflow

### Local Development
1. Install dependencies: `yarn install`
2. Build packages: `yarn build:engine`
3. Start dev server: `yarn dev:web`

### Build Process
1. Build all packages in order
2. Bundle web app with Vite
3. Optimize and minify
4. Generate static assets

### Deployment
1. Build production bundle
2. Deploy to GitHub Pages/Vercel
3. CDN caching
4. Monitor performance

---

## 📚 Key Design Decisions

### Why Monorepo?
- Code sharing between packages
- Single source of truth
- Easier refactoring
- Simplified dependency management

### Why Zustand?
- Lightweight (no boilerplate)
- TypeScript support
- Simple API
- Good performance

### Why Vite?
- Fast HMR
- Optimized builds
- Modern tooling
- Great DX

### Why React Flow?
- Mature library
- Good TypeScript support
- Customizable
- Active maintenance

---

## 🔮 Future Architecture

### Phase 2: Backend Integration
```
Frontend (React)
    │
    ▼
API Gateway (NestJS)
    │
    ▼
Services
    ├── Auth Service
    ├── Progress Service
    └── Level Service
    │
    ▼
Database (PostgreSQL)
```

### Phase 3: Advanced Features
- Real-time collaboration
- Level marketplace
- Social features
- Analytics dashboard

---

**Last Updated**: 2024  
**Status**: MVP Complete, Architecture Stable 🏗️
