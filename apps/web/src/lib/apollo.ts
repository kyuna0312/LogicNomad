/**
 * Apollo Client configuration for GraphQL
 */

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';

import { API_ENDPOINTS } from '../utils/constants';

const httpLink = createHttpLink({
  uri: API_ENDPOINTS.GRAPHQL,
});

import { STORAGE_KEYS } from '../utils/constants';

// Auth link to add token to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Error link for handling errors
const errorLink = onError((errorHandler) => {
  const { graphQLErrors, networkError } = errorHandler as {
    graphQLErrors?: readonly GraphQLError[];
    networkError?: Error & { statusCode?: number };
  };
  
  if (graphQLErrors) {
    graphQLErrors.forEach((error: GraphQLError) => {
      if (import.meta.env.DEV) {
        console.error(
          `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
        );
      }
    });
  }

  if (networkError) {
    if (import.meta.env.DEV) {
      // More detailed error logging in development
      const errorMessage = networkError.message || 'Unknown network error';
      const statusCode = 'statusCode' in networkError ? networkError.statusCode : 'N/A';
      
      // Check if it's a CORS or connection error
      if (errorMessage.includes('CORS') || errorMessage.includes('Failed to fetch') || statusCode === null) {
        console.error(
          `[Network error]: Cannot connect to API server.\n` +
          `  - Make sure the API server is running on ${API_ENDPOINTS.GRAPHQL}\n` +
          `  - Check if CORS is properly configured\n` +
          `  - Error: ${errorMessage}`
        );
      } else {
        console.error(`[Network error]: ${errorMessage} (Status: ${statusCode})`);
      }
    }
    
    // Handle 401 unauthorized
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      window.location.href = '/';
    }
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          me: {
            merge(existing, incoming) {
              return incoming || existing;
            },
            // Cache for 5 minutes
            read(existing) {
              if (existing && Date.now() - (existing._cacheTime || 0) < 5 * 60 * 1000) {
                return existing;
              }
              return undefined;
            },
          },
          getProgress: {
            merge(existing, incoming) {
              return incoming || existing;
            },
            // Cache for 1 minute
            read(existing) {
              if (existing && Date.now() - (existing._cacheTime || 0) < 60 * 1000) {
                return existing;
              }
              return undefined;
            },
          },
        },
      },
      User: {
        keyFields: ['id'],
        merge(existing, incoming) {
          return { ...existing, ...incoming };
        },
      },
      UserProgress: {
        keyFields: ['userId'],
        merge(existing, incoming) {
          return { ...existing, ...incoming };
        },
      },
    },
    // Optimize cache size
    resultCaching: true,
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network', // Better UX with cache
      notifyOnNetworkStatusChange: true,
      // Optimize polling
      pollInterval: 0, // Disable polling by default
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first', // Use cache when available
    },
    mutate: {
      errorPolicy: 'all',
      // Optimize mutations
      awaitRefetchQueries: false,
    },
  },
  // Performance optimizations
  assumeImmutableResults: true, // Better performance
});
