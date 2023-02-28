import classNames from 'classnames';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';

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
    title: 'Smart Contracts',
    description: 'Solidity, Solana, ink!',
    href: '/bits?language=SOLIDITY,SOLANG,INK',
  },
  {
    title: 'Substrate, DotSama',
    description: 'Build Multi-Chain',
    href: '/bits?language=SUBSTRATE',
  },
  {
    title: 'Rust, C++, C SDKs',
    description: 'Author Critical Libraries',
    href: '/bits?language=RUST,C++,C',
  },
];

const CREATE_LINKS = [
  {
    title: 'Create a Bit',
    description: 'Easily on the Web',
    href: '/hire',
  },
  {
    title: 'Github Authorization',
    description: 'Access to Test & Open PRs',
    href: '/settings',
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
    href: 'https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf',
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
  const [hoverItem, setHoverItem] = useState(null);
  const router = useRouter();

  const closeMenu = useCallback(() => setHoverItem(null), []);

  return (
    <nav className={classNames('', className)} onMouseLeave={closeMenu}>
      <button
        className={classNames(
          'text-base font-medium text-gray-300 hover:text-white px-6 py-3',
          { 'underline !text-white': /^\/bits/.test(router.asPath) }
        )}
        onMouseEnter={() => setHoverItem('BITS')}
      >
        Bits
      </button>
      <button
        className={classNames(
          'text-base font-medium text-gray-300 hover:text-white px-6 py-3',
          { 'underline !text-white': /^\/hire/.test(router.asPath) }
        )}
        onMouseEnter={() => setHoverItem('CREATE')}
      >
        Create
      </button>
      <button
        className={classNames(
          'text-base font-medium text-gray-300 hover:text-white px-6 py-3',
          { 'underline !text-white': /^\/hire/.test(router.asPath) }
        )}
        onMouseEnter={() => setHoverItem('LEARN')}
      >
        Learn
      </button>
      <AnimatePresence>
        {hoverItem && (
          <motion.div
            className="absolute top-16 left-0 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* empty div to add margin-top without triggering onMouseLeave */}
            <div className="h-8 bg-transparent" />
            <div className="p-8 bg-dropdown !backdrop-blur-[100px] min-h-[180px] rounded-3xl flex">
              {/* left panel */}
              {hoverItem === 'BITS' ? (
                <div>
                  <p className="text-xl font-bold">
                    <span className="text-green-primary">Flexibly Earn</span>{' '}
                    Coding
                  </p>
                  <p className="text-secondary mt-3">
                    Fast payouts, anonymity, diverse challenges, global
                    <br />
                    opportunites, and the flexibility to work how you want
                  </p>
                  <Link
                    href="/bits"
                    className="mt-9 inline-flex items-center gap-3 hover:text-green-primary"
                    onClick={closeMenu}
                  >
                    <span className="font-bold underline capitalize">
                      Browse all Bits
                    </span>
                    <RiArrowRightSLine className="h-5 w-5" />
                  </Link>
                </div>
              ) : hoverItem === 'CREATE' ? (
                <div>
                  <p className="text-xl font-bold">
                    On-Demand{' '}
                    <span className="text-green-primary">Professionals</span>
                  </p>
                  <p className="text-secondary mt-3">
                    Expert developers start coding your needs immediately,
                    <br />
                    consistently providing correct and performant deliverables
                  </p>
                  <Link
                    href="https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
                    className="mt-9 inline-flex items-center gap-3 hover:text-green-primary"
                    onClick={closeMenu}
                    target="_blank"
                  >
                    <span className="font-bold underline capitalize">
                      See guide
                    </span>
                    <RiArrowRightSLine className="h-5 w-5" />
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-xl font-bold">
                    Discover <span className="text-green-primary">Engi</span>
                  </p>
                  <p className="text-secondary mt-3">
                    Learn how decentralized development empowers <br />
                    professional coders and accelerates technology companies
                  </p>
                  <Link
                    href="https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
                    className="mt-9 inline-flex items-center gap-3 hover:text-green-primary"
                    onClick={closeMenu}
                    target="_blank"
                  >
                    <span className="font-bold underline capitalize">
                      See guide
                    </span>
                    <RiArrowRightSLine className="h-5 w-5" />
                  </Link>
                </div>
              )}
              <div className="w-[1px] bg-white/30 opacity-30 mx-12" />
              {/* right panel */}
              <div className="flex flex-col gap-9 mr-4">
                <AnimatePresence>
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
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
        className={classNames(
          'flex items-center justify-between !w-56 hover:text-green-primary',
          className
        )}
        initial={{ opacity: 0, height: 30, width: 0 }}
        animate={{ opacity: 1, height: 'auto', width: 'auto' }}
        transition={{
          duration: 0.3,
        }}
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
