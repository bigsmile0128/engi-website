import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';

const interests = [
  { label: 'Programmer', value: 'engi-programmer' },
  { label: 'Business', value: 'engi-business' },
  { label: 'Investor', value: 'engi-investor' },
  { label: 'Curious', value: 'engi-curious' },
];

export default function EmailModal({ open, setOpen, onInterestClick }) {
  const [selectedInterest, setSelectedInterest] = useState('');

  useEffect(() => {
    // reset button state when opened
    if (!open) {
      setSelectedInterest('');
    }
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
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
            <div className="relative inline-block align-bottom bg-[#232323cc] px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="mt-3 sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-grifter text-3xl text-gray-300"
                  >
                    You'll be notified!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Willing to share some additional information with us?
                    </p>
                  </div>
                  <div className="mt-8">
                    <p className="text-sm text-gray-400">
                      Select what best describes you.
                    </p>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
                      {interests.map(({ label, value }) => (
                        <button
                          className={classNames(
                            'py-3 px-6 text-sm focus:outline-none focus:ring',
                            {
                              'border border-gray-600 text-gray-400 hover:bg-gray-600 active:bg-gray-500':
                                selectedInterest !== value,
                              'text-gray-800 bg-teal-400 font-medium':
                                selectedInterest === value,
                            }
                          )}
                          key={value}
                          onClick={() => {
                            setSelectedInterest(value);
                            onInterestClick(value);
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-10">
                <button
                  type="button"
                  className="inline-flex justify-center w-full border border-gray-400 px-4 py-4 bg-gray-700 text-base font-medium text-teal-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
