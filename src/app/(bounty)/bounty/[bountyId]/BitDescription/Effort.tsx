import classNames from 'classnames';
import { RiFileZipFill, RiTimeFill } from 'react-icons/ri';
import Statistic from '~/components/Statistic';

type EffortProps = {
  className?: string;
  isLoading?: boolean;
  timeEstimate?: number;
};

export default function Effort({
  className,
  isLoading,
  timeEstimate,
}: EffortProps) {
  return (
    <div className={classNames('p-6 bg-black/[.14] w-full', className)}>
      <h2
        className={classNames(
          'font-grifter text-xl inline-block',
          isLoading ? 'skeleton' : ''
        )}
      >
        Effort
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-4">
        <Statistic
          icon={<RiFileZipFill className="text-orange-primary h-5 w-5" />}
          // TODO: replace with real data when available
          value="N/A"
          title="Bit size"
          isLoading={isLoading}
        />
        <Statistic
          icon={<RiTimeFill className="text-green-primary h-5 w-5" />}
          // TODO: replace with real data when available
          value="N/A"
          title="Time"
          isLoading={isLoading}
        />
        <div
          className={classNames(
            'grid grid-cols-[min-content_1fr] gap-x-5 gap-y-1 mt-2',
            isLoading ? 'children:skeleton' : ''
          )}
        >
          <div className="col-start-1 font-bold text-xl place-self-start">
            {/* TODO: replace with real data when available */}
            N/A
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
                  : 'border-white/30 border-b-green-primary border-l-green-primary rotate'
              )}
              style={{
                transform: `rotate(${timeEstimate ?? 0 * 3}deg)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
