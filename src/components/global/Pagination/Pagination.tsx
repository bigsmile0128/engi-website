import React from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { AiOutlineEllipsis } from 'react-icons/ai';

export default function Pagination(props) {
  return (
    <ReactPaginate
      previousLabel={
        <ChevronLeftIcon
          className="h-5 w-5 text-white/70 hover:text-white"
          aria-hidden="true"
        />
      }
      nextLabel={
        <ChevronRightIcon
          className="h-5 w-5 text-white/70 hover:text-white"
          aria-hidden="true"
        />
      }
      breakLabel={<AiOutlineEllipsis className="h-5 w-5 text-white/70" />}
      className="flex items-center self-center mt-8 pb-8"
      pageClassName=""
      breakClassName="flex items-center justify-center w-8"
      pageLinkClassName="hidden"
      activeLinkClassName="!text-green-primary font-bold mb-[1px]"
      {...props}
    />
  );
}
