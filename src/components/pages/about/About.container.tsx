import classNames from 'classnames';

import BlockQuote from '~/components/pages/home/BlockQuote';

import Statistics from '../home/Statistics';
import Header from './Header';
import MeetTheTeam from './MeetTheTeam';
import OurMission from './OurMission';
import Values from './Values';
import WhoWeAre from './WhoWeAre';
import OurInvestors from './OurInvestors';

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
            Engi is a gig economy for coders built on the blockchain. No need to
            apply. Write code,{' '}
            <span className="text-green-primary">get paid instantly</span>.
          </span>
        }
      />
      <MeetTheTeam className="mt-40 max-w-page w-full" />
      <OurInvestors className="mt-40" />
    </div>
  );
}

export default AboutUsPageContainer;
