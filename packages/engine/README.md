# @logicnomad/engine

Shared engine package for LogicNomad monorepo. Contains algorithm execution, flowgraph validation, and game logic.

## Installation

This package is part of the LogicNomad monorepo and is automatically available to workspace packages.

```bash
# From workspace root
yarn workspace @logicnomad/engine build
```

## Usage

### Main Import

```typescript
import {
  executeAlgorithm,
  validateFlowgraph,
  type GameState,
  type PuzzleLevel,
} from '@logicnomad/engine';
```

### Subpath Imports (Recommended for Tree-Shaking)

```typescript
// Types only
import type { GameState, PuzzleLevel } from '@logicnomad/engine/types';

// Flowgraph utilities
import { validateFlowgraph, flowgraphToExecutionOrder } from '@logicnomad/engine/flowgraph';

// Algorithm execution
import { executeAlgorithm } from '@logicnomad/engine/executor';

// Condition evaluation
import { evaluateCondition } from '@logicnomad/engine/executor/conditionEvaluator';
```

## API

### Flowgraph

- `validateFlowgraph(flowgraph: Flowgraph): ValidationResult` - Validate flowgraph structure
- `flowgraphToExecutionOrder(flowgraph: Flowgraph): ExecutionNode[]` - Convert flowgraph to execution order

### Executor

- `executeAlgorithm(flowgraph: Flowgraph, gameState: GameState, level: PuzzleLevel): Promise<ExecutionResult>` - Execute algorithm on game state
- `evaluateCondition(condition: string, gameState: GameState): boolean` - Evaluate condition in game state

### Types

- `GameState` - Current game state
- `PuzzleLevel` - Level definition
- `Flowgraph` - Flowchart structure
- `FlowNode` - Flowchart node
- `FlowEdge` - Flowchart edge
- `ExecutionResult` - Algorithm execution result

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
engine/
├── src/
│   ├── types/          # TypeScript type definitions
│   ├── flowgraph/      # Flowgraph validation and execution
│   ├── executor/       # Algorithm execution engine
│   ├── utils/          # Utility functions
│   └── constants/      # Shared constants
└── dist/               # Compiled output
```

## Exports

The package supports both main import and subpath imports for optimal tree-shaking:

- `@logicnomad/engine` - Main entry point
- `@logicnomad/engine/types` - Type definitions
- `@logicnomad/engine/flowgraph` - Flowgraph utilities
- `@logicnomad/engine/executor` - Algorithm execution
- `@logicnomad/engine/utils` - Utility functions
- `@logicnomad/engine/constants` - Constants

## License

MIT
