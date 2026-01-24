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
      className={`w-14 h-14 flex items-center justify-center rounded-cyber smooth-transition transform hover:scale-110 ${
        isCharacterHere
          ? 'bg-gradient-to-br from-neonCyan-400 via-neonPink-500 to-neonCyan-500 shadow-2xl scale-125 border-2 border-neonCyan-400 z-10 animate-pulse-glow card-glow'
          : isGoalHere
          ? 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 shadow-xl border-2 border-yellow-400 animate-bounce-gentle card-glow'
          : cell.type === 'wall'
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 shadow-inner opacity-80'
          : cell.type === 'start'
          ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-green-400 shadow-md card-glow'
          : 'glass-effect border-2 border-neonCyan-500/20 hover:border-neonCyan-500/50 shadow-sm hover:shadow-md'
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
      <div className="grid gap-2 p-6 glass-effect rounded-cyber-lg shadow-xl border-2 border-neonCyan-500/30 card-glow">
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

      <div className="mt-6 glass-effect rounded-cyber-lg shadow-lg p-5 border-2 border-neonPink-500/30 w-full max-w-md hover-lift card-glow">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="transform hover:scale-110 smooth-transition">
            <div className="text-lg mb-1 animate-bounce-gentle">📊</div>
            <div className="text-xs text-neonCyan-300 mb-1 font-medium text-shadow-soft">Алхам</div>
            <div className="text-lg font-bold gradient-text">
              {stepCount} / {maxSteps}
            </div>
          </div>
          <div className="transform hover:scale-110 smooth-transition">
            <div className="text-lg mb-1 animate-bounce-gentle">📍</div>
            <div className="text-xs text-neonCyan-300 mb-1 font-medium text-shadow-soft">Байрлал</div>
            <div className="text-lg font-bold text-neonPink-400 text-shadow-neon">
              ({character.position.x}, {character.position.y})
            </div>
          </div>
          <div className="transform hover:scale-110 smooth-transition">
            <div className="text-lg mb-1 animate-bounce-gentle">🧭</div>
            <div className="text-xs text-neonCyan-300 mb-1 font-medium text-shadow-soft">Чиглэл</div>
            <div className="text-2xl font-bold text-neonCyan-400 text-shadow-neon animate-bounce-gentle">
              {directionArrows[character.direction]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';
