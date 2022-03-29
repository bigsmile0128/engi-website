import React from 'react';
import classNames from 'classnames';

import figmaPlugin from '../img/figma-plugin.png';
import GridPattern from '../../components/GridPattern';

interface FigmaPreviewProps {
  className?: string;
}

export default function FigmaPreview({ className }: FigmaPreviewProps) {
  return (
    <div
      className={classNames(
        'md:mx-auto flex flex-col md:flex-row border border-[#43ffff1a]',
        className
      )}
    >
      <div className="relative flex flex-col md:basis-1/3">
        <GridPattern size={60} />
        <div className="flex-1 flex flex-col justify-center items-start p-12 border-b md:border-b-0 md:border-r border-[#43ffff1a] z-10">
          <h2 className="font-grifter text-white text-3xl">
            <span className="inline md:block">FIGMA </span>
            <span className="inline md:block">PLUGIN</span>
          </h2>
          <p className="md:mt-8 text-white">
            Our new Figma plugin is available!
          </p>
          <button className="bg-white hover:bg-gray-200 active:bg-gray-300 px-6 py-4 mt-8 text-xs font-bold text-black">
            Learn More
          </button>
        </div>
      </div>
      <div className="sm:p-12 md:basis-2/3 md:block">
        <img src={figmaPlugin} alt="figma-plugin" />
      </div>
    </div>
  );
}
