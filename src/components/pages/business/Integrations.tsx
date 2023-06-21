import React from 'react';
import classNames from 'classnames';
import Button from '~/components/global/Button/Button';
import integrationsMobileImg from 'public/img/about/business/integrations-mobile.png';
import integrationsTabletImg from 'public/img/about/business/integrations-tablet.png';
import integrationsDesktopImg from 'public/img/about/business/integrations-desktop.png';
import Image from 'next/image';
import Link from 'next/link';

type IntegrationsProps = {
  className?: string;
};

export default function Integrations({ className }: IntegrationsProps) {
  return (
    <div
      className={classNames(
        'flex flex-col gap-12 xl:flex-row xl:gap-16',
        className
      )}
    >
      <div>
        <p className="font-bold text-sm text-green-primary">INTEGRATIONS</p>
        <p className="mt-6 font-grifter text-4xl tablet:text-5xl leading-normal">
          Insert labor economics as low as your stack
        </p>
        <p className="mt-8 xl:mt-12 text-secondary text-lg tablet:text-xl">
          Integrate on-demand engineering into your development cycles using the
          full-stack tools, languages, and frameworks you know and love from
          React and Hardhat to Python and TypeScript to Docker and Github
        </p>
        <Link href={'/integrations'}>
          <Button variant="primary" className="mt-12">
            See all integrations
          </Button>
        </Link>
      </div>
      <div className="w-full flex justify-center tablet:hidden">
        <Image src={integrationsMobileImg} alt="integrations" />
      </div>
      <div className="w-full justify-center hidden tablet:flex xl:hidden">
        <Image src={integrationsTabletImg} alt="integrations" />
      </div>
      <div className="w-full justify-center items-center hidden xl:flex">
        <Image src={integrationsDesktopImg} alt="integrations" />
      </div>
    </div>
  );
}
