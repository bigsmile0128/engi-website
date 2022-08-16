import React from 'react';
import classNames from 'classnames';
import Statistic from 'components/Statistic';
import { RiGroupFill, RiLineChartFill } from 'react-icons/ri';
import ProgressBar from 'components/ProgressBar';

type ActivityStatsProps = {
  className?: string;
  isLoading?: boolean;
};

export default function ActivityStats({
  className,
  isLoading,
}: ActivityStatsProps) {
  return (
    <div className={classNames('', className)}>
      <h2 className="font-grifter text-xl">Activity</h2>
      <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-4">
        <Statistic
          className="col-span-2"
          icon={<RiGroupFill className="text-green-primary h-5 w-5" />}
          value="Leader Progress"
          title={
            <ProgressBar className="w-full" percentage={0.5} label="5/10" />
          }
          isLoading={isLoading}
        />
        <Statistic
          className="col-span-2"
          icon={<RiLineChartFill className="text-green-primary h-5 w-5" />}
          value="Average Progress"
          title={
            <ProgressBar className="w-full" percentage={0.8} label="8/10" />
          }
          isLoading={isLoading}
        />
        <Statistic
          className="col-span-1"
          icon={<RiGroupFill className="text-green-primary h-5 w-5" />}
          value="200"
          title="Total Contributors"
          isLoading={isLoading}
        />
        <Statistic
          className="col-span-1"
          icon={<RiLineChartFill className="text-green-primary h-5 w-5" />}
          value="200"
          title="Total Submissions"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
