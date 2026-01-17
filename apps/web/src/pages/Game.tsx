/**
 * Main game page with flowchart editor and puzzle
 */

import { useCallback, memo, lazy, Suspense } from 'react';
import { useGameStore } from '../store/gameStore';
import { FlowgraphEditor, useFlowgraphStore } from '@logicnomad/flowgraph';
import { translations } from '../locales/mn';
import { Button, Badge, Alert, LoadingSpinner } from '@logicnomad/ui';

// Lazy load GameBoard for better code splitting
const GameBoard = lazy(() => 
  import('../components/game/GameBoard').then((module) => ({ default: module.GameBoard }))
);

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
      // Only log in development
      if (import.meta.env.DEV) {
        console.error('Validation error:', error);
      }
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
    <div className="h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Cute background decorations */}
      <div className="absolute top-10 right-10 text-4xl opacity-10 animate-float">✨</div>
      <div className="absolute bottom-20 left-10 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>🌟</div>
      
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-purple-200 px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
              <span className="text-3xl animate-bounce-gentle">🎮</span>
              {currentLevel.name}
            </h1>
            {currentLevel.difficulty && (
              <Badge
                variant={
                  currentLevel.difficulty === 'easy'
                    ? 'success'
                    : currentLevel.difficulty === 'medium'
                    ? 'warning'
                    : 'danger'
                }
                size="sm"
                className="shadow-md"
              >
                {currentLevel.difficulty === 'easy'
                  ? '😊 Хялбар'
                  : currentLevel.difficulty === 'medium'
                  ? '🤔 Дунд'
                  : '🔥 Хэцүү'}
              </Badge>
            )}
          </div>
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={resetGame} 
              leftIcon="🔄"
              className="hover-lift shadow-md"
            >
              {translations.reset}
            </Button>
            <Button
              variant="primary"
              onClick={handleExecute}
              isLoading={isExecuting}
              leftIcon="▶️"
              className="hover-lift shadow-lg animate-pulse-glow"
            >
              {translations.execute}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-hidden relative z-10">
        {/* Flowgraph Editor */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-purple-200 overflow-hidden flex flex-col hover-lift">
          <div className="px-4 py-3 border-b-2 border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100">
            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <span className="text-2xl animate-bounce-gentle">📊</span>
              Flowchart Editor
              <span className="text-sm text-purple-600 ml-auto">✨</span>
            </h2>
          </div>
          <div className="flex-1 overflow-hidden bg-gradient-to-br from-purple-50/50 to-pink-50/50">
            <FlowgraphEditor />
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden flex flex-col hover-lift">
          <div className="px-4 py-3 border-b-2 border-blue-200 bg-gradient-to-r from-blue-100 via-cyan-100 to-green-100">
            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <span className="text-2xl animate-bounce-gentle">🎮</span>
              Тоглоом
              <span className="text-sm text-blue-600 ml-auto">🎯</span>
            </h2>
          </div>
          <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <LoadingSpinner size="md" text="Тоглоом ачааллаж байна..." />
                </div>
              }
            >
              <GameBoard />
            </Suspense>
            {executionResult && (
              <Alert
                variant={executionResult.success ? 'success' : 'error'}
                className="mt-6 hover-lift shadow-lg"
              >
                <div>
                  <p className="font-semibold text-base mb-2 flex items-center gap-2">
                    {executionResult.success ? '🎉' : '😅'}
                    {executionResult.message}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <span className="text-lg">📊</span>
                      Алхам: <strong className="text-purple-600">{executionResult.stepCount}</strong>
                    </span>
                    {currentLevel.maxSteps && (
                      <span className="text-gray-600">
                        / {currentLevel.maxSteps}
                      </span>
                    )}
                  </div>
                </div>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

Game.displayName = 'Game';
