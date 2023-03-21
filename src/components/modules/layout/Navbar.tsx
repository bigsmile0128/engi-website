import { Dialog, Transition } from '@headlessui/react';
import { ChevronLeftIcon, XIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import MenuSvg from 'public/img/home/menu.svg';
import 'react-popper-tooltip/dist/styles.css';
import Button from '~/components/global/Button/Button';
import Logo from '~/components/Logo';
import { useUser } from '~/utils/contexts/userContext';
import BlockchainHealth from './BlockchainHealth';
import AnimatedNav from './navbar/AnimatedNav';
import UserInfo from './navbar/UserInfo';
import { RiNotification4Line } from 'react-icons/ri';
import Avvvatars from 'avvvatars-react';
import { isDev } from '~/utils';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const { user, setUser } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <header className={classNames('relative', className)}>
      <div className="relative flex items-center laptop:justify-between max-w-page p-6 laptop:px-0">
        <Link href="/" className="flex mr-10">
          <Logo className="h-8 w-8" />
        </Link>
        {/* DESKTOP nav */}
        <AnimatedNav className="hidden laptop:flex ml-4 mr-auto" />
        {user ? (
          <UserInfo
            className="hidden laptop:flex"
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
        {/* MOBILE notifications button */}
        {isDev() && (
          <div className="ml-auto tablet:hidden">
            <button
              className="relative rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-300 focus-green-primary"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <span className="sr-only">Open notifications</span>
              <RiNotification4Line className="h-6 w-6" aria-hidden="true" />
              <div className="absolute bg-red-primary h-2 w-2 top-1 right-1 rounded-full" />
            </button>
          </div>
        )}
        {/* TABLET/MOBILE nav */}
        <div className={classNames('laptop:hidden', isDev() ? '' : 'ml-auto')}>
          <button
            className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-300 focus-green-primary"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <MenuSvg className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* TABLET/MOBILE nav popover menu */}
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
                      href="/bits"
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
                      <span>Create</span>
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
      {/* TABLET/MOBILE nav popover menu */}
      <Transition appear show={isNotificationsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsNotificationsOpen(false)}
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
            <div className="fixed inset-0" />
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
              <Dialog.Panel className="w-full h-full flex flex-col bg-site">
                <div className="flex items-center p-6 pl-4">
                  <button
                    className="rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-300 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-primary"
                    onClick={() => setIsNotificationsOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <p className="font-grifter text-2xl -mb-2">Notifications</p>
                </div>
                <div className="w-full h-[1px] border-t border-white/30" />
                <div className="mt-4 flex items-center justify-between p-6 pb-4">
                  <p className="font-grifter text-xl">New</p>
                  <button className="opacity-80 underline text-sm">
                    Mark all as read
                  </button>
                </div>
                <div className="bg-secondary/40 backdrop-blur-[100px] p-6 flex items-start gap-6">
                  <div className="relative shrink-0">
                    <Avvvatars value={'MB'} size={48} />
                    <div className="absolute h-2 w-2 bg-green-primary rounded-full translate-y-center -translate-x-full -left-2" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm">
                      <span className="font-bold">Michael Betten posted</span>
                      {': '}
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus in elit vel mauris tincidunt porta.
                      </span>
                    </span>
                    <span className="text-sm text-secondary">40 min ago</span>
                  </div>
                </div>
                <p className="mt-4 font-grifter text-xl p-6 pb-0">Earlier</p>
                <div className="flex flex-col w-full divide-y divide-white/30">
                  <div className="p-6 flex items-start gap-6">
                    <div className="shrink-0">
                      <Avvvatars value={'MB'} size={48} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm">
                        <span className="font-bold">Michael Betten posted</span>
                        {': '}
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vivamus in elit vel mauris tincidunt porta.
                        </span>
                      </span>
                      <span className="text-sm text-secondary">40 min ago</span>
                    </div>
                  </div>
                  <div className="p-6 flex items-start gap-6">
                    <div className="shrink-0">
                      <Avvvatars value={'MB'} size={48} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-sm">
                        <span className="font-bold">Michael Betten posted</span>
                        {': '}
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vivamus in elit vel mauris tincidunt porta.
                        </span>
                      </span>
                      <span className="text-sm text-secondary">40 min ago</span>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
