import { memo } from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export const LoadingSpinner = memo(({ size = 'md', className = '', text }: LoadingSpinnerProps) => {
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-indigo-600 ${sizeStyles[size]}`}
      ></div>
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';
