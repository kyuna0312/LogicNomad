import { memo } from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
}

export const Card = memo(
  ({ children, className = '', hover = false, padding = 'md', variant = 'default' }: CardProps) => {
    const baseStyles = 'rounded-xl transition-all duration-300';

    const variantStyles = {
      default: 'bg-white shadow-md',
      bordered: 'bg-white border-2 border-gray-200 shadow-sm',
      elevated: 'bg-white shadow-xl',
      glass: 'bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-6',
    };

    const hoverStyles = hover
      ? 'hover:shadow-xl hover:scale-[1.02] transform transition-transform'
      : '';

    return (
      <div className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}>
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
