'use client';

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
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiCloudLine,
} from 'react-icons/ri';
import { Submission, SubmissionStatus } from '~/types';

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
      columnHelper.accessor('userInfo.address', {
        header: 'Submission Author',
        cell: (props) => {
          const submission = props.row.original;
          return (
            <p className="font-bold truncate max-w-[180px] tablet:max-w-[240px]">
              {submission.userInfo.display ?? submission.userInfo.address}
            </p>
          );
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (props) => {
          const submission = props.row.original;

          switch (submission.status) {
            case SubmissionStatus.ATTEMPTED_ON_CHAIN:
              return <RiCloseCircleLine className="text-red-primary h-6 w-6" />;
            case SubmissionStatus.ENGINE_ATTEMPTING:
              return <RiCloudLine className="text-orange-primary h-6 w-6" />;
            case SubmissionStatus.SOLVED_ON_CHAIN:
              return (
                <RiCheckboxCircleLine className="text-green-primary h-6 w-6" />
              );
            default:
              return null;
          }
        },
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
        'mt-8 border-separate border-spacing-y-3 w-full',
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
              'bg-black/[.14] children:py-4',
              'hover:bg-black/40'
            )}
            onClick={() => {
              if (row.original?.attemptId) {
                router.push(
                  `/bounty/${bountyId}/submission/${row.original.attemptId}`
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
