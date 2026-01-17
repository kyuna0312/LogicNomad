import { useState, useCallback, lazy, Suspense, useEffect } from 'react';
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

  if (currentPage === 'game') {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          onClick={handleBackToHome}
          className="fixed top-4 left-4 z-50"
          leftIcon="←"
        >
          Нүүр хуудас
        </Button>
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce-gentle">🎮</div>
                <LoadingSpinner size="lg" text="Ачааллаж байна..." />
              </div>
            </div>
          }
        >
          <Game />
        </Suspense>
      </div>
    );
  }

  return (
    <div>
      <Home onStartLevel={handleStartLevel} />
    </div>
  );
}

export default App;
