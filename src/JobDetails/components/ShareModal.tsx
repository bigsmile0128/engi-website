import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import CopyLink from '../../components/CopyLink';
import { SiDiscord, SiInstagram, SiTiktok, SiTwitter } from 'react-icons/si';

export default function ShareModal({ open, setOpen }) {
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-center sm:items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-[#232323cc] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full sm:p-6 sm:py-8">
                <div>
                  <div className="">
                    <div className="flex items-center justify-between">
                      <Dialog.Title
                        as="h3"
                        className="font-grifter text-3xl text-gray-300 align-baseline -mb-2"
                      >
                        Share
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-md text-gray-400 hover:text-gray-300 active:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <button className="border border-gray-500 rounded-full p-3 sm:p-4 hover:text-gray-200 active:text-gray-300">
                        <SiTwitter className="text-xl sm:text-3xl" />
                      </button>
                      <button className="border border-gray-500 rounded-full p-3 sm:p-4 hover:text-gray-200 active:text-gray-300">
                        <SiInstagram className="text-xl sm:text-3xl" />
                      </button>
                      <button className="border border-gray-500 rounded-full p-3 sm:p-4 hover:text-gray-200 active:text-gray-300">
                        <SiDiscord className="text-xl sm:text-3xl" />
                      </button>
                      <button className="border border-gray-500 rounded-full p-3 sm:p-4 hover:text-gray-200 active:text-gray-300">
                        <SiTiktok className="text-xl sm:text-3xl" />
                      </button>
                    </div>
                    <div className="mt-4 sm:mt-8">
                      <p className="font-bold mb-2 text-lg">Job Link</p>
                      <CopyLink value={window.location.href} />
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div
        className={classNames(
          'backdrop-blur-[10px] absolute top-0 right-0 bottom-0 left-0 z-10',
          { hidden: !open, block: open }
        )}
      />
    </>
  );
}
