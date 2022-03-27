import React from 'react';

import Hero from './components/Hero';
import FigmaPreview from './components/FigmaPreview';
import Features from './components/Features';
import CalloutCards from './components/CalloutCards';
import BlockQuote from './components/BlockQuote';
import LanguageDivider from './components/LanguageDivider';
import GlobalConnection from './components/GlobalConnection';
import AlternatingFeatures from './components/AlternatingFeatures';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

export default function LandingPage(props) {
  return (
    // TODO: increase whitespace on larger screens
    <main className="">
      <Hero className="max-w-3xl lg:max-w-4xl mx-auto py-16 px-4 sm:py-20 sm:px-6 md:px-0" />
      <CalloutCards className="max-w-3xl lg:max-w-4xl mx-auto px-6 md:px-0" />
      <BlockQuote className="max-w-3xl lg:max-w-4xl mx-6 md:mx-auto my-24" />
      <GlobalConnection className="my-24" />
      <Features className="max-w-7xl mx-auto pb-16 px-4 sm:px-6 lg:px-8" />
      <FigmaPreview className="mx-6 max-w-3xl lg:max-w-4xl" />
      <AlternatingFeatures className="max-w-3xl lg:max-w-4xl mx-auto mt-16" />
      <LanguageDivider className="my-32 sm:my-24" />
      <CallToAction className="" />
      <Footer className="" />
    </main>
  );
}
