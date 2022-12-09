import React from 'react';
import classNames from 'classnames';

type StepsProps = {
  className?: string;
  current: number;
  // current step
  onChange: (current: number) => void;
  stepClassName?: string;
  steps: { title: string }[];
};

export default function Steps({
  className,
  current,
  onChange,
  steps,
  stepClassName,
}: StepsProps) {
  return (
    <div
      className={classNames('flex flex-wrap gap-4 justify-center', className)}
    >
      {steps.map((step, i) => {
        return (
          <Step
            className={stepClassName}
            key={i}
            active={i === current}
            completed={current > i}
            title={step.title}
            onClick={() => onChange(i)}
            showTail={i !== steps.length - 1}
          />
        );
      })}
    </div>
  );
}

type StepProps = {
  active?: boolean;
  className?: string;
  completed?: boolean;
  onClick?: () => void;
  showTail?: boolean;
  title: string;
};

export function Step({
  className,
  active,
  completed,
  title,
  onClick,
  showTail,
}: StepProps) {
  return (
    <div className="flex relative">
      <button
        className={classNames(
          'relative flex flex-col items-center gap-y-8 w-[100px] pt-[12px]',
          'outline-none focus-visible:ring-1 ring-green-primary',
          className
        )}
        onClick={onClick}
      >
        <div className="relative h-[18px] w-[18px]">
          <span
            className={classNames(
              'h-[18px] w-[18px] rounded-full',
              'flex items-center justify-center bg-secondary',
              {
                '!bg-green-primary': completed,
                '!bg-transparent border-[3px] border-green-primary': active,
              }
            )}
          />
          {active && (
            <span
              className={classNames(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                'h-[34px] w-[34px] border-[10px] border-green-primary rounded-full z-10'
              )}
            />
          )}
        </div>
        <span
          className={classNames('text-xl text-secondary px-2', {
            '!text-green-primary': active,
            '!text-white': completed,
            'font-bold': active || completed,
          })}
        >
          {title}
        </span>
      </button>
      {showTail && (
        <span
          className={classNames(
            'absolute top-[20px] w-full left-1/2 text-[0px]',
            "after:inline-block after:content-[''] after:h-[2px] after:w-full",
            {
              'after:bg-green-primary': completed,
              'after:bg-secondary': !completed,
              'ml-[17px]': active,
              'ml-[9px]': !active,
            }
          )}
        />
      )}
    </div>
  );
}
