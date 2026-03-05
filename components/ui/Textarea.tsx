'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Textarea component with label and error handling
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const [textareaId, setTextareaId] = useState<string>('');

    useEffect(() => {
      if (!textareaId) {
        setTextareaId(id || `textarea-${Math.random().toString(36).substr(2, 9)}`);
      }
    }, [id, textareaId]);

    return (
      <div className="w-full">
        {label && textareaId && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full px-4 py-3 border rounded-lg font-poppins transition-colors duration-200 resize-vertical',
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

Textarea.displayName = 'Textarea';

export default Textarea;
