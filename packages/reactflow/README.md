# @logicnomad/reactflow

Extended and optimized React Flow components for LogicNomad.

## Features

- ✅ Optimized React Flow components with memoization
- ✅ Custom node components with handles
- ✅ Utility functions for node/edge creation
- ✅ Connection validation
- ✅ Optimized hooks for React Flow
- ✅ Type-safe with full TypeScript support

## Installation

This package is part of the LogicNomad monorepo and is automatically available to other packages.

## Usage

### Basic Components

```tsx
import { ReactFlowProvider, ReactFlow, CustomNode } from '@logicnomad/reactflow';
import { OptimizedPanel } from '@logicnomad/reactflow/components';

function MyFlowgraph() {
  return (
    <ReactFlowProvider>
      <ReactFlow nodeTypes={{ default: CustomNode }}>
        <OptimizedPanel position="top-left">
          {/* Your content */}
        </OptimizedPanel>
      </ReactFlow>
    </ReactFlowProvider>
  );
}
```

### Utilities

```tsx
import { createNode, createEdge, validateConnection } from '@logicnomad/reactflow/utils';

// Create a node
const node = createNode('action', { x: 100, y: 100 });

// Create an edge
const edge = createEdge('node1', 'node2');

// Validate connection
const validation = validateConnection(connection, nodes, edges);
```

### Hooks

```tsx
import { useReactFlowOptimized, useNodeSelection } from '@logicnomad/reactflow/hooks';

function MyComponent() {
  const { getNodes, setNodes, fitView } = useReactFlowOptimized();
  const { selectedNode, selectedNodes } = useNodeSelection(nodes);
  
  // Use optimized React Flow methods
}
```

## API

### Components

- `CustomNode` - Optimized custom node with handles
- `OptimizedPanel` - Memoized Panel component
- `OptimizedFlowgraphEditor` - Base flowgraph editor component

### Utilities

- `createNode(type, position, data?)` - Create a new node
- `createEdge(source, target, data?, sourceHandle?, targetHandle?)` - Create a new edge
- `validateConnection(connection, nodes, edges)` - Validate a connection
- `getNodeColor(nodeType)` - Get color gradient for node type
- `getNodeIcon(nodeType)` - Get icon for node type
- `getNodeLabel(nodeType)` - Get default label for node type

### Hooks

- `useReactFlowOptimized()` - Optimized React Flow hook with memoized methods
- `useNodeSelection(nodes)` - Hook for managing node selection state

## Performance Optimizations

- Memoized components to prevent unnecessary re-renders
- Optimized hooks with useCallback and useMemo
- Connection validation to prevent invalid edges
- Type-safe utilities for better developer experience

## License

MIT
