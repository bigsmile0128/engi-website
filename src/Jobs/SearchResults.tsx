import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import ReactPaginate from 'react-paginate';
import { AiOutlineEllipsis } from 'react-icons/ai';

import JobPreview from './JobPreview';

interface SearchResultsProps {
  className?: string;
  isLoading: boolean;
  results: Record<string, any>[];
  numResults: number;
}

const PAGE_SIZE = 10;

export default function SearchResults({
  className,
  isLoading,
  results,
  numResults,
}: SearchResultsProps) {
  const [page, setPage] = useState(0);
  const ref = React.useRef(null);

  useEffect(() => {
    setPage(0);
  }, [results]);

  const numPages = Math.floor(numResults / PAGE_SIZE);
  console.log(numPages);

  return (
    <div
      className={classNames('flex flex-col gap-y-4 scroll-mt-20', className)}
      ref={ref}
    >
      {isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <JobPreview key={i} isSkeleton />
          ))}
        </>
      ) : (
        <>
          {results
            ?.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
            .map((job) => (
              <JobPreview key={job.id} {...job} />
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
