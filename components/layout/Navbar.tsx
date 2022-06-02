import React, { Fragment } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';

import { isDevEnv } from 'utils';
import Logo from 'components/Logo';
import BlockchainHealth from './BlockchainHealth';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <header>
      <Popover className="relative">
        <div className="flex items-center justify-between max-w-page p-6 sm:px-0">
          <div className="flex mr-10">
            <Logo className="h-8 w-8" />
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-300">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="flex-1 hidden md:flex space-x-16 justify-start ml-12"
          >
            <Link href="/litepaper">
              <a className="text-base font-medium text-gray-300 hover:text-white">
                Litepaper
              </a>
            </Link>
            <Link href="/press">
              <a className="text-base font-medium text-gray-300 hover:text-white">
                Press
              </a>
            </Link>
          </Popover.Group>
          <BlockchainHealth className="hidden md:flex" />
        </div>
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-800 divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Logo className="h-8 w-8" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-300">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid grid-cols-1 gap-4">
                    <Link href="/">
                      <a className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500">
                        <span>Home</span>
                        <ChevronRightIcon className="h-6" />
                      </a>
                    </Link>
                    <Link href="/litepaper">
                      <a className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500">
                        <span>Litepaper</span>
                        <ChevronRightIcon className="h-6" />
                      </a>
                    </Link>
                    <Link href="/press">
                      <a className="flex items-center justify-between py-4 font-semibold text-white hover:text-gray-300 border-b border-gray-500">
                        <span>Press</span>
                        <ChevronRightIcon className="h-6" />
                      </a>
                    </Link>
                    <BlockchainHealth className="justify-self-center mt-8" />
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
}
