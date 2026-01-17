/**
 * Home page
 */

import { useEffect, memo } from 'react';
import { useGameStore } from '../store/gameStore';
import { translations } from '../locales/mn';
import { LevelList } from '../components/LevelList';

interface HomeProps {
  onStartLevel: (levelId: string) => void;
}

export const Home = memo(({ onStartLevel }: HomeProps) => {
  const { loadProgress, completedLevels } = useGameStore();

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            LogicNomad
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Алгоритм + Тоглоомоор Алгоритм Сурах Платформ
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              {translations.tutorial}
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              {translations.levels}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Түвшнүүд</h2>
          <LevelList onStartLevel={onStartLevel} completedLevels={completedLevels} />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Тав тухтай мэдээлэл</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Дууссан түвшин:</strong> {completedLevels.length}
            </p>
            <p>
              <strong>Тайлбар:</strong> Flowchart ашиглан алгоритм зохиож,
              тоглоомын puzzle-ийг шийднэ үү!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">1. Түвшин сонгох</h3>
            <p className="text-gray-600">
              Тоглоомын түвшинг сонгоод зорилгыг ойлгоно уу
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">2. Алгоритм зохиох</h3>
            <p className="text-gray-600">
              Flowchart editor ашиглан алгоритм зохионо уу
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-2">3. Ажиллуулах</h3>
            <p className="text-gray-600">
              Алгоритмаа ажиллуулж үр дүнг харна уу
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

Home.displayName = 'Home';
