import React from 'react';
import classNames from 'classnames';

import cubes from '~/img/cubes.png';
import ipad from '~/img/ipad.png';
import iphone from '~/img/iphone.png';
import blocks from '~/img/blocks.png';

interface AlternatingFeaturesProps {
  className?: string;
}

export default function AlternatingFeatures({
  className,
}: AlternatingFeaturesProps) {
  return (
    <div className={classNames('', className)}>
      <div className="mx-6 grid-flow-row-dense grid-cols-2 items-center gap-24 md:mx-0 md:grid">
        <div className="mb-12 md:mb-0">
          <h2 className="mb-4 font-grifter text-3xl">Figma Plugins</h2>
          <p className="text-gray-400">
            Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate
            bar gummies tiramisu ice cream liquorice chocolate cake.
          </p>
        </div>
        <div className="mx-auto max-w-md md:max-w-none">
          <img
            className="mx-auto h-3/4 w-3/4"
            src={cubes}
            alt="figma plugins"
          />
        </div>
      </div>
      <div className="mx-6 mt-48 grid-flow-row-dense grid-cols-2 items-center gap-24 md:mx-0 md:grid">
        <div className="col-start-2 mb-12 md:mb-0">
          <h2 className="mb-4 font-grifter text-3xl">Website</h2>
          <p className="text-gray-400">
            Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate
            bar gummies tiramisu ice cream liquorice chocolate cake.
          </p>
        </div>
        <div className="relative col-start-1 mx-auto max-w-md md:max-w-none">
          <img src={ipad} alt="ipad website" />
          <div className="h-50 w-50 absolute -bottom-10 -left-20">
            <img className="h-60 w-auto" src={iphone} alt="iphone website" />
          </div>
        </div>
      </div>
      <div className="mx-6 mt-48 grid-flow-row-dense grid-cols-2 items-center gap-24 md:mx-0 md:grid">
        <div className="mb-12 md:mb-0">
          <h2 className="mb-4 font-grifter text-3xl">
            Clients &amp; Integrations
          </h2>
          <p className="text-gray-400">
            Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate
            bar gummies tiramisu ice cream liquorice chocolate cake.
          </p>
        </div>
        <div className="mx-auto max-w-md md:max-w-none">
          <img src={blocks} alt="clients and integrations" />
        </div>
      </div>
    </div>
  );
}
