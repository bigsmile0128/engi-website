import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Job, TestResult } from 'types';
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
import EngiAmount from 'components/EngiAmount';
import TimeEstimate from 'components/TimeEstimate';
import JobStatus from './JobStatus';
import Tag from 'components/Tag';

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
      columnHelper.accessor('name', {
        header: 'Job info',
        cell: (props) => {
          const job = props.row.original;
          return (
            <JobInfo
              isLoading={isLoading}
              name={job?.name}
              createdOn={job?.createdOn?.dateTime}
            />
          );
        },
      }),
      columnHelper.accessor('status', {
        header: 'Job Status',
        cell: (props) => {
          const job = props.row.original;
          return <JobStatus isLoading={isLoading} status={job?.status} />;
        },
      }),
      // columnHelper.accessor('tests', {
      //   header: 'Activity',
      //   cell: (props) => {
      //     const job = props.row.original;
      //     return (
      //       <Activity
      //         numContributors={job.attemptCount}
      //         numTests={job.tests?.length}
      //         testsPassed={
      //           job.tests?.filter((test) => test.result === TestResult.PASSED)
      //             .length
      //         }
      //         isLoading={isLoading}
      //       />
      //     );
      //   },
      // }),
      // TODO: update with effort once available in job schema
      columnHelper.accessor('attemptCount', {
        header: 'Difficulty',
        cell: (props) => {
          const job = props.row.original;
          return <Tag className="py-1">Easy</Tag>;
        },
      }),
      columnHelper.accessor('funding', {
        header: 'Funding',
        cell: (props) => {
          const job = props.row.original;
          return (
            <EngiAmount
              className="shrink-0"
              value={job.funding}
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
