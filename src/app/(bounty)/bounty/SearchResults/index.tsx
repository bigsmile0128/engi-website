import { IoMdRefresh } from '@react-icons/all-files/io/IoMdRefresh';
import classNames from 'classnames';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { AiOutlineEllipsis } from '@react-icons/all-files/ai/AiOutlineEllipsis';
import { SiDiscord } from 'react-icons/si';
import ReactPaginate from 'react-paginate';
import Button from '~/components/global/Button/Button';
import { Bit } from '~/types';
import BitTable from './BitTable';
import MobileBitTable from './MobileBitTable';

interface SearchResultsProps {
  className?: string;
  error?: any;
  isError: boolean;
  isLoading: boolean;
  numPages: number;
  onChange: (searchParams: URLSearchParams) => void;
  refresh: () => void;
  results: Bit[];
  searchParams: URLSearchParams;
}

export default function SearchResults({
  className,
  isLoading,
  results,
  numPages,
  isError,
  error,
  refresh,
  onChange,
  searchParams,
}: SearchResultsProps) {
  const page = searchParams.get('page');
  // use 1-based pagination instead of 0-based
  const pageNum = Number(page) || 1;

  return (
    <div
      className={classNames('flex flex-col gap-y-4 scroll-mt-20', className)}
    >
      {isLoading && (
        <>
          <BitTable className="hidden sm:block" isLoading />
          <MobileBitTable className="sm:hidden" isLoading />
        </>
      )}
      {isError && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="font-grifter text-3xl mb-6">Something went wrong...</p>
          {error?.message && (
            <code className="p-4 mb-6 bg-black/[.14] text-red-400">
              {error?.message}
            </code>
          )}
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
          {results.length === 0 ? (
            <div
              className={classNames(
                'flex flex-col items-center justify-center gap-4 mt-16'
              )}
            >
              <p className="font-bold text-2xl">Bounties are coming soon!</p>
              <p className="text-xl">
                In the meantime, join us on Discord to hear about our updates.
              </p>
              <a
                href="https://discord.gg/S67BnJWN27"
                target="blank"
                rel="noreferrer"
              >
                <Button className="flex items-center gap-2 mt-2">
                  <SiDiscord />
                  Join us on Discord
                </Button>
              </a>
            </div>
          ) : (
            <>
              <BitTable
                className="hidden sm:block"
                data={results}
                numPages={numPages}
              />
              <MobileBitTable className="sm:hidden" data={results} />
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
                  const newSearchParams = new URLSearchParams(searchParams);
                  // 0-based pagination
                  const newPage = e.selected + 1;
                  if (newPage === 1) {
                    newSearchParams.delete('page');
                  } else {
                    newSearchParams.set('page', newPage.toString());
                  }
                  onChange(newSearchParams);
                }}
                className="flex items-center self-center mt-8 pb-8"
                pageClassName=""
                breakClassName="flex items-center justify-center w-8"
                pageLinkClassName="flex items-center justify-center w-8 text-gray-300 hover:text-gray-100"
                activeLinkClassName="!text-green-400 font-bold"
                // library uses 0-based pagination, but we use 1-based for consistency with URL
                forcePage={pageNum - 1}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
