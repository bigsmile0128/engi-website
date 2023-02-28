import React from 'react';
import classNames from 'classnames';

import LogoAltSvg from 'public/img/home/logo_alt.svg';
import SocialMedia from './SocialMedia';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <div
      className={classNames(
        'bg-[#070706] flex items-center justify-center py-16',
        className
      )}
    >
      <div className="max-w-page">
        <div className="flex flex-col md:flex-col lg:flex-row gap-x-16">
          <div className="flex flex-col">
            <span className="flex items-center justify-between mb-4 lg:mb-16">
              <LogoAltSvg className="h-10 fill-green-primary" />
              <SocialMedia className="hidden md:flex lg:hidden" />
            </span>
            <p className="border-t border-gray-600 py-4 md:w-3/4 lg:w-full">
              Global digital construction is stymied by legacy processes and
              professional barriers. Now in record time, Engi delivers on-demand
              software custom built to your specification
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-16 gap-y-12 mt-8 md:mt-16 lg:mt-0 whitespace-nowrap">
            <div className="flex flex-col gap-y-4 sm:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">
                Earn $ENGI
              </h4>
              <Link href="/bits">Search Bits</Link>
              <Link href="https://engi-network.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10">
                Documentation
              </Link>
            </div>
            <div className="flex flex-col gap-y-4 sm:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">Buy Code</h4>
              <Link href="/signup">Get Started</Link>
              <Link href="/hire">Post a Bit</Link>
            </div>
            <div className="flex flex-col gap-y-4 sm:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">
                Learn More
              </h4>
              <Link href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf">
                Litepaper
              </Link>
              <Link href="/about">{'Team & Governance'}</Link>
            </div>
          </div>
        </div>
        <SocialMedia className="md:hidden lg:flex border-t border-gray-600 justify-end pt-8 mt-24" />
      </div>
    </div>
  );
}
