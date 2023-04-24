import classNames from 'classnames';

import BlockQuote from '~/components/pages/home/BlockQuote';

import Statistics from '../home/Statistics';
import Header from './Header';
import MeetTheTeam from './MeetTheTeam';
import OurMission from './OurMission';
import Values from './Values';
import WhoWeAre from './WhoWeAre';
import OurInvestors from './OurInvestors';
import Content from './content';

interface AboutUsPageProps {
  className?: string;
}

function AboutUsPageContainer({ className }: AboutUsPageProps) {
  return (
    <div
      className={classNames('flex flex-col mt-16 sm:mt-32 mb-32', className)}
    >
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
      <OurInvestors className="mt-40" />
    </div>
  );
}

export default AboutUsPageContainer;
