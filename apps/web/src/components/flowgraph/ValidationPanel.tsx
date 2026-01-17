/**
 * Validation panel component for flowgraph
 */

import { memo, useMemo } from 'react';
import { useFlowgraphStore } from '../../store/flowgraphStore';
import { validateFlowgraph } from '@logicnomad/engine/flowgraph';

export const ValidationPanel = memo(() => {
  const { getFlowgraph, nodes, edges } = useFlowgraphStore();

  const validation = useMemo(() => {
    const flowgraph = getFlowgraph();
    return validateFlowgraph(flowgraph);
  }, [getFlowgraph, nodes, edges]);

  if (validation.valid) {
    return (
      <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
        <div className="flex items-center gap-2">
          <span className="text-green-600">✓</span>
          <span className="text-green-800 font-medium">
            Алгоритм зөв байна
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 bg-red-50 border border-red-200 rounded text-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-red-600">✗</span>
        <span className="text-red-800 font-medium">Алдаа илэрсэн:</span>
      </div>
      <ul className="list-disc list-inside text-red-700 space-y-1">
        {validation.errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
});

ValidationPanel.displayName = 'ValidationPanel';
