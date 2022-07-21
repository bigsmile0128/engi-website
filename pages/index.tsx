import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Hero from 'components/home/Hero';
import FigmaPreview from 'components/home/FigmaPreview';
import Features from 'components/home/Features';
import CalloutCards from 'components/home/CalloutCards';
import BlockQuote from 'components/home/BlockQuote';
import GlobalConnection from 'components/home/GlobalConnection';
import AlternatingFeatures from 'components/home/AlternatingFeatures';
import CallToAction from 'components/home/CallToAction';
import { isBeta } from 'utils';

const Home: NextPage = () => {
  return (
    <div className="pb-16 sm:pb-32 lg:pb-40">
      <Head>
        <title>Engi</title>
      </Head>
      <Hero className="max-w-page" />
      {isBeta() && (
        <>
          <CalloutCards className="max-w-page mt-24 sm:mt-32 lg:mt-24" />
          <Features className="max-w-page mt-40" />
        </>
      )}
      <FigmaPreview className="max-w-page mt-40 mb-48" />
      {isBeta() && (
        <>
          <AlternatingFeatures className="max-w-page mt-32" />
          <GlobalConnection className="mt-32" />
          <BlockQuote
            className="max-w-page mt-24 sm:mt-32"
            value="We built engi using engi"
            subtitle="Cupcake ipsum dolor sit amet. Tootsie roll sesame snaps chocolate bar."
          />
          <CallToAction className="mt-32" />
        </>
      )}
    </div>
  );
};

export default Home;
