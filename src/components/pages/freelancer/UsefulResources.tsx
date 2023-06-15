'use client';

import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import stockImg from 'public/img/about/freelancer/stock1.png';
import Button from '~/components/global/Button/Button';

type UsefulResourcesProps = {
  className?: string;
};

const resources = [
  {
    img: <Image src={stockImg} className="w-full" alt="accessible" />,
    title: 'Getting Started',
    description:
      "Check out 'Getting Started' in the Engi Cookbook to prepare your accounts and developer environment",
    className: '',
    link: 'https://links.engi.network/cookbook',
  },
  {
    img: <Image src={stockImg} className="w-full" alt="accessible" />,
    title: 'Alternative Earning',
    description:
      "Discover the many different ways to earn ENGI using your elite coding skills including developers' passive income",
    className: '',
    link: 'https://links.engi.network/cookbook',
  },
  {
    img: <Image src={stockImg} className="w-full" alt="accessible" />,
    title: 'Master Bounties',
    description:
      "Ensure you're quick on the draw when new bounties in your sweet spot become available",
    className: 'hidden desktop:block',
    link: 'https://links.engi.network/cookbook',
  },
];

export default function UsefulResources({ className }: UsefulResourcesProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  return (
    <div className={classNames('', className)}>
      <div className="max-w-page w-full">
        <p className="font-grifter text-4xl tablet:text-center">
          Useful Resources
        </p>
      </div>
      <div className="mt-12 embla w-full tablet:hidden" ref={emblaRef}>
        <div className="flex children:ml-6">
          {resources.map(({ img, title, description, link }) => (
            <Link href={link} target="_blank" key={title}>
              <div className="flex-[0_0_80%] max-w-[300px] hover:cursor-pointer">
                <div className="">
                  {img}
                  <div className="bg-secondary p-6 border border-white/30 border-t-0">
                    <p className="font-bold text-xl text-green-primary">
                      {title}
                    </p>
                    <p className="mt-4 font-medium text-xl">{description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden mt-12 max-w-page tablet:flex gap-8">
        {resources.map(({ img, title, description, className, link }) => (
          <Link href={link} target="_blank" key={title}>
            <div className={className}>
              {img}
              <div className="bg-secondary p-6 border border-white/30 border-t-0">
                <p className="font-bold text-xl text-green-primary">{title}</p>
                <p className="mt-4 font-medium text-xl">{description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-12 max-w-page w-full flex justify-center">
        <Link href="https://links.engi.network/cookbook" target="_blank">
          <Button>Learn more</Button>
        </Link>
      </div>
    </div>
  );
}
