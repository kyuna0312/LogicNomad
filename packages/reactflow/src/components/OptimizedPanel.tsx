/**
 * Optimized Panel component with memoization
 */

import { memo, type ReactNode } from 'react';
import { Panel } from 'reactflow';

interface OptimizedPanelProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  children: ReactNode;
  className?: string;
}

export const OptimizedPanel = memo(({ position = 'top-left', children, className }: OptimizedPanelProps) => {
  return (
    <Panel position={position} className={className}>
      {children}
    </Panel>
  );
});

OptimizedPanel.displayName = 'OptimizedPanel';
