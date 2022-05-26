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
          className="fixed z-30 inset-0 overflow-y-auto"
          onClose={setOpen}
          initialFocus={ref}
        >
          <div
            className="flex items-center sm:items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
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
              <Dialog.Overlay />
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
              <div className="relative inline-block align-bottom bg-[#232323ee] text-left overflow-hidden shadow-xl transform transition-all sm:align-middle p-6 py-8 w-full xs:max-w-sm">
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div
        className={classNames(
          'backdrop-blur-[10px] absolute top-0 right-0 bottom-0 left-0 z-20',
          { hidden: !open, block: open }
        )}
      />
    </>
  );
}
