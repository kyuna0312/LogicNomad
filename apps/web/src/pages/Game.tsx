/**
 * Main game page with flowchart editor and puzzle - Optimized layout
 */

import { useCallback, memo, lazy, Suspense, useState } from 'react';
import { Box, Flex, Grid, Heading, HStack, VStack, Text as ChakraText } from '@chakra-ui/react';
import { useBreakpointValueMemo } from '../hooks/useChakraOptimized';
import { useGameStore } from '../store/gameStore';
import { FlowgraphEditor, useFlowgraphStore } from '@logicnomad/flowgraph';
import { translations } from '../locales/mn';
import { Button, Badge, Alert, LoadingSpinner } from '@logicnomad/ui';
import { ProblemDescription } from '../components/problem/ProblemDescription';
import { TestCases } from '../components/problem/TestCases';
import { PerformanceMetrics } from '../components/problem/PerformanceMetrics';

// Lazy load GameBoard for better code splitting
const GameBoard = lazy(() => 
  import('../components/game/GameBoard').then((module) => ({ default: module.GameBoard }))
);

export const Game = memo(() => {
  const {
    currentLevel,
    gameState,
    isExecuting,
    executionResult,
    executeAlgorithm,
    resetGame,
  } = useGameStore();

  const { getFlowgraph } = useFlowgraphStore();
  const [activeTab, setActiveTab] = useState<'problem' | 'testcases'>('problem');

  const handleExecute = useCallback(async () => {
    const flowgraph = getFlowgraph();
    
    // Validate before execution
    try {
      const { validateFlowgraph } = await import('@logicnomad/engine/flowgraph');
      const validation = validateFlowgraph(flowgraph);
      
      if (!validation.valid) {
        alert(`Алдаа: ${validation.errors.join(', ')}`);
        return;
      }
    } catch (error) {
      // Only log in development
      if (import.meta.env.DEV) {
        console.error('Validation error:', error);
      }
      // Continue execution even if validation fails (for development)
    }
    
    useGameStore.getState().setFlowgraph(flowgraph);
    await executeAlgorithm();
  }, [getFlowgraph, executeAlgorithm]);

  // Memoize breakpoint value to prevent recalculation
  const headerSize = useBreakpointValueMemo({ base: 'md', md: 'lg', lg: 'xl' }) as 'md' | 'lg' | 'xl' | undefined;
  
  // Memoize responsive button size
  const buttonSize = useBreakpointValueMemo({ base: 'sm', md: 'md' }) as 'sm' | 'md' | undefined;

  if (!currentLevel || !gameState) {
    return (
      <Box p={8}>
        <Box color="gray.600">Түвшин сонгоно уу</Box>
      </Box>
    );
  }

  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      bg="dark.200"
      position="relative"
      overflow="hidden"
    >
      {/* Professional Header - HackerRank Style */}
      <Box
        bg="dark.100"
        shadow="card"
        borderBottomWidth="1px"
        borderColor="border-primary"
        px={{ base: 4, md: 6 }}
        py={3}
        position="relative"
        zIndex={10}
      >
        <Flex
          align="center"
          justify="space-between"
          gap={4}
          flexWrap="wrap"
        >
          <HStack gap={4} flexWrap="wrap">
            <Heading
              size={headerSize}
              color="text-primary"
              fontWeight="600"
              display="flex"
              alignItems="center"
              gap={2}
            >
              {currentLevel.name}
            </Heading>
            {currentLevel.difficulty && (
              <Badge
                variant={
                  currentLevel.difficulty === 'easy'
                    ? 'success'
                    : currentLevel.difficulty === 'medium'
                    ? 'warning'
                    : 'danger'
                }
                size="sm"
                className="shadow-md"
              >
                {currentLevel.difficulty === 'easy'
                  ? '😊 Хялбар'
                  : currentLevel.difficulty === 'medium'
                  ? '🤔 Дунд'
                  : '🔥 Хэцүү'}
              </Badge>
            )}
          </HStack>
          <HStack gap={3} flexWrap="wrap">
            <Button 
              variant="secondary" 
              onClick={resetGame} 
              leftIcon="🔄"
              className="hover-lift shadow-md"
              size={buttonSize}
            >
              {translations.reset}
            </Button>
            <Button
              variant="primary"
              onClick={handleExecute}
              isLoading={isExecuting}
              leftIcon="▶️"
              className="hover-lift"
              size={buttonSize}
            >
              {translations.execute}
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* Main content - LeetCode style layout */}
      <Grid
        templateColumns={{ base: '1fr', lg: '400px 1fr' }}
        gap={4}
        p={4}
        flex={1}
        overflow="hidden"
        position="relative"
        zIndex={10}
        minH={0}
      >
        {/* Left Panel - Problem Description (HackerRank style) */}
        <Box
          bg="dark.100"
          borderRadius="md"
          shadow="card"
          borderWidth="1px"
          borderColor="border-primary"
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          {/* Custom Tabs - Professional */}
          <HStack
            px={4}
            pt={2}
            borderBottom="1px solid"
            borderColor="border-primary"
            bg="dark.200"
            gap={0}
          >
            <Box
              as="button"
              px={4}
              py={2}
              fontSize="sm"
              fontWeight="600"
              color={activeTab === 'problem' ? 'text-primary' : 'text-secondary'}
              borderBottom={activeTab === 'problem' ? '2px solid' : 'none'}
              borderColor={activeTab === 'problem' ? 'primary.500' : 'transparent'}
              onClick={() => setActiveTab('problem')}
              _hover={{ color: 'text-primary' }}
              transition="all 0.2s"
              bg={activeTab === 'problem' ? 'dark.100' : 'transparent'}
            >
              Problem
            </Box>
            <Box
              as="button"
              px={4}
              py={2}
              fontSize="sm"
              fontWeight="600"
              color={activeTab === 'testcases' ? 'text-primary' : 'text-secondary'}
              borderBottom={activeTab === 'testcases' ? '2px solid' : 'none'}
              borderColor={activeTab === 'testcases' ? 'primary.500' : 'transparent'}
              onClick={() => setActiveTab('testcases')}
              _hover={{ color: 'text-primary' }}
              transition="all 0.2s"
              bg={activeTab === 'testcases' ? 'dark.100' : 'transparent'}
            >
              Test Cases
            </Box>
          </HStack>
          
          {/* Tab Content */}
          <Box flex={1} overflowY="auto">
            {activeTab === 'problem' ? (
              <ProblemDescription
                level={currentLevel}
                completedLevels={useGameStore.getState().completedLevels}
              />
            ) : (
              <Box p={4}>
                <TestCases
                  executionResult={executionResult}
                  currentLevel={currentLevel}
                  stepCount={gameState?.stepCount || 0}
                />
              </Box>
            )}
          </Box>
        </Box>

        {/* Right Panel - Editor and Output (split vertically) */}
        <Grid
          templateRows={{ base: '1fr', lg: '1fr 1fr' }}
          gap={4}
          minH={0}
        >
          {/* Top: Flowchart Editor */}
          <Box
            bg="dark.100"
            borderRadius="md"
            shadow="card"
            borderWidth="1px"
            borderColor="border-primary"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            className="hover-lift"
          >
            <Box
              px={4}
              py={3}
              borderBottomWidth="1px"
              borderColor="border-primary"
              bg="dark.200"
            >
              <Heading
                size="md"
                fontWeight="600"
                color="text-primary"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="0.5px"
              >
                Flowchart Editor
              </Heading>
            </Box>
            <Box
              flex={1}
              overflow="hidden"
              bg="dark.100"
            >
              <FlowgraphEditor />
            </Box>
          </Box>

          {/* Bottom: Game Board & Results */}
          <Box
            bg="dark.100"
            borderRadius="md"
            shadow="card"
            borderWidth="1px"
            borderColor="border-primary"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            className="hover-lift"
          >
            <Box
              px={4}
              py={3}
              borderBottomWidth="1px"
              borderColor="border-primary"
              bg="dark.200"
            >
              <Heading
                size="md"
                fontWeight="600"
                color="text-primary"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="0.5px"
              >
                Game Board & Results
              </Heading>
            </Box>
            <Box
              flex={1}
              p={6}
              overflowY="auto"
              bg="dark.100"
            >
              <Suspense
                fallback={
                  <Flex align="center" justify="center" h="full">
                    <LoadingSpinner size="md" text="Тоглоом ачааллаж байна..." />
                  </Flex>
                }
              >
                <GameBoard />
              </Suspense>
              {/* Performance Metrics */}
              {gameState && currentLevel.maxSteps && currentLevel.minSteps && (
                <Box mt={4}>
                  <PerformanceMetrics
                    stepCount={gameState.stepCount}
                    maxSteps={currentLevel.maxSteps}
                    minSteps={currentLevel.minSteps}
                    isOptimal={gameState.stepCount <= currentLevel.minSteps + 2}
                  />
                </Box>
              )}

              {/* Execution Result */}
              {executionResult && (
                <Box mt={4}>
                  <Alert
                    variant={executionResult.success ? 'success' : 'error'}
                    className="hover-lift shadow-lg"
                  >
                    <VStack align="start" gap={2}>
                      <Box fontWeight="semibold" fontSize="base" display="flex" alignItems="center" gap={2}>
                        {executionResult.success ? '🎉' : '😅'}
                        {executionResult.message}
                      </Box>
                      <HStack gap={4} fontSize="sm">
                        <HStack gap={1}>
                          <ChakraText>
                            Steps: <strong style={{ color: '#5cb85c' }}>{executionResult.stepCount}</strong>
                          </ChakraText>
                        </HStack>
                        {currentLevel.maxSteps && (
                          <ChakraText color="text-secondary">
                            / {currentLevel.maxSteps}
                          </ChakraText>
                        )}
                      </HStack>
                    </VStack>
                  </Alert>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
});

Game.displayName = 'Game';
