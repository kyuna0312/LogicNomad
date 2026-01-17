/**
 * Level list component
 */

import { levels } from '../data/levels';
import { useGameStore } from '../store/gameStore';

interface LevelListProps {
  onStartLevel: (levelId: string) => void;
  completedLevels: string[];
}

export function LevelList({ onStartLevel, completedLevels }: LevelListProps) {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Хялбар';
      case 'medium':
        return 'Дунд';
      case 'hard':
        return 'Хэцүү';
      default:
        return '';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {levels.map((level) => {
        const isCompleted = completedLevels.includes(level.id);
        const isTutorial = level.id === 'tutorial';

        return (
          <div
            key={level.id}
            className={`border rounded-lg p-4 hover:shadow-md transition ${
              isCompleted ? 'bg-green-50 border-green-300' : ''
            } ${isTutorial ? 'border-blue-400 bg-blue-50' : ''}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg">{level.name}</h3>
              {isCompleted && (
                <span className="text-green-600 text-xl">✓</span>
              )}
            </div>
            {level.difficulty && (
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getDifficultyColor(
                  level.difficulty,
                )}`}
              >
                {getDifficultyLabel(level.difficulty)}
              </span>
            )}
            <p className="text-gray-600 text-sm mb-4">{level.description}</p>
            {level.hints && level.hints.length > 0 && (
              <details className="mb-3">
                <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                  Зааварчилгаа
                </summary>
                <ul className="mt-2 text-xs text-gray-600 list-disc list-inside space-y-1">
                  {level.hints.map((hint, idx) => (
                    <li key={idx}>{hint}</li>
                  ))}
                </ul>
              </details>
            )}
            <button
              onClick={() => onStartLevel(level.id)}
              className={`w-full px-4 py-2 rounded transition ${
                isTutorial
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {isTutorial ? 'Заавар эхлүүлэх' : 'Эхлэх'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
