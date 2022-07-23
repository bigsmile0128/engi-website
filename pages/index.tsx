import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// import Hero from 'components/home/Hero';
const Hero = dynamic(() => import('components/home/Hero'), { ssr: false });
// import FigmaPreview from 'components/home/FigmaPreview';
const FigmaPreview = dynamic(() => import('components/home/FigmaPreview'), {
  ssr: false,
});
// import Features from 'components/home/Features';
const Features = dynamic(() => import('components/home/Features'), {
  ssr: false,
});
// import CalloutCards from 'components/home/CalloutCards';
const CalloutCards = dynamic(() => import('components/home/CalloutCards'), {
  ssr: false,
});
// import BlockQuote from 'components/home/BlockQuote';
const BlockQuote = dynamic(() => import('components/home/BlockQuote'), {
  ssr: false,
});
// import GlobalConnection from 'components/home/GlobalConnection';
const GlobalConnection = dynamic(
  () => import('components/home/GlobalConnection'),
  { ssr: false }
);
// import AlternatingFeatures from 'components/home/AlternatingFeatures';
const AlternatingFeatures = dynamic(
  () => import('components/home/AlternatingFeatures'),
  { ssr: false }
);
// import CallToAction from 'components/home/CallToAction';
const CallToAction = dynamic(() => import('components/home/CallToAction'), {
  ssr: false,
});
// import Stats from 'components/home/Statistics';
const Stats = dynamic(() => import('components/home/Statistics'), {
  ssr: false,
});
// import WorldOfEngineers from 'components/home/WorldOfEngineers';
const WorldOfEngineers = dynamic(
  () => import('components/home/WorldOfEngineers'),
  { ssr: false }
);
// import WhosUsingEngi from 'components/home/WhosUsingEngi';
const WhosUsingEngi = dynamic(() => import('components/home/WhosUsingEngi'), {
  ssr: false,
});
import { isBeta } from 'utils';

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
