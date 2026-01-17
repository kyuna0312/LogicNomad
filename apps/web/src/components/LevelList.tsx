/**
 * Level list component
 */

import { memo, useMemo, useState } from 'react';
import { levels } from '../data/levels';
import { Button, Badge, Card } from '@logicnomad/ui';

interface LevelListProps {
  onStartLevel: (levelId: string) => void;
  completedLevels: string[];
}

const getDifficultyVariant = (difficulty?: string): 'success' | 'warning' | 'danger' | 'default' => {
  switch (difficulty) {
    case 'easy':
      return 'success';
    case 'medium':
      return 'warning';
    case 'hard':
      return 'danger';
    default:
      return 'default';
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

export const LevelList = memo(({ onStartLevel, completedLevels }: LevelListProps) => {
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const filteredLevels = useMemo(() => {
    if (filter === 'all') return levels;
    return levels.filter((level) => level.difficulty === filter);
  }, [filter]);

  const difficultyCounts = useMemo(() => {
    return {
      all: levels.length,
      easy: levels.filter((l) => l.difficulty === 'easy').length,
      medium: levels.filter((l) => l.difficulty === 'medium').length,
      hard: levels.filter((l) => l.difficulty === 'hard').length,
    };
  }, []);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          size="sm"
          variant={filter === 'all' ? 'primary' : 'ghost'}
          onClick={() => setFilter('all')}
          className="hover-lift"
        >
          🌟 Бүгд ({difficultyCounts.all})
        </Button>
        <Button
          size="sm"
          variant={filter === 'easy' ? 'success' : 'ghost'}
          onClick={() => setFilter('easy')}
          className="hover-lift"
        >
          😊 Хялбар ({difficultyCounts.easy})
        </Button>
        <Button
          size="sm"
          variant={filter === 'medium' ? 'warning' : 'ghost'}
          onClick={() => setFilter('medium')}
          className="hover-lift"
        >
          🤔 Дунд ({difficultyCounts.medium})
        </Button>
        <Button
          size="sm"
          variant={filter === 'hard' ? 'danger' : 'ghost'}
          onClick={() => setFilter('hard')}
          className="hover-lift"
        >
          🔥 Хэцүү ({difficultyCounts.hard})
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredLevels.map((level) => {
        const isCompleted = completedLevels.includes(level.id);
        const isTutorial = level.id === 'tutorial';

        return (
          <Card
            key={level.id}
            variant="default"
            padding="md"
            hover
            className={`relative overflow-hidden border-2 hover-lift transition-all duration-300 ${
              isCompleted
                ? 'border-green-400 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 shadow-lg'
                : isTutorial
                ? 'border-blue-400 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-lg animate-pulse-glow'
                : 'border-purple-200 hover:border-purple-300 bg-white'
            }`}
          >
            {/* Completion Badge */}
            {isCompleted && (
              <div className="absolute top-3 right-3 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl z-10 animate-bounce-gentle">
                <span className="text-white text-lg">✨</span>
              </div>
            )}

            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-gray-900 pr-8 flex items-center gap-2">
                  {isTutorial && <span className="text-2xl">🎓</span>}
                  {level.name}
                </h3>
              </div>

              {level.difficulty && (
                <Badge 
                  variant={getDifficultyVariant(level.difficulty)} 
                  size="sm" 
                  className="mb-3 shadow-md"
                >
                  {getDifficultyLabel(level.difficulty)}
                </Badge>
              )}

              <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                {level.description}
              </p>

              {level.hints && level.hints.length > 0 && (
                <details className="mb-4">
                  <summary className="text-sm text-purple-600 cursor-pointer hover:text-purple-800 font-medium list-none transition-colors">
                    <span className="flex items-center gap-1">
                      <span className="text-lg">💡</span>
                      <span>Зааварчилгаа</span>
                    </span>
                  </summary>
                  <ul className="mt-3 text-xs text-gray-600 space-y-1.5 pl-4">
                    {level.hints.map((hint, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-500 mt-0.5 text-base">✨</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              <Button
                fullWidth
                variant={
                  isTutorial ? 'primary' : isCompleted ? 'success' : 'secondary'
                }
                leftIcon={isTutorial ? '🎯' : isCompleted ? '🔄' : '▶️'}
                onClick={() => onStartLevel(level.id)}
                onMouseEnter={() => {
                  // Preload Game component on hover
                  if (typeof window !== 'undefined') {
                    import('../pages/Game');
                  }
                }}
                className="shadow-md hover:shadow-xl transition-all duration-300"
              >
                {isTutorial ? 'Заавар эхлүүлэх' : isCompleted ? 'Дахин тоглох' : 'Эхлэх'}
              </Button>
            </div>
          </Card>
        );
      })}
      </div>
      {filteredLevels.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">Түвшин олдсонгүй</p>
        </div>
      )}
    </div>
  );
});

LevelList.displayName = 'LevelList';
