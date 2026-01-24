/**
 * Application constants
 */

export const APP_CONFIG = {
  name: 'LogicNomad',
  version: '1.0.0',
  description: 'Алгоритм + Тоглоомоор Алгоритм Сурах Платформ',
  author: 'kyuna0312',
  repository: 'https://github.com/kyuna0312/LogicNomad',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  PROGRESS: 'logicnomad_progress',
  THEME: 'logicnomad_theme',
  SETTINGS: 'logicnomad_settings',
} as const;

export const API_ENDPOINTS = {
  GRAPHQL: import.meta.env.VITE_GRAPHQL_URL || import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
} as const;

export const PERFORMANCE_THRESHOLDS = {
  LONG_TASK_MS: 50,
  SLOW_RENDER_MS: 16,
  DEBOUNCE_DELAY_MS: 300,
} as const;
