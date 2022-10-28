import cn from 'classnames';
import Footer from './Footer';
import Navbar from './Navbar';
import styles from './layout.module.css';
import { useCallback, useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import Button from '~/components/global/Button/Button';
import lscache from 'lscache';

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={cn('relative min-h-screen flex flex-col', styles.main_bg)}>
      <Banner />
      <div className="absolute w-full h-full -z-40"></div>
      <Navbar />
      <div className="">{children}</div>
      <Footer className="mt-auto" />
    </main>
  );
}

function Banner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(lscache.get('skillsbiteBanner') ?? true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    const ttl = 60 * 24 * 7; // 7-day TTL in minutes
    lscache.set('skillsbiteBanner', false, ttl);
  }, []);

  return (
    <div
      className={cn(
        'w-full relative py-8 sm:py-4 flex items-center bg-[#232323]/80 backdrop-blur-[12.5px] shrink-0',
        styles.banner,
        !open ? '!hidden' : ''
      )}
    >
      <div
        className={cn(
          'flex-1 max-w-page',
          'flex items-center justify-between gap-x-8',
          'flex-col sm:flex-row'
        )}
      >
        <div className="flex flex-col pr-8 sm:pr-0 mb-6 sm:mb-0">
          <span className="font-grifter">
            Educational partnership with Skillsbite
          </span>
          <span className="text-white">
            {
              'Engi & Skillsbite have teamed up to empower students to grow into professionals effortlessly.'
            }
          </span>
        </div>
        <div className="flex items-start gap-x-8">
          <a href="https://skillsbite.io/" target="_blank" rel="noreferrer">
            <Button variant="primary" className="whitespace-nowrap">
              Learn More
            </Button>
          </a>
        </div>
        <button
          className="text-white hidden sm:block mb-auto"
          onClick={onClose}
        >
          <XIcon className="h-8 w-8" />
        </button>
        {/* mobile button */}
        <button
          className="text-white sm:hidden absolute top-8 right-6"
          onClick={onClose}
        >
          <XIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
