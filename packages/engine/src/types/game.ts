/**
 * Game and puzzle types
 */

import type { Direction } from './flowgraph';

export interface Position {
  x: number;
  y: number;
}

export interface GameCharacter {
  position: Position;
  direction: Direction;
}

export type CellType = 'empty' | 'wall' | 'treasure' | 'start' | 'goal';

export interface GameCell {
  type: CellType;
  x: number;
  y: number;
}

export interface PuzzleLevel {
  id: string;
  name: string;
  description: string;
  grid: GameCell[][];
  startPosition: Position;
  startDirection: Direction;
  goalPosition: Position;
  maxSteps: number;
  // Enhanced metadata
  difficulty?: 'easy' | 'medium' | 'hard';
  hints?: string[];
  requiredActions?: string[]; // Actions that must be used
  minSteps?: number; // Optimal solution steps
}

export interface GameState {
  character: GameCharacter;
  grid: GameCell[][];
  stepCount: number;
  isComplete: boolean;
  isFailed: boolean;
  failureReason?: 'maxSteps' | 'collision' | 'outOfBounds' | 'infiniteLoop';
  lastAction?: string;
}

export interface ExecutionResult {
  success: boolean;
  stepCount: number;
  message: string;
  finalState?: GameState;
}
