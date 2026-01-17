/**
 * Optimized custom node component with handles
 */

import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import type { NodeType } from '../types';
import { getNodeColor } from '../utils/nodeHelpers';

interface CustomNodeData {
  nodeType: NodeType;
  label: string;
  [key: string]: any;
}

export const CustomNode = memo(({ data, selected }: NodeProps<CustomNodeData>) => {
  const baseStyles = 'px-4 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 relative';
  const gradientStyles = getNodeColor(data.nodeType);
  
  const nodeType = data.nodeType || 'action';
  const isStart = nodeType === 'start';
  const isEnd = nodeType === 'end';
  const isCondition = nodeType === 'condition';

  return (
    <div
      className={`${baseStyles} bg-gradient-to-br ${gradientStyles} ${
        selected ? 'ring-4 ring-purple-300 scale-105' : 'hover:scale-105'
      }`}
    >
      {/* Source handles (output) - on the right side */}
      {!isEnd && (
        <>
          {isCondition ? (
            // Condition nodes have two outputs: true and false
            <>
              <Handle
                type="source"
                position={Position.Right}
                id="true"
                style={{
                  background: '#10b981',
                  border: '2px solid white',
                  width: '12px',
                  height: '12px',
                  right: '-6px',
                }}
                className="!bg-green-500 !border-white"
              />
              <Handle
                type="source"
                position={Position.Right}
                id="false"
                style={{
                  background: '#ef4444',
                  border: '2px solid white',
                  width: '12px',
                  height: '12px',
                  right: '-6px',
                  top: '60%',
                }}
                className="!bg-red-500 !border-white"
              />
            </>
          ) : (
            // Regular nodes have one output
            <Handle
              type="source"
              position={Position.Right}
              id="output"
              style={{
                background: '#a855f7',
                border: '2px solid white',
                width: '12px',
                height: '12px',
                right: '-6px',
              }}
              className="!bg-purple-500 !border-white"
            />
          )}
        </>
      )}

      {/* Target handle (input) - on the left side */}
      {!isStart && (
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{
            background: '#6366f1',
            border: '2px solid white',
            width: '12px',
            height: '12px',
            left: '-6px',
          }}
          className="!bg-indigo-500 !border-white"
        />
      )}

      <div className="text-center">
        <div className="text-lg mb-1">{data.label}</div>
        {isCondition && (
          <div className="text-xs mt-1 opacity-90">
            <div className="text-green-200">✓ True</div>
            <div className="text-red-200">✗ False</div>
          </div>
        )}
      </div>
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
