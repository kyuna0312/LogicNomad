/**
 * Node configuration panel for editing node properties
 */

import { useState, useEffect, memo } from 'react';
import type { Node } from 'reactflow';
import type { ActionType } from '@logicnomad/engine';
import { useFlowgraphStore } from '../store';
import { Button, Card } from '@logicnomad/ui';

interface NodeConfigPanelProps {
  selectedNode: Node | null;
  onClose: () => void;
  onDelete?: () => void;
}

export const NodeConfigPanel = memo(({
  selectedNode,
  onClose,
  onDelete,
}: NodeConfigPanelProps) => {
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

    useFlowgraphStore.setState({ nodes: updatedNodes });
    onClose();
  };

  const nodeType = selectedNode.data.nodeType;
  const nodeIcons: Record<string, string> = {
    start: '🟢',
    action: '⚡',
    condition: '❓',
    loop: '🔁',
    end: '🛑',
  };

  return (
    <Card
      variant="elevated"
      padding="md"
      className="absolute top-4 right-4 w-72 z-50 shadow-2xl border-2 border-purple-200 hover-lift"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
          <span className="text-2xl">{nodeIcons[nodeType] || '⚙️'}</span>
          Node тохиргоо
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        {/* Label */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-1">
            <span>🏷️</span>
            Нэр:
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
            placeholder="Node нэр..."
          />
        </div>

        {/* Action type for action nodes */}
        {nodeType === 'action' && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-1">
              <span>⚡</span>
              Үйлдлийн төрөл:
            </label>
            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value as ActionType)}
              className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white"
            >
              <option value="move">🚶 Урагш яв</option>
              <option value="turnLeft">↪️ Зүүн эргэх</option>
              <option value="turnRight">↩️ Баруун эргэх</option>
              <option value="wait">⏸️ Хүлээх</option>
            </select>
          </div>
        )}

        {/* Loop count for loop nodes */}
        {nodeType === 'loop' && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-1">
              <span>🔁</span>
              Давталтын тоо:
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={loopCount}
              onChange={(e) => setLoopCount(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
            />
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <span>💡</span>
              1-10 хооронд утга оруулна уу
            </p>
          </div>
        )}

        {/* Condition type for condition nodes */}
        {nodeType === 'condition' && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center gap-1">
              <span>❓</span>
              Нөхцөлийн төрөл:
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none bg-white"
            >
              <option value="canMove">✅ Урагш явж болно</option>
              <option value="wallAhead">🚧 Урд хана байна</option>
              <option value="atGoal">🎯 Зорилгод хүрсэн</option>
              <option value="notAtGoal">❌ Зорилгод хүрээгүй</option>
            </select>
            <p className="text-xs text-gray-500 mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="font-semibold">💡 Тайлбар:</span> True = эхний edge, False = хоёр дахь edge
            </p>
          </div>
        )}

        {/* Read-only info for other node types */}
        {nodeType !== 'action' && nodeType !== 'loop' && nodeType !== 'condition' && (
          <div className="text-sm text-gray-600 p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            <p className="flex items-center gap-2">
              <span className="text-lg">
                {nodeType === 'start' ? '🟢' : '🛑'}
              </span>
              <span>
                {nodeType === 'start'
                  ? 'Эхлэх node - тохиргоо хийх шаардлагагүй ✨'
                  : 'Дуусах node - тохиргоо хийх шаардлагагүй ✨'}
              </span>
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="primary"
            onClick={handleSave}
            fullWidth
            className="shadow-md hover:shadow-lg"
          >
            💾 Хадгалах
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            className="shadow-md hover:shadow-lg"
          >
            ❌ Цуцлах
          </Button>
        </div>
        {onDelete && (
          <div className="pt-2 border-t-2 border-red-200">
            <Button
              variant="danger"
              onClick={() => {
                if (confirm('Энэ node-ийг устгахдаа итгэлтэй байна уу?')) {
                  onDelete();
                }
              }}
              fullWidth
              className="shadow-md hover:shadow-lg"
            >
              🗑️ Node устгах
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
});

NodeConfigPanel.displayName = 'NodeConfigPanel';
