import { SiPython } from '@react-icons/all-files/si/SiPython';
import classNames from 'classnames';
import dayjs from 'dayjs';
import TechnologyIcon from '~/components/TechnologyIcon';
import '~/utils/datetime/dayjs-extend';

type BitInfoProps = {
  className?: string;
  createdOn?: string;
  isLoading?: boolean;
  name?: string;
  technologies?: string[];
};

export default function BitInfo({
  className,
  name,
  createdOn,
  isLoading,
  technologies,
}: BitInfoProps) {
  return (
    <div
      className={classNames(
        'flex flex-col gap-y-1 items-start',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <div className="flex items-center gap-x-1">
        {technologies?.map?.((technology) => (
          <TechnologyIcon
            key={technology}
            className={classNames(
              'h-7 w-7 shrink-0 text-green-primary rounded-full p-1.5 bg-[#050505]/[.24]',
              {
                invisible: isLoading,
              }
            )}
            value={technology}
          />
        ))}
        <span className="ml-2 text-xs text-white/80">
          Created {dayjs(createdOn).fromNow()}
        </span>
      </div>
      <span
        className={classNames('font-bold text-gray-200 w-48 xl:w-80 truncate')}
      >
        {name ?? 'N/A'}
      </span>
    </div>
  );
}

export function MobileBitInfo({
  className,
  name,
  createdOn,
  isLoading,
}: BitInfoProps) {
  return (
    <div className={classNames('flex items-center gap-x-4', className)}>
      <SiPython
        className={classNames(
          'h-10 w-10 shrink-0 text-green-primary rounded-full p-2.5 bg-[#EFEFEF]/[.13]',
          {
            'invisible skeleton': isLoading,
          }
        )}
      />
      <div
        className={classNames(
          'flex flex-col gap-y-0.5 overflow-hidden',
          isLoading ? 'children:skeleton' : ''
        )}
      >
        <span className={classNames('font-bold truncate')}>
          {name ?? 'N/A'}
        </span>
        <span className="text-xs text-white/80">
          Created {dayjs(createdOn).fromNow()}
        </span>
      </div>
    </div>
  );
}
