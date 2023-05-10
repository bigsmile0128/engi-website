import classNames from 'classnames';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    href: '/bits?technologies=solidity,solang,ink',
  },
  {
    title: 'Substrate, DotSama',
    description: 'Build Multi-Chain',
    href: '/bits?technologies=SUBSTRATE',
  },
  {
    title: 'Rust, C++, C SDKs',
    description: 'Author Critical Libraries',
    href: '/bits?technologies=RUST,C++,C',
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
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const pathname = usePathname() ?? '';

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
              /^\/bits/.test(pathname),
          }
        )}
        onMouseEnter={() => setHoverItem('BITS')}
      >
        Bits
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
              /^\/hire/.test(pathname),
          }
        )}
      >
        Learn
        {/* larger hover target */}
        <div
          className="absolute inset-0 w-400p h-125p"
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
              'bg-dropdown !backdrop-blur-[100px] rounded-3xl flex overflow-hidden p-8',
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
                    opportunites, and the flexibility to work how you want
                  </motion.p>
                  <Link
                    href="/bits"
                    className="block mt-8 hover:text-green-primary"
                    onClick={closeMenu}
                  >
                    <motion.span
                      layout="position"
                      className="flex items-center gap-3 font-bold underline capitalize"
                    >
                      Browse all Bits
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
                    href="https://engi-network.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
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
                    href="https://engi-network.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
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
              className="w-[1px] bg-white/30 opacity-30 mx-12"
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
          'flex items-center justify-between !w-56 hover:text-green-primary',
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
