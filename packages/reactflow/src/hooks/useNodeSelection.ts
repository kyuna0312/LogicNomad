/**
 * Hook for managing node selection state
 */

import { useState, useCallback, useEffect } from 'react';
import type { Node } from 'reactflow';

export function useNodeSelection(nodes: Node[]) {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);

  // Update selection when nodes change
  useEffect(() => {
    const selected = nodes.filter((node) => node.selected);
    setSelectedNodes(selected);
    
    if (selected.length === 1) {
      setSelectedNode(selected[0]);
    } else if (selected.length === 0) {
      setSelectedNode(null);
    }
  }, [nodes]);

  const selectNode = useCallback((node: Node | null) => {
    setSelectedNode(node);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
    setSelectedNodes([]);
  }, []);

  return {
    selectedNode,
    selectedNodes,
    selectNode,
    clearSelection,
  };
}
