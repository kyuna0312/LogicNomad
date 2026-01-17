/**
 * Game state management with Zustand
 */

import { create } from 'zustand';
import type {
  GameState,
  PuzzleLevel,
  ExecutionResult,
  Flowgraph,
} from '@logicnomad/engine';

interface GameStore {
  // Current level
  currentLevel: PuzzleLevel | null;
  gameState: GameState | null;
  flowgraph: Flowgraph | null;

  // Execution
  isExecuting: boolean;
  executionResult: ExecutionResult | null;

  // Progress
  completedLevels: string[];
  currentProgress: number;

  // Actions
  setCurrentLevel: (level: PuzzleLevel) => void;
  setFlowgraph: (flowgraph: Flowgraph) => void;
  setGameState: (state: GameState) => void;
  executeAlgorithm: () => Promise<void>;
  resetGame: () => void;
  markLevelComplete: (levelId: string) => void;
  loadProgress: () => void;
  saveProgress: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  currentLevel: null,
  gameState: null,
  flowgraph: null,
  isExecuting: false,
  executionResult: null,
  completedLevels: [],
  currentProgress: 0,

  setCurrentLevel: (level) => {
    set({ currentLevel: level });
    // Initialize game state
    const initialState: GameState = {
      character: {
        position: { ...level.startPosition },
        direction: level.startDirection,
      },
      grid: level.grid.map((row: any[]) => row.map((cell: any) => ({ ...cell }))),
      stepCount: 0,
      isComplete: false,
      isFailed: false,
    };
    set({ gameState: initialState });
  },

  setFlowgraph: (flowgraph) => {
    set({ flowgraph });
  },

  setGameState: (state) => {
    set({ gameState: state });
  },

  executeAlgorithm: async () => {
    const { flowgraph, currentLevel } = get();
    if (!flowgraph || !currentLevel) {
      return;
    }

    set({ isExecuting: true });

    // Import executor from main engine package
    const { executeAlgorithm } = await import('@logicnomad/engine');

    // Execute with full flowgraph (nodes + edges) for proper loop/condition support
    const result = executeAlgorithm(flowgraph.nodes, currentLevel, flowgraph.edges);

    set({
      executionResult: result,
      gameState: result.finalState || null,
      isExecuting: false,
    });

    if (result.success) {
      get().markLevelComplete(currentLevel.id);
    }
  },

  resetGame: () => {
    const { currentLevel } = get();
    if (currentLevel) {
      get().setCurrentLevel(currentLevel);
    }
    set({ executionResult: null });
  },

  markLevelComplete: (levelId) => {
    const { completedLevels } = get();
    if (!completedLevels.includes(levelId)) {
      set({
        completedLevels: [...completedLevels, levelId],
      });
      get().saveProgress();
    }
  },

  loadProgress: () => {
    try {
      const saved = localStorage.getItem('logicnomad_progress');
      if (saved) {
        const progress = JSON.parse(saved);
        set({
          completedLevels: progress.completedLevels || [],
          currentProgress: progress.currentProgress || 0,
        });
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  },

  saveProgress: () => {
    try {
      const { completedLevels, currentProgress } = get();
      const progress = {
        completedLevels,
        currentProgress,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem('logicnomad_progress', JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  },
}));
