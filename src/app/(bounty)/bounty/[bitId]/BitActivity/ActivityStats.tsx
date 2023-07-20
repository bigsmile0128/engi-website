import classNames from 'classnames';
import {
  RiCheckboxCircleLine,
  RiGroupFill,
  RiLineChartFill,
} from 'react-icons/ri';
import Statistic from '~/components/Statistic';
import ProgressBar from '~/components/global/ProgressBar/ProgressBar';
import { Bit } from '~/types';

type ActivityStatsProps = {
  className?: string;
  data?: Bit;
  isLoading?: boolean;
};

export default function ActivityStats({
  className,
  isLoading,
  data,
}: ActivityStatsProps) {
  const averageProgress = data?.averageProgress;
  return (
    <div className={classNames('', className)}>
      <h2 className="font-grifter text-xl">Activity</h2>
      <div className="flex flex-col mt-4 divide-y divide-white/40">
        <Statistic
          className="py-6 pt-0"
          icon={<RiGroupFill className="text-green-primary h-5 w-5" />}
          value="Leader Progress"
          title={<ProgressBar className="w-full" percentage={0} label="N/A" />}
          isLoading={isLoading}
        />
        <Statistic
          className="py-6"
          icon={<RiLineChartFill className="text-green-primary h-5 w-5" />}
          value="Average Progress"
          title={
            <ProgressBar
              className="w-full"
              percentage={
                averageProgress?.numerator ??
                0 / (averageProgress?.denominator ?? 1)
              }
              label={`${averageProgress?.numerator ?? 0}/${
                averageProgress?.denominator ?? 0
              }`}
            />
          }
          isLoading={isLoading}
        />
        <Statistic
          className="py-6"
          icon={<RiCheckboxCircleLine className="text-green-primary h-5 w-5" />}
          value={data?.attemptCount ?? ''}
          title="Total Submissions"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
