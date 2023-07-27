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
import { useMemo, useState } from 'react';
import { IoOptionsOutline } from 'react-icons/io5';
import { RiCheckboxCircleLine, RiSearchLine } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import SearchInput from '~/components/SearchInput';
import SortMenu from '~/components/SortMenu';
import { OrderByDirection } from '~/types';

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

// TODO: replace when API is ready
type Submission = {
  id: string;
  status: string;
  wallet: string;
};

const submissions: Submission[] = [
  {
    id: '100',
    status: 'GOOD',
    wallet: '5HKmhgssTaohnXy2hxn8x5i98a21LG8muV4e3hTAcETjPgvf',
  },
  {
    id: '101',
    status: 'GOOD',
    wallet: '5HKmhgssTaohnXy2hxn8x5i98a21LG8muV4e3hTAcETjPgvg',
  },
  {
    id: '102',
    status: 'GOOD',
    wallet: '5HKmhgssTaohnXy2hxn8x5i98a21LG8muV4e3hTAcETjPgvh',
  },
];

export default function BitSubmissions() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [sortField, setSortField] = useState(sortOptions[0]);
  const [sortDirection, setSortDirection] = useState(OrderByDirection.DESC);
  // TODO: fetch submissions when API is ready
  const isLoading = false;

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
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: submissions,
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
            3 <span className="text-green-primary">Submissions</span>
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
