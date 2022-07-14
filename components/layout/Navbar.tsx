import React, { Fragment, useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';

import { isBeta, isDev } from 'utils';
import Logo from 'components/Logo';
import MenuSvg from 'components/home/img/menu.svg';
import BlockchainHealth from './BlockchainHealth';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <Popover className="">
        <div className="flex items-center sm:justify-between max-w-page p-6 sm:px-0">
          <Link href="/">
            <a className="flex mr-10">
              <Logo className="h-8 w-8" />
            </a>
          </Link>
          {/* non-mobile nav */}
          <Popover.Group
            as="nav"
            className="flex-1 hidden sm:flex gap-x-8 ml-8 md:gap-x-12 lg:gap-x-16 lg:ml-12"
          >
            <Link href="/litepaper">
              <a className="text-base font-medium text-gray-300 hover:text-white">
                Litepaper
              </a>
            </Link>
            {isBeta() && <></>}
            {isDev() && (
              <>
                <Link href="/press">
                  <a className="text-base font-medium text-gray-300 hover:text-white">
                    Press
                  </a>
                </Link>
                <Link href="/jobs">
                  <a className="text-base font-medium text-gray-300 hover:text-white">
                    Jobs
                  </a>
                </Link>
                <Link href="/hire">
                  <a className="text-base font-medium text-gray-300 hover:text-white">
                    Hire
                  </a>
                </Link>
              </>
            )}
          </Popover.Group>
          <BlockchainHealth className="sm:hidden ml-auto !gap-x-6" isStacked />
          <BlockchainHealth className="hidden sm:flex lg:hidden" />
          <BlockchainHealth className="hidden lg:flex" isStacked />
          <Link href="/signup">
            <a>
              <button
                className={classNames(
                  'hidden sm:block px-6 py-4 text-white font-bold ml-8',
                  'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
                )}
              >
                Get Started
              </button>
            </a>
          </Link>
          {/* mobile nav */}
          <div className="ml-6 -mr-2 -my-2 sm:hidden">
            <button
              className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-300"
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
                        className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-300"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid grid-cols-1 gap-4">
                      <Link href="/">
                        <a
                          className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>Home</span>
                          <ChevronRightIcon className="h-6" />
                        </a>
                      </Link>
                      <Link href="/litepaper">
                        <a
                          className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>Litepaper</span>
                          <ChevronRightIcon className="h-6" />
                        </a>
                      </Link>
                      {isBeta() && <></>}
                      {isDev() && (
                        <>
                          <Link href="/press">
                            <a
                              className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                              onClick={() => setIsOpen(false)}
                            >
                              <span>Press</span>
                              <ChevronRightIcon className="h-6" />
                            </a>
                          </Link>
                          <Link href="/jobs">
                            <a
                              className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                              onClick={() => setIsOpen(false)}
                            >
                              <span>Jobs</span>
                              <ChevronRightIcon className="h-6" />
                            </a>
                          </Link>
                          <Link href="/hire">
                            <a
                              className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500"
                              onClick={() => setIsOpen(false)}
                            >
                              <span>Hire</span>
                              <ChevronRightIcon className="h-6" />
                            </a>
                          </Link>
                        </>
                      )}
                    </nav>
                  </div>
                  <BlockchainHealth className="mt-auto mx-auto" isStacked />
                  <Link href="/signup">
                    <a onClick={() => setIsOpen(false)}>
                      <button
                        className={classNames(
                          'mt-8 py-4 w-full text-white font-bold',
                          'bg-[#00000022] hover:bg-gray-700 active:bg-gray-600 border border-white outline-none focus:ring-2'
                        )}
                      >
                        Get Started
                      </button>
                    </a>
                  </Link>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </Popover>
    </header>
  );
}
