import { memo } from 'react';

export interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Alert = memo(({ variant = 'info', title, children, className = '', icon }: AlertProps) => {
  const variantStyles = {
    success:
      'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 text-green-900',
    error: 'bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 text-red-900',
    warning:
      'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 text-yellow-900',
    info: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 text-blue-900',
  };

  const defaultIcons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const displayIcon = icon !== undefined ? icon : defaultIcons[variant];

  return (
    <div className={`p-4 rounded-lg shadow-sm ${variantStyles[variant]} ${className}`}>
      <div className="flex items-start gap-3">
        {displayIcon && <span className="text-2xl flex-shrink-0">{displayIcon}</span>}
        <div className="flex-1">
          {title && <div className="font-semibold text-sm mb-2">{title}</div>}
          {children && <div className="text-sm">{children}</div>}
        </div>
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';
