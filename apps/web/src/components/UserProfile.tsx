/**
 * User Profile Component - displays user information when logged in
 * Optimized with memo and performance tracking
 */

import { memo, useMemo, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';
import { Card, Button } from '@logicnomad/ui';
import { levels } from '../data/levels';

interface UserProfileProps {
  onSettingsClick: () => void;
}

export const UserProfile = memo(({ onSettingsClick }: UserProfileProps) => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { completedLevels } = useGameStore();

  const totalLevels = levels.length;
  
  const progressPercentage = useMemo(() => {
    return completedLevels.length > 0 
      ? Math.round((completedLevels.length / totalLevels) * 100) 
      : 0;
  }, [completedLevels.length, totalLevels]);

  const formattedDate = useMemo(() => {
    if (!user?.createdAt) return null;
    return new Date(user.createdAt).toLocaleDateString('mn-MN');
  }, [user?.createdAt]);

  const userInitial = useMemo(() => {
    return user?.username?.[0]?.toUpperCase() || user?.email[0]?.toUpperCase() || 'U';
  }, [user?.username, user?.email]);

  const displayName = useMemo(() => {
    return user?.username || user?.email.split('@')[0];
  }, [user?.username, user?.email]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Card 
      variant="default" 
      padding="lg" 
      className="mb-6 border border-border-primary rounded-md bg-bg-secondary"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* User Info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
            {userInitial}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              {displayName}
            </h3>
            <p className="text-sm text-text-secondary">
              {user.email}
            </p>
            {formattedDate && (
              <p className="text-xs text-text-muted mt-1">
                Joined {formattedDate}
              </p>
            )}
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Progress Stats */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-semibold text-text-primary mb-1">
                {completedLevels.length}
              </div>
              <div className="text-xs text-text-secondary">Solved</div>
            </div>
            <div className="w-px h-8 bg-border-primary"></div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-success mb-1">
                {progressPercentage}%
              </div>
              <div className="text-xs text-text-secondary">Progress</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onSettingsClick}
            >
              Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar - LeetCode style */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-text-secondary font-medium">Progress</span>
          <span className="text-text-primary font-medium">{completedLevels.length} / {totalLevels}</span>
        </div>
        <div className="w-full bg-bg-tertiary rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-success transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
});

UserProfile.displayName = 'UserProfile';

// Default export for lazy loading compatibility
export default UserProfile;
