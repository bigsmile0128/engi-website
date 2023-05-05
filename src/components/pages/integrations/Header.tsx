import classNames from 'classnames';
import Image from 'next/image';
import ChevronRight from '~/components/ChevronRight';
import integrationsMobileImg from 'public/img/about/integrations/integrations-mobile.png';
import integrationsDesktopImg from 'public/img/about/integrations/integrations-desktop.png';

type HeaderProps = {
  className?: string;
};

const SUBTITLE =
  'Simplified bounty specification with Docker services and Github integration lowers friction for Engi newcomers and veterans alike';

export default function Header({ className }: HeaderProps) {
  return (
    <div
      className={classNames(
        'tablet:text-center desktop:text-left desktop:flex gap-24',
        className
      )}
    >
      {/* text */}
      {/* MOBILE/TABLET: Chevron is bound to "Seamless" */}
      <div className="desktop:hidden">
        <div className="flex flex-col tablet:items-center font-grifter text-4xl tablet:text-6xl">
          <p className="flex items-center gap-2 tablet:-ml-10">
            <ChevronRight className="h-6 w-6 tablet:h-10 tablet:w-10" />
            <span className="-mb-3 tablet:-mb-5">Seamlessly</span>
          </p>
          <p className="mt-3 tablet:mt-6">integrate all your tools</p>
        </div>
        <p className="mt-6 text-secondary text-xl">{SUBTITLE}</p>
      </div>
      {/* DESKTOP */}
      <div className="hidden desktop:block mt-12">
        <div className="hidden desktop:flex items-start gap-4">
          <ChevronRight className="mt-2 h-10 w-10 shrink-0" />
          <div>
            <span className="font-grifter text-6xl leading-tight">
              Seamlessly integrate all your tools
            </span>
            {/* subtitle text needs to be left-aligned with title and NOT the chevron */}
            <p className="mt-8 text-secondary text-xl">{SUBTITLE}</p>
          </div>
        </div>
      </div>
      {/* image */}
      <div className="desktop:hidden shrink-0 mt-16 tablet:mt-12">
        <Image
          className="scale-125 tablet:scale-100"
          src={integrationsMobileImg}
          alt="integrations"
        />
      </div>
      <div className="hidden desktop:block shrink-0 basis-5/12">
        <Image
          className="w-full"
          src={integrationsDesktopImg}
          alt="integrations"
        />
      </div>
    </div>
  );
}
