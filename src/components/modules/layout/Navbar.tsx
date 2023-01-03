import { Dialog, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, XIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { useRouter } from 'next/router';
import MenuSvg from 'public/img/home/menu.svg';
import Button from '~/components/global/Button/Button';
import Logo from '~/components/Logo';
import { useUser } from '~/utils/contexts/userContext';
import BlockchainHealth from './BlockchainHealth';
import UserInfo from './navbar/UserInfo';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="relative">
      <div className="flex items-center tablet:justify-between max-w-page p-6 tablet:px-0">
        <Link href="/" className="flex mr-10">
          <Logo className="h-8 w-8" />
        </Link>
        {/* non-mobile nav */}
        <nav
          // as="nav"
          className="flex-1 hidden tablet:flex gap-x-12 ml-8 lg:gap-x-16 lg:ml-12"
        >
          <Link
            href="/jobs"
            className={classNames(
              'text-base font-medium text-gray-300 hover:text-white',
              { 'underline !text-white': /^\/jobs/.test(router.asPath) }
            )}
          >
            Earn
          </Link>
          <Link
            href="/hire"
            className={classNames(
              'text-base font-medium text-gray-300 hover:text-white',
              { 'underline !text-white': /^\/hire/.test(router.asPath) }
            )}
          >
            Post
          </Link>
          <div className="relative">
            <Menu>
              <Menu.Button
                className={classNames(
                  'flex items-center gap-x-1',
                  'text-secondary font-medium hover:text-white',
                  'outline-none focus-visible:ring-2 focus-visible:ring-green-primary',
                  {
                    'underline !text-white': /^\/about|contact/.test(
                      router.asPath
                    ),
                  }
                )}
              >
                Learn <ChevronDownIcon className="h-4 w-4" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Menu.Items
                  className={classNames(
                    'focus:outline-none absolute w-56 top-full mt-2',
                    'grid gap-1 bg-[#374151ee] py-1'
                  )}
                >
                  {[
                    { name: 'About', href: '/about' },
                    {
                      name: 'Contact',
                      href: '/contact',
                    },
                    {
                      name: 'Documentation',
                      href: 'https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10',
                    },
                    {
                      name: 'Litepaper',
                      href: 'https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf',
                    },
                    {
                      name: 'Blockchain',
                      href: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fmainnet.engi.network%3A9944#/explorer',
                    },
                  ].map(({ name, href }) => (
                    <Menu.Item key={name}>
                      <button
                        onClick={() => {
                          if (href.startsWith('/')) {
                            router.push(href);
                          } else {
                            window?.open(href, '_blank');
                          }
                        }}
                        className={classNames(
                          'block rounded-md p-3',
                          'transition duration-150 ease-in-out hover:bg-black/10',
                          'hover:text-green-primary text-white'
                        )}
                      >
                        {name}
                      </button>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </nav>
        {user ? (
          <UserInfo
            className="hidden tablet:flex"
            user={user}
            setUser={setUser}
          />
        ) : (
          <>
            <BlockchainHealth className="hidden laptop:flex" isStacked />
            <Link href="/signup" className="hidden laptop:flex">
              <Button className="ml-8 !text-green-primary">Get Started</Button>
            </Link>
          </>
        )}
        {/* mobile nav */}
        <div className="ml-auto -mr-2 -my-2 tablet:hidden">
          <button
            className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-primary"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <MenuSvg className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* mobile nav popover menu */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-[10px]" />
          </Transition.Child>
          <div className="fixed inset-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full h-full flex flex-col bg-[#374151] p-6">
                <div className="flex items-center justify-between mt-[2px]">
                  <div>
                    <Logo className="h-8 w-8" />
                  </div>
                  <div className="-mr-2">
                    <button
                      className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid grid-cols-1 gap-4">
                    <Link
                      href="/"
                      className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Home</span>
                      <ChevronRightIcon className="h-6" />
                    </Link>
                    <Link
                      href="/jobs"
                      className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Earn</span>
                      <ChevronRightIcon className="h-6" />
                    </Link>
                    <Link
                      href="/hire"
                      className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Post</span>
                      <ChevronRightIcon className="h-6" />
                    </Link>
                    <p className="font-bold text-white text-2xl mt-8">Learn</p>
                    <Link
                      href="/about"
                      className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>About</span>
                      <ChevronRightIcon className="h-6" />
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Contact</span>
                      <ChevronRightIcon className="h-6" />
                    </Link>
                    <Link
                      href="https://button-produce-60a.notion.site/Engi-Cookbook-68c2d1347ecd499d8901ae387829ba10"
                      target="_blank"
                      className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Documentation</span>
                      <ChevronRightIcon className="h-6" />
                    </Link>
                    <Link
                      href="https://engi-website-terraform.s3.us-west-2.amazonaws.com/downloads/engi-lightpaper-searchable.pdf"
                      target="_blank"
                      className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>Litepaper</span>
                      <ChevronRightIcon className="h-6" />
                    </Link>
                  </nav>
                </div>
                {user ? (
                  <UserInfo
                    className="mt-auto mx-auto"
                    user={user}
                    setUser={setUser}
                  />
                ) : (
                  <>
                    <BlockchainHealth className="mt-auto mx-auto" isStacked />
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <button
                        className={classNames(
                          'mt-8 py-4 w-full text-white font-bold',
                          'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus-visible:ring-2'
                        )}
                      >
                        Get Started
                      </button>
                    </Link>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
