/**
 * Authentication store using GraphQL
 */

import { create } from 'zustand';
import { apolloClient } from '../lib/apollo';
import {
  REGISTER_MUTATION,
  LOGIN_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  RESET_PASSWORD_MUTATION,
} from '../graphql/auth/mutations';
import { ME_QUERY } from '../graphql/auth/queries';
import {
  CHANGE_PASSWORD_MUTATION,
  CHANGE_EMAIL_MUTATION,
  VERIFY_EMAIL_CHANGE_MUTATION,
} from '../graphql/users/mutations';

interface User {
  id: string;
  email: string;
  username?: string;
  createdAt?: string;
}

// GraphQL Response Types
interface AuthResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  register: AuthResponse;
}

interface LoginResponse {
  login: AuthResponse;
}

interface ForgotPasswordResponse {
  forgotPassword: {
    message: string;
    token?: string;
  };
}

interface MeResponse {
  me: User;
}

interface ChangePasswordResponse {
  changePassword: {
    message: string;
  };
}

interface ChangeEmailResponse {
  changeEmail: {
    message: string;
    token?: string;
  };
}

interface VerifyEmailChangeResponse {
  verifyEmailChange: {
    message: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string, username?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<string>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  changeEmail: (newEmail: string, password: string) => Promise<{ token?: string }>;
  verifyEmailChange: (token: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: !!localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,

  register: async (email: string, password: string, username?: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await apolloClient.mutate<RegisterResponse>({
        mutation: REGISTER_MUTATION,
        variables: {
          input: { email, password, username },
        },
      });

      if (!data) throw new Error('No data returned from registration');
      const { token, user } = data.register;
      localStorage.setItem('auth_token', token);
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await apolloClient.mutate<LoginResponse>({
        mutation: LOGIN_MUTATION,
        variables: {
          input: { email, password },
        },
      });

      if (!data) throw new Error('No data returned from login');
      const { token, user } = data.login;
      localStorage.setItem('auth_token', token);
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    apolloClient.clearStore();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  forgotPassword: async (email: string): Promise<string> => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await apolloClient.mutate<ForgotPasswordResponse>({
        mutation: FORGOT_PASSWORD_MUTATION,
        variables: {
          input: { email },
        },
      });

      set({ isLoading: false });
      if (!data) throw new Error('No data returned from forgot password');
      return data.forgotPassword.token || '';
    } catch (error: any) {
      set({
        error: error.message || 'Failed to send password reset email',
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      await apolloClient.mutate({
        mutation: RESET_PASSWORD_MUTATION,
        variables: {
          input: { token, newPassword },
        },
      });

      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to reset password',
        isLoading: false,
      });
      throw error;
    }
  },

  fetchUser: async () => {
    const token = get().token;
    if (!token) return;

    set({ isLoading: true });
    try {
      const { data } = await apolloClient.query<MeResponse>({
        query: ME_QUERY,
        fetchPolicy: 'network-only',
      });

      if (!data) throw new Error('No data returned from me query');
      set({
        user: data.me,
        isLoading: false,
      });
    } catch (error: any) {
      // If unauthorized, clear auth state
      if (error.message?.includes('Unauthorized') || error.message?.includes('401')) {
        get().logout();
      }
      set({
        error: error.message || 'Failed to fetch user',
        isLoading: false,
      });
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await apolloClient.mutate<ChangePasswordResponse>({
        mutation: CHANGE_PASSWORD_MUTATION,
        variables: {
          input: { currentPassword, newPassword },
        },
      });

      if (!data) throw new Error('No data returned from change password');
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to change password',
        isLoading: false,
      });
      throw error;
    }
  },

  changeEmail: async (newEmail: string, _password?: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await apolloClient.mutate<ChangeEmailResponse>({
        mutation: CHANGE_EMAIL_MUTATION,
        variables: {
          input: { newEmail },
        },
      });

      if (!data) throw new Error('No data returned from change email');
      set({ isLoading: false });
      // The API returns token in the response for email verification
      return { token: data.changeEmail.token };
    } catch (error: any) {
      set({
        error: error.message || 'Failed to change email',
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmailChange: async (token: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await apolloClient.mutate<VerifyEmailChangeResponse>({
        mutation: VERIFY_EMAIL_CHANGE_MUTATION,
        variables: {
          input: { token },
        },
      });

      if (!data) throw new Error('No data returned from verify email change');
      // Refresh user data after email change
      await get().fetchUser();
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to verify email change',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Auto-fetch user on mount if token exists
if (typeof window !== 'undefined' && localStorage.getItem('auth_token')) {
  useAuthStore.getState().fetchUser();
}
