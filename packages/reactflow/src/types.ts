/**
 * Type definitions for React Flow extensions
 */

import type { Node, Edge } from 'reactflow';

export type NodeType = 'start' | 'action' | 'condition' | 'loop' | 'end';

export interface NodeData {
  label: string;
  nodeType: NodeType;
  color?: string;
  action?: string;
  loopCount?: number;
  condition?: string;
  [key: string]: any;
}

export interface EdgeData {
  label?: string;
  animated?: boolean;
  [key: string]: any;
}

export interface FlowgraphConfig {
  nodeTypes?: Record<string, React.ComponentType<any>>;
  defaultEdgeOptions?: {
    type?: string;
    animated?: boolean;
    style?: React.CSSProperties;
    markerEnd?: {
      type: string;
      color?: string;
    };
  };
  connectionMode?: 'strict' | 'loose';
  snapToGrid?: boolean;
  snapGrid?: [number, number];
}

export type OptimizedNode = Node & {
  data: NodeData;
};

export type OptimizedEdge = Edge & {
  data?: EdgeData;
};
