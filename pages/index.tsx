import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import { isBeta } from 'utils';
import Hero from 'components/home/Hero';
// import FigmaPreview from 'components/home/FigmaPreview';
import Features from 'components/home/Features';
import CalloutCards from 'components/home/CalloutCards';
// import GlobalConnection from 'components/home/GlobalConnection';
import AlternatingFeatures from 'components/home/AlternatingFeatures';
import CallToAction from 'components/home/CallToAction';
import Stats from 'components/home/Statistics';
import WorldOfEngineers from 'components/home/WorldOfEngineers';
import WhosUsingEngi from 'components/home/WhosUsingEngi';
// const Hero = dynamic(() => import('components/home/Hero'), { ssr: false });
// const FigmaPreview = dynamic(() => import('components/home/FigmaPreview'), { ssr: false });
// const Features = dynamic(() => import('components/home/Features'), { ssr: false });
// const CalloutCards = dynamic(() => import('components/home/CalloutCards'), { ssr: false });
// const BlockQuote = dynamic(() => import('components/home/BlockQuote'), { ssr: false });
// const GlobalConnection = dynamic(() => import('components/home/GlobalConnection'), { ssr: false });
// const AlternatingFeatures = dynamic(() => import('components/home/AlternatingFeatures'), { ssr: false });
// const CallToAction = dynamic(() => import('components/home/CallToAction'), { ssr: false });
// const Stats = dynamic(() => import('components/home/Statistics'), { ssr: false });
// const WorldOfEngineers = dynamic(() => import('components/home/WorldOfEngineers'), { ssr: false });
// const WhosUsingEngi = dynamic(() => import('components/home/WhosUsingEngi'), { ssr: false });

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
          {/* <GlobalConnection className="mt-32" /> */}
          <WhosUsingEngi className="max-w-page mt-24 sm:mt-32" />
          <CallToAction className="mt-32" />
        </>
      )}
    </div>
  );
};

export default Home;
