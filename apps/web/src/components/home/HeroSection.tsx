/**
 * Hero Section Component - Main landing area
 */

import { memo, useCallback, useMemo } from 'react';
import { VStack, HStack, Heading, Text as ChakraText } from '@chakra-ui/react';
import { Button } from '@logicnomad/ui';
import { levels } from '../../data/levels';
import { useBreakpointValueMemo } from '../../hooks/useChakraOptimized';

interface HeroSectionProps {
  onStartLevel: (levelId: string) => void;
  onAuthClick: (mode: 'login' | 'register') => void;
  isAuthenticated: boolean;
}

export const HeroSection = memo(({ onStartLevel, onAuthClick, isAuthenticated }: HeroSectionProps) => {
  // Memoize breakpoint values to prevent recalculation
  const headingSize = useBreakpointValueMemo({ base: '3xl', md: '5xl', lg: '6xl' }) as '3xl' | '5xl' | '6xl' | undefined;
  const subheadingSize = useBreakpointValueMemo({ base: 'lg', md: 'xl', lg: '2xl' }) as 'lg' | 'xl' | '2xl' | undefined;
  
  // Memoize responsive spacing
  const spacing = useMemo(() => ({
    gap: { base: 4, md: 6 },
    py: { base: 4, md: 8 },
    mt: { base: 2, md: 4 },
  }), []);

  const handleTutorialClick = useCallback(() => {
    const tutorial = levels.find((l) => l.id === 'tutorial');
    if (tutorial) onStartLevel('tutorial');
  }, [onStartLevel]);

  return (
    <VStack gap={spacing.gap} textAlign="center" py={spacing.py}>
      <VStack gap={2}>
        <Heading
          size={headingSize}
          color="text-primary"
          fontWeight="600"
          mb={2}
          letterSpacing="-0.02em"
        >
          LogicNomad
        </Heading>
        
        <ChakraText
          fontSize={subheadingSize}
          color="text-secondary"
          maxW="2xl"
          mx="auto"
          fontWeight="normal"
          lineHeight="1.6"
        >
          Алгоритм суралцах платформ - Flowchart ашиглан програмчлалын үндсийг эзэмш
        </ChakraText>
      </VStack>

      <HStack
        gap={4}
        justify="center"
        flexWrap="wrap"
        mt={spacing.mt}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={handleTutorialClick}
        >
          Start Learning
        </Button>
        <Button variant="secondary" size="lg">
          View Problems
        </Button>
      </HStack>

      {/* Auth Status - Show login/register buttons if not authenticated */}
      {!isAuthenticated && (
        <HStack gap={4} justify="center" mt={4}>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onAuthClick('login')}
          >
            Sign In
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onAuthClick('register')}
          >
            Sign Up
          </Button>
        </HStack>
      )}
    </VStack>
  );
});

HeroSection.displayName = 'HeroSection';

// Default export for lazy loading compatibility
export default HeroSection;
