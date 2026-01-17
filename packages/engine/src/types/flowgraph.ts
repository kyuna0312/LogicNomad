/**
 * Flowgraph types for algorithm visualization
 */

export type NodeType = 'start' | 'action' | 'condition' | 'loop' | 'end';

export type ActionType = 'move' | 'turnLeft' | 'turnRight' | 'wait';

export type Direction = 'north' | 'south' | 'east' | 'west';

export interface FlowNode {
  id: string;
  type: NodeType;
  label: string;
  position: { x: number; y: number };
  data?: {
    action?: ActionType;
    condition?: string; // 'wallAhead' | 'atGoal' | 'canMove' | etc.
    loopCount?: number;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string; // 'true' | 'false' for condition nodes
  targetHandle?: string;
  label?: string; // Optional label for condition edges
}

export interface Flowgraph {
  nodes: FlowNode[];
  edges: FlowEdge[];
}
