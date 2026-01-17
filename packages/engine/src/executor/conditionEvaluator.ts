/**
 * Condition evaluation utilities
 */

import type { GameState, Position, PuzzleLevel } from '../types/game';
import type { Direction } from '../types/flowgraph';

/**
 * Get next position based on direction
 */
function getNextPosition(position: Position, direction: Direction): Position {
  switch (direction) {
    case 'north':
      return { x: position.x, y: position.y - 1 };
    case 'south':
      return { x: position.x, y: position.y + 1 };
    case 'east':
      return { x: position.x + 1, y: position.y };
    case 'west':
      return { x: position.x - 1, y: position.y };
  }
}

/**
 * Check if position is valid
 */
function isValidPosition(
  position: Position,
  grid: GameState['grid'],
): boolean {
  if (
    position.x < 0 ||
    position.y < 0 ||
    position.y >= grid.length ||
    (grid.length > 0 && position.x >= grid[position.y].length)
  ) {
    return false;
  }

  const cell = grid[position.y][position.x];
  return cell.type !== 'wall';
}

/**
 * Evaluate condition
 */
export function evaluateCondition(
  condition: string,
  state: GameState,
  level: PuzzleLevel,
): boolean {
  const { character } = state;
  const { grid, goalPosition } = level;

  switch (condition) {
    case 'wallAhead': {
      const nextPos = getNextPosition(character.position, character.direction);
      return !isValidPosition(nextPos, grid);
    }

    case 'canMove': {
      const nextPos = getNextPosition(character.position, character.direction);
      return isValidPosition(nextPos, grid);
    }

    case 'atGoal': {
      return (
        character.position.x === goalPosition.x &&
        character.position.y === goalPosition.y
      );
    }

    case 'notAtGoal': {
      return !(
        character.position.x === goalPosition.x &&
        character.position.y === goalPosition.y
      );
    }

    // Default: always true (for backward compatibility)
    default:
      return true;
  }
}
