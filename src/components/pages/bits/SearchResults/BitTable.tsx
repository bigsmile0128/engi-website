import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import EngiAmount from '~/components/EngiAmount';
import { Bit } from '~/types';
import { mockBit } from '~/types/mock';
import BitInfo from './BitInfo';
import BitStatus from './BitStatus';

type BitTableProps = {
  className?: string;
  data?: Bit[];
  isLoading?: boolean;
  numPages?: number;
};

export default function BitTable({
  className,
  data,
  isLoading,
}: BitTableProps) {
  const router = useRouter();

  const columnHelper = createColumnHelper<Bit>();
  const columns: ColumnDef<Bit>[] = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Bit info',
        cell: (props) => {
          const bit = props.row.original;
          return (
            <BitInfo
              isLoading={isLoading}
              name={bit?.name}
              createdOn={bit?.createdOn?.dateTime}
              technologies={bit?.technologies}
            />
          );
        },
      }),
      columnHelper.accessor('status', {
        header: 'Bit Status',
        cell: (props) => {
          const bit = props.row.original;
          return <BitStatus isLoading={isLoading} status={bit?.status} />;
        },
      }),
      // columnHelper.accessor('tests', {
      //   header: 'Activity',
      //   cell: (props) => {
      //     const bit = props.row.original;
      //     return (
      //       <Activity
      //         numContributors={bit.attemptCount}
      //         numTests={bit.tests?.length}
      //         testsPassed={
      //           bit.tests?.filter((test) => test.result === TestResult.PASSED)
      //             .length
      //         }
      //         isLoading={isLoading}
      //       />
      //     );
      //   },
      // }),
      columnHelper.accessor('funding', {
        header: 'Funding',
        cell: (props) => {
          const bit = props.row.original;
          return (
            <EngiAmount
              className="shrink-0"
              value={bit.funding}
              isLoading={isLoading}
            />
          );
        },
      }),
    ],
    [columnHelper, isLoading]
  );

  const _data = useMemo<Bit[]>(() => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, i) => ({
        ...mockBit,
        id: i.toString(),
      })) as Bit[];
    }
    return data ?? [];
  }, [data, isLoading]);

  const table = useReactTable({
    data: _data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={classNames('w-full', className)}>
      <table className="border-separate border-spacing-y-3 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={classNames(
                    'text-left text-secondary text-xs font-medium uppercase',
                    'pb-2 border-b border-white/30',
                    'px-4'
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={classNames(
                'bg-black/[.14] children:py-4',
                isLoading ? '' : 'hover:bg-black/40'
              )}
              onClick={() => {
                if (!isLoading && row.original?.id) {
                  router.push(`/bits/${row.original.id}`);
                }
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
