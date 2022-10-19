import React from 'react';
import classNames from 'classnames';
import { IoMdRefresh } from '@react-icons/all-files/io/IoMdRefresh';

import { Job } from '~/types';
import JobTable from './JobTable';
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { AiOutlineEllipsis } from '@react-icons/all-files/ai/AiOutlineEllipsis';
import MobileJobTable from './MobileJobTable';
import { RiFileSearchLine } from 'react-icons/ri';

interface SearchResultsProps {
  className?: string;
  isError: boolean;
  isLoading: boolean;
  numPages: number;
  refresh: () => void;
  results: Job[];
}

export default function SearchResults({
  className,
  isLoading,
  results,
  numPages,
  isError,
  refresh,
}: SearchResultsProps) {
  const searchParams = new URLSearchParams();
  const setSearchParams = (...args: any) => {};
  // use 1-based pagination instead of 0-based
  const page = Number(searchParams.get('page')) || 0;

  return (
    <div
      className={classNames('flex flex-col gap-y-4 scroll-mt-20', className)}
    >
      {isLoading && (
        <>
          <JobTable className="hidden sm:block" isLoading />
          <MobileJobTable className="sm:hidden" isLoading />
        </>
      )}
      {isError && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="font-grifter text-3xl mb-6">Something went wrong...</p>
          <button
            className="flex items-center justify-center text-gray-300 py-3 pl-4 pr-5 border border-gray-300 text-sm font-semibold bg-[#00000022] hover:bg-[#ffffff22] outline-none focus-visible:ring-green-400 focus-visible:ring-2"
            onClick={refresh}
          >
            <IoMdRefresh className="h-5 w-5 mr-2" />
            Try again
          </button>
        </div>
      )}
      {!isLoading && !isError && (
        <>
          <JobTable
            className="hidden sm:block"
            data={results}
            numPages={numPages}
          />
          <MobileJobTable className="sm:hidden" data={results} />
          {results.length === 0 ? (
            <div
              className={classNames(
                'flex flex-col items-center justify-center gap-8 mb-8 py-16 lg:py-24',
                'bg-black/[.14]',
                'text-3xl font-grifter'
              )}
            >
              <RiFileSearchLine className="h-16 w-16" />
              <span>No jobs found</span>
            </div>
          ) : (
            <ReactPaginate
              pageCount={numPages}
              previousLabel={
                <ChevronLeftIcon
                  className="h-5 w-5 text-gray-300 hover:text-gray-100"
                  aria-hidden="true"
                />
              }
              nextLabel={
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-300 hover:text-gray-100"
                  aria-hidden="true"
                />
              }
              breakLabel={
                <AiOutlineEllipsis className="h-5 w-5 text-gray-300" />
              }
              onPageChange={(e) => {
                const newSearchParams = Object.fromEntries(searchParams);
                if (e.selected === 0) {
                  delete newSearchParams.page;
                }
                setSearchParams({
                  ...Object.fromEntries(searchParams),
                  page: (e.selected + 1).toString(),
                });
              }}
              className="flex items-center self-center mt-8 pb-8"
              pageClassName=""
              breakClassName="flex items-center justify-center w-8"
              pageLinkClassName="flex items-center justify-center w-8 text-gray-300 hover:text-gray-100"
              activeLinkClassName="!text-green-400 font-bold"
              // library uses 0-based pagination, but we use 1-based for consistency with URL
              forcePage={page - 1}
            />
          )}
        </>
      )}
    </div>
  );
}
