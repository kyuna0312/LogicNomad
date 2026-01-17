/**
 * Home page
 */

import { useEffect, memo, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';
import { translations } from '../locales/mn';
import { LevelList } from '../components/LevelList';
import { AuthModal } from '../components/AuthModal';
import { UserSettings } from '../components/UserSettings';
import { UserProfile } from '../components/UserProfile';
import { levels } from '../data/levels';
import { Button, Card } from '@logicnomad/ui';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Cute floating decorations */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">✨</div>
      <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🌟</div>
      <div className="absolute bottom-40 left-20 text-4xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>💫</div>
      <div className="absolute top-60 right-40 text-5xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* User Profile - Show when logged in */}
        {isAuthenticated && user && (
          <UserProfile onSettingsClick={() => setSettingsModalOpen(true)} />
        )}

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 animate-bounce-gentle">
            <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">
              🧙 LogicNomad ✨
            </h1>
          </div>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
            🎮 Алгоритм + Тоглоомоор Алгоритм Сурах Платформ 🎯
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                const tutorial = levels.find((l) => l.id === 'tutorial');
                if (tutorial) onStartLevel('tutorial');
              }}
              className="hover-lift shadow-xl"
            >
              🎓 {translations.tutorial}
            </Button>
            <Button variant="ghost" size="lg" className="hover-lift">
              📚 {translations.levels}
            </Button>
          </div>

          {/* Auth Status - Show login/register buttons if not authenticated */}
          {!isAuthenticated && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="hover-lift"
              >
                🔐 Нэвтрэх
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                className="hover-lift"
              >
                ✨ Бүртгүүлэх
              </Button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <Card variant="glass" padding="md" className="mb-8 hover-lift border-2 border-purple-200">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            <div className="transform hover:scale-110 transition-transform duration-200">
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {completedLevels.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Дууссан түвшин</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-300 to-transparent"></div>
            <div className="transform hover:scale-110 transition-transform duration-200">
              <div className="text-4xl mb-2">📖</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                {levels.length}
              </div>
              <div className="text-sm text-gray-600 font-medium">Нийт түвшин</div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-300 to-transparent"></div>
            <div className="transform hover:scale-110 transition-transform duration-200">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                {Math.round((completedLevels.length / levels.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600 font-medium">Ахиц</div>
            </div>
          </div>
        </Card>

        {/* Levels Section */}
        <Card variant="glass" padding="lg" className="mb-8 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
              <span className="text-4xl animate-bounce-gentle">🎯</span>
              Түвшнүүд
            </h2>
            <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
              <span className="text-lg">✨</span>
              {completedLevels.length} / {levels.length} дууссан
            </div>
          </div>
          <LevelList onStartLevel={onStartLevel} completedLevels={completedLevels} />
        </Card>

        {/* How It Works Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card variant="glass" padding="md" hover className="hover-lift border-2 border-pink-200">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl">1️⃣</span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900 flex items-center gap-2">
              <span>🎮</span>
              Түвшин сонгох
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Тоглоомын түвшинг сонгоод зорилгыг ойлгоно уу ✨
            </p>
          </Card>
          <Card variant="glass" padding="md" hover className="hover-lift border-2 border-purple-200">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl">2️⃣</span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900 flex items-center gap-2">
              <span>📊</span>
              Алгоритм зохиох
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Flowchart editor ашиглан алгоритм зохионо уу 🎨
            </p>
          </Card>
          <Card variant="glass" padding="md" hover className="hover-lift border-2 border-blue-200">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl">3️⃣</span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900 flex items-center gap-2">
              <span>🚀</span>
              Ажиллуулах
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Алгоритмаа ажиллуулж үр дүнг харна уу 🎉
            </p>
          </Card>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* User Settings Modal */}
      {isAuthenticated && (
        <UserSettings
          isOpen={settingsModalOpen}
          onClose={() => setSettingsModalOpen(false)}
        />
      )}
    </div>
  );
});

Home.displayName = 'Home';
