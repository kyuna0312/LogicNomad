/**
 * Flowgraph editor state management
 */

import { create } from 'zustand';
import type { Flowgraph, FlowNode } from '@logicnomad/engine';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type Connection,
} from '@logicnomad/reactflow';
import { validateConnection } from '@logicnomad/reactflow/utils';

export interface FlowgraphStore {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: FlowNode['type'], position: { x: number; y: number }) => void;
  deleteNode: (nodeId: string) => void;
  deleteNodes: (nodeIds: string[]) => void;
  getFlowgraph: () => Flowgraph;
  setFlowgraph: (flowgraph: Flowgraph) => void;
  clearFlowgraph: () => void;
}

export const useFlowgraphStore = create<FlowgraphStore>((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    const { nodes, edges } = get();
    
    // Use optimized validation
    const validation = validateConnection(connection, nodes, edges);
    if (!validation.valid) {
      console.warn('Invalid connection:', validation.error);
      return;
    }

    // Add edge if valid
    set({
      edges: addEdge(connection, edges),
    });
  },

  addNode: (type, position) => {
    const id = `${type}-${Date.now()}`;
    const labels: Record<FlowNode['type'], string> = {
      start: '🟢 Эхлэх',
      action: '⚡ Үйлдэл',
      condition: '❓ Нөхцөл',
      loop: '🔁 Давталт',
      end: '🛑 Дуусах',
    };

    const nodeColors: Record<FlowNode['type'], string> = {
      start: 'from-green-400 to-emerald-500',
      action: 'from-blue-400 to-indigo-500',
      condition: 'from-yellow-400 to-orange-500',
      loop: 'from-purple-400 to-pink-500',
      end: 'from-red-400 to-rose-500',
    };

    const newNode: Node = {
      id,
      type: 'default',
      position,
      data: {
        label: labels[type],
        nodeType: type,
        color: nodeColors[type],
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

    set({
      nodes: [...get().nodes, newNode],
    });
  },

  deleteNode: (nodeId) => {
    const { nodes, edges } = get();
    
    // Remove the node
    const updatedNodes = nodes.filter((node) => node.id !== nodeId);
    
    // Remove all edges connected to this node
    const updatedEdges = edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId,
    );

    set({
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  },

  deleteNodes: (nodeIds) => {
    const { nodes, edges } = get();
    
    // Remove the nodes
    const updatedNodes = nodes.filter((node) => !nodeIds.includes(node.id));
    
    // Remove all edges connected to these nodes
    const updatedEdges = edges.filter(
      (edge) => !nodeIds.includes(edge.source) && !nodeIds.includes(edge.target),
    );

    set({
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  },

  getFlowgraph: (): Flowgraph => {
    const { nodes, edges } = get();
    return {
      nodes: nodes.map((node: Node) => ({
        id: node.id,
        type: node.data.nodeType || 'action',
        label: node.data.label || '',
        position: node.position,
        data: {
          action: node.data.action,
          loopCount: node.data.loopCount,
          condition: node.data.condition,
        },
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle || undefined,
        targetHandle: edge.targetHandle || undefined,
      })),
    };
  },

  setFlowgraph: (flowgraph) => {
    const reactFlowNodes: Node[] = flowgraph.nodes.map((node) => ({
      id: node.id,
      type: 'default',
      position: node.position,
      data: {
        label: node.label,
        nodeType: node.type,
        ...node.data,
      },
    }));

    const reactFlowEdges: Edge[] = flowgraph.edges.map((edge: any) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    }));

    set({
      nodes: reactFlowNodes,
      edges: reactFlowEdges,
    });
  },

  clearFlowgraph: () => {
    set({
      nodes: [],
      edges: [],
    });
  },
}));
