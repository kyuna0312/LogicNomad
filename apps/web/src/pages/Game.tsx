/**
 * Main game page with flowchart editor and puzzle
 */

import { useCallback, memo } from 'react';
import { useGameStore } from '../store/gameStore';
import { useFlowgraphStore } from '../store/flowgraphStore';
import { FlowgraphEditor } from '../components/flowgraph/FlowgraphEditor';
import { GameBoard } from '../components/game/GameBoard';
import { translations } from '../locales/mn';

export const Game = memo(() => {
  const {
    currentLevel,
    gameState,
    isExecuting,
    executionResult,
    executeAlgorithm,
    resetGame,
  } = useGameStore();

  const { getFlowgraph } = useFlowgraphStore();

  const handleExecute = useCallback(async () => {
    const flowgraph = getFlowgraph();
    
    // Validate before execution
    try {
      const { validateFlowgraph } = await import('@logicnomad/engine/flowgraph');
      const validation = validateFlowgraph(flowgraph);
      
      if (!validation.valid) {
        alert(`Алдаа: ${validation.errors.join(', ')}`);
        return;
      }
    } catch (error) {
      console.error('Validation error:', error);
      // Continue execution even if validation fails (for development)
    }
    
    useGameStore.getState().setFlowgraph(flowgraph);
    await executeAlgorithm();
  }, [getFlowgraph, executeAlgorithm]);

  if (!currentLevel || !gameState) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Түвшин сонгоно уу</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{currentLevel.name}</h1>
        <div className="flex gap-2">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {translations.reset}
          </button>
          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isExecuting ? 'Ажиллаж байна...' : translations.execute}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden">
        {/* Flowgraph Editor */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-2 border-b">
            <h2 className="font-semibold">Flowchart Editor</h2>
          </div>
          <div className="h-full">
            <FlowgraphEditor />
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-2 border-b">
            <h2 className="font-semibold">Тоглоом</h2>
          </div>
          <div className="h-full p-4">
            <GameBoard />
            {executionResult && (
              <div
                className={`mt-4 p-4 rounded ${
                  executionResult.success
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                <p>{executionResult.message}</p>
                <p className="text-sm mt-2">
                  Алхам: {executionResult.stepCount}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

Game.displayName = 'Game';
