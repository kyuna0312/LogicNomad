import { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useBreakpointValueMemo } from './hooks/useChakraOptimized';
import { Home } from './pages/Home';
import { useGameStore } from './store/gameStore';
import { useAuthStore } from './store/authStore';
import { levels } from './data/levels';
import { Button, LoadingSpinner } from '@logicnomad/ui';

// Lazy load Game page for code splitting
const Game = lazy(() => 
  import('./pages/Game').then((module) => ({ default: module.Game }))
);

type Page = 'home' | 'game';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { setCurrentLevel, setFlowgraph } = useGameStore();
  const { fetchUser, isAuthenticated, token } = useAuthStore();

  // Auto-fetch user on mount if token exists
  useEffect(() => {
    if (token && !isAuthenticated) {
      fetchUser().catch(() => {
        // Silently fail if token is invalid
      });
    }
  }, [token, isAuthenticated, fetchUser]);

  const handleStartLevel = useCallback((levelId: string) => {
    const level = levels.find((l) => l.id === levelId);
    if (level) {
      setCurrentLevel(level);
      // Clear flowgraph when starting new level
      setFlowgraph({ nodes: [], edges: [] });
      setCurrentPage('game');
    }
  }, [setCurrentLevel, setFlowgraph]);

  const handleBackToHome = useCallback(() => {
    setCurrentPage('home');
  }, []);

  // Memoize button size to prevent recalculation
  const buttonSize = useBreakpointValueMemo({ base: 'sm', md: 'md' }) as 'sm' | 'md' | undefined;

  if (currentPage === 'game') {
    return (
      <Box position="relative">
        <Box position="fixed" top={4} left={4} zIndex={50}>
          <Button
            variant="ghost"
            onClick={handleBackToHome}
            size={buttonSize}
          >
            ← Back
          </Button>
        </Box>
        <Suspense
          fallback={
            <Box
              h="100vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="dark.200"
            >
              <VStack gap={4} textAlign="center">
                <LoadingSpinner size="lg" text="Loading..." />
              </VStack>
            </Box>
          }
        >
          <Game />
        </Suspense>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="dark.200"
      position="relative"
    >
      <Home onStartLevel={handleStartLevel} />
    </Box>
  );
}

export default App;
