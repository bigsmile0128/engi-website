import React from 'react';
import Hero from '~/components/pages/home/Hero';
import AlternatingFeatures from '~/components/pages/home/AlternatingFeatures';
import CallToAction from '~/components/pages/home/CallToAction';
import Features from '~/components/pages/home/Features';
import Statistics from '~/components/pages/home/Statistics';
import WorkflowsSupercharged from '~/components/pages/home/WorkflowsSupercharged';
import WorldOfEngineers from '~/components/pages/home/WorldOfEngineers';

export default function Home() {
  return (
    <div className="">
      <Hero className="max-w-page" />
      <Statistics className="mt-24 xl:mt-40" />
      <AlternatingFeatures className="max-w-page mt-24" />
      <WorldOfEngineers className="mt-32 lg:mt-40" />
      <Features className="mt-32 lg:mt-40" />
      <WorkflowsSupercharged className="max-w-page mt-24" />
      <CallToAction className="mt-32" />
    </div>
  );
}
