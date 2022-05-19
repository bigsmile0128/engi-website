import React from 'react';
import classNames from 'classnames';

import LogoSvg from './logo.svg';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div
      className={classNames(
        'relative flex items-center justify-center',
        className
      )}
    >
      <LogoSvg className="" />
      <div className="absolute px-2 py-1 text-xs font-bold bg-[#00000022] border border-[#ffffff22] rounded-full bottom-0 right-0 translate-x-[90%] translate-y-[70%]">
        beta
      </div>
    </div>
  );
}
