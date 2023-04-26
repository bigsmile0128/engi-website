import React from 'react';
import classNames from 'classnames';
import GridPattern from '~/components/global/GridPattern/GridPattern';
import BulbIcon from '~/components/global/icons/bulb.svg';
import RocketIcon from '~/components/global/icons/rocket.svg';
import Content from '~/content/about.json';

type ValuesProps = {
  className?: string;
};

export default function Values({ className }: ValuesProps) {
  return (
    <div className={classNames('relative', className)}>
      <GridPattern id="values" className="hidden sm:block" offset={0} />
      <div className="flex flex-col items-center sm:py-16 border-y-0 sm:border-y-1 border-white/30">
        <h2 className="text-5xl font-grifter mb-16">{Content.LIST.TITLE}</h2>
        <div className="flex flex-col sm:flex-row items-center gap-x-12 gap-y-24">
          <div className="flex flex-col items-center gap-y-8">
            <div className="border border-gray-500 h-20 w-20 flex items-center justify-center bg-gray-800/60 z-10">
              <BulbIcon className="w-7" />
            </div>
            <h3 className="font-bold text-lg text-green-primary">
              {Content.LIST[1].TITLE}
            </h3>
            <p className="w-60 sm:w-40 md:w-48 lg:w-72 text-center text-lg">
              {Content.LIST[1].SUBTITLE}
            </p>
          </div>
          <div className="flex flex-col items-center gap-y-8">
            <div className="border border-gray-500 h-20 w-20 flex items-center justify-center bg-gray-800/60 z-10">
              <RocketIcon className="w-7" />
            </div>
            <h3 className="font-bold text-lg text-green-primary">
              {Content.LIST[2].TITLE}
            </h3>
            <p className="w-60 sm:w-40 md:w-48 lg:w-72 text-center text-lg">
              {Content.LIST[2].SUBTITLE}
            </p>
          </div>
          <div className="flex flex-col items-center gap-y-8">
            <div className="border border-gray-500 h-20 w-20 flex items-center justify-center bg-gray-800/60 z-10">
              <BulbIcon className="w-7" />
            </div>
            <h3 className="font-bold text-lg text-green-primary">
              {Content.LIST[3].TITLE}
            </h3>
            <p className="w-60 sm:w-40 md:w-48 lg:w-72 text-center text-lg">
              {Content.LIST[3].SUBTITLE}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
