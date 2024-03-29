import classNames from 'classnames';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { COOKBOOK_LINK, LIGHTPAPER_LINK } from '~/utils/links';

import { ChevronRightIcon } from '@heroicons/react/outline';
import freelancersSrc from 'public/img/articles/freelancers.jpg';
import businessSrc from 'public/img/articles/business.jpg';
import Button from '~/components/global/Button/Button';

type AnimatedNavProps = {
  className?: string;
};

type MenuLinkProps = {
  className?: string;
  description: string;
  href: string;
  title: string;
};

const EARN_LINKS: MenuLinkProps[] = [
  {
    title: 'UI Development',
    description: 'React, TypeScript, CSS',
    href: '/bounty?technology=typescript&technology=css',
  },
  {
    title: 'Smart Contracts',
    description: 'Solidity, Solana, ink!',
    href: '/bounty?technology=solidity&technology=solang&technology=ink',
  },
  {
    title: 'Libraries & APIs',
    description: 'Python, Rust, Dotnet',
    href: '/bounty?technology=python',
  },
];

const CREATE_LINKS = [
  {
    title: 'Create a Bounty',
    description: 'Easily on the Web',
    href: '/hire',
  },
  {
    title: 'Github Authorization',
    description: 'Access to Test & Open PRs',
    href: `${process.env.NEXT_PUBLIC_GITHUB_APP_LINK}`,
  },
  {
    title: 'CLI',
    description: 'Use Engi Anywhere',
    href: 'https://github.com/engi-network/cli',
  },
];

const LEARN_LINKS = [
  {
    title: 'Blockchain',
    description: 'Sign Transactions, Explorer',
    href: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fmainnet.engi.network%3A9944#/explorer',
  },
  {
    title: 'Litepaper',
    description: 'Network in Broad Strokes',
    href: LIGHTPAPER_LINK,
  },
  {
    title: 'About',
    description: 'Our Mission, Our People',
    href: '/about',
  },
  {
    title: 'Contact',
    description: 'Introductions, Feedback',
    href: '/contact',
  },
];

