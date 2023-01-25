import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import writeCodeSrc from 'public/img/home/write-code.png';
import buildProductsSrc from 'public/img/home/build-products.png';
import PlaceholderButton from './PlaceholderButton';
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
          <h2 className="font-grifter text-3xl mb-4">
            Write code, <span className="text-green-primary">get paid</span>
          </h2>
          <p className="text-secondary">
            No need to apply. Get paid instantly regardless of your time zone or
            language.
          </p>
          <Link href="/bits">
            <Button className="mt-8" variant="primary">
              Earn now
            </Button>
          </Link>
        </div>
        <div className="max-w-md tablet:max-w-none relative col-start-2 mx-auto mt-16 tablet:mt-0">
          <Image src={writeCodeSrc} alt="write-code" />
        </div>
      </div>
      <div
        className={classNames(
          'tablet:flex flex-row-reverse items-center gap-x-20 mt-36 tablet:mt-24'
        )}
      >
        <div className="mb-4 tablet:mb-0">
          <h2 className="font-grifter text-3xl mb-4">
            Launch products <span className="text-green-primary">faster</span>
          </h2>
          <p className="text-secondary">
            No sourcing. No recruiting. Find worldwide talent instantly.
          </p>
          <Link href="/hire">
            <Button className="mt-8" variant="primary">
              Post a Bit
            </Button>
          </Link>
        </div>
        <div className="w-full basis-1/2 lg:basis-3/5 shrink-0 relative mx-auto tablet:mt-0">
          <Image
            // scale image to account for empty space on left side of image
            className="scale-110"
            src={buildProductsSrc}
            alt="build-products"
          />
        </div>
      </div>
    </div>
  );
}
