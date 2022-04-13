import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Dialog, Transition } from '@headlessui/react';

export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: any;
}

export default function Modal({ open, setOpen, children }: ModalProps) {
  const ref = React.useRef(null);
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setOpen}
          initialFocus={ref}
        >
          <div
            className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:items-end sm:p-0"
            ref={ref}
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="sm:inline-block sm:h-screen sm:align-middle"
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
              <div className="relative inline-block transform overflow-hidden bg-[#232323cc] px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:w-full sm:max-w-sm sm:p-6 sm:py-8 sm:align-middle">
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div
        className={classNames(
          'absolute top-0 right-0 bottom-0 left-0 z-10 backdrop-blur-[10px]',
          { hidden: !open, block: open }
        )}
      />
    </>
  );
}
