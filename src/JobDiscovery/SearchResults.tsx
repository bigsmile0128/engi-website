import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import ReactPaginate from 'react-paginate';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';

import JobPreview from './JobPreview';

interface SearchResultsProps {
  className?: string;
  isLoading: boolean;
  results: Record<string, any>[];
  numResults: number;
  error?: Error;
  refresh: () => void;
}

const PAGE_SIZE = 10;

export default function SearchResults({
  className,
  isLoading,
  results,
  numResults,
  error,
  refresh,
}: SearchResultsProps) {
  const [page, setPage] = useState(0);
  // TODO: remove fake paginating when API is ready
  const [isFakeLoading, setIsFakeLoading] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    setPage(0);
  }, [results]);

  const numPages = Math.floor(numResults / PAGE_SIZE);

  return (
    <div
      className={classNames('flex flex-col gap-y-4 scroll-mt-20', className)}
      ref={ref}
    >
      {isLoading && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <JobPreview key={i} isSkeleton />
          ))}
        </>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="font-grifter text-3xl mb-6">Something went wrong...</p>
          <button
            className="flex items-center justify-center text-gray-300 py-3 pl-4 pr-5 border border-gray-300 text-sm font-semibold bg-[#00000022] hover:bg-[#ffffff22] outline-none focus:ring-green-400 focus:ring-2"
            onClick={refresh}
          >
            <IoMdRefresh className="h-5 w-5 mr-2" />
            Try again
          </button>
        </div>
      )}
      {!isLoading && !error && (
        <>
          {results
            ?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
            .map((job) => (
              <JobPreview key={job.id} {...job} isSkeleton={isFakeLoading} />
            ))}
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
            breakLabel={<AiOutlineEllipsis className="h-5 w-5 text-gray-300" />}
            onPageChange={(e) => {
              // scroll to top of results on pagination
              ref.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
              setPage(e.selected);
              setIsFakeLoading(true);
              setTimeout(() => setIsFakeLoading(false), 1500);
            }}
            className="flex items-center self-center mt-2"
            pageClassName=""
            breakClassName="flex items-center justify-center w-8"
            pageLinkClassName="flex items-center justify-center w-8 text-gray-300 hover:text-gray-100"
            activeLinkClassName="!text-green-400 font-bold"
          />
        </>
      )}
    </div>
  );
}
