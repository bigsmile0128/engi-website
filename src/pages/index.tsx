import type { NextPage } from 'next';
import Head from 'next/head';

import AlternatingFeatures from '~/components/pages/home/AlternatingFeatures';
import CallToAction from '~/components/pages/home/CallToAction';
import Features from '~/components/pages/home/Features';
import Hero from '~/components/pages/home/Hero';
import Stats from '~/components/pages/home/Statistics';
import WhosUsingEngi from '~/components/pages/home/WhosUsingEngi';
import WorldOfEngineers from '~/components/pages/home/WorldOfEngineers';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Engi</title>
      </Head>
      <Hero className="max-w-page" />
      <Stats className="mt-24 xl:mt-40" />
      <AlternatingFeatures className="max-w-page mt-24" />
      {/* <CalloutCards className="max-w-page mt-24 sm:mt-32 lg:mt-24" /> */}
      <WorldOfEngineers className="mt-32 lg:mt-40" />
      <Features className="mt-32 lg:mt-40" />
      {/* <FigmaPreview className="max-w-page mt-40 mb-48" /> */}
      {/* <GlobalConnection className="mt-24" /> */}
      <WhosUsingEngi className="max-w-page mt-24 md:mt-0" />
      <CallToAction className="mt-32" />
    </div>
  );
};

export default Home;
