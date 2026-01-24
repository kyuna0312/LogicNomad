/**
 * Flowgraph editor component using React Flow
 * Cute and user-friendly design
 */

import { useCallback, memo, useEffect } from 'react';
import {
  ReactFlowProvider,
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  MarkerType,
  ConnectionMode,
  ConnectionLineType,
} from '@logicnomad/reactflow';
import { CustomNode, OptimizedPanel } from '@logicnomad/reactflow/components';
import { createNode } from '@logicnomad/reactflow/utils';
import { useNodeSelection } from '@logicnomad/reactflow/hooks';
import 'reactflow/dist/style.css';
import { useFlowgraphStore } from '../store';
import { ValidationPanel } from './ValidationPanel';
import { NodeConfigPanel } from './NodeConfigPanel';
import { Button } from '@logicnomad/ui';

// Use optimized CustomNode from @logicnomad/reactflow
// Define nodeTypes outside component to prevent recreation on each render
const nodeTypes = {
  default: CustomNode,
};

// Define defaultEdgeOptions outside component to prevent recreation on each render
const defaultEdgeOptions = {
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
};

export const FlowgraphEditor = memo(() => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteNode,
    deleteNodes,
  } = useFlowgraphStore();

  // Use optimized selection hook
  const { selectedNode, selectedNodes, selectNode, clearSelection } = useNodeSelection(nodes);

  const handleAddNode = useCallback(
    (type: 'start' | 'action' | 'condition' | 'loop' | 'end') => {
      // Use optimized createNode utility
      const newNode = createNode(type, {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      });
      // Add to store
      addNode(type, {
        x: newNode.position.x,
        y: newNode.position.y,
      });
    },
    [addNode],
  );

  const handleNodeClick = useCallback((_event: any, node: Node) => {
    selectNode(node);
  }, [selectNode]);

  const handleNodesChange = useCallback((changes: any) => {
    // Handle node deletion (Delete key or remove button)
    const removeChanges = changes.filter((change: any) => change.type === 'remove');
    if (removeChanges.length > 0) {
      const nodeIdsToDelete = removeChanges.map((change: any) => change.id);
      deleteNodes(nodeIdsToDelete);
      clearSelection();
      return; // Don't call onNodesChange for deletions, we handle it manually
    }
    
    // Apply other changes
    onNodesChange(changes);
  }, [deleteNodes, onNodesChange, clearSelection]);

  const handlePaneClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  // Handle keyboard delete
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.key === 'Delete' || event.key === 'Backspace') && (selectedNode || selectedNodes.length > 0)) {
      event.preventDefault();
      if (selectedNodes.length > 0) {
        deleteNodes(selectedNodes.map((n) => n.id));
        clearSelection();
      } else if (selectedNode) {
        deleteNode(selectedNode.id);
        clearSelection();
      }
    }
  }, [selectedNode, selectedNodes, deleteNode, deleteNodes, clearSelection]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as any);
    return () => {
      window.removeEventListener('keydown', handleKeyDown as any);
    };
  }, [handleKeyDown]);

  return (
    <div className="w-full h-full relative">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionMode={ConnectionMode.Loose}
          connectionLineStyle={{ strokeWidth: 3, stroke: '#a855f7' }}
          connectionLineType={ConnectionLineType.SmoothStep}
          snapToGrid={true}
          snapGrid={[20, 20]}
          deleteKeyCode={['Delete', 'Backspace']}
          multiSelectionKeyCode={['Meta', 'Control']}
          selectionOnDrag={true}
          fitView
          className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50"
        >
          <Background 
            gap={20} 
            size={1}
            color="#e9d5ff"
          />
          <Controls 
            className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-lg shadow-lg"
          />
          <MiniMap 
            className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-lg shadow-lg"
            nodeColor={(node) => {
              const colors: Record<string, string> = {
                start: '#10b981',
                action: '#3b82f6',
                condition: '#f59e0b',
                loop: '#a855f7',
                end: '#ef4444',
              };
              return colors[node.data?.nodeType] || '#6b7280';
            }}
            maskColor="rgba(168, 85, 247, 0.1)"
          />
          <OptimizedPanel 
            position="top-left" 
            className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border-2 border-purple-200 space-y-4 max-w-xs hover-lift"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl animate-bounce-gentle">✨</span>
              <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Node нэмэх
              </h3>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant="success"
                onClick={() => handleAddNode('start')}
                leftIcon="🟢"
                className="hover-lift shadow-md"
              >
                Start
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleAddNode('action')}
                leftIcon="⚡"
                className="hover-lift shadow-md"
              >
                Action
              </Button>
              <Button
                size="sm"
                variant="warning"
                onClick={() => handleAddNode('condition')}
                leftIcon="❓"
                className="hover-lift shadow-md"
              >
                If
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleAddNode('loop')}
                leftIcon="🔁"
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 hover-lift shadow-md"
              >
                Loop
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleAddNode('end')}
                leftIcon="🛑"
                className="hover-lift shadow-md"
              >
                End
              </Button>
            </div>
            <div className="pt-2 border-t-2 border-purple-200">
              <ValidationPanel />
            </div>
          </OptimizedPanel>
        </ReactFlow>
        {selectedNode && (
          <NodeConfigPanel
            selectedNode={selectedNode}
            onClose={clearSelection}
            onDelete={() => {
              deleteNode(selectedNode.id);
              clearSelection();
            }}
          />
        )}

        {/* Delete button for selected nodes */}
        {(selectedNode || selectedNodes.length > 0) && (
          <OptimizedPanel
            position="top-right"
            className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-2xl border-2 border-red-200"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🗑️</span>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  if (selectedNodes.length > 0) {
                    if (confirm(`${selectedNodes.length} node устгахдаа итгэлтэй байна уу?`)) {
                      deleteNodes(selectedNodes.map((n) => n.id));
                      clearSelection();
                    }
                  } else if (selectedNode) {
                    if (confirm('Энэ node-ийг устгахдаа итгэлтэй байна уу?')) {
                      deleteNode(selectedNode.id);
                      clearSelection();
                    }
                  }
                }}
                className="hover-lift shadow-md"
              >
                Устгах ({selectedNodes.length > 0 ? selectedNodes.length : 1})
              </Button>
              <span className="text-xs text-gray-500">(Delete key)</span>
            </div>
          </OptimizedPanel>
        )}
      </ReactFlowProvider>
    </div>
  );
});

FlowgraphEditor.displayName = 'FlowgraphEditor';
