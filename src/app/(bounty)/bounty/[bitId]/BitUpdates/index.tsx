import React, { useMemo } from 'react';
import classNames from 'classnames';
import IncompleteBanner from '~/components/IncompleteBanner';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';

type BitUpdatesProps = {
  className?: string;
  data?: Bit;
  isLoading?: boolean;
};

type Update = {
  created: string;
  name: string;
  type: string;
};

export default function BitUpdates({
  className,
  data,
  isLoading,
}: BitUpdatesProps) {
  const columnHelper = createColumnHelper<Update>();
  const columns: ColumnDef<Update>[] = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Update',
      }),
      columnHelper.accessor('type', {
        header: 'Type',
      }),
      columnHelper.accessor('created', {
        header: 'Date',
        cell: (props) => {
          const update = props.row.original;
          return dayjs(update.created).fromNow();
        },
      }),
    ],
    [columnHelper]
  );

  const _data = useMemo<Update[]>(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      created: dayjs().subtract(i, 'day').format(),
      name: i.toString(),
      type: 'FUNDING',
    })) as Update[];
  }, []);

  const table = useReactTable({
    data: _data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className={classNames('', className)}>
      <IncompleteBanner />
      <table className="mt-8 border-separate border-spacing-y-3 w-full">
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
                'bg-black/[.14] children:py-4 hover:cursor-pointer',
                isLoading ? '' : 'hover:bg-black/40'
              )}
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
