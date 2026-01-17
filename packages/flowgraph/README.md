# @logicnomad/flowgraph

Cute and user-friendly flowchart editor component for LogicNomad.

## Features

- 🎨 Beautiful, cute design with gradients and animations
- ✨ Smooth interactions and hover effects
- 🎯 Easy-to-use node configuration panel
- ✅ Real-time validation
- 🎮 Support for multiple node types (Start, Action, Condition, Loop, End)
- 📊 Visual feedback and helpful tooltips

## Installation

```bash
yarn add @logicnomad/flowgraph
```

## Usage

```tsx
import { FlowgraphEditor, useFlowgraphStore } from '@logicnomad/flowgraph';
import 'reactflow/dist/style.css';

function App() {
  const { getFlowgraph } = useFlowgraphStore();

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <FlowgraphEditor />
    </div>
  );
}
```

## Components

### FlowgraphEditor

Main editor component that provides the full flowchart editing experience.

### NodeConfigPanel

Panel for configuring node properties (shown when a node is selected).

### ValidationPanel

Real-time validation panel that shows if the flowchart is valid.

## Store

### useFlowgraphStore

Zustand store for managing flowgraph state.

```tsx
const { nodes, edges, addNode, getFlowgraph } = useFlowgraphStore();
```

## Node Types

- **Start** 🟢 - Entry point of the algorithm
- **Action** ⚡ - Performs an action (move, turn, wait)
- **Condition** ❓ - Conditional branching
- **Loop** 🔁 - Repeats actions
- **End** 🛑 - Exit point

## Styling

The package uses Tailwind CSS and integrates with `@logicnomad/ui` for consistent styling.

## License

MIT
