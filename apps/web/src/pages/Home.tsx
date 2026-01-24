/**
 * Home page - Optimized layout with Chakra UI
 * Performance optimized with component extraction, memoization, and lazy loading
 */

import { useEffect, memo, useState, useCallback, Suspense, lazy } from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

// Lazy load heavy components for better code splitting
// Using React.lazy with fallback to default export
const AuthModal = lazy(() => 
  import('../components/AuthModal').then(module => ({ 
    default: module.AuthModal || module.default 
  }))
);

const UserSettings = lazy(() => 
  import('../components/UserSettings').then(module => ({ 
    default: module.UserSettings || module.default 
  }))
);

const UserProfile = lazy(() => 
  import('../components/UserProfile').then(module => ({ 
    default: module.UserProfile || module.default 
  }))
);

const StatsSection = lazy(() => 
  import('../components/home/StatsSection').then(module => ({ 
    default: module.StatsSection || module.default 
  }))
);

const HeroSection = lazy(() => 
  import('../components/home/HeroSection').then(module => ({ 
    default: module.HeroSection || module.default 
  }))
);

const HowItWorks = lazy(() => 
  import('../components/home/HowItWorks').then(module => ({ 
    default: module.HowItWorks || module.default 
  }))
);

const LevelsSection = lazy(() => 
  import('../components/home/LevelsSection').then(module => ({ 
    default: module.LevelsSection || module.default 
  }))
);

interface HomeProps {
  onStartLevel: (levelId: string) => void;
}

export const Home = memo(({ onStartLevel }: HomeProps) => {
  const { loadProgress, completedLevels } = useGameStore();
  const { user, isAuthenticated, fetchUser } = useAuthStore();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    loadProgress();
    // Fetch user if authenticated but user data not loaded
    if (isAuthenticated && !user) {
      fetchUser();
    }
  }, [loadProgress, isAuthenticated, user, fetchUser]);

  const handleAuthClick = useCallback((mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  }, []);

  const handleCloseAuth = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setSettingsModalOpen(false);
  }, []);

  return (
    <Box
      minH="100vh"
      bg="dark.200"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="7xl" px={{ base: 4, sm: 6, lg: 8 }} py={{ base: 6, md: 8 }} position="relative" zIndex={10}>
        <VStack gap={{ base: 6, md: 8 }} align="stretch">
          {/* User Profile - Show when logged in */}
          {isAuthenticated && user && (
            <Suspense fallback={null}>
              <UserProfile onSettingsClick={() => setSettingsModalOpen(true)} />
            </Suspense>
          )}

          {/* Hero Section */}
          <Suspense fallback={<LoadingSkeleton variant="page" />}>
            <HeroSection 
              onStartLevel={onStartLevel}
              onAuthClick={handleAuthClick}
              isAuthenticated={isAuthenticated}
            />
          </Suspense>

          {/* Stats Section */}
          <Suspense fallback={<LoadingSkeleton variant="card" />}>
            <StatsSection />
          </Suspense>

          {/* Levels Section */}
          <Suspense fallback={<LoadingSkeleton variant="list" />}>
            <LevelsSection 
              onStartLevel={onStartLevel} 
              completedLevels={completedLevels} 
            />
          </Suspense>

          {/* How It Works Section */}
          <Suspense fallback={<LoadingSkeleton variant="card" />}>
            <HowItWorks />
          </Suspense>
        </VStack>
      </Container>

      {/* Auth Modal */}
      {authModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={authModalOpen}
            onClose={handleCloseAuth}
            initialMode={authMode}
          />
        </Suspense>
      )}

      {/* User Settings Modal */}
      {isAuthenticated && (
        <Suspense fallback={null}>
          <UserSettings
            isOpen={settingsModalOpen}
            onClose={handleCloseSettings}
          />
        </Suspense>
      )}
    </Box>
  );
});

Home.displayName = 'Home';
