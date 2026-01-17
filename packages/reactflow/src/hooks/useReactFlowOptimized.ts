/**
 * Optimized hook for React Flow with performance optimizations
 */

import { useCallback, useMemo } from 'react';
import { useReactFlow } from 'reactflow';
import type { Node, Edge } from 'reactflow';

export function useReactFlowOptimized() {
  const reactFlowInstance = useReactFlow();

  const getNodes = useCallback((): Node[] => {
    return reactFlowInstance.getNodes();
  }, [reactFlowInstance]);

  const getEdges = useCallback((): Edge[] => {
    return reactFlowInstance.getEdges();
  }, [reactFlowInstance]);

  const setNodes = useCallback(
    (nodes: Node[] | ((nodes: Node[]) => Node[])) => {
      reactFlowInstance.setNodes(nodes);
    },
    [reactFlowInstance],
  );

  const setEdges = useCallback(
    (edges: Edge[] | ((edges: Edge[]) => Edge[])) => {
      reactFlowInstance.setEdges(edges);
    },
    [reactFlowInstance],
  );

  const fitView = useCallback(
    (options?: { padding?: number; duration?: number; minZoom?: number; maxZoom?: number }) => {
      reactFlowInstance.fitView(options);
    },
    [reactFlowInstance],
  );

  const zoomTo = useCallback(
    (zoomLevel: number, options?: { duration?: number }) => {
      reactFlowInstance.zoomTo(zoomLevel, options);
    },
    [reactFlowInstance],
  );

  const getViewport = useCallback(() => {
    return reactFlowInstance.getViewport();
  }, [reactFlowInstance]);

  const setViewport = useCallback(
    (viewport: { x: number; y: number; zoom: number }, options?: { duration?: number }) => {
      reactFlowInstance.setViewport(viewport, options);
    },
    [reactFlowInstance],
  );

  return useMemo(
    () => ({
      ...reactFlowInstance,
      getNodes,
      getEdges,
      setNodes,
      setEdges,
      fitView,
      zoomTo,
      getViewport,
      setViewport,
    }),
    [reactFlowInstance, getNodes, getEdges, setNodes, setEdges, fitView, zoomTo, getViewport, setViewport],
  );
}
