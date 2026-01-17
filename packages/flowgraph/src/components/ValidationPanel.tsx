/**
 * Validation panel component for flowgraph
 */

import { memo, useMemo } from 'react';
import { useFlowgraphStore } from '../store';
import { validateFlowgraph } from '@logicnomad/engine/flowgraph';
import { Alert } from '@logicnomad/ui';

export const ValidationPanel = memo(() => {
  const { getFlowgraph, nodes, edges } = useFlowgraphStore();

  const validation = useMemo(() => {
    const flowgraph = getFlowgraph();
    return validateFlowgraph(flowgraph);
  }, [getFlowgraph, nodes, edges]);

  if (validation.valid) {
    return (
      <Alert variant="success" title="✨ Алгоритм зөв байна!">
        <span className="text-sm">Бүх node-ууд зөв холбогдсон байна 🎉</span>
      </Alert>
    );
  }

  return (
    <Alert variant="error" title="⚠️ Алдаа илэрсэн:">
      <ul className="space-y-1.5 text-xs">
        {validation.errors.map((error, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-0.5 text-red-500">•</span>
            <span>{error}</span>
          </li>
        ))}
      </ul>
    </Alert>
  );
});

ValidationPanel.displayName = 'ValidationPanel';
