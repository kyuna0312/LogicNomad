/**
 * Loading Skeleton Component - Better loading states
 */

import { Box, VStack, HStack, Skeleton } from '@chakra-ui/react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'list' | 'page';
}

export function LoadingSkeleton({ variant = 'page' }: LoadingSkeletonProps) {
  if (variant === 'card') {
    return (
      <Box p={4} bg="dark.100" borderRadius="md" border="1px solid" borderColor="dark.200">
        <VStack align="stretch" gap={3}>
          <Skeleton height="20px" borderRadius="md" />
          <Skeleton height="16px" width="60%" borderRadius="md" />
          <Skeleton height="100px" borderRadius="md" />
        </VStack>
      </Box>
    );
  }

  if (variant === 'list') {
    return (
      <VStack align="stretch" gap={3}>
        {[1, 2, 3].map((i) => (
          <Box key={i} p={4} bg="dark.100" borderRadius="md" border="1px solid" borderColor="dark.200">
            <HStack gap={3}>
              <Skeleton width="60px" height="60px" borderRadius="md" />
              <VStack align="start" flex={1} gap={2}>
                <Skeleton height="20px" width="80%" borderRadius="md" />
                <Skeleton height="16px" width="60%" borderRadius="md" />
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    );
  }

  // Page variant
  return (
    <Box p={8}>
      <VStack align="stretch" gap={6}>
        <Skeleton height="40px" width="300px" borderRadius="md" />
        <Skeleton height="200px" borderRadius="md" />
        <HStack gap={4}>
          <Skeleton height="100px" flex={1} borderRadius="md" />
          <Skeleton height="100px" flex={1} borderRadius="md" />
        </HStack>
      </VStack>
    </Box>
  );
}
