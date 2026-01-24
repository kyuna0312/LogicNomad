/**
 * API Status Check Utility
 * Helps detect if the API server is running and accessible
 */

import { API_ENDPOINTS } from './constants';

/**
 * Check if the API server is accessible
 */
export async function checkApiStatus(): Promise<boolean> {
  try {
    // Try to fetch the GraphQL endpoint with a simple query
    const response = await fetch(API_ENDPOINTS.GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ __typename }',
      }),
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Get user-friendly error message for API connection issues
 */
export function getApiErrorMessage(): string {
  return `Cannot connect to API server at ${API_ENDPOINTS.GRAPHQL}.\n\n` +
    `Please make sure:\n` +
    `1. The API server is running (cd apps/api && yarn start:dev)\n` +
    `2. The API is accessible at ${API_ENDPOINTS.GRAPHQL}\n` +
    `3. CORS is properly configured in the API server`;
}
