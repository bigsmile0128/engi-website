import classNames from 'classnames';
import BottomCallToAction from './BottomCallToAction';

import CallToAction from './CallToAction';
import Community from './Community';
import CompanyCarousel from './CompanyCarousel';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import Header from './Header';
import HowItWorks from './HowItWorks';
import Statistics from './Statistics';
import UsefulResources from './UsefulResources';
import WhyEngi from './WhyEngi';

type FreelancerMarketingProps = {
  className?: string;
};

export default function FreelancerMarketing({
  className,
}: FreelancerMarketingProps) {
  return (
    <div className={classNames('flex flex-col items-center pt-24', className)}>
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
