import React from 'react';
import classNames from 'classnames';

type TransitionProps = {
  children: any;
  className?: string;
  addPositionClasses?: boolean;
};

// transition between two child elements
export default function Transition({
  children,
  className,
  addPositionClasses = true,
}: TransitionProps) {
  const hasPositionAttributes = children.some((child) =>
    /[\s-"]?(top|left|bottom|right|inset)/.test(child.props?.className)
  );

  return (
    <div
      className={classNames(addPositionClasses ? 'relative' : '', className)}
    >
      <div
        className={classNames(
          'fade-in-out',
          addPositionClasses ? 'absolute' : '',
          addPositionClasses && !hasPositionAttributes
            ? 'left-1/2 -translate-x-1/2 top-0'
            : ''
        )}
      >
        {children?.[0]}
      </div>
      <div
        className={classNames(
          'fade-out-in',
          addPositionClasses ? 'absolute' : '',
          addPositionClasses && !hasPositionAttributes
            ? 'left-1/2 -translate-x-1/2 top-0'
            : ''
        )}
      >
        {children?.[1]}
      </div>
    </div>
  );
}
