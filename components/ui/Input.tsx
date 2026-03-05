'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input component with label and error handling
 */
export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const [inputId, setInputId] = useState<string>('');

    useEffect(() => {
      if (!inputId) {
        setInputId(id || `input-${Math.random().toString(36).substr(2, 9)}`);
      }
    }, [id, inputId]);

    return (
      <div className="w-full">
        {label && inputId && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 border rounded-lg font-poppins transition-colors duration-200',
            'bg-white dark:bg-gray-800',
            'text-gray-900 dark:text-gray-100',
            'border-gray-300 dark:border-gray-600',
            'placeholder-gray-500 dark:placeholder-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-[#23CF65] focus:border-transparent',
            'disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
