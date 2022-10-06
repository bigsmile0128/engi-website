import AboutUsPageContainer from '~/components/pages/about/About.container';

interface AboutUsPageProps {
  className?: string;
}

export default function AboutUsPage({ className }: AboutUsPageProps) {
  return <AboutUsPageContainer className={className} />;
}
