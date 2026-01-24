/**
 * Optimized Chakra UI Imports
 * Centralized imports for better tree shaking and performance
 * Only includes components actually used in the project
 * 
 * Note: Import directly from '@chakra-ui/react' for best tree shaking
 * This file serves as a reference for available components
 */

// Core layout components (most commonly used)
export {
  Box,
  Flex,
  Grid,
  Stack,
  VStack,
  HStack,
  Container,
  Center,
} from '@chakra-ui/react';

// Typography components
export {
  Heading,
  Text,
  Code,
} from '@chakra-ui/react';

// Form components (when needed)
export {
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
} from '@chakra-ui/react';

// Feedback components
export {
  Alert,
  AlertTitle,
  AlertDescription,
  Spinner,
  Progress,
  Skeleton,
} from '@chakra-ui/react';

// Overlay components (simplified for v3)
export {
  Tooltip,
} from '@chakra-ui/react';

// Navigation components
export {
  Link,
} from '@chakra-ui/react';

// Data display components
export {
  Badge,
  Avatar,
  AvatarGroup,
  Image,
  List,
  ListItem,
} from '@chakra-ui/react';

// Media and disclosure components
export {
  Accordion,
  AccordionItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@chakra-ui/react';

// Hooks
export {
  useBreakpointValue,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';

// Types - Only export types that exist in Chakra UI v3
export type {
  BoxProps,
  FlexProps,
  GridProps,
  StackProps,
  HeadingProps,
  TextProps,
  InputProps,
  BadgeProps,
  ImageProps,
} from '@chakra-ui/react';
