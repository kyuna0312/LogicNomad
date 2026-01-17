/**
 * Node configuration panel for editing node properties
 */

import { useState, useEffect } from 'react';
import type { Node } from 'reactflow';
import type { ActionType } from '@logicnomad/engine';
import { useFlowgraphStore } from '../../store/flowgraphStore';

interface NodeConfigPanelProps {
  selectedNode: Node | null;
  onClose: () => void;
}

export function NodeConfigPanel({
  selectedNode,
  onClose,
}: NodeConfigPanelProps) {
  const { nodes } = useFlowgraphStore();
  const [actionType, setActionType] = useState<ActionType>('move');
  const [loopCount, setLoopCount] = useState(1);
  const [condition, setCondition] = useState('canMove');
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || '');
      setActionType(selectedNode.data.action || 'move');
      setLoopCount(selectedNode.data.loopCount || 1);
      setCondition(selectedNode.data.condition || 'canMove');
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return null;
  }

  const handleSave = () => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          data: {
            ...node.data,
            label,
            action: node.data.nodeType === 'action' ? actionType : node.data.action,
            loopCount: node.data.nodeType === 'loop' ? loopCount : node.data.loopCount,
            condition: node.data.nodeType === 'condition' ? condition : node.data.condition,
          },
        };
      }
      return node;
    });

    // Update nodes in store directly
    useFlowgraphStore.setState({ nodes: updatedNodes });
    onClose();
  };

  const nodeType = selectedNode.data.nodeType;

  return (
    <div className="absolute top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64 z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Node тохиргоо</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        {/* Label */}
        <div>
          <label className="block text-sm font-medium mb-1">Нэр:</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
        </div>

        {/* Action type for action nodes */}
        {nodeType === 'action' && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Үйлдлийн төрөл:
            </label>
            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value as ActionType)}
              className="w-full px-2 py-1 border rounded"
            >
              <option value="move">Урагш яв</option>
              <option value="turnLeft">Зүүн эргэх</option>
              <option value="turnRight">Баруун эргэх</option>
              <option value="wait">Хүлээх</option>
            </select>
          </div>
        )}

        {/* Loop count for loop nodes */}
        {nodeType === 'loop' && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Давталтын тоо:
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={loopCount}
              onChange={(e) => setLoopCount(parseInt(e.target.value) || 1)}
              className="w-full px-2 py-1 border rounded"
            />
          </div>
        )}

        {/* Condition type for condition nodes */}
        {nodeType === 'condition' && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Нөхцөлийн төрөл:
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-2 py-1 border rounded"
            >
              <option value="canMove">Урагш явж болно</option>
              <option value="wallAhead">Урд хана байна</option>
              <option value="atGoal">Зорилгод хүрсэн</option>
              <option value="notAtGoal">Зорилгод хүрээгүй</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              True: эхний edge, False: хоёр дахь edge
            </p>
          </div>
        )}

        {/* Read-only info for other node types */}
        {nodeType !== 'action' && nodeType !== 'loop' && nodeType !== 'condition' && (
          <div className="text-sm text-gray-600">
            {nodeType === 'start' && 'Эхлэх node - тохиргоо хийх шаардлагагүй'}
            {nodeType === 'end' && 'Дуусах node - тохиргоо хийх шаардлагагүй'}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Хадгалах
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Цуцлах
          </button>
        </div>
      </div>
    </div>
  );
}
