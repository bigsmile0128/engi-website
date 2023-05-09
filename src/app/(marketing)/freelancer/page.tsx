import classNames from 'classnames';
import BottomCallToAction from '~/components/pages/freelancer/BottomCallToAction';
import CallToAction from '~/components/pages/freelancer/CallToAction';
import Community from '~/components/pages/freelancer/Community';
import CompanyCarousel from '~/components/pages/freelancer/CompanyCarousel';
import FrequentlyAskedQuestions from '~/components/pages/freelancer/FrequentlyAskedQuestions';
import Header from '~/components/pages/freelancer/Header';
import HowItWorks from '~/components/pages/freelancer/HowItWorks';
import Statistics from '~/components/pages/freelancer/Statistics';
import UsefulResources from '~/components/pages/freelancer/UsefulResources';
import WhyEngi from '~/components/pages/freelancer/WhyEngi';

export default function FreelancerMarketing() {
  return (
    <div className={classNames('flex flex-col items-center pt-24')}>
      <Header className="max-w-page" />
      <CompanyCarousel className="mt-16 tablet:mt-24" />
      <WhyEngi className="mt-32 desktop:mt-48" />
      <HowItWorks className="mt-20 tablet:mt-40 desktop:mt-48" />
      <Statistics className="mt-24 tablet:mt-40 desktop:mt-48 max-w-page w-full" />
      <Community className="mt-32 tablet:mt-48 w-full" />
      <UsefulResources className="mt-32 desktop:mt-48 w-full" />
      <CallToAction className="mt-24 w-full desktop:mt-48" />
      <FrequentlyAskedQuestions className="mt-32 desktop:mt-48 max-w-page max-w-[760px] w-full" />
      <BottomCallToAction className="mt-24 w-full" />
    </div>
  );
}