export default function AnimatedNav({ className }: AnimatedNavProps) {
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const pathname = usePathname() ?? '';
  const router = useRouter();

  const closeMenu = useCallback(() => {
    setHoverItem(null);
  }, []);

  return (
    <nav className={classNames('', className)} onMouseLeave={closeMenu}>
      <button
        className={classNames(
          'text-base font-medium text-gray-300 hover:text-white px-6 py-3',
          {
            'underline underline-offset-8 !text-white decoration-green-primary decoration-2':
              /^\/bounty/.test(pathname),
          }
        )}
        onMouseEnter={() => setHoverItem('BITS')}
        onClick={() => router.push('/bounty')}
      >
        Bounties
      </button>
      <button
        className={classNames(
          'text-base font-medium text-gray-300 hover:text-white px-6 py-3',
          {
            'underline underline-offset-8 !text-white decoration-green-primary decoration-2':
              /^\/hire/.test(pathname),
          }
        )}
        onMouseEnter={() => setHoverItem('CREATE')}
      >
        Create
      </button>
      <button
        className={classNames(
          'relative text-base font-medium text-gray-300 hover:text-white px-6 py-3',
          {
            'underline underline-offset-8 !text-white decoration-green-primary decoration-2':
              /^\/(about|contact)/.test(pathname),
          }
        )}
      >
        Learn
        {/* larger hover target */}
        <div
          className="absolute inset-0 xl:w-400p h-125p"
          onMouseEnter={() => setHoverItem('LEARN')}
        />
      </button>
      {hoverItem && (
        <motion.div
          className="absolute top-16 left-0 z-50 origin-top-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layout
        >
          {/* empty div to add margin-top without triggering onMouseLeave */}
          <motion.div layout className="h-8 bg-transparent" />
          <motion.div
            className={classNames(
              'bg-[#161B284D] !backdrop-blur-[100px] rounded-3xl flex overflow-hidden p-8',
              'min-h-[180px]'
            )}
            layout
          >
            {/* left panel */}
            <motion.div layout="position">
              {hoverItem === 'BITS' ? (
                <>
                  <motion.p layout="position" className="text-xl font-bold">
                    <span className="text-green-primary">Flexibly Earn</span>{' '}
                    Coding
                  </motion.p>
                  <motion.p layout="position" className="text-secondary mt-3">
                    Fast payouts, anonymity, diverse challenges, global
                    <br />
                    opportunities, and the flexibility to work how you want
                  </motion.p>
                  <Link
                    href="/bounty"
                    className="block mt-8 hover:text-green-primary"
                    onClick={closeMenu}
                  >
                    <motion.span
                      layout="position"
                      className="flex items-center gap-3 font-bold underline capitalize"
                    >
                      Browse all Bounties
                      <RiArrowRightSLine className="h-5 w-5" />
                    </motion.span>
                  </Link>
                </>
              ) : hoverItem === 'CREATE' ? (
                <>
                  <motion.p layout="position" className="text-xl font-bold">
                    On-Demand{' '}
                    <span className="text-green-primary">Professionals</span>
                  </motion.p>
                  <motion.p layout="position" className="text-secondary mt-3">
                    Expert developers start coding your needs immediately,
                    <br />
                    consistently providing correct and performant deliverables
                  </motion.p>
                  <Link
                    href={COOKBOOK_LINK}
                    className="block mt-8 hover:text-green-primary"
                    onClick={closeMenu}
                    target="_blank"
                  >
                    <motion.span
                      layout="position"
                      className="flex items-center gap-3 font-bold underline capitalize"
                    >
                      See guide
                      <RiArrowRightSLine className="h-5 w-5" />
                    </motion.span>
                  </Link>
                </>
              ) : (
                <>
                  <motion.p layout="position" className="text-xl font-bold">
                    Discover <span className="text-green-primary">Engi</span>
                  </motion.p>
                  <motion.p layout="position" className="text-secondary mt-3">
                    Learn how decentralized development empowers <br />
                    professional coders and accelerates technology companies
                  </motion.p>
                  <Link
                    href={COOKBOOK_LINK}
                    className="block mt-8 hover:text-green-primary"
                    onClick={closeMenu}
                    target="_blank"
                  >
                    <motion.span
                      layout="position"
                      className="flex items-center gap-3 font-bold underline capitalize"
                    >
                      See guide
                      <RiArrowRightSLine className="h-5 w-5" />
                    </motion.span>
                  </Link>
                </>
              )}
            </motion.div>
            <motion.div
              layout
              className="w-[1px] bg-white/30 opacity-30 mx-8"
            />
            {/* right panel */}
            <AnimatePresence mode="wait">
              <motion.div layout className="flex flex-col gap-9 mr-4">
                {hoverItem === 'BITS'
                  ? EARN_LINKS.map((props) => (
                      <MenuLink
                        key={props.title}
                        onClick={closeMenu}
                        {...props}
                      />
                    ))
                  : hoverItem === 'CREATE'
                  ? CREATE_LINKS.map((props) => (
                      <MenuLink
                        key={props.title}
                        onClick={closeMenu}
                        {...props}
                      />
                    ))
                  : LEARN_LINKS.map((props) => (
                      <MenuLink
                        key={props.title}
                        onClick={closeMenu}
                        {...props}
                      />
                    ))}
              </motion.div>
            </AnimatePresence>
            {hoverItem === 'BITS' && (
              <>
                <motion.div
                  layout
                  className="w-[1px] bg-white/30 opacity-30 mx-8"
                />
                <motion.div layout className="flex flex-col shrink-0 w-64">
                  <motion.div layout className="font-bold text-xl">
                    Engi for Freelancers
                  </motion.div>
                  <motion.div layout className="mt-4">
                    <Image
                      src={freelancersSrc}
                      className="w-48 rounded-2xl"
                      alt="freelancers"
                    />
                  </motion.div>
                  <motion.div layout className="mt-4 text-secondary">
                    No applications or interviews. Start coding and earning
                    today.
                  </motion.div>
                  <Link href="/freelancer">
                    <Button
                      variant="link"
                      className="mt-2 flex items-center gap-2 !text-white hover:!text-green-primary"
                    >
                      <span className="underline whitespace-nowrap">
                        Read now
                      </span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
            {hoverItem === 'CREATE' && (
              <>
                <motion.div
                  layout
                  className="w-[1px] bg-white/30 opacity-30 mx-8"
                />
                <motion.div layout className="flex flex-col shrink-0 w-64">
                  <motion.div layout className="font-bold text-xl">
                    Engi for Business
                  </motion.div>
                  <motion.div layout className="mt-4">
                    <Image
                      src={businessSrc}
                      className="w-48 rounded-2xl"
                      alt="business"
                    />
                  </motion.div>
                  <motion.div layout className="mt-4 text-secondary">
                    Engage worldwide talent and receive quality code instantly.
                  </motion.div>
                  <Link href="/business">
                    <Button
                      variant="link"
                      className="mt-2 flex items-center gap-2 !text-white hover:!text-green-primary"
                    >
                      <span className="underline whitespace-nowrap">
                        Read now
                      </span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
}

function MenuLink({
  className,
  title,
  description,
  href,
  ...props
}: MenuLinkProps & HTMLMotionProps<'a'>) {
  return (
    // use legacyBehavior to use own anchor tag
    // nest padding inside motion element for framer-motion height calculation
    <Link key={title} href={href} legacyBehavior passHref>
      <motion.a
        layout
        className={classNames(
          'flex items-center gap-1 justify-between !w-56 hover:text-green-primary',
          className
        )}
        target={href.startsWith('/') ? undefined : '_blank'}
        {...props}
      >
        <div className="flex flex-col">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-secondary">{description}</p>
        </div>
        <RiArrowRightSLine className="h-5 w-5" />
      </motion.a>
    </Link>
  );
}
