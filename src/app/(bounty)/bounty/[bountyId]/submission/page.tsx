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
import pluralize from 'pluralize';
import { useMemo, useState } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiCloudLine,
  RiSearchLine,
} from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import SearchInput from '~/components/SearchInput';
import SortMenu from '~/components/SortMenu';
import { OrderByDirection, Submission, SubmissionStatus } from '~/types';
import useBountySubmissions from '~/utils/hooks/useBountySubmissions';

const sortOptions = [
  {
    label: 'Newest',
    value: 'NEWEST',
  },
  {
    label: 'Status',
    value: 'STATUS',
  },
];

export default function BountySubmissions({
  params,
}: {
  params: { bountyId: string };
}) {
  const { bountyId } = params;
  const router = useRouter();
  const [value, setValue] = useState('');
  const [sortField, setSortField] = useState(sortOptions[0]);
  const [sortDirection, setSortDirection] = useState(OrderByDirection.DESC);

  const { data, isLoading } = useBountySubmissions({
    skip: 0,
    limit: 100,
    jobId: bountyId,
  });

  const { items: submissions, totalCount } = data ?? {};

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
    data: submissions ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={classNames('')}>
      {/* MOBILE/TABLET search input */}
      <div className="relative flex items-center desktop:hidden mb-12">
        <Input
          className="w-full pl-12 font-normal"
          placeholder="Search for a submission"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="absolute pointer-events-none ml-4">
          <RiSearchLine className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="flex items-center desktop:block">
        {/* DESKTOP */}
        <div
          className={classNames(
            'hidden desktop:flex justify-between w-full',
            'mt-0 ml-12 desktop:ml-0'
          )}
        >
          <SearchInput
            className="w-56 inline-block"
            placeholder="Search for a submission..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <SortMenu
            className="ml-auto"
            isLoading={isLoading}
            options={sortOptions}
            value={sortField}
            onChange={(sortField) => setSortField(sortField)}
            sortDirection={sortDirection}
            onChangeSortDirection={(sortDirection) =>
              setSortDirection(sortDirection)
            }
          />
        </div>
        <h4
          className={classNames(
            'font-grifter desktop:hidden',
            isLoading ? 'skeleton' : ''
          )}
        >
          <span className="whitespace-nowrap text-xl">
            {totalCount}{' '}
            <span className="text-green-primary">
              {pluralize('Submission', totalCount)}
            </span>
          </span>
        </h4>
        {/* MOBILE, TABLET */}
        <Button
          className="desktop:hidden flex items-center gap-2 ml-auto !px-4 !py-2 tablet:!px-8 tablet:!py-4"
          onClick={() => {
            // TODO: implement when API is ready
          }}
          isLoading={isLoading}
        >
          <IoOptionsOutline className="h-5 w-5" />
          <span className="tablet:hidden">Filters</span>
          <span className="hidden tablet:inline-block">Filter & Sort</span>
        </Button>
      </div>
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
                'bg-black/[.14] children:py-4',
                isLoading ? '' : 'hover:bg-black/40'
              )}
              onClick={() => {
                if (!isLoading && row.original?.id) {
                  router.push(`/bounty/${row.original.id}`);
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
