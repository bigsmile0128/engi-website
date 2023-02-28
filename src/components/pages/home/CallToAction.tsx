import classNames from 'classnames';
import Link from 'next/link';
import { RiBuilding2Fill, RiCoinsFill } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import GridPattern from '~/components/global/GridPattern/GridPattern';

interface CallToActionProps {
  className?: string;
}

const sections = [
  {
    icon: <RiCoinsFill className="text-green-primary h-7 w-7" />,
    title: 'Earn $ENGI',
    description: 'Find a Bit, Start Coding',
    buttonText: 'Browse Bits',
    href: '/bits',
  },
  {
    icon: <RiBuilding2Fill className="text-green-primary h-7 w-7" />,
    title: 'Engage Talent',
    description: 'Custom Code on Tap',
    buttonText: 'Engi for Businesses',
    href: '/hire',
  },
];

export default function CallToAction({ className }: CallToActionProps) {
  return (
    <div className={classNames('relative', className)}>
      <GridPattern id="call-to-action" offset={-1} className="z-[-1]" />
      <div className="flex flex-col items-center justify-center px-6 py-24 md:px-0 z-10">
        <h2 className="font-grifter text-5xl mb-12 text-center">
          Ready to get started?
        </h2>
        <div className="max-w-page flex flex-col laptop:flex-row gap-8">
          {sections.map(({ icon, title, description, buttonText, href }) => (
            <div
              className="flex-1 flex flex-col items-center bg-dropdown py-12 px-8 border border-white/60 laptop:px-32 laptop:whitespace-nowrap"
              key={title}
            >
              <div className="p-4 bg-dropdown backdrop-blur-sm border border-white/60">
                {icon}
              </div>
              <span className="font-grifter text-3xl mt-6 mb-auto text-center">
                {title}
              </span>
              <span className="text-secondary text-xl mt-8 text-center">
                {description}
              </span>
              <Link href={href} className="mt-12">
                <Button variant="primary">{buttonText}</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
