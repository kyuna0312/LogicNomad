/**
 * Game board component - renders the puzzle grid
 */

import { memo, useMemo } from 'react';
import { useGameStore } from '../../store/gameStore';
import type { GameCell, Direction } from '@logicnomad/engine';

const directionArrows: Record<Direction, string> = {
  north: '↑',
  south: '↓',
  east: '→',
  west: '←',
};

const cellEmojis: Record<string, string> = {
  empty: '⬜',
  wall: '⬛',
  treasure: '🪙',
  start: '🚩',
  goal: '🏁',
};

interface CellProps {
  cell: GameCell;
  row: number;
  col: number;
  characterPos: { x: number; y: number };
  characterDir: Direction;
  goalPos: { x: number; y: number };
}

const GameCell = memo(({ cell, row, col, characterPos, characterDir, goalPos }: CellProps) => {
  const content = useMemo(() => {
    // Check if character is here
    if (characterPos.x === col && characterPos.y === row) {
      return (
        <span className="text-2xl">
          {directionArrows[characterDir]}
        </span>
      );
    }

    // Check if goal is here
    if (goalPos.x === col && goalPos.y === row) {
      return <span className="text-2xl">{cellEmojis.goal}</span>;
    }

    return <span className="text-xl">{cellEmojis[cell.type] || '⬜'}</span>;
  }, [cell.type, characterPos, characterDir, goalPos, row, col]);

  return (
    <div
      className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 rounded"
    >
      {content}
    </div>
  );
});

GameCell.displayName = 'GameCell';

export const GameBoard = memo(() => {
  const { gameState, currentLevel } = useGameStore();

  const gameInfo = useMemo(() => {
    if (!gameState || !currentLevel) return null;
    return {
      grid: gameState.grid,
      character: gameState.character,
      stepCount: gameState.stepCount,
      maxSteps: currentLevel.maxSteps,
      goalPosition: currentLevel.goalPosition,
    };
  }, [gameState, currentLevel]);

  if (!gameState || !currentLevel || !gameInfo) {
    return <div>Тоглоом ачааллаж байна...</div>;
  }

  const { grid, character, stepCount, maxSteps, goalPosition } = gameInfo;

  return (
    <div className="flex flex-col items-center">
      <div className="grid gap-1 p-4 bg-gray-100 rounded-lg">
        {grid.map((row: GameCell[], rowIndex: number) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell: GameCell, colIndex: number) => (
              <GameCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                row={rowIndex}
                col={colIndex}
                characterPos={character.position}
                characterDir={character.direction}
                goalPos={goalPosition}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>
          Алхам: {stepCount} / {maxSteps}
        </p>
        <p>
          Байрлал: ({character.position.x}, {character.position.y})
        </p>
        <p>Чиглэл: {character.direction}</p>
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';
