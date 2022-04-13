import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import classNames from 'classnames';
import Modal, { ModalProps } from '../../components/Modal';

const interests = [
  { label: 'Programmer', value: 'engi-programmer' },
  { label: 'Business', value: 'engi-business' },
  { label: 'Investor', value: 'engi-investor' },
  { label: 'Curious', value: 'engi-curious' },
];

interface EmailModalProps extends ModalProps {
  onInterestClick: (interest: string) => void;
}

export default function EmailModal({
  open,
  setOpen,
  onInterestClick,
}: EmailModalProps) {
  const [selectedInterest, setSelectedInterest] = useState('');

  useEffect(() => {
    // reset button state when opened
    if (!open) {
      setSelectedInterest('');
    }
  }, [open]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="mt-3 sm:mt-5">
        <Dialog.Title
          as="h3"
          className="font-grifter text-3xl leading-6 text-gray-300"
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
          <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-4">
            {interests.map(({ label, value }) => (
              <button
                className={classNames(
                  'py-3 px-6 text-sm focus:outline-none focus:ring',
                  {
                    'border border-gray-600 text-gray-400 hover:bg-gray-600 active:bg-gray-500':
                      selectedInterest !== value,
                    'bg-teal-400 font-medium text-gray-800':
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
      <div className="mt-5 sm:mt-10">
        <button
          type="button"
          className="inline-flex w-full justify-center border border-gray-400 bg-gray-700 px-4 py-4 text-base font-medium text-teal-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 sm:text-sm"
          onClick={() => setOpen(false)}
        >
          Dismiss
        </button>
      </div>
    </Modal>
  );
}
