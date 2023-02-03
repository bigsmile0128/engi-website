import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import writeCodeSrc from 'public/img/home/write-code.png';
import buildProductsSrc from 'public/img/home/build-products.png';
import Button from '~/components/global/Button/Button';
import Link from 'next/link';

interface AlternatingFeaturesProps {
  className?: string;
}

export default function AlternatingFeatures({
  className,
}: AlternatingFeaturesProps) {
  return (
    <div className={classNames('', className)}>
      <div className="tablet:grid grid-cols-2 grid-flow-row-dense gap-x-12 items-center">
        <div className="mb-12 tablet:mb-0 col-start-1">
          <h2 className="capitalize font-grifter text-3xl mb-4">
            Write code, <span className="text-green-primary">get paid</span>
          </h2>
          <p className="text-secondary">
            No commutes, meetings, or interviews.{' '}
            <span className="font-semibold">
              Earn
              <br />
              instantly
            </span>{' '}
            building your favorite projects
          </p>
          <Link href="/bits">
            <Button className="capitalize mt-8" variant="primary">
              Earn Now
            </Button>
          </Link>
        </div>
        <div className="max-w-md tablet:max-w-none relative col-start-2 mx-auto mt-16 tablet:mt-0">
          <Image src={writeCodeSrc} alt="write-code" />
        </div>
      </div>
      <div
        className={classNames(
          'tablet:flex flex-row-reverse items-center gap-x-16 mt-36 tablet:mt-24'
        )}
      >
        <div className="mb-4 tablet:mb-0">
          <h2 className="capitalize font-grifter text-3xl mb-4">
            Developers <span className="text-green-primary">On-Demand</span>
          </h2>
          <p className="text-secondary">
            <span className="font-semibold">Hiring is legacy</span>. Simply
            upload your products&apos; technical requirements to unlock endless
            talent
          </p>
          <Link href="/hire">
            <Button className="mt-8" variant="primary">
              Post a Bit
            </Button>
          </Link>
        </div>
        <div className="w-full basis-1/2 lg:basis-3/5 shrink-0 relative mx-auto tablet:mt-0">
          <Image src={buildProductsSrc} alt="build-products" />
        </div>
      </div>
    </div>
  );
}
