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
      <div className="md:grid grid-cols-2 grid-flow-row-dense gap-24 items-center">
        <div className="mb-12 md:mb-0 col-start-2">
          <h2 className="font-grifter text-3xl mb-4">
            Your Workflows Supercharged
          </h2>
          <p className="text-gray-400">
            {`As an innovative technology businesses, you can seamlessly integrate Engi's new crowdsourced programming into your existing workflows. Engi supports all popular testing frameworks for languages such as Rust, TypeScript, Python, C#, and more. Draft Ul engineering jobs straight from your design tools or from your version control systems.`}
          </p>
        </div>
        <div className="max-w-md md:max-w-none mx-auto relative col-start-1">
          <Image src={blocks} alt="workflows" />
        </div>
      </div>
    </div>
  );
}
