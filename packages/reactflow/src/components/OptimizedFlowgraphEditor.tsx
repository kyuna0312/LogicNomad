/**
 * Optimized Flowgraph Editor component
 * This is a base component that can be extended
 */

import { memo } from 'react';
import { ReactFlowProvider, ReactFlow, Background, Controls, MiniMap } from 'reactflow';
import type { ReactFlowProps } from 'reactflow';
import 'reactflow/dist/style.css';

interface OptimizedFlowgraphEditorProps extends Omit<ReactFlowProps, 'children'> {
  children?: React.ReactNode;
  showBackground?: boolean;
  showControls?: boolean;
  showMinimap?: boolean;
  backgroundOptions?: {
    gap?: number;
    size?: number;
    color?: string;
  };
}

export const OptimizedFlowgraphEditor = memo(({
  children,
  showBackground = true,
  showControls = true,
  showMinimap = true,
  backgroundOptions = { gap: 20, size: 1, color: '#e9d5ff' },
  className = 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50',
  ...reactFlowProps
}: OptimizedFlowgraphEditorProps) => {
  return (
    <ReactFlowProvider>
      <ReactFlow className={className} {...reactFlowProps}>
        {showBackground && <Background {...backgroundOptions} />}
        {showControls && (
          <Controls className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-lg shadow-lg" />
        )}
        {showMinimap && (
          <MiniMap
            className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-lg shadow-lg"
            maskColor="rgba(168, 85, 247, 0.1)"
          />
        )}
        {children}
      </ReactFlow>
    </ReactFlowProvider>
  );
});

OptimizedFlowgraphEditor.displayName = 'OptimizedFlowgraphEditor';
