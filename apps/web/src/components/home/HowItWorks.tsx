/**
 * How It Works Section - Step-by-step guide cards
 * Professional HackerRank/LeetCode style
 */

import { memo } from 'react';
import { Box, SimpleGrid, Heading, Text as ChakraText } from '@chakra-ui/react';
import { Card } from '@logicnomad/ui';

interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

const StepCard = memo(({ step, title, description }: StepCardProps) => (
  <Box 
    bg="bg-secondary"
    borderWidth="1px"
    borderColor="border-primary"
    borderRadius="md"
    shadow="card"
  >
    <Card 
      variant="default" 
      padding="md"
    >
      <Box
        w={{ base: '10', md: '12' }}
        h={{ base: '10', md: '12' }}
        bg="primary.500"
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
        color="white"
        fontWeight="600"
        fontSize={{ base: 'lg', md: 'xl' }}
      >
        {step}
      </Box>
      <Heading size="sm" mb={2} color="text-primary" fontWeight="600">
        {title}
      </Heading>
      <ChakraText color="text-secondary" lineHeight="relaxed" fontSize="sm">
        {description}
      </ChakraText>
    </Card>
  </Box>
));

StepCard.displayName = 'StepCard';

export const HowItWorks = memo(() => {
  const steps: StepCardProps[] = [
    {
      step: 1,
      title: 'Select Problem',
      description: 'Choose a problem and understand the requirements',
    },
    {
      step: 2,
      title: 'Design Algorithm',
      description: 'Create your algorithm using the flowchart editor',
    },
    {
      step: 3,
      title: 'Run & Test',
      description: 'Execute your algorithm and view the results',
    },
  ];

  return (
    <Box>
      <Heading
        size={{ base: 'md', md: 'lg' }}
        color="text-primary"
        fontWeight="600"
        mb={6}
      >
        How It Works
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {steps.map((step, index) => (
          <StepCard key={index} {...step} />
        ))}
      </SimpleGrid>
    </Box>
  );
});

HowItWorks.displayName = 'HowItWorks';

// Default export for lazy loading compatibility
export default HowItWorks;
