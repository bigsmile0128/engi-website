import React from 'react';
import classNames from 'classnames';

type StatisticProps = {
  className?: string;
  icon: JSX.Element;
  isLoading?: boolean;
  title: string | JSX.Element;
  value: string | number | JSX.Element;
};

export default function Statistic({
  className,
  icon,
  title,
  value,
  isLoading,
}: StatisticProps) {
  return (
    <div
      className={classNames(
        'grid grid-cols-[min-content_1fr] gap-x-3 gap-y-1 mt-2',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <div className="col-span-1 row-span-1 self-center">{icon}</div>
      <div className="col-start-2 place-self-start font-bold text-xl text-white">
        {value}
      </div>
      <span className="col-start-2 row-start-2 text-secondary">{title}</span>
    </div>
  );
}
