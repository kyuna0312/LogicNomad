/**
 * Flowgraph utilities and validation
 */

import type { Flowgraph, FlowNode } from '../types/flowgraph';

/**
 * Validate flowgraph structure
 */
export function validateFlowgraph(flowgraph: Flowgraph): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const { nodes, edges } = flowgraph;

  // Check for start node
  const startNodes = nodes.filter((n) => n.type === 'start');
  if (startNodes.length === 0) {
    errors.push('Start node байхгүй байна');
  } else if (startNodes.length > 1) {
    errors.push('Start node зөвхөн 1 байх ёстой');
  }

  // Check for end node
  const endNodes = nodes.filter((n) => n.type === 'end');
  if (endNodes.length === 0) {
    errors.push('End node байхгүй байна');
  }

  // Check node connections
  const nodeIds = new Set(nodes.map((n) => n.id));
  for (const edge of edges) {
    if (!nodeIds.has(edge.source)) {
      errors.push(`Edge source node олдсонгүй: ${edge.source}`);
    }
    if (!nodeIds.has(edge.target)) {
      errors.push(`Edge target node олдсонгүй: ${edge.target}`);
    }
  }

  // Check for disconnected nodes (nodes without connections)
  const connectedNodeIds = new Set<string>();
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  // Start node should have outgoing edge
  const startNode = startNodes[0];
  if (startNode && !edges.some((e) => e.source === startNode.id)) {
    errors.push('Start node-оос гарах edge байхгүй байна');
  }

  // End node should have incoming edge
  if (endNodes.length > 0) {
    const hasEndConnection = endNodes.some((endNode) =>
      edges.some((e) => e.target === endNode.id),
    );
    if (!hasEndConnection) {
      errors.push('End node-д орох edge байхгүй байна');
    }
  }

  // Check for isolated nodes (not start/end)
  nodes.forEach((node) => {
    if (
      node.type !== 'start' &&
      node.type !== 'end' &&
      !connectedNodeIds.has(node.id)
    ) {
      errors.push(`Node "${node.label || node.id}" холбогдоогүй байна`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Convert flowgraph to execution-ready format
 * Note: This is a simplified version for basic execution order
 * Actual execution with loops/conditions is handled in executor
 */
export function flowgraphToExecutionOrder(
  flowgraph: Flowgraph,
): FlowNode[] {
  const { nodes, edges } = flowgraph;
  const executionOrder: FlowNode[] = [];
  const visited = new Set<string>();

  // Find start node
  const startNode = nodes.find((n) => n.type === 'start');
  if (!startNode) {
    return [];
  }

  // BFS traversal (simplified - doesn't handle loops/conditions properly)
  const queue: FlowNode[] = [startNode];
  visited.add(startNode.id);

  while (queue.length > 0) {
    const current = queue.shift()!;
    executionOrder.push(current);

    // Find connected nodes
    const outgoingEdges = edges.filter((e) => e.source === current.id);
    for (const edge of outgoingEdges) {
      const nextNode = nodes.find((n) => n.id === edge.target);
      if (nextNode && !visited.has(nextNode.id)) {
        visited.add(nextNode.id);
        queue.push(nextNode);
      }
    }
  }

  return executionOrder;
}
