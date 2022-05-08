import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Hero from 'components/home/Hero';
import FigmaPreview from 'components/home/FigmaPreview';
import Features from 'components/home/Features';
import CalloutCards from 'components/home/CalloutCards';
import BlockQuote from 'components/home/BlockQuote';
import LanguageDivider from 'components/home/LanguageDivider';
import GlobalConnection from 'components/home/GlobalConnection';
import AlternatingFeatures from 'components/home/AlternatingFeatures';
import CallToAction from 'components/home/CallToAction';
import Footer from 'components/home/Footer';
import { isDevEnv } from 'utils';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Engi</title>
      </Head>
      <Hero className="max-w-sm xs:max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-6 md:px-0" />
      <FigmaPreview className="mx-auto max-w-sm xs:max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mt-24" />
      {isDevEnv() && (
        <>
          <CalloutCards className="max-w-3xl lg:max-w-4xl mx-auto px-6 md:px-0 mt-24 sm:mt-32" />
          <BlockQuote className="max-w-3xl lg:max-w-4xl mx-6 md:mx-auto mt-24 sm:mt-32" />
          <GlobalConnection className="mt-32" />
          <Features className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40" />
          <AlternatingFeatures className="max-w-3xl lg:max-w-4xl mx-auto mt-32" />
          <LanguageDivider className="my-32 sm:my-48" />
          <CallToAction className="" />
        </>
      )}
      <Footer className="mt-24" />
    </div>
  );
};

export default Home;
