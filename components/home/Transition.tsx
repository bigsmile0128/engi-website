import React from 'react';
import classNames from 'classnames';

type TransitionProps = {
  children: any;
  className?: string;
  isToggled: boolean;
  entrance?: string;
  exit?: string;
};

// transition between two child elements using animate.css
export default function Transition({
  children,
  className,
  isToggled,
  entrance = 'animate__fadeIn',
  exit = 'animate__fadeOut',
}: TransitionProps) {
  const hasPositionAttributes = children.some((child) =>
    /[\s-"](top|left|bottom|right)/.test(child.props?.className)
  );

  return (
    <div
      className={classNames(hasPositionAttributes ? '' : 'relative', className)}
    >
      {React.Children.map(children, (child, i) => {
        const props = {
          className: classNames(
            'animate__animated',
            // @ts-expect-error switch class based on isToggled, but invert for second child
            i % 2 == isToggled ? entrance : exit,
            // if child does not have position attributes, then center it horizontally by default
            hasPositionAttributes
              ? ''
              : 'absolute left-1/2 -translate-x-1/2 top-0',
            child.props?.className ?? ''
          ),
        };
        return React.cloneElement(child, props);
      })}
    </div>
  );
}
