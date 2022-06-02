import React from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import LogoSvg from 'components/home/img/logo.svg';

type LogoProps = {
  className?: string;
};

export default function Logo({ className = 'h-8 w-8' }: LogoProps) {
  return (
    <div className="relative">
      <LogoSvg className={classNames('', className)} />
      <div className="absolute px-2 py-1 text-xs font-bold bg-[#00000022] border border-[#ffffff22] rounded-full bottom-0 right-0 translate-x-[90%] translate-y-[70%]">
        beta
      </div>
    </div>
  );
}
