import React from 'react';
import classNames from 'classnames';
import Header from '~/components/pages/business/Header';
import TotalDevelopers from '~/components/pages/business/TotalDevelopers';
import Projects from '~/components/pages/business/Projects';
import HowItWorks from '~/components/pages/business/HowItWorks';
import SaveCosts from '~/components/pages/business/SaveCosts';
import Integrations from '~/components/pages/business/Integrations';
import TypesOfProjects from '~/components/pages/business/TypesOfProjects';
import BuiltOnEngi from '~/components/pages/business/BuiltOnEngi';
import TopDevelopers from '~/components/pages/business/TopDevelopers';
import OurInvestors from '~/components/pages/business/OurInvestors';
import BottomCallToAction from '~/components/pages/business/BottomCallToAction';

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
