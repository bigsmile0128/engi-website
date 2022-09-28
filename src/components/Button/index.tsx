import React from 'react';
import classNames from 'classnames';
import { HTMLMotionProps, motion } from 'framer-motion';
import Tag from '../global/Tag/Tag';

type ButtonProps = {
  variant?: 'primary' | 'default' | 'tag';
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
          'outline-none focus-visible:ring-1 focus-visible:ring-green-primary',
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
  } else if (variant === 'tag') {
    return (
      <motion.button
        className={classNames(
          'outline-none focus-visible:ring-1 focus-visible:ring-green-primary/60',
          className
        )}
        disabled={disabled}
        {...props}
      >
        <Tag
          className={classNames(
            disabled ? 'text-white/60' : 'hover:border-green-primary/60'
          )}
        >
          {children}
        </Tag>
      </motion.button>
    );
  }

  return (
    <motion.button
      className={classNames(
        'relative bg-black/20 px-8 py-4',
        'font-bold text-white disabled:text-gray-400',
        'border border-white',
        'outline-none focus-visible:ring-1 focus-visible:ring-green-primary',
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
