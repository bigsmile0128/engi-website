import type { NextPage } from 'next';
import Head from 'next/head';

import Hero from 'components/home/Hero';
import FigmaPreview from 'components/home/FigmaPreview';
import Features from 'components/home/Features';
import CalloutCards from 'components/home/CalloutCards';
import BlockQuote from 'components/home/BlockQuote';
import GlobalConnection from 'components/home/GlobalConnection';
import AlternatingFeatures from 'components/home/AlternatingFeatures';
import CallToAction from 'components/home/CallToAction';
import { isBeta } from 'utils';
import Stats from 'components/home/Statistics';
import WorldOfEngineers from 'components/home/WorldOfEngineers';
import WhosUsingEngi from 'components/home/WhosUsingEngi';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Engi</title>
      </Head>
      <Hero className="max-w-page" />
      {isBeta() && (
        <>
          <Stats className="max-w-page mt-40 lg:mt-24" />
          <CalloutCards className="max-w-page mt-32 sm:mt-32 lg:mt-24" />
          <WorldOfEngineers className="max-w-page mt-40" />
          <Features className="max-w-page mt-40" />
        </>
      )}
      {/* <FigmaPreview className="max-w-page mt-40 mb-48" /> */}
      {isBeta() && (
        <>
          <AlternatingFeatures className="max-w-page mt-32" />
          <GlobalConnection className="mt-32" />
          <WhosUsingEngi className="max-w-page mt-24 sm:mt-32" />
          <CallToAction className="mt-32" />
        </>
      )}
    </div>
  );
};

export default Home;
