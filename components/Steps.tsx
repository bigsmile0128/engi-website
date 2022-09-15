import React from 'react';
import classNames from 'classnames';

type StepsProps = {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  steps: { title: string }[];
  current: number; // current step
  onChange: (current: number) => void;
};

export default function Steps({
  className,
  direction = 'horizontal',
  current,
  onChange,
  steps,
}: StepsProps) {
  return (
    <div
      className={classNames(
        'flex flex-wrap gap-4 justify-center',
        { 'flex-col justify-start': direction === 'vertical' },
        className
      )}
    >
      {steps.map((step, i) => {
        return (
          <div
            key={i}
            className={classNames('flex gap-x-4 shrink-0', {
              'flex-col items-start': direction === 'vertical',
              'items-center': direction === 'horizontal',
            })}
          >
            <button onClick={() => onChange(i)}>
              <Step
                stepNumber={i + 1}
                active={i === current}
                completed={current > i}
                title={step.title}
              />
            </button>
            {i !== steps.length - 1 && (
              <div
                className={classNames('shrink-0 bg-white', {
                  'w-[1px] h-8 ml-[18px] mt-4': direction === 'vertical',
                  'h-[1px] w-8': direction === 'horizontal',
                })}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

type StepProps = {
  title: string;
  stepNumber: number;
  active?: boolean;
  completed?: boolean;
};

export function Step({ stepNumber, active, completed, title }: StepProps) {
  return (
    <div className="flex items-center gap-x-4">
      <span
        className={classNames(
          'h-9 w-9 rounded-full',
          'flex items-center justify-center',
          active ? 'bg-green-primary font-bold text-black' : 'bg-black/[.14]'
        )}
      >
        {stepNumber}
      </span>
      <span
        className={classNames('text-xl text-secondary', {
          '!text-green-primary': active,
          '!text-white': completed,
          'font-bold': active || completed,
        })}
      >
        {title}
      </span>
    </div>
  );
}
