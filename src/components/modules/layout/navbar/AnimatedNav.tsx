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
    title: 'C# Bits',
    description: 'View Bits',
    href: '/bits?language=C_SHARP',
  },
  {
    title: 'JavaScript Bits',
    description: 'View Bits',
    href: '/bits?language=JAVA_SCRIPT',
  },
  {
    title: 'Python Bits',
    description: 'View Bits',
    href: '/bits?language=PYTHON',
  },
  {
    title: 'Rust Bits',
    description: 'View Bits',
    href: '/bits?language=RUST',
  },
];

const CREATE_LINKS = [
  {
    title: 'Connect your repositories',
    description: 'Add or remove repositories',
    href: '/settings',
  },
  {
    title: 'Create Bit',
    description: 'Use our intuitive UI',
    href: '/hire',
  },
  {
    title: 'Create Bit with CLI',
    description: 'Use our convenient CLI',
    href: 'https://github.com/engi-network/cli',
  },
];

const LEARN_LINKS = [
  {
    title: 'About',
    description: 'Learn about our team',
    href: '/about',
  },
  {
    title: 'Litepaper',
    description: 'Read our litepaper',
    href: 'https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf',
  },
  {
    title: 'Blockchain',
    description: 'View the blockchain',
    href: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fmainnet.engi.network%3A9944#/explorer',
  },
  {
    title: 'Contact',
    description: 'Contact our team',
    href: '/contact',
  },
];

export default function AnimatedNav({ className }: AnimatedNavProps) {
  const [hoverItem, setHoverItem] = useState(null);
  const router = useRouter();

  const closeMenu = useCallback(() => {
    setHoverItem(null);
  }, []);

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
                    Try engineering work ready for you
                  </motion.p>
                  <motion.p layout="position" className="text-secondary mt-3">
                    See what work is available to start now
                  </motion.p>
                  <Link
                    href="/bits"
                    className="block mt-8 hover:text-green-primary"
                    onClick={closeMenu}
                  >
                    <motion.span
                      layout="position"
                      className="flex items-center gap-3 font-bold underline"
                    >
                      Browse all Bits
                      <RiArrowRightSLine className="h-5 w-5" />
                    </motion.span>
                  </Link>
                </>
              ) : hoverItem === 'CREATE' ? (
                <>
                  <motion.p layout="position" className="text-xl font-bold">
                    On demand software engineering
                  </motion.p>
                  <motion.p layout="position" className="text-secondary mt-3">
                    Check out our guide on creating bits
                  </motion.p>
                  <Link
                    href="https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
                    className="block mt-8 hover:text-green-primary"
                    onClick={closeMenu}
                    target="_blank"
                  >
                    <motion.span
                      layout="position"
                      className="flex items-center gap-3 font-bold underline"
                    >
                      See guide
                      <RiArrowRightSLine className="h-5 w-5" />
                    </motion.span>
                  </Link>
                </>
              ) : (
                <>
                  <motion.p layout="position" className="text-xl font-bold">
                    Learn more about engi
                  </motion.p>
                  <motion.p layout="position" className="text-secondary mt-3">
                    Check out our guide
                  </motion.p>
                  <Link
                    href="https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
                    className="block mt-8 hover:text-green-primary"
                    onClick={closeMenu}
                    target="_blank"
                  >
                    <motion.span
                      layout="position"
                      className="flex items-center gap-3 font-bold underline"
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
            <AnimatePresence exitBeforeEnter>
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
