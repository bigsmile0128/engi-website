import classNames from 'classnames';
import EngiRoadmap from '~/components/pages/about/EngiRoadmap';
import Header from '~/components/pages/about/Header';
import MeetTheTeam from '~/components/pages/about/MeetTheTeam';
import OurInvestors from '~/components/pages/about/OurInvestors';
import OurMission from '~/components/pages/about/OurMission';
import Values from '~/components/pages/about/Values';
import WhoWeAre from '~/components/pages/about/WhoWeAre';

import BlockQuote from '~/components/pages/home/BlockQuote';
import Statistics from '~/components/pages/home/Statistics';

import Content from '~/content/about.json';

export default function AboutUsPage() {
  return (
    <div className={classNames('flex flex-col mt-16 sm:mt-32 mb-32')}>
      <Header className="max-w-page" />
      <Statistics className="mt-24 w-full" />
      <OurMission className="mt-32" />
      <WhoWeAre className="mt-32 max-w-page w-full" />
      <Values className="mt-32" />
      <BlockQuote
        className="max-w-page mt-32"
        containerClassName="-ml-8 sm:ml-0"
        value={
          <span className="text-4xl inline-block text-center sm:text-left leading-normal">
            {Content.QUOTE[1]}
            <span className="text-green-primary">
              {Content.QUOTE['2_HIGHLIGHTED']}
            </span>
            {Content.QUOTE[3]}
            <span className="text-green-primary">
              {Content.QUOTE['4_HIGHLIGHTED']}
            </span>
          </span>
        }
      />
      <MeetTheTeam className="mt-40 max-w-page w-full" />
      <EngiRoadmap className="mt-40" />
      <OurInvestors className="mt-40" />
    </div>
  );
}
