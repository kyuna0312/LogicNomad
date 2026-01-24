import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { apolloClient } from './lib/apollo'
import { theme } from './theme'
import './index.css'
import App from './App.tsx'

// Performance monitoring (only in development, less noisy)
if (import.meta.env.DEV) {
  // Monitor long tasks (only warn for tasks > 200ms to reduce noise)
  if ('PerformanceObserver' in window) {
    try {
      // Check which entry types are supported
      const supportedTypes = PerformanceObserver.supportedEntryTypes || [];
      
      // Only set up observer if longtask is supported
      if (supportedTypes.includes('longtask')) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Only warn for significantly long tasks (>200ms)
            // This reduces noise from React DevTools and other dev tools
            if (entry.duration > 200 && entry.name !== 'React DevTools') {
              console.warn(`[Performance] Long task detected: ${entry.duration.toFixed(2)}ms`, entry.name);
            }
          }
        });
        observer.observe({ entryTypes: ['longtask'] });
      }
    } catch (e) {
      // PerformanceObserver not supported or longtask not available
      // Silently fail - this is expected in some browsers
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
      <ErrorBoundary>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </ErrorBoundary>
    </ChakraProvider>
  </StrictMode>,
)
