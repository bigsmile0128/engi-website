import React from 'react';
import classNames from 'classnames';
import Header from './Header';
import TotalDevelopers from './TotalDevelopers';
import Projects from './Projects';
import HowItWorks from './HowItWorks';
import SaveCosts from './SaveCosts';
import Integrations from './Integrations';
import TypesOfProjects from './TypesOfProjects';
import BuiltOnEngi from './BuiltOnEngi';
import TopDevelopers from './TopDevelopers';
import OurInvestors from './OurInvestors';
import BottomCallToAction from '../business/BottomCallToAction';

type BusinessMarketingProps = {
  className?: string;
};

export default function BusinessMarketing({
  className,
}: BusinessMarketingProps) {
  return (
    <div className={classNames('flex flex-col items-center pt-24', className)}>
      <Header className="max-w-page" />
      <TotalDevelopers className="max-w-page w-full mt-24 desktop:mt-48" />
      <Projects className="w-full mt-24 desktop:mt-48" />
      <HowItWorks className="max-w-page w-full mt-24 desktop:mt-48" />
      <SaveCosts className="w-full mt-24 desktop:mt-48" />
      <Integrations className="max-w-page w-full mt-24 desktop:mt-48" />
      <TypesOfProjects className="max-w-page w-full mt-24 desktop:mt-48" />
      <BuiltOnEngi className="max-w-page w-full mt-24 desktop:mt-48" />
      <TopDevelopers className="max-w-page w-full mt-24 desktop:mt-48" />
      <OurInvestors className="max-w-page w-full mt-24 desktop:mt-48" />
      <BottomCallToAction className="w-full mt-24 desktop:mt-48" />
    </div>
  );
}
