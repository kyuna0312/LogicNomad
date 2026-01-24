/**
 * User settings component for changing password and email
 */

import { useState, memo } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button, Card, Alert } from '@logicnomad/ui';

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSettings = memo(({ isOpen, onClose }: UserSettingsProps) => {
  const { user, changePassword, changeEmail, verifyEmailChange } = useAuthStore();
  const [mode, setMode] = useState<'password' | 'email' | 'verify-email'>('password');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [emailToken, setEmailToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  if (!isOpen || !user) return null;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Нууц үг таарахгүй байна');
      return;
    }

    setLoading(true);

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess('Нууц үг амжилттай солигдлоо!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Нууц үг солиход алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { token } = await changeEmail(newEmail, emailPassword);
      if (token) {
        setEmailToken(token); // In production, this would be sent via email
        setSuccess('Имэйл солих баталгаажуулалт илгээгдлээ. Токен: ' + token);
        setMode('verify-email');
      } else {
        setError('Токен авахад алдаа гарлаа');
      }
    } catch (err: any) {
      setError(err.message || 'Имэйл солиход алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyEmailChange(emailToken);
      setSuccess('Имэйл амжилттай солигдлоо!');
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Имэйл баталгаажуулахад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card variant="elevated" padding="lg" className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ⚙️ Тохиргоо
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

        <div className="mb-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={mode === 'password' ? 'primary' : 'ghost'}
              onClick={() => setMode('password')}
            >
              🔒 Нууц үг солих
            </Button>
            <Button
              size="sm"
              variant={mode === 'email' ? 'primary' : 'ghost'}
              onClick={() => setMode('email')}
            >
              📧 Имэйл солих
            </Button>
          </div>
        </div>

        {mode === 'password' && (
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                🔒 Одоогийн нууц үг
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
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
          </form>
        )}

        {mode === 'email' && (
          <form onSubmit={handleChangeEmail} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                📧 Шинэ имэйл
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="шинэ@имэйл.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                🔒 Нууц үг (баталгаажуулах)
              </label>
              <input
                type="password"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              className="mt-4"
            >
              Имэйл солих
            </Button>
          </form>
        )}

        {mode === 'verify-email' && (
          <form onSubmit={handleVerifyEmailChange} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                🔑 Баталгаажуулах токен
              </label>
              <input
                type="text"
                value={emailToken}
                onChange={(e) => setEmailToken(e.target.value)}
                required
                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                placeholder="Имэйл-ээс ирсэн токен"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              className="mt-4"
            >
              Баталгаажуулах
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
});

UserSettings.displayName = 'UserSettings';

// Default export for lazy loading compatibility
export default UserSettings;
