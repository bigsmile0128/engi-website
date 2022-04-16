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
    <main className="">
      <Hero className="max-w-3xl lg:max-w-4xl mx-auto px-4 mt-16 sm:mt-32 sm:px-6 md:px-0" />
      <CalloutCards className="max-w-3xl lg:max-w-4xl mx-auto px-6 md:px-0 mt-24 sm:mt-32" />
      <BlockQuote className="max-w-3xl lg:max-w-4xl mx-6 md:mx-auto mt-24 sm:mt-32" />
      <GlobalConnection className="mt-32" />
      <Features className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40" />
      <FigmaPreview className="mx-6 max-w-3xl lg:max-w-4xl mt-24" />
      <AlternatingFeatures className="max-w-3xl lg:max-w-4xl mx-auto mt-32" />
      <LanguageDivider className="my-32 sm:my-48" />
      <CallToAction className="" />
      <Footer className="" />
    </main>
  );
}
