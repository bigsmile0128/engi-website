import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import cubes from './img/cubes.png';
import ipad from './img/ipad.png';
import iphone from './img/iphone.png';
import blocks from './img/blocks.png';

interface AlternatingFeaturesProps {
  className?: string;
}

export default function AlternatingFeatures({
  className,
}: AlternatingFeaturesProps) {
  return (
    <div className={classNames('', className)}>
      <div className="md:grid grid-cols-2 grid-flow-row-dense gap-24 items-center mx-6 md:mx-0">
        <div className="mb-12 md:mb-0">
          <h2 className="font-grifter text-3xl mb-4">Figma Plugins</h2>
          <p className="text-gray-400">
            Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate
            bar gummies tiramisu ice cream liquorice chocolate cake.
          </p>
        </div>
        <div className="max-w-md md:max-w-none mx-auto">
          <Image
            className="h-3/4 w-3/4 mx-auto"
            src={cubes}
            alt="figma plugins"
          />
        </div>
      </div>
      <div className="md:grid grid-cols-2 grid-flow-row-dense gap-24 items-center mx-6 md:mx-0 mt-48">
        <div className="mb-12 md:mb-0 col-start-2">
          <h2 className="font-grifter text-3xl mb-4">Website</h2>
          <p className="text-gray-400">
            Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate
            bar gummies tiramisu ice cream liquorice chocolate cake.
          </p>
        </div>
        <div className="max-w-md md:max-w-none mx-auto relative col-start-1">
          <Image src={ipad} alt="ipad website" />
        </div>
      </div>
      <div className="md:grid grid-cols-2 grid-flow-row-dense gap-24 items-center mx-6 md:mx-0 mt-48">
        <div className="mb-12 md:mb-0">
          <h2 className="font-grifter text-3xl mb-4">
            Clients &amp; Integrations
          </h2>
          <p className="text-gray-400">
            Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate
            bar gummies tiramisu ice cream liquorice chocolate cake.
          </p>
        </div>
        <div className="max-w-md md:max-w-none mx-auto">
          <Image src={blocks} alt="clients and integrations" />
        </div>
      </div>
    </div>
  );
}
