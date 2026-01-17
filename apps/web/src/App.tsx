import { useState, useCallback, lazy, Suspense } from 'react';
import { Home } from './pages/Home';
import { useGameStore } from './store/gameStore';
import { levels } from './data/levels';
import './App.css';

// Lazy load Game page for code splitting
const Game = lazy(() => import('./pages/Game').then((module) => ({ default: module.Game })));

type Page = 'home' | 'game';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { setCurrentLevel, setFlowgraph } = useGameStore();

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
      <div>
        <button
          onClick={handleBackToHome}
          className="m-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Нүүр хуудас
        </button>
        <Suspense fallback={<div className="p-8 text-center">Ачааллаж байна...</div>}>
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
