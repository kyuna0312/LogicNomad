/**
 * Design Utilities - Helper functions for consistent styling
 */

import { designTokens } from '../styles/design-tokens';

/**
 * Get neon glow shadow based on color
 */
export function getNeonGlow(color: 'pink' | 'cyan' | 'yellow', intensity: 'low' | 'medium' | 'high' = 'medium') {
  const colors = {
    pink: 'rgba(255, 0, 102,',
    cyan: 'rgba(0, 255, 255,',
    yellow: 'rgba(255, 255, 0,',
  };

  const intensities = {
    low: [0.2, 0.1, 0.05],
    medium: [0.5, 0.3, 0.2],
    high: [0.8, 0.6, 0.4],
  };

  const [a, b, c] = intensities[intensity];
  const baseColor = colors[color];

  return `
    0 0 10px ${baseColor}${a}),
    0 0 20px ${baseColor}${b}),
    0 0 30px ${baseColor}${c})
  `;
}

/**
 * Get glass effect style
 */
export function getGlassEffect(intensity: 'subtle' | 'normal' | 'strong' = 'normal') {
  const styles = {
    subtle: {
      background: 'rgba(22, 33, 62, 0.5)',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
    },
    normal: {
      background: 'rgba(22, 33, 62, 0.7)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    strong: {
      background: 'rgba(22, 33, 62, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
    },
  };

  return styles[intensity];
}

/**
 * Get gradient text style
 */
export function getGradientText(colors: string[] = ['#ff0066', '#00ffff', '#ffff00']) {
  return {
    background: `linear-gradient(135deg, ${colors.join(', ')})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  } as React.CSSProperties;
}

/**
 * Get cyber border style
 */
export function getCyberBorder(color: 'pink' | 'cyan' | 'yellow' = 'cyan') {
  const colors = {
    pink: 'rgba(255, 0, 102, 0.5)',
    cyan: 'rgba(0, 255, 255, 0.5)',
    yellow: 'rgba(255, 255, 0, 0.5)',
  };

  return {
    border: '2px solid',
    borderColor: colors[color],
    boxShadow: `
      0 0 10px ${colors[color]},
      inset 0 0 10px ${colors[color].replace('0.5', '0.1')}
    `,
  };
}

/**
 * Get responsive spacing
 */
export function getResponsiveSpacing(
  base: keyof typeof designTokens.spacing,
  md?: keyof typeof designTokens.spacing,
  lg?: keyof typeof designTokens.spacing
) {
  return {
    base: designTokens.spacing[base],
    md: md ? designTokens.spacing[md] : designTokens.spacing[base],
    lg: lg ? designTokens.spacing[lg] : (md ? designTokens.spacing[md] : designTokens.spacing[base]),
  };
}

/**
 * Get animation delay for staggered animations
 */
export function getStaggerDelay(index: number, baseDelay: number = 0.1) {
  return `${index * baseDelay}s`;
}
