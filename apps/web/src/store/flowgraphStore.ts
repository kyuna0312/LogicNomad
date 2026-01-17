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
} from 'reactflow';

interface FlowgraphStore {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: FlowNode['type'], position: { x: number; y: number }) => void;
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
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  addNode: (type, position) => {
    const id = `${type}-${Date.now()}`;
    const labels: Record<FlowNode['type'], string> = {
      start: 'Эхлэх',
      action: 'Үйлдэл',
      condition: 'Нөхцөл',
      loop: 'Давталт',
      end: 'Дуусах',
    };

    const newNode: Node = {
      id,
      type: 'default',
      position,
      data: {
        label: labels[type],
        nodeType: type,
      },
    };

    set({
      nodes: [...get().nodes, newNode],
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
