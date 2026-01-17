/**
 * Flowgraph editor component using React Flow
 */

import { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowgraphStore } from '../../store/flowgraphStore';
import { ValidationPanel } from './ValidationPanel';
import { NodeConfigPanel } from './NodeConfigPanel';

export function FlowgraphEditor() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
  } = useFlowgraphStore();

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleAddNode = useCallback(
    (type: 'start' | 'action' | 'condition' | 'loop' | 'end') => {
      addNode(type, {
        x: Math.random() * 400,
        y: Math.random() * 400,
      });
    },
    [addNode],
  );

  const handleNodeClick = useCallback((_event: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-left" className="bg-white p-2 rounded shadow space-y-2">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleAddNode('start')}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm"
            >
              Start
            </button>
            <button
              onClick={() => handleAddNode('action')}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Action
            </button>
            <button
              onClick={() => handleAddNode('condition')}
              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
            >
              If
            </button>
            <button
              onClick={() => handleAddNode('loop')}
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
            >
              Loop
            </button>
            <button
              onClick={() => handleAddNode('end')}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              End
            </button>
          </div>
          <ValidationPanel />
        </Panel>
      </ReactFlow>
      {selectedNode && (
        <NodeConfigPanel
          selectedNode={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}
