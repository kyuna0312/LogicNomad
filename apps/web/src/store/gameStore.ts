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

// GraphQL Response Types
interface ProgressType {
  completedLevels: string[];
  currentProgress: number;
}

interface GetProgressResponse {
  getProgress: ProgressType;
}

interface SaveProgressResponse {
  saveProgress: {
    message: string;
  };
}

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

  loadProgress: async () => {
    try {
      // Try to load from GraphQL API first if authenticated
      const authToken = localStorage.getItem('auth_token');
      if (authToken) {
        try {
          const { GET_PROGRESS_QUERY } = await import('../graphql/users/queries');
          const { apolloClient } = await import('../lib/apollo');
          const { data } = await apolloClient.query<GetProgressResponse>({
            query: GET_PROGRESS_QUERY,
            fetchPolicy: 'network-only',
          });

          if (data?.getProgress) {
            set({
              completedLevels: data.getProgress.completedLevels || [],
              currentProgress: data.getProgress.currentProgress || 0,
            });
            // Also save to localStorage as backup
            localStorage.setItem('logicnomad_progress', JSON.stringify({
              completedLevels: data.getProgress.completedLevels || [],
              currentProgress: data.getProgress.currentProgress || 0,
            }));
            return;
          }
        } catch (apiError) {
          // Fall back to localStorage if API fails
          if (import.meta.env.DEV) {
            console.error('Failed to load progress from GraphQL:', apiError);
          }
        }
      }

      // Fall back to localStorage
      const saved = localStorage.getItem('logicnomad_progress');
      if (saved) {
        const progress = JSON.parse(saved);
        set({
          completedLevels: progress.completedLevels || [],
          currentProgress: progress.currentProgress || 0,
        });
      }
    } catch (error) {
      // Silently fail in production, log in development
      if (import.meta.env.DEV) {
        console.error('Failed to load progress:', error);
      }
    }
  },

  saveProgress: async () => {
    try {
      const { completedLevels, currentProgress } = get();
      const progress = {
        completedLevels,
        currentProgress,
        savedAt: new Date().toISOString(),
      };
      
      // Save to localStorage (always)
      localStorage.setItem('logicnomad_progress', JSON.stringify(progress));

      // If authenticated, also save to GraphQL API
      const authToken = localStorage.getItem('auth_token');
      if (authToken) {
        try {
          const { SAVE_PROGRESS_MUTATION } = await import('../graphql/users/mutations');
          const { apolloClient } = await import('../lib/apollo');
          await apolloClient.mutate<SaveProgressResponse>({
            mutation: SAVE_PROGRESS_MUTATION,
            variables: {
              input: {
                completedLevels,
                currentProgress,
              },
            },
          });
        } catch (apiError) {
          // Silently fail API sync, localStorage is primary
          if (import.meta.env.DEV) {
            console.error('Failed to sync progress to GraphQL:', apiError);
          }
        }
      }
    } catch (error) {
      // Silently fail in production, log in development
      if (import.meta.env.DEV) {
        console.error('Failed to save progress:', error);
      }
    }
  },
}));
