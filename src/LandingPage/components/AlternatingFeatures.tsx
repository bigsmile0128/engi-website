import React from 'react';
import classNames from 'classnames';

import cubes from '../img/cubes.png';
import ipad from '../img/ipad.png';
import iphone from '../img/iphone.png';
import blocks from '../img/blocks.png';

interface AlternatingFeaturesProps {
  className?: string;
}

export default function AlternatingFeatures({
  className,
}: AlternatingFeaturesProps) {
  return (
    // TODO: make responsive
    <div className={classNames('', className)}>
      <div className="grid grid-cols-2 grid-flow-row-dense gap-24 items-center">
        <div>
          <h2 className="font-grifter text-3xl mb-4">Figma Plugins</h2>
          <p className="text-gray-400">
            Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate
            bar gummies tiramisu ice cream liquorice chocolate cake.
          </p>
        </div>
        <div className="block">
          <img src={cubes} alt="figma plugins" />
        </div>
      </div>
      <div className="grid grid-cols-2 grid-flow-row-dense gap-24 items-center mt-24">
        <div className="col-start-2">
          <h2 className="font-grifter text-3xl mb-4">Website</h2>
          <p className="text-gray-400">
            Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate
            bar gummies tiramisu ice cream liquorice chocolate cake.
          </p>
        </div>
        <div className="relative col-start-1">
          <img src={ipad} alt="ipad website" />
          <div className="absolute -bottom-10 -left-20 h-50 w-50">
            <img className="w-auto h-60" src={iphone} alt="iphone website" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-flow-row-dense gap-24 items-center mt-40">
        <div className="">
          <h2 className="font-grifter text-3xl mb-4">
            Clients &amp; Integrations
          </h2>
          <p className="text-gray-400">
            Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate
            bar gummies tiramisu ice cream liquorice chocolate cake.
          </p>
        </div>
        <div className="">
          <img src={blocks} alt="clients and integrations" />
        </div>
      </div>
    </div>
  );
}
