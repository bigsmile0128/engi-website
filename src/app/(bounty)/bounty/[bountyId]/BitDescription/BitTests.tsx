'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import classNames from 'classnames';
import { Roboto_Mono } from 'next/font/google';
import { Fragment, useMemo } from 'react';
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiPauseCircleLine,
} from 'react-icons/ri';
import { Test } from '~/types';

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
});

type BitTestsProps = {
  className?: string;
  data: Test[];
  defaultOpen?: boolean;
};

export default function BitTests({
  className,
  data,
  defaultOpen,
}: BitTestsProps) {
  const columnHelper = createColumnHelper<Test>();
  const columns: ColumnDef<Test>[] = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Name',
      }),
      columnHelper.accessor('result', {
        header: 'Status',
        cell: ({ getValue }) =>
          getValue() === 'PASSED' ? (
            <RiCheckboxCircleLine className="h-6 w-auto text-green-primary" />
          ) : getValue() === 'FAILED' ? (
            <RiCloseCircleLine className="h-6 w-auto text-red-primary" />
          ) : (
            <RiPauseCircleLine className="h-6 w-auto text-secondary" />
          ),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    initialState: {
      expanded: true,
    },
  });

  return (
    <table className="mt-8 w-full">
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
                colSpan={header.colSpan}
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
        {/* empty row to act as divider */}
        <tr className="h-4"></tr>
        {table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <tr
              className="bg-black/[.14] children:py-4 hover:cursor-pointer"
              onClick={row.getToggleExpandedHandler()}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {row.getIsExpanded() && (
              <tr>
                {/* 2nd row is a custom 1 cell row */}
                <td colSpan={row.getVisibleCells().length}>
                  <Transition
                    show
                    className="transition-all duration-500 overflow-hidden"
                    enterFrom="transform opacity-0 max-h-0"
                    enterTo="transform opacity-100 max-h-96"
                    leaveFrom="transform opacity-100 max-h-96"
                    leaveTo="transform opacity-0 max-h-0"
                  >
                    <div>
                      {row.original.failedResultMessage && (
                        <div
                          className="flex"
                          style={{
                            background:
                              'linear-gradient(131deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 70%, rgba(101, 254, 183, 0.1) 100%)',
                          }}
                        >
                          <div className="basis-10 shrink-0 bg-[#EBEBEB]/[.14] opacity-80 backdrop-blur-[2px]" />
                          <div
                            className={classNames(
                              'block text-sm font-medium px-8 py-6',
                              robotoMono.className
                            )}
                          >
                            {row.original.failedResultMessage}
                          </div>
                        </div>
                      )}
                      <div className="flex h-[5px] bg-orange-primary"></div>
                    </div>
                  </Transition>
                </td>
              </tr>
            )}
            {/* empty row to act as divider */}
            <tr className="h-4"></tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
