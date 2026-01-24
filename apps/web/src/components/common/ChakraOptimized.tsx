/**
 * Optimized Chakra UI Components
 * Pre-configured components with performance optimizations
 */

import { memo } from 'react';
import { Box, VStack, HStack, Heading, Text } from '@chakra-ui/react';
import type { BoxProps, StackProps, HeadingProps, TextProps } from '@chakra-ui/react';

// Optimized Box with default props
export const OptimizedBox = memo(({ children, ...props }: BoxProps) => {
  return <Box {...props}>{children}</Box>;
});

OptimizedBox.displayName = 'OptimizedBox';

// Optimized VStack with default gap
export const OptimizedVStack = memo(({ gap = 4, children, ...props }: StackProps) => {
  return <VStack gap={gap} {...props}>{children}</VStack>;
});

OptimizedVStack.displayName = 'OptimizedVStack';

// Optimized HStack with default gap
export const OptimizedHStack = memo(({ gap = 4, children, ...props }: StackProps) => {
  return <HStack gap={gap} {...props}>{children}</HStack>;
});

OptimizedHStack.displayName = 'OptimizedHStack';

// Optimized Heading with default props
export const OptimizedHeading = memo(({ 
  size = 'lg', 
  fontWeight = '600',
  color = 'text-primary',
  children, 
  ...props 
}: HeadingProps) => {
  return (
    <Heading size={size} fontWeight={fontWeight} color={color} {...props}>
      {children}
    </Heading>
  );
});

OptimizedHeading.displayName = 'OptimizedHeading';

// Optimized Text with default props
export const OptimizedText = memo(({ 
  fontSize = 'md',
  color = 'text-secondary',
  children, 
  ...props 
}: TextProps) => {
  return (
    <Text fontSize={fontSize} color={color} {...props}>
      {children}
    </Text>
  );
});

OptimizedText.displayName = 'OptimizedText';

// Container with max width and padding
interface OptimizedContainerProps extends BoxProps {
  maxW?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centerContent?: boolean;
}

export const OptimizedContainer = memo(({ 
  maxW = 'xl', 
  centerContent = false,
  children, 
  ...props 
}: OptimizedContainerProps) => {
  return (
    <Box
      maxW={maxW}
      mx="auto"
      px={{ base: 4, md: 6, lg: 8 }}
      {...(centerContent && { display: 'flex', flexDirection: 'column', alignItems: 'center' })}
      {...props}
    >
      {children}
    </Box>
  );
});

OptimizedContainer.displayName = 'OptimizedContainer';
