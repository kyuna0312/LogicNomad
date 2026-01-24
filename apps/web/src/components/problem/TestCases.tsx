/**
 * Test Cases Component - LeetCode/HackerRank style
 * Shows test case results with expected vs actual
 */

import { memo } from 'react';
import { Box, VStack, HStack, Heading, Text, Code, Badge } from '@chakra-ui/react';
import type { ExecutionResult } from '@logicnomad/engine';

interface TestCasesProps {
  executionResult: ExecutionResult | null;
  currentLevel: any;
  stepCount: number;
}

export const TestCases = memo(({ executionResult, currentLevel, stepCount }: TestCasesProps) => {
  if (!executionResult) {
    return (
      <Box
        p={4}
        bg="dark.100"
        borderRadius="sm"
        border="1px solid"
        borderColor="border-primary"
      >
        <Text color="text-secondary" fontSize="sm" textAlign="center">
          Run your algorithm to see test case results
        </Text>
      </Box>
    );
  }

  const testCases = [
    {
      id: 1,
      name: 'Test Case 1',
      input: `Байрлал: (${currentLevel?.startPosition.x}, ${currentLevel?.startPosition.y})`,
      expected: `Амжилттай зорилгод хүрсэн!`,
      actual: executionResult.message,
      passed: executionResult.success,
      steps: stepCount,
      maxSteps: currentLevel?.maxSteps,
    },
  ];

  return (
    <VStack align="stretch" gap={4} p={4}>
      <Heading size="md" color="text-primary" fontWeight="600" fontSize="md">
        Test Cases
      </Heading>
      
      {testCases.map((testCase) => (
        <Box
          key={testCase.id}
          p={4}
          bg="dark.200"
          borderRadius="sm"
          border="1px solid"
          borderColor={testCase.passed ? 'success.500' : 'danger.500'}
        >
          <VStack align="stretch" gap={3}>
            {/* Test Case Header */}
            <HStack justify="space-between">
              <HStack gap={2}>
                <Text color="text-primary" fontWeight="600" fontSize="sm">
                  {testCase.name}
                </Text>
                <Badge
                  colorScheme={testCase.passed ? 'green' : 'red'}
                  fontSize="xs"
                  px={2}
                  py={0.5}
                  borderRadius="sm"
                  fontWeight="600"
                >
                  {testCase.passed ? '✓ PASSED' : '✗ FAILED'}
                </Badge>
              </HStack>
            </HStack>

            {/* Input */}
            <Box>
              <Text color="text-secondary" fontSize="xs" mb={1} fontWeight="600">
                Input:
              </Text>
              <Code
                p={2}
                bg="dark.300"
                color="text-primary"
                borderRadius="sm"
                display="block"
                fontSize="xs"
                fontFamily="mono"
              >
                {testCase.input}
              </Code>
            </Box>

            {/* Expected */}
            <Box>
              <Text color="text-secondary" fontSize="xs" mb={1} fontWeight="600">
                Expected:
              </Text>
              <Code
                p={2}
                bg="dark.300"
                color="success.500"
                borderRadius="sm"
                display="block"
                fontSize="xs"
                fontFamily="mono"
              >
                {testCase.expected}
              </Code>
            </Box>

            {/* Actual */}
            <Box>
              <Text color="text-secondary" fontSize="xs" mb={1} fontWeight="600">
                Output:
              </Text>
              <Code
                p={2}
                bg="dark.300"
                color={testCase.passed ? 'success.500' : 'danger.500'}
                borderRadius="sm"
                display="block"
                fontSize="xs"
                fontFamily="mono"
              >
                {testCase.actual}
              </Code>
            </Box>

            {/* Performance Metrics */}
            <HStack gap={4} pt={2} borderTop="1px solid" borderColor="border-primary">
              <VStack align="start" gap={0}>
                <Text color="text-secondary" fontSize="xs">
                  Steps
                </Text>
                <Text color={testCase.steps <= (testCase.maxSteps || 0) ? 'success.500' : 'danger.500'} fontSize="sm" fontWeight="600">
                  {testCase.steps} / {testCase.maxSteps}
                </Text>
              </VStack>
              <VStack align="start" gap={0}>
                <Text color="text-secondary" fontSize="xs">
                  Status
                </Text>
                <Text color={testCase.passed ? 'success.500' : 'danger.500'} fontSize="sm" fontWeight="600">
                  {testCase.passed ? 'Success' : 'Failed'}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      ))}

      {/* Summary */}
      <Box
        p={4}
        bg={executionResult.success ? 'success.900' : 'danger.900'}
        borderRadius="sm"
        border="1px solid"
        borderColor={executionResult.success ? 'success.500' : 'danger.500'}
      >
        <HStack justify="center" gap={2}>
          <Text
            color={executionResult.success ? 'success.500' : 'danger.500'}
            fontWeight="600"
            fontSize="sm"
          >
            {executionResult.success
              ? '✓ All test cases passed!'
              : '✗ Some test cases failed'}
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
});

TestCases.displayName = 'TestCases';
