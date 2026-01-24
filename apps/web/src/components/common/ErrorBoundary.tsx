/**
 * Error Boundary Component - Catches React errors gracefully
 */

import { Component } from 'react';
import type { ReactNode } from 'react';
import { Box, VStack, Heading, Text, Button } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // In production, you could send to error tracking service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgGradient="to-br"
          gradientFrom="dark.300"
          gradientTo="dark.100"
          p={8}
        >
          <VStack gap={6} maxW="md" textAlign="center">
            <Box fontSize="6xl">😅</Box>
            <Heading size="lg" color="neonPink.400" className="neon-text">
              Алдаа гарлаа
            </Heading>
            <Text color="gray.300">
              Уучлаарай, алдаа гарсан байна. Хуудсыг дахин ачааллаж үзнэ үү.
            </Text>
            {import.meta.env.DEV && this.state.error && (
              <Box
                p={4}
                bg="dark.200"
                borderRadius="md"
                border="1px solid"
                borderColor="red.500"
                maxW="full"
                overflow="auto"
              >
                <Text color="red.300" fontSize="xs" fontFamily="mono">
                  {this.state.error.toString()}
                </Text>
              </Box>
            )}
            <Button
              colorScheme="purple"
              onClick={this.handleReset}
              size="lg"
            >
              Хуудсыг дахин ачааллах
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
