/**
 * Environment variable validation and type safety
 */

interface Env {
  readonly VITE_API_URL: string;
  readonly VITE_GRAPHQL_URL: string;
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
}

function getEnv(): Env {
  const env = {
    VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    VITE_GRAPHQL_URL: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:3000/graphql',
    NODE_ENV: (import.meta.env.MODE || 'development') as 'development' | 'production' | 'test',
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME || 'LogicNomad',
    VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  };

  // Validate required environment variables
  if (!env.VITE_API_URL) {
    throw new Error('VITE_API_URL is required');
  }

  if (!env.VITE_GRAPHQL_URL) {
    throw new Error('VITE_GRAPHQL_URL is required');
  }

  return env;
}

export const env = getEnv();

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
