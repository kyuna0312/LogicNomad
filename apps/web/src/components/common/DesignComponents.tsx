/**
 * Reusable Design Components - Professional HackerRank Style
 * Consistent design patterns across the application
 */

import { memo, type ReactNode } from 'react';
import { Box, VStack, HStack, Heading, Text, Badge } from '@chakra-ui/react';
import { Card } from '@logicnomad/ui';

// Professional Card Component
interface ProfessionalCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'success' | 'warning' | 'danger' | 'primary';
  hover?: boolean;
  className?: string;
}

export const ProfessionalCard = memo(({ 
  children, 
  title, 
  subtitle, 
  badge, 
  badgeColor = 'primary',
  hover = false,
  className = '',
}: ProfessionalCardProps) => {
  return (
    <Card
      variant="default"
      padding="md"
      hover={hover}
      className={`professional-card ${className}`}
    >
      {(title || subtitle || badge) && (
        <Box mb={4} pb={3} borderBottom="1px solid" borderColor="border-primary">
          <HStack justify="space-between" align="start" mb={subtitle ? 2 : 0}>
            <VStack align="start" gap={0} flex={1}>
              {title && (
                <Heading size="md" color="text-primary" fontWeight="600" fontSize="md">
                  {title}
                </Heading>
              )}
              {subtitle && (
                <Text fontSize="sm" color="text-secondary" mt={1}>
                  {subtitle}
                </Text>
              )}
            </VStack>
            {badge && (
              <Badge
                colorScheme={badgeColor}
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="sm"
                fontWeight="600"
              >
                {badge}
              </Badge>
            )}
          </HStack>
        </Box>
      )}
      {children}
    </Card>
  );
});

ProfessionalCard.displayName = 'ProfessionalCard';

// Stat Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard = memo(({ label, value, icon, color = 'primary', trend }: StatCardProps) => {
  const colorMap = {
    primary: 'primary.500',
    success: 'success.500',
    warning: 'warning.500',
    danger: 'danger.500',
  };

  return (
    <Box
      p={4}
      bg="dark.200"
      borderRadius="md"
      border="1px solid"
      borderColor="border-primary"
      _hover={{
        borderColor: colorMap[color],
        boxShadow: `0 0 8px ${colorMap[color]}40`,
      }}
      transition="all 0.2s"
    >
      <VStack align="start" gap={2}>
        <HStack gap={2} align="center">
          {icon && <Text fontSize="lg">{icon}</Text>}
          <Text fontSize="xs" color="text-secondary" fontWeight="500" textTransform="uppercase" letterSpacing="0.5px">
            {label}
          </Text>
        </HStack>
        <Text fontSize="2xl" color={colorMap[color]} fontWeight="700">
          {value}
        </Text>
        {trend && (
          <Text fontSize="xs" color={trend === 'up' ? 'success.500' : trend === 'down' ? 'danger.500' : 'text-secondary'}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trend}
          </Text>
        )}
      </VStack>
    </Box>
  );
});

StatCard.displayName = 'StatCard';

// Section Header Component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  badge?: string;
}

export const SectionHeader = memo(({ title, subtitle, action, badge }: SectionHeaderProps) => {
  return (
    <Box mb={6} pb={4} borderBottom="1px solid" borderColor="border-primary">
      <HStack justify="space-between" align="start" flexWrap="wrap" gap={4}>
        <VStack align="start" gap={1} flex={1}>
          <HStack gap={3} align="center">
            <Heading size="lg" color="text-primary" fontWeight="600">
              {title}
            </Heading>
            {badge && (
              <Badge colorScheme="primary" fontSize="xs" px={2} py={1} borderRadius="sm">
                {badge}
              </Badge>
            )}
          </HStack>
          {subtitle && (
            <Text fontSize="sm" color="text-secondary">
              {subtitle}
            </Text>
          )}
        </VStack>
        {action && <Box>{action}</Box>}
      </HStack>
    </Box>
  );
});

SectionHeader.displayName = 'SectionHeader';

// Code Block Component
interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock = memo(({ code, language: _language, title }: CodeBlockProps) => {
  return (
    <Box>
      {title && (
        <Text fontSize="xs" color="text-secondary" mb={1} fontWeight="600" textTransform="uppercase" letterSpacing="0.5px">
          {title}
        </Text>
      )}
      <Box
        as="pre"
        p={3}
        bg="dark.300"
        borderRadius="sm"
        border="1px solid"
        borderColor="border-primary"
        overflowX="auto"
        fontSize="xs"
        fontFamily="mono"
        color="text-primary"
        lineHeight="1.6"
      >
        <code>{code}</code>
      </Box>
    </Box>
  );
});

CodeBlock.displayName = 'CodeBlock';

// Divider Component
export const ProfessionalDivider = memo(() => {
  return (
    <Box
      h="1px"
      bg="border-primary"
      my={4}
    />
  );
});

ProfessionalDivider.displayName = 'ProfessionalDivider';
