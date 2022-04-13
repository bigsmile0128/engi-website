import React from 'react';
import classNames from 'classnames';

import figmaPlugin from '~/img/figma-plugin.png';
import GridPattern from '~/components/GridPattern';
import Button from '~/components/Button';

interface FigmaPreviewProps {
  className?: string;
}

export default function FigmaPreview({ className }: FigmaPreviewProps) {
  return (
    <div
      className={classNames(
        'flex flex-col border border-[#43ffff1a] md:mx-auto md:flex-row',
        className
      )}
    >
      <div className="relative flex flex-col md:basis-1/3">
        <GridPattern size={60} />
        <div className="z-10 flex flex-1 flex-col items-start justify-center border-b border-[#43ffff1a] p-12 md:border-b-0 md:border-r">
          <h2 className="font-grifter text-3xl text-white">
            <span className="inline md:block">FIGMA </span>
            <span className="inline md:block">PLUGIN</span>
          </h2>
          <p className="text-white md:mt-8">
            Our new Figma plugin is available!
          </p>
          <Button className="mt-8">Learn More</Button>
        </div>
      </div>
      <div className="sm:p-12 md:block md:basis-2/3">
        <img src={figmaPlugin} alt="figma-plugin" />
      </div>
    </div>
  );
}
