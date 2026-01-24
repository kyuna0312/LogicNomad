/**
 * Example component demonstrating Chakra UI integration
 * This shows how to use Chakra UI components alongside existing custom components
 * 
 * See CHAKRA_UI_GUIDE.md for more examples and usage patterns
 */

import { Box, Button as ChakraButton, Text, Heading, VStack, HStack } from '@chakra-ui/react';
import { Button } from '@logicnomad/ui';

/**
 * Example: Using Chakra UI components
 * You can now use Chakra UI components throughout your app
 */
export function ChakraExample() {
  return (
    <Box 
      p={6} 
      bgGradient="to-br" 
      gradientFrom="pink.50" 
      gradientTo="purple.50" 
      borderRadius="xl" 
      shadow="lg"
      maxW="2xl"
      mx="auto"
      mt={8}
    >
      <VStack gap={4} align="stretch">
        <Heading 
          size="lg" 
          bgGradient="to-r" 
          gradientFrom="pink.500" 
          gradientTo="purple.500" 
          bgClip="text"
        >
          ✨ Chakra UI Integration Example
        </Heading>
        
        <Text color="gray.600" fontSize="md">
          You can now use Chakra UI components alongside your existing custom components!
          Both work seamlessly together.
        </Text>

        <HStack gap={4} flexWrap="wrap">
          {/* Chakra UI Button */}
          <ChakraButton colorScheme="purple" size="md">
            Chakra Button
          </ChakraButton>
          
          {/* Custom Button (still works!) */}
          <Button variant="primary" size="md">
            Custom Button
          </Button>
        </HStack>

        <Box mt={4} p={4} bg="white" borderRadius="md" borderWidth="1px" borderColor="purple.200">
          <Text fontSize="sm" color="gray.700" mb={2}>
            💡 Tip: Check <code>CHAKRA_UI_GUIDE.md</code> for more examples!
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
