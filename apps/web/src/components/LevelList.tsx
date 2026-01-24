/**
 * Level list component
 */

import { memo, useMemo, useState, useCallback } from 'react';
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

  // Memoize filter handlers to prevent unnecessary re-renders
  const handleFilterChange = useCallback((newFilter: 'all' | 'easy' | 'medium' | 'hard') => {
    setFilter(newFilter);
  }, []);

  // Memoize level click handler
  const handleLevelClick = useCallback((levelId: string) => {
    onStartLevel(levelId);
  }, [onStartLevel]);

  return (
    <div>
      {/* Filter Buttons - LeetCode style */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          size="sm"
          variant={filter === 'all' ? 'primary' : 'ghost'}
          onClick={() => handleFilterChange('all')}
        >
          All ({difficultyCounts.all})
        </Button>
        <Button
          size="sm"
          variant={filter === 'easy' ? 'success' : 'ghost'}
          onClick={() => handleFilterChange('easy')}
        >
          Easy ({difficultyCounts.easy})
        </Button>
        <Button
          size="sm"
          variant={filter === 'medium' ? 'warning' : 'ghost'}
          onClick={() => handleFilterChange('medium')}
        >
          Medium ({difficultyCounts.medium})
        </Button>
        <Button
          size="sm"
          variant={filter === 'hard' ? 'danger' : 'ghost'}
          onClick={() => handleFilterChange('hard')}
        >
          Hard ({difficultyCounts.hard})
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
            className={`relative overflow-hidden border rounded-md flex flex-col transition-all ${
              isCompleted
                ? 'border-success-500 bg-bg-secondary'
                : isTutorial
                ? 'border-primary-500 bg-bg-secondary'
                : 'border-border-primary bg-bg-secondary hover:border-primary-400'
            }`}
          >
            {/* Status Indicator - LeetCode style */}
            {(isCompleted || isTutorial) && (
              <div className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                isCompleted
                  ? 'bg-success-500'
                  : 'bg-primary-500'
              }`}>
                <span className="text-white text-xs font-bold">
                  {isCompleted ? '✓' : '★'}
                </span>
              </div>
            )}

            <div className="relative z-10 flex flex-col flex-1">
              {/* Header Section - LeetCode style */}
              <div className="flex items-start justify-between mb-3 pr-10">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-base mb-2 ${
                    isCompleted ? 'text-success' : isTutorial ? 'text-primary-400' : 'text-text-primary'
                  }`}>
                    {level.name}
                  </h3>
                  {/* Difficulty Badge - LeetCode style */}
                  {level.difficulty && (
                    <Badge 
                      variant={getDifficultyVariant(level.difficulty)} 
                      size="sm"
                      className="mt-1"
                    >
                      {getDifficultyLabel(level.difficulty)}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description - LeetCode style */}
              <p className="text-sm mb-4 leading-relaxed line-clamp-2 text-text-secondary flex-1">
                {level.description}
              </p>

              {/* Info - LeetCode style */}
              <div className="flex items-center gap-3 mb-4 text-xs text-text-secondary">
                {level.minSteps && level.maxSteps && (
                  <span>Steps: {level.minSteps}-{level.maxSteps}</span>
                )}
                {level.requiredActions && level.requiredActions.length > 0 && (
                  <span>•</span>
                )}
                {level.requiredActions && level.requiredActions.length > 0 && (
                  <span>{level.requiredActions.length} actions</span>
                )}
              </div>

              {/* Hints Section - LeetCode style */}
              {level.hints && level.hints.length > 0 && (
                <details className="mb-4 group/details">
                  <summary className="text-sm cursor-pointer font-medium list-none py-2 text-primary-400 hover:text-primary-300 transition-colors">
                    <span className="flex items-center gap-2">
                      <span>Hints ({level.hints.length})</span>
                      <span className="ml-auto text-xs opacity-60 group-open/details:rotate-180 transition-transform">
                        ▼
                      </span>
                    </span>
                  </summary>
                  <ul className="mt-3 text-xs space-y-2 pl-4 text-text-secondary">
                    {level.hints.map((hint, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-0.5 flex-shrink-0 text-primary-400">•</span>
                        <span className="flex-1">{hint}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              {/* Action Button - LeetCode style */}
              <Button
                fullWidth
                variant={
                  isTutorial ? 'primary' : isCompleted ? 'success' : 'secondary'
                }
                onClick={() => handleLevelClick(level.id)}
                className="mt-auto"
              >
                {isTutorial ? 'Start Tutorial' : isCompleted ? 'Retry' : 'Start'}
              </Button>
            </div>
          </Card>
        );
      })}
      </div>
      {filteredLevels.length === 0 && (
        <div className="text-center py-12 rounded border border-border-primary bg-bg-secondary">
          <p className="text-text-secondary text-lg">No problems found</p>
        </div>
      )}
    </div>
  );
});

LevelList.displayName = 'LevelList';
