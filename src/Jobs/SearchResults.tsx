import React from 'react';
import classNames from 'classnames';

interface SearchResultsProps {
  className?: string;
}

export default function SearchResults({ className }: SearchResultsProps) {
  return <div className={classNames('', className)}>Search Results</div>;
}
