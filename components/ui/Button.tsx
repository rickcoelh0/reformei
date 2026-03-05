import React from 'react';
import { cn } from '@/lib/utils';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Button component with multiple variants and sizes
 */
export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23CF65] disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-[#23CF65] text-white hover:bg-[#1aa84d] active:bg-[#158c3d]',
      secondary: 'bg-white dark:bg-gray-800 text-[#23CF65] dark:text-[#23CF65] hover:bg-[#23CF65] hover:text-white dark:hover:bg-[#23CF65]',
      outline: 'border-2 border-[#23CF65] text-[#23CF65] hover:bg-[#23CF65] hover:text-white',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
