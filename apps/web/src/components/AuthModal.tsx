/**
 * Authentication modal component
 * Optimized with memo and useCallback
 */

import { useState, memo, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button, Card, Alert } from '@logicnomad/ui';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'forgot-password';
}

export const AuthModal = memo(({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password' | 'reset-password'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { login, register, forgotPassword, resetPassword } = useAuthStore();

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setSuccess('Амжилттай нэвтэрлээ!');
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Нэвтрэхэд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }, [login, onClose]);

  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Нууц үг таарахгүй байна');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      setSuccess('Бүртгэл амжилттай үүслээ!');
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Бүртгэл үүсгэхэд алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }, [register, onClose]);

  const handleForgotPassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = await forgotPassword(email);
      setSuccess('Нууц үг сэргээх холбоос имэйл хаяг руу илгээгдлээ');
      setResetToken(token); // In production, this would be sent via email
      setMode('reset-password');
    } catch (err: any) {
      setError(err.message || 'Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }, [forgotPassword]);

  const handleResetPassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Нууц үг таарахгүй байна');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(resetToken, newPassword);
      setSuccess('Нууц үг амжилттай солигдлоо!');
      setTimeout(() => {
        setMode('login');
        setSuccess('');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Нууц үг солиход алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }, [resetPassword]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card variant="elevated" padding="lg" className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {mode === 'login' ? '🔐 Нэвтрэх' : 
             mode === 'register' ? '✨ Бүртгүүлэх' :
             mode === 'forgot-password' ? '🔑 Нууц үг сэргээх' :
             '🔄 Нууц үг солих'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mb-4">
            {success}
          </Alert>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                📧 Имэйл
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="имэйл@жишээ.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                🔒 Нууц үг
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Нууц үг"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMode('forgot-password')}
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                Нууц үг мартсан?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              className="mt-4"
            >
              Нэвтрэх
            </Button>

            <div className="text-center text-sm text-gray-600">
              Бүртгэл байхгүй?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-purple-600 hover:text-purple-800 font-semibold"
              >
                Бүртгүүлэх
              </button>
            </div>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                👤 Нэр (сонголттой)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Таны нэр"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                📧 Имэйл
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="имэйл@жишээ.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                🔒 Нууц үг
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Хамгийн багадаа 6 тэмдэгт"
              />
              <p className="text-xs text-gray-500 mt-1">
                Том, жижиг үсэг болон тоо агуулах ёстой
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                🔒 Нууц үг давтах
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Нууц үг давтах"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              className="mt-4"
            >
              Бүртгүүлэх
            </Button>

            <div className="text-center text-sm text-gray-600">
              Аль хэдийн бүртгэлтэй?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-purple-600 hover:text-purple-800 font-semibold"
              >
                Нэвтрэх
              </button>
            </div>
          </form>
        )}

        {mode === 'forgot-password' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                📧 Имэйл
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="имэйл@жишээ.com"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              className="mt-4"
            >
              Нууц үг сэргээх холбоос илгээх
            </Button>

            <div className="text-center text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-purple-600 hover:text-purple-800 font-semibold"
              >
                ← Буцах
              </button>
            </div>
          </form>
        )}

        {mode === 'reset-password' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                🔑 Токен
              </label>
              <input
                type="text"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Нууц үг сэргээх токен"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                🔒 Шинэ нууц үг
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Шинэ нууц үг"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                🔒 Нууц үг давтах
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Нууц үг давтах"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              className="mt-4"
            >
              Нууц үг солих
            </Button>

            <div className="text-center text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-purple-600 hover:text-purple-800 font-semibold"
              >
                ← Буцах
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
});

AuthModal.displayName = 'AuthModal';

// Default export for lazy loading compatibility
export default AuthModal;
