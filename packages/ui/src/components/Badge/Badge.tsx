import { memo } from 'react';

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const Badge = memo(({ variant = 'default', size = 'md', children, className = '' }: BadgeProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full shadow-sm';

  const variantStyles = {
    success: 'bg-green-100 text-green-800 border-2 border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300',
    danger: 'bg-red-100 text-red-800 border-2 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-2 border-blue-300',
    default: 'bg-gray-100 text-gray-800 border-2 border-gray-300',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
