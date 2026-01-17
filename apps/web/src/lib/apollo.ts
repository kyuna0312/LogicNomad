/**
 * Apollo Client configuration for GraphQL
 */

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
});

// Auth link to add token to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token');
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
      console.error(`[Network error]: ${networkError}`);
    }
    
    // Handle 401 unauthorized
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      localStorage.removeItem('auth_token');
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
            merge: true,
            // Cache for 5 minutes
            read(existing) {
              return existing;
            },
          },
          getProgress: {
            merge: true,
            // Cache for 1 minute
            read(existing) {
              return existing;
            },
          },
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
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first', // Use cache when available
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  // Performance optimizations
  assumeImmutableResults: true, // Better performance
});
