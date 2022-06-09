import React from 'react';
import classNames from 'classnames';
import Transition from 'components/Transition';

type FigmaCodeBlockProps = {
  className?: string;
  isToggled: boolean;
  codeProps?: any;
  codeContainerClassName?: string;
};

export default function FigmaCodeBlock({
  className,
  codeProps = {},
  isToggled,
  codeContainerClassName,
}: FigmaCodeBlockProps) {
  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <div className="text-[11px] font-bold bg-[#253520aa] px-2 py-1">
        Button.tsx
      </div>
      <div
        className={classNames(
          'relative flex text-[11px] font-bold bg-[#253520aa] leading-5',
          codeContainerClassName
        )}
      >
        <div
          className={classNames(
            'border-l-[1px] z-10',
            isToggled ? 'border-emerald-400' : 'border-emerald-300'
          )}
        />
        <div className="absolute h-full w-[28px] bg-gray-600" />
        <code
          className={classNames('whitespace-pre py-1.5', codeProps?.className)}
          {...codeProps}
        >
          <div>
            <span className="relative px-2.5 mr-2 z-50">1</span>
            <span>
              <span className="text-orange-400">{'const'}</span>
              <span>{' Button = ({ text }) => ('}</span>
            </span>
          </div>
          <div className="flex">
            <span className="relative px-2.5 mr-2 z-50">2</span>
            <Transition
              isToggled={isToggled}
              className="h-full inline relative whitespace-pre"
              addPositionClasses={false}
            >
              <span className="absolute left-0 top-0">
                <span className="text-purple-400">
                  {'  <button className='}
                </span>
                <span className="text-emerald-300">{'"btn"'}</span>
                <span className="text-purple-400">{'>'}</span>
                {'{text}'}
                <span className="text-purple-400">{'</button>'}</span>
              </span>
              <span className="absolute left-0 top-0">
                <span className="text-purple-400">{'  <button>'}</span>
                {'Click Me'}
                <span className="text-purple-400">{'</button>'}</span>
              </span>
            </Transition>
          </div>
          <div>
            <span className="relative px-2.5 mr-2 z-50">3</span>
            <span>
              <span>{');'}</span>
            </span>
          </div>
        </code>
      </div>
    </div>
  );
}
