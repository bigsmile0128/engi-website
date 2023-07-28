'use client';

import { ChevronRightIcon } from '@heroicons/react/outline';
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
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { Submission } from '~/types';

type SubmissionTableProps = {
  bountyId: string;
  className?: string;
  submissions: Submission[];
};

export default function SubmissionTable({
  bountyId,
  className,
  submissions,
}: SubmissionTableProps) {
  const router = useRouter();

  const columnHelper = createColumnHelper<Submission>();

  const columns: ColumnDef<Submission>[] = useMemo(
    () => [
      columnHelper.accessor('wallet', {
        header: 'Submission Author',
        cell: (props) => {
          const submission = props.row.original;
          return (
            <p className="font-bold truncate max-w-[180px] tablet:max-w-[240px]">
              {submission.wallet}
            </p>
          );
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: () => {
          return (
            <RiCheckboxCircleLine className="text-green-primary h-6 w-6" />
          );
        },
      }),
      columnHelper.accessor('id', {
        header: '',
        cell: () => <ChevronRightIcon className="h-5 w-5" />,
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table
      className={classNames(
        'border-separate border-spacing-y-3 w-full',
        className
      )}
    >
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
              'bg-black/[.14] children:py-4 hover:bg-black/40'
            )}
            onClick={() => {
              if (row.original?.id) {
                router.push(
                  `/bounty/${bountyId}/submission/${row.original.id}`
                );
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
  );
}
