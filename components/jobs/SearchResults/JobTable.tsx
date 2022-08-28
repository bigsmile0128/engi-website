import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Job } from 'types';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import JobInfo from './JobInfo';
import Activity from './Activity';
import Effort from './Effort';
import Payout from './Payout';
import { useRouter } from 'next/router';

type JobTableProps = {
  className?: string;
  data?: Job[];
  numPages?: number;
  isLoading?: boolean;
};

export default function JobTable({
  className,
  data,
  isLoading,
}: JobTableProps) {
  const router = useRouter();

  // TODO: set search params
  const searchParams = new URLSearchParams();
  const setSearchParams = (...args: any) => {};
  // use 1-based pagination instead of 0-based
  const page = Number(searchParams.get('page')) || 1;

  const columnHelper = createColumnHelper<Job>();
  const columns: ColumnDef<Job>[] = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Job info',
        cell: (props) => {
          const job = props.row.original;
          return <JobInfo title={job.title} isLoading={isLoading} />;
        },
      }),
      columnHelper.accessor('numTests', {
        header: 'Activity',
        cell: (props) => {
          const job = props.row.original;
          return (
            <Activity
              numContributors={job.numContributors}
              numTests={job.numTests}
              testsPassed={job.testsPassed}
              isLoading={isLoading}
            />
          );
        },
      }),
      columnHelper.accessor('timeEstimate', {
        header: 'Effort',
        cell: (props) => {
          const job = props.row.original;
          return (
            <Effort timeEstimate={job.timeEstimate} isLoading={isLoading} />
          );
        },
      }),
      columnHelper.accessor('reward', {
        header: 'Payout',
        cell: (props) => {
          const job = props.row.original;
          return (
            <Payout
              className="shrink-0"
              reward={job.reward}
              isLoading={isLoading}
            />
          );
        },
      }),
    ],
    [columnHelper, isLoading]
  );

  const _data = useMemo<Job[]>(() => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, i) => ({
        id: i.toString(),
        language: 'Python',
        title: 'Placeholder',
        numTests: 10,
        testsPassed: 0,
        timeEstimate: 10,
        reward: 100,
        numContributors: 10,
      }));
    }
    return data ?? [];
  }, [data, isLoading]);

  const table = useReactTable({
    data: _data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onRowClick = useCallback(() => {
    if (isLoading) {
      return;
    }
  }, [isLoading]);

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
                    'text-left text-secondary text-xs',
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
                  router.push(`/jobs/${row.original.id}`);
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
