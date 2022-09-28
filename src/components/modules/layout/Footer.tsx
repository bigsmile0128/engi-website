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
              Accessible and affordable software engineering engagements for
              all. Leverage the Engi network to embolden your technology teams
              or participate and earn cash writing code today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-16 gap-y-12 mt-8 md:mt-16 lg:mt-0 whitespace-nowrap">
            <div className="flex flex-col gap-y-4 sm:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">
                Earn $ENGI
              </h4>
              <Link href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf">
                Search Jobs
              </Link>
              <Link href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf">
                Download Tools
              </Link>
              <Link href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf">
                Documentation
              </Link>
            </div>
            <div className="flex flex-col gap-y-4 sm:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">
                Buy $ENGI
              </h4>
              <Link href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf">
                Get Started
              </Link>
              <Link href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf">
                Post a Job
              </Link>
              <Link href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf">
                Integrate Workflows
              </Link>
            </div>
            <div className="flex flex-col gap-y-4 sm:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">
                For Investors
              </h4>
              <Link href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf">
                Litepaper
              </Link>
              <Link href="/press">Press</Link>
              <Link href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf">{`Team & Governance`}</Link>
            </div>
          </div>
        </div>
        <SocialMedia className="md:hidden lg:flex border-t border-gray-600 justify-end pt-8 mt-24" />
        <p className="text-xs text-gray-600 mt-12 lg:mt-0">
          Engi is building our Beta in public. Numbers and testimonials on this
          early product page are for demonstration purposes.
        </p>
      </div>
    </div>
  );
}
