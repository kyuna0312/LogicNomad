/**
 * User Profile Component - displays user information when logged in
 */

import { memo } from 'react';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';
import { Card, Button } from '@logicnomad/ui';

interface UserProfileProps {
  onSettingsClick: () => void;
}

export const UserProfile = memo(({ onSettingsClick }: UserProfileProps) => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { completedLevels } = useGameStore();

  if (!isAuthenticated || !user) {
    return null;
  }

  const progressPercentage = completedLevels.length > 0 
    ? Math.round((completedLevels.length / 10) * 100) 
    : 0;

  return (
    <Card variant="glass" padding="lg" className="mb-6 border-2 border-purple-200 hover-lift">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* User Info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user.username?.[0]?.toUpperCase() || user.email[0]?.toUpperCase() || '👤'}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span>👋</span>
              {user.username || user.email.split('@')[0]}
            </h3>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <span>📧</span>
              {user.email}
            </p>
            {user.createdAt && (
              <p className="text-xs text-gray-500 mt-1">
                Бүртгүүлсэн: {new Date(user.createdAt).toLocaleDateString('mn-MN')}
              </p>
            )}
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Progress Stats */}
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {completedLevels.length}
              </div>
              <div className="text-xs text-gray-600">Дууссан</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                {progressPercentage}%
              </div>
              <div className="text-xs text-gray-600">Ахиц</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onSettingsClick}
              className="hover-lift"
              leftIcon="⚙️"
            >
              Тохиргоо
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="hover-lift text-red-600 hover:text-red-700"
              leftIcon="🚪"
            >
              Гарах
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
          <span>Түвшний ахиц</span>
          <span>{completedLevels.length} / 10</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
});

UserProfile.displayName = 'UserProfile';
