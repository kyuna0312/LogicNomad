/**
 * Performance Metrics Component - LeetCode/HackerRank style
 * Shows algorithm performance statistics
 */

import { memo } from 'react';
import { Box, VStack, HStack, Heading, Text } from '@chakra-ui/react';

interface PerformanceMetricsProps {
  stepCount: number;
  maxSteps: number;
  minSteps: number;
  isOptimal: boolean;
}

export const PerformanceMetrics = memo(({ stepCount, maxSteps, minSteps, isOptimal }: PerformanceMetricsProps) => {
  const efficiency = maxSteps > 0 ? ((maxSteps - stepCount) / (maxSteps - minSteps)) * 100 : 0;
  const efficiencyColor = efficiency >= 80 ? 'green' : efficiency >= 50 ? 'yellow' : 'red';

  return (
    <Box
      p={4}
      bg="dark.100"
      borderRadius="md"
      border="1px solid"
      borderColor="neonCyan.500"
      boxShadow="0 0 10px rgba(0, 255, 255, 0.2)"
    >
      <VStack align="stretch" gap={4}>
        <Heading size="sm" color="neonCyan.400">
          📈 Гүйцэтгэл
        </Heading>

        {/* Step Count */}
        <VStack align="stretch" gap={2}>
          <HStack justify="space-between">
            <Text color="gray.300" fontSize="sm">
              Алхам
            </Text>
            <Text color={stepCount <= maxSteps ? 'green.400' : 'red.400'} fontSize="sm" fontWeight="bold">
              {stepCount} / {maxSteps}
            </Text>
          </HStack>
          <Box
            h="8px"
            bg="dark.200"
            borderRadius="full"
            overflow="hidden"
            position="relative"
          >
            <Box
              h="100%"
              w={`${(stepCount / maxSteps) * 100}%`}
              bg={stepCount <= maxSteps ? 'green.500' : 'red.500'}
              borderRadius="full"
              transition="width 0.3s"
            />
          </Box>
        </VStack>

        {/* Efficiency */}
        <VStack align="stretch" gap={2}>
          <HStack justify="space-between">
            <Text color="gray.300" fontSize="sm">
              Үр ашиг
            </Text>
            <Text color={`${efficiencyColor}.400`} fontSize="sm" fontWeight="bold">
              {efficiency.toFixed(0)}%
            </Text>
          </HStack>
          <Box
            h="8px"
            bg="dark.200"
            borderRadius="full"
            overflow="hidden"
            position="relative"
          >
            <Box
              h="100%"
              w={`${efficiency}%`}
              bg={`${efficiencyColor}.500`}
              borderRadius="full"
              transition="width 0.3s"
            />
          </Box>
        </VStack>

        {/* Optimal Status */}
        <Box
          p={2}
          bg={isOptimal ? 'green.900' : 'yellow.900'}
          borderRadius="sm"
          border="1px solid"
          borderColor={isOptimal ? 'green.500' : 'yellow.500'}
          opacity={0.3}
        >
          <Text
            color={isOptimal ? 'green.300' : 'yellow.300'}
            fontSize="xs"
            textAlign="center"
            fontWeight="semibold"
          >
            {isOptimal ? '✓ Хамгийн оновчтой' : '⚠️ Оновчтой биш'}
          </Text>
        </Box>

        {/* Stats */}
        <HStack justify="space-around" pt={2} borderTop="1px solid" borderColor="dark.200">
          <VStack gap={0}>
            <Text color="gray.400" fontSize="xs">
              Хамгийн бага
            </Text>
            <Text color="neonCyan.400" fontSize="sm" fontWeight="bold">
              {minSteps}
            </Text>
          </VStack>
          <VStack gap={0}>
            <Text color="gray.400" fontSize="xs">
              Одоогийн
            </Text>
            <Text color="neonPink.400" fontSize="sm" fontWeight="bold">
              {stepCount}
            </Text>
          </VStack>
          <VStack gap={0}>
            <Text color="gray.400" fontSize="xs">
              Хамгийн их
            </Text>
            <Text color="neonYellow.400" fontSize="sm" fontWeight="bold">
              {maxSteps}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
});

PerformanceMetrics.displayName = 'PerformanceMetrics';
