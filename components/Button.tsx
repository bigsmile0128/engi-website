import React from 'react';
import classNames from 'classnames';
import { HTMLMotionProps, motion } from 'framer-motion';

type ButtonProps = {
  variant?: 'primary' | 'default';
};

export default function Button({
  className,
  disabled,
  children,
  variant = 'default',
  ...props
}: HTMLMotionProps<'button'> & ButtonProps) {
  if (variant === 'primary') {
    // underline animation on hover
    const hoverClasses = classNames(
      'active:bg-gray-300 before:mx-auto',
      "before:content-[''] before:absolute before:inset-0 before:bottom-[-1px]",
      'before:border-b-2 before:border-green-primary',
      'before:ease-in-out before:duration-500 before:w-0 hover:before:w-full'
    );
    return (
      <motion.button
        className={classNames(
          'relative bg-white px-8 py-4',
          'font-bold text-black disabled:text-gray-400',
          'focus:outline-none focus:ring-1 focus:ring-green-primary',
          'border-t border-t-white border-b border-b-transparent',
          // hover and active states
          disabled ? '' : hoverClasses,
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.button
      className={classNames(
        'relative bg-black/20 px-8 py-4',
        'font-bold text-white disabled:text-gray-400',
        'border border-white',
        'focus:outline-none focus:ring-1 focus:ring-green-primary',
        // hover and active states
        disabled ? '' : 'hover:bg-black/30 active:bg-black/40',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
