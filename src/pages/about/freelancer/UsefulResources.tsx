import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import stockImg from 'public/img/about/freelancer/stock1.png';
import Button from '~/components/global/Button/Button';

type UsefulResourcesProps = {
  className?: string;
};

export default function UsefulResources({ className }: UsefulResourcesProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true });
  return (
    <div className={classNames('', className)}>
      <div className="max-w-page w-full">
        <p className="font-grifter text-4xl">Useful Resources</p>
      </div>
      <div className="mt-12 embla w-full" ref={emblaRef}>
        <div className="flex children:ml-6">
          <div className="flex-[0_0_80%] max-w-[300px]">
            <div className="">
              <Image src={stockImg} className="w-full" alt="accessible" />
              <div className="bg-secondary p-6 border border-white/30 border-t-0">
                <p className="font-bold text-xl text-green-primary">
                  Accessible
                </p>
                <p className="mt-4 font-medium text-xl">
                  Anyone can begin working on bits regardless of their time zone
                  or language.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-[0_0_80%] max-w-[300px]">
            <div className="">
              <Image src={stockImg} className="w-full" alt="accessible" />
              <div className="bg-secondary p-6 border border-white/30 border-t-0">
                <p className="font-bold text-xl text-green-primary">
                  Accessible
                </p>
                <p className="mt-4 font-medium text-xl">
                  Anyone can begin working on bits regardless of their time zone
                  or language.
                </p>
              </div>
            </div>
          </div>
          <div className="flex-[0_0_80%] max-w-[300px]">
            <div className="">
              <Image src={stockImg} className="w-full" alt="accessible" />
              <div className="bg-secondary p-6 border border-white/30 border-t-0">
                <p className="font-bold text-xl text-green-primary">
                  Accessible
                </p>
                <p className="mt-4 font-medium text-xl">
                  Anyone can begin working on bits regardless of their time zone
                  or language.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 max-w-page w-full flex justify-center">
        <Link
          href="https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
          target="_blank"
        >
          <Button>Learn more</Button>
        </Link>
      </div>
    </div>
  );
}
