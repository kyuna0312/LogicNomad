/**
 * @logicnomad/reactflow
 * Extended and optimized React Flow components for LogicNomad
 */

// Re-export React Flow components with optimizations
export {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  Panel,
  Handle,
  Position,
  MarkerType,
  ConnectionMode,
  ConnectionLineType,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type NodeProps,
  type ReactFlowProps,
} from 'reactflow';

// Export optimized components
export { OptimizedFlowgraphEditor } from './components/OptimizedFlowgraphEditor';
export { CustomNode } from './components/CustomNode';
export { OptimizedPanel } from './components/OptimizedPanel';

// Export utilities
export { createNode, createEdge, validateConnection } from './utils/nodeUtils';
export { getNodeColor, getNodeIcon, getNodeLabel } from './utils/nodeHelpers';

// Export hooks
export { useReactFlowOptimized } from './hooks/useReactFlowOptimized';
export { useNodeSelection } from './hooks/useNodeSelection';

// Export types
export type { NodeType, NodeData, EdgeData } from './types';
