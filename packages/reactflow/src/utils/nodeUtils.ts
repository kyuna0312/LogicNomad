/**
 * Utility functions for creating and managing nodes and edges
 */

import type { Node, Edge, Connection } from 'reactflow';
import { MarkerType } from 'reactflow';
import type { NodeType, NodeData, EdgeData } from '../types';

/**
 * Create a new node with optimized defaults
 */
export function createNode(
  type: NodeType,
  position: { x: number; y: number },
  data?: Partial<NodeData>,
): Node {
  const id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const labels: Record<NodeType, string> = {
    start: '🟢 Эхлэх',
    action: '⚡ Үйлдэл',
    condition: '❓ Нөхцөл',
    loop: '🔁 Давталт',
    end: '🛑 Дуусах',
  };

  const nodeColors: Record<NodeType, string> = {
    start: 'from-green-400 to-emerald-500',
    action: 'from-blue-400 to-indigo-500',
    condition: 'from-yellow-400 to-orange-500',
    loop: 'from-purple-400 to-pink-500',
    end: 'from-red-400 to-rose-500',
  };

  return {
    id,
    type: 'default',
    position,
    data: {
      label: data?.label || labels[type],
      nodeType: type,
      color: nodeColors[type],
      ...data,
    },
    style: {
      background: 'linear-gradient(135deg, var(--tw-gradient-stops))',
      border: '2px solid',
      borderRadius: '12px',
      padding: '12px',
      fontWeight: '600',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
  };
}

/**
 * Create a new edge with optimized defaults
 */
export function createEdge(
  source: string,
  target: string,
  data?: EdgeData,
  sourceHandle?: string,
  targetHandle?: string,
): Edge {
  const id = `edge-${source}-${target}-${Date.now()}`;
  
  return {
    id,
    source,
    target,
    sourceHandle,
    targetHandle,
    type: 'smoothstep',
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: '#a855f7',
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#a855f7',
    },
    data,
  };
}

/**
 * Validate a connection before creating an edge
 */
export function validateConnection(
  connection: Connection,
  nodes: Node[],
  edges: Edge[],
): { valid: boolean; error?: string } {
  if (!connection.source || !connection.target) {
    return { valid: false, error: 'Source and target are required' };
  }

  // Prevent self-connections
  if (connection.source === connection.target) {
    return { valid: false, error: 'Cannot connect node to itself' };
  }

  // Check if connection already exists
  const connectionExists = edges.some(
    (edge) =>
      edge.source === connection.source &&
      edge.target === connection.target &&
      edge.sourceHandle === connection.sourceHandle &&
      edge.targetHandle === connection.targetHandle,
  );

  if (connectionExists) {
    return { valid: false, error: 'Connection already exists' };
  }

  // Find source and target nodes
  const sourceNode = nodes.find((n) => n.id === connection.source);
  const targetNode = nodes.find((n) => n.id === connection.target);

  if (!sourceNode || !targetNode) {
    return { valid: false, error: 'Source or target node not found' };
  }

  // Validate node types
  const sourceType = sourceNode.data?.nodeType;
  const targetType = targetNode.data?.nodeType;

  // Start node cannot have inputs
  if (targetType === 'start') {
    return { valid: false, error: 'Cannot connect to start node' };
  }

  // End node cannot have outputs
  if (sourceType === 'end') {
    return { valid: false, error: 'Cannot connect from end node' };
  }

  return { valid: true };
}
