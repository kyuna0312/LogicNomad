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
  empty: '✨',
  wall: '⬛',
  treasure: '🪙',
  start: '🚩',
  goal: '🏆',
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
        <span className="text-3xl animate-bounce-gentle">
          {directionArrows[characterDir]}
        </span>
      );
    }

    // Check if goal is here
    if (goalPos.x === col && goalPos.y === row) {
      return <span className="text-3xl animate-bounce-gentle">{cellEmojis.goal}</span>;
    }

    return <span className="text-2xl">{cellEmojis[cell.type] || '✨'}</span>;
  }, [cell.type, characterPos, characterDir, goalPos, row, col]);

  const isCharacterHere = characterPos.x === col && characterPos.y === row;
  const isGoalHere = goalPos.x === col && goalPos.y === row;

  return (
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300 transform hover:scale-110 ${
        isCharacterHere
          ? 'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 shadow-2xl scale-125 border-3 border-blue-600 z-10 animate-pulse-glow'
          : isGoalHere
          ? 'bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-400 shadow-xl border-3 border-yellow-500 animate-bounce-gentle'
          : cell.type === 'wall'
          ? 'bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-900 shadow-inner'
          : cell.type === 'start'
          ? 'bg-gradient-to-br from-green-200 to-emerald-300 border-2 border-green-400 shadow-md'
          : 'bg-white/90 border-2 border-purple-200 hover:border-purple-300 shadow-sm hover:shadow-md'
      }`}
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
      <div className="grid gap-2 p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl shadow-xl border-2 border-purple-200">
        {grid.map((row: GameCell[], rowIndex: number) => (
          <div key={rowIndex} className="flex gap-2">
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

      <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 border-2 border-purple-200 w-full max-w-md hover-lift">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="transform hover:scale-110 transition-transform duration-200">
            <div className="text-lg mb-1">📊</div>
            <div className="text-xs text-gray-500 mb-1 font-medium">Алхам</div>
            <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {stepCount} / {maxSteps}
            </div>
          </div>
          <div className="transform hover:scale-110 transition-transform duration-200">
            <div className="text-lg mb-1">📍</div>
            <div className="text-xs text-gray-500 mb-1 font-medium">Байрлал</div>
            <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              ({character.position.x}, {character.position.y})
            </div>
          </div>
          <div className="transform hover:scale-110 transition-transform duration-200">
            <div className="text-lg mb-1">🧭</div>
            <div className="text-xs text-gray-500 mb-1 font-medium">Чиглэл</div>
            <div className="text-2xl font-bold text-indigo-600">
              {directionArrows[character.direction]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';
