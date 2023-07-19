import classNames from 'classnames';
import Link from 'next/link';
import { useMemo } from 'react';
import EngiAmount from '~/components/EngiAmount';
import { Bit } from '~/types';
import { mockBit } from '~/types/mock';
import { MobileBitInfo } from './BitInfo';
import BitStatus from './BitStatus';

type MobileBitTableProps = {
  className?: string;
  data?: Bit[];
  isLoading?: boolean;
};

export default function MobileBitTable({
  className,
  data,
  isLoading,
}: MobileBitTableProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const _data = useMemo<Bit[]>(() => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, i) => ({
        ...mockBit,
        id: i.toString(),
      }));
    }
    return data ?? [];
  }, [data, isLoading]);

  return (
    <div className={classNames('w-full flex flex-col gap-y-4', className)}>
      {_data.map((bit) => (
        <Link
          key={bit.id}
          href={isLoading ? '' : `/bounty/${bit.id}`}
          className={classNames(
            'p-4',
            'bg-black/[.14]',
            isLoading ? '' : 'hover:bg-black/40'
          )}
        >
          <MobileBitInfo
            isLoading={isLoading}
            name={bit.name}
            createdOn={bit?.createdOn?.dateTime}
          />
          <div className="flex items-center justify-between gap-x-2 mt-4">
            <BitStatus isLoading={isLoading} status={bit?.status} />
            <EngiAmount
              className="ml-8"
              isLoading={isLoading}
              value={bit.funding}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
