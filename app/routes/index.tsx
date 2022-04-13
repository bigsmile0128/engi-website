import React from 'react';

import Hero from '~/components/LandingPage/Hero';
import FigmaPreview from '~/components/LandingPage/FigmaPreview';
import Features from '~/components/LandingPage/Features';
import CalloutCards from '~/components/LandingPage/CalloutCards';
import BlockQuote from '~/components/LandingPage/BlockQuote';
import LanguageDivider from '~/components/LandingPage/LanguageDivider';
import GlobalConnection from '~/components/LandingPage/GlobalConnection';
import AlternatingFeatures from '~/components/LandingPage/AlternatingFeatures';
import CallToAction from '~/components/LandingPage/CallToAction';
import Footer from '~/components/LandingPage/Footer';

export default function LandingPage() {
  return (
    <main className="">
      <Hero className="mx-auto mt-16 max-w-3xl px-4 sm:mt-32 sm:px-6 md:px-0 lg:max-w-4xl" />
      <CalloutCards className="mx-auto mt-24 max-w-3xl px-6 sm:mt-32 md:px-0 lg:max-w-4xl" />
      <BlockQuote className="mx-6 mt-24 max-w-3xl sm:mt-32 md:mx-auto lg:max-w-4xl" />
      <GlobalConnection className="mt-32" />
      <Features className="mx-auto mt-40 max-w-7xl px-4 sm:px-6 lg:px-8" />
      <FigmaPreview className="mx-6 mt-24 max-w-3xl lg:max-w-4xl" />
      <AlternatingFeatures className="mx-auto mt-32 max-w-3xl lg:max-w-4xl" />
      <LanguageDivider className="my-32 sm:my-48" />
      <CallToAction className="" />
      <Footer className="" />
    </main>
  );
}
