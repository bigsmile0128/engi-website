import classNames from 'classnames';
import { HTMLMotionProps, motion } from 'framer-motion';
import { AiOutlineLoading } from 'react-icons/ai';
import Tag from '~/components/global/Tag/Tag';

type ButtonProps = {
  inProgress?: boolean;
  isLoading?: boolean;
  size?: 'large' | 'default' | 'small';
  variant?: 'primary' | 'default' | 'tag' | 'link';
};

export default function Button({
  className,
  disabled,
  children,
  variant = 'default',
  isLoading,
  inProgress,
  size = 'default',
  ...props
}: HTMLMotionProps<'button'> & ButtonProps) {
  let paddingX: string;
  let paddingY: string;
  let textSize: string;
  switch (size) {
    case 'small':
      paddingX = 'px-4';
      paddingY = 'py-2';
      textSize = 'text-sm';
      break;
    case 'large':
      paddingX = 'px-10';
      paddingY = 'py-6';
      textSize = 'text-lg';
      break;
    default:
      paddingX = 'px-8';
      paddingY = 'py-4';
      textSize = 'text-base';
  }

  const sizeClasses = classNames({
    [paddingX]: !/px-/.test(className),
    [paddingY]: !/py-/.test(className),
    [textSize]: !/text-(xs|sm|base|lg|.?xl)/.test(className),
  });

  if (variant === 'primary') {
    // underline animation on hover
    const hoverClasses = classNames(
      'active:bg-gray-300 hover:bg-gray-100 before:mx-auto',
      "before:content-[''] before:absolute before:inset-0 before:bottom-[-1px]",
      'before:border-b-2 before:border-green-primary',
      'before:ease-in-out before:duration-500 before:w-0 hover:before:w-full'
    );
    return (
      <motion.button
        className={classNames(
          'relative bg-white',
          'font-bold text-black disabled:text-gray-400',
          'outline-none focus-visible:ring-1 focus-visible:ring-green-primary',
          'border-t border-t-white border-b border-b-transparent',
          sizeClasses,
          // hover and active states
          disabled || isLoading || inProgress ? '' : hoverClasses,
          isLoading ? 'skeleton rounded-none text-transparent' : '',
          inProgress ? 'text-transparent' : '',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {inProgress && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <AiOutlineLoading className="text-2xl !text-green-primary visible animate-spin" />
          </div>
        )}
        {children}
      </motion.button>
    );
  } else if (variant === 'tag') {
    return (
      <motion.button
        className={classNames(
          'outline-none focus-visible:ring-1 focus-visible:ring-green-primary/60',
          isLoading ? 'skeleton rounded-none text-transparent' : '',
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
  } else if (variant === 'link') {
    return (
      <motion.button
        className={classNames(
          'outline-none focus-visible:ring-1 focus-visible:ring-green-primary',
          'font-medium',
          disabled ? 'text-tertiary' : 'text-green-primary hover:underline',
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
        'relative bg-black/20',
        'font-bold text-white disabled:text-gray-400',
        'border border-white',
        'outline-none focus-visible:ring-1 focus-visible:ring-green-primary',
        sizeClasses,
        // hover and active states
        disabled || isLoading
          ? 'cursor-default'
          : 'hover:bg-black/30 active:bg-black/40',
        isLoading
          ? 'skeleton rounded-none text-transparent !border-transparent'
          : '',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
