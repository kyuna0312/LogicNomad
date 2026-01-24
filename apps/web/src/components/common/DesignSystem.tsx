/**
 * Design System Component - Provides design utilities and context
 * This is a utility component for accessing design tokens in React
 */

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { designTokens } from '../../styles/design-tokens';

interface DesignSystemContextValue {
  tokens: typeof designTokens;
}

const DesignSystemContext = createContext<DesignSystemContextValue | null>(null);

interface DesignSystemProviderProps {
  children: ReactNode;
}

export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  return (
    <DesignSystemContext.Provider value={{ tokens: designTokens }}>
      {children}
    </DesignSystemContext.Provider>
  );
}

export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (!context) {
    // Return default tokens if context not available
    return { tokens: designTokens };
  }
  return context;
}
