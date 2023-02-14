import React from 'react';
import classNames from 'classnames';

import ChevronRightSvg from 'public/img/home/chevron-right.svg';

type ChevronRightProps = {
  className?: string;
};

export default function ChevronRight({
  className = 'h-8 w-8',
}: ChevronRightProps) {
  return <ChevronRightSvg className={classNames('', className)} />;
}
