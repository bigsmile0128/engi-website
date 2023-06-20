import classNames from 'classnames';

import Link from 'next/link';
import LogoAltSvg from 'public/img/home/logo_alt.svg';
import EmailRegistration from '~/components/pages/home/EmailRegistration';
import SocialMedia from './SocialMedia';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <div
      className={classNames(
        'bg-[#070706] flex items-center justify-center pb-16',
        className
      )}
    >
      <div className="w-full">
        <div
          className={classNames(
            'flex items-center flex-col laptop:flex-row gap-16',
            'max-w-page pt-16'
          )}
        >
          <div>
            <p className="font-bold text-xl text-green-primary">
              Subscribe to our newsletter
            </p>
            <p className="font-medium text-xl mt-4">
              A monthly digest of the latest Engi news, articles, and resources.
            </p>
          </div>
          <EmailRegistration />
        </div>
        <div className="shrink-0 h-[1px] bg-white/30 w-full mt-16 mb-24" />
        <div className="max-w-page flex flex-col xl:flex-row gap-x-16">
          <div className="flex flex-col items-center tablet:items-start">
            <span className="flex items-center justify-between mb-4 laptop:mb-4 desktop:mb-16">
              <LogoAltSvg className="h-14 fill-green-primary" />
            </span>
            <p className="text-secondary border-t border-gray-600 py-4 laptop:w-3/4 desktop:w-full">
              Global digital construction is stymied by legacy processes and
              professional barriers. Now in record time, Engi delivers on-demand
              software custom built to your specification
            </p>
          </div>
          <div
            className={classNames(
              'flex flex-col laptop:flex-row flex-wrap',
              'gap-x-16 gap-y-12',
              'mt-8 laptop:mt-12 xl:mt-0',
              'shrink-0 whitespace-nowrap'
            )}
          >
            <div className="flex flex-col gap-y-4 tablet:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">Company</h4>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
            <div className="flex flex-col gap-y-4 tablet:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">
                For Talent
              </h4>
              <Link href="/bits">Find Bounties</Link>
              <Link href="/freelancer">Engi for Freelancers</Link>
            </div>
            <div className="flex flex-col gap-y-4 tablet:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">
                For Businesses
              </h4>
              <Link href="/hire">Post a Bounty</Link>
              <Link href="/business">Engi for Businesses</Link>
            </div>
            <div className="flex flex-col gap-y-4 tablet:gap-y-6">
              <h4 className="text-lg font-bold text-green-primary">
                Learn More Resources
              </h4>
              <Link href="https://links.engi.network/lightpaper">
                Litepaper
              </Link>
              {/*<Link href="/press">Press</Link>*/}
              <Link
                target="_blank"
                href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fmainnet.engi.network%3A9944#/explorer"
              >
                Blockchain
              </Link>
              <Link target="_blank" href="https://links.engi.network/cookbook">
                Documentation
              </Link>
            </div>
          </div>
        </div>
        <div className="shrink-0 h-[1px] bg-white/30 w-full mt-16 mb-8" />
        <div className="max-w-page flex flex-col-reverse tablet:flex-row items-center justify-between gap-12">
          <SocialMedia className="text-4xl tablet:text-2xl" />
        </div>
      </div>
    </div>
  );
}
