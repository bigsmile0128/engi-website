import React from 'react';
import classNames from 'classnames';

type StatisticProps = {
  className?: string;
  icon: JSX.Element;
  inline?: boolean;
  isLoading?: boolean;
  title: string | JSX.Element;
  value: string | number | JSX.Element;
};

export default function Statistic({
  className,
  icon,
  inline,
  title,
  value,
  isLoading,
}: StatisticProps) {
  return (
    <div
      className={classNames(
        inline
          ? 'flex gap-2'
          : 'grid grid-cols-[min-content_1fr] gap-x-3 gap-y-1 mt-2',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <div
        className={classNames(
          inline ? '' : 'col-span-1 row-span-1 self-center'
        )}
      >
        {icon}
      </div>
      <div
        className={classNames(
          'font-bold text-xl text-white',
          inline ? '' : 'col-start-2 place-self-start'
        )}
      >
        {value}
      </div>
      <span
        className={classNames(
          'text-secondary',
          inline ? 'ml-auto basis-1/2' : 'col-start-2 row-start-2'
        )}
      >
        {title}
      </span>
    </div>
  );
}
