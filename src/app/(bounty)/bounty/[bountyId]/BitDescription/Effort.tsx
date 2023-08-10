import classNames from 'classnames';
import { RiFileZipFill, RiTimeFill } from 'react-icons/ri';
import Statistic from '~/components/Statistic';
import { RepositoryComplexity } from '~/types';

type EffortProps = {
  className?: string;
  complexity?: RepositoryComplexity;
  isLoading?: boolean;
  numTests: number;
};

export default function Effort({
  className,
  complexity,
  isLoading,
  numTests,
}: EffortProps) {
  // half hour per test with minimum of 1 hour per bounty
  const timeEstimate = `${Math.min(1, numTests * 0.5)} hours`;
  // difficulty in range [0, 1] with 10+ tests meaning max difficulty
  const difficulty = Math.min(1, numTests / 10);
  const difficultyLabel =
    difficulty < 0.3 ? 'Easy' : difficulty < 0.6 ? 'Medium' : 'Hard';

  return (
    <div className={classNames('', className)}>
      <h2
        className={classNames(
          'mb-2 font-grifter text-xl inline-block',
          isLoading ? 'skeleton' : ''
        )}
      >
        Effort
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
        <Statistic
          icon={<RiFileZipFill className="text-orange-primary h-5 w-5" />}
          value={complexity?.sLOC ?? 'N/A'}
          title="LOC"
          isLoading={isLoading}
        />
        <div
          className={classNames(
            'grid grid-cols-[min-content_1fr] gap-x-5 gap-y-1 mt-2',
            isLoading ? 'children:skeleton' : ''
          )}
        >
          <div className="col-start-1 font-bold text-xl place-self-start">
            {difficultyLabel}
          </div>
          <span className="col-start-1 row-start-2 text-secondary place-self-start">
            Difficulty
          </span>
          <div
            className={classNames(
              'col-start-2 row-start-1 row-span-2 self-end mb-1.5',
              'relative h-[32px] w-[64px] overflow-hidden'
            )}
          >
            <div
              className={classNames(
                'absolute h-[64px] w-[64px] left-0 right-0 top-0 rounded-full',
                'border-[16px]',
                isLoading
                  ? 'skeleton border-[#00000022] bg-transparent'
                  : 'border-white/30 border-b-green-primary border-l-green-primary'
              )}
              style={{
                // -45deg is the start because of how the arc is created from a square's diagonal
                transform: `rotate(${-45 + difficulty * 180}deg)`,
              }}
            />
          </div>
        </div>
        <Statistic
          icon={<RiTimeFill className="text-green-primary h-5 w-5" />}
          value={timeEstimate}
          title="Time"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
