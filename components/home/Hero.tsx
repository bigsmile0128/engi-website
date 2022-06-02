import React from 'react';
import classNames from 'classnames';

import EmailRegistration from './EmailRegistration';
import {
  SiJava,
  SiJavascript,
  SiPython,
  SiReact,
  SiRust,
} from 'react-icons/si';
import HeroTextSvg from './img/hero-text.svg';
import HeroTextCenteredSvg from './img/hero-text-centered.svg';

interface HeroProps {
  className?: string;
}

export default function Hero({ className }: HeroProps) {
  return (
    <div className={classNames('flex flex-col items-start', className)}>
      <div className="w-full max-w-5xl mt-20 mb-8">
        <HeroTextSvg className="hidden lg:block w-full" />
        <HeroTextCenteredSvg className="block lg:hidden w-full" />
      </div>
      <div className="w-full flex flex-col items-center text-center lg:text-left lg:items-start xl:flex-row xl:justify-start xl:gap-x-24">
        <div className="">
          <p className="leading-8 inline xs:block">
            <span className="text-[#59746A] bg-emerald-300 shadow-[0_0_0_2px_rgb(110,231,183)]">
              Engi
            </span>{' '}
            is a gig economy for coders built on the blockchain.
          </p>
          <p className="leading-8 inline xs:block ml-1 xs:ml-0">
            No need to apply. Write code, get paid instantly.
          </p>
          <EmailRegistration className="w-full max-w-md mt-12" />
        </div>
        <div className="flex items-center gap-x-6 sm:gap-x-8 mt-24 xs:mt-12 xl:mt-0">
          <SiRust className="text-gray-300" size={36} />
          <SiPython className="text-gray-300" size={36} />
          <SiJavascript className="text-gray-300" size={36} />
          <SiReact className="text-gray-300" size={36} />
          <SiJava className="text-gray-300 hidden xs:block" size={36} />
          <div className="flex flex-col text-sm text-gray-200">
            <span>+ more</span>
            <span>languages</span>
          </div>
        </div>
      </div>
    </div>
  );
}
