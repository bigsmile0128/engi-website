import classNames from 'classnames';
import _ from 'lodash';
import Link from 'next/link';
import {
  RiCheckboxCircleLine,
  RiGroupFill,
  RiLineChartFill,
} from 'react-icons/ri';
import Avatar from '~/components/Avatar';
import Statistic from '~/components/Statistic';
import Button from '~/components/global/Button/Button';
import ProgressBar from '~/components/global/ProgressBar/ProgressBar';
import { Bit, Submission } from '~/types';

type ActivityStatsProps = {
  className?: string;
  data: Bit;
  submissions: Submission[];
};

export default function ActivityStats({
  className,
  data,
  submissions,
}: ActivityStatsProps) {
  const averageProgress = data.averageProgress;
  const users = _.uniqBy(
    submissions.map((submission) => submission.userInfo),
    'address'
  );
  return (
    <div className={classNames('', className)}>
      <h2 className="font-grifter text-xl">Activity</h2>
      <div className="flex flex-col mt-4 divide-y divide-white/40">
        <Statistic
          className="py-6 pt-0"
          icon={<RiGroupFill className="text-green-primary h-5 w-5" />}
          value="Active Submissions"
          title={
            <div className="">
              <div className="flex items-center ml-2">
                {users.slice(0, 10).map((user) => (
                  // cap at displaying 10 user icons
                  <div key={user.address} className="-ml-2">
                    <Avatar value={user.address} style="shape" size={32} />
                  </div>
                ))}
              </div>
              {submissions.length > 0 && (
                <Link
                  href={`/bounty/${data.id}/submission`}
                  className="block mt-2"
                >
                  <Button
                    variant="link"
                    className="text-secondary hover:text-green-primary underline"
                  >
                    View all submissions
                  </Button>
                </Link>
              )}
            </div>
          }
        />
        <Statistic
          className="py-6"
          icon={<RiGroupFill className="text-green-primary h-5 w-5" />}
          value="Leader Progress"
          title={<ProgressBar className="w-full" percentage={0} label="N/A" />}
        />
        <Statistic
          className="py-6"
          icon={<RiLineChartFill className="text-green-primary h-5 w-5" />}
          value="Average Progress"
          title={
            <ProgressBar
              className="w-full"
              percentage={
                (averageProgress?.numerator ?? 0) /
                (averageProgress?.denominator ?? 1)
              }
              label={`${averageProgress?.numerator ?? 0}/${
                averageProgress?.denominator ?? 0
              }`}
            />
          }
        />
        <Statistic
          className="py-6"
          icon={<RiCheckboxCircleLine className="text-green-primary h-5 w-5" />}
          value={data?.attemptCount ?? ''}
          title="Total Submissions"
        />
      </div>
    </div>
  );
}
