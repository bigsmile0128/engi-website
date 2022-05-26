import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import classNames from 'classnames';
import Modal, { ModalProps } from 'components/Modal';
import { XIcon } from '@heroicons/react/outline';
import Button from 'components/Button';
import EnvelopeSvg from './img/envelope.svg';
import CopyLink from 'components/CopyLink';
import { SiDiscord, SiLinkedin, SiTiktok, SiTwitter } from 'react-icons/si';

const interests = [
  { label: "I'm a programmer", value: 'engi-programmer' },
  { label: "I'm a business", value: 'engi-business' },
  { label: "I'm an investor", value: 'engi-investor' },
  { label: "I'm curious", value: 'engi-curious' },
];

interface EmailModalProps extends ModalProps {
  onInterestClick: (interest) => void;
}

enum Page {
  REGISTER,
  SUCCESS,
  SHARE,
}

export default function EmailModal({
  open,
  setOpen,
  onInterestClick,
}: EmailModalProps) {
  const [selectedInterest, setSelectedInterest] = useState('');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [page, setPage] = useState(Page.REGISTER);

  useEffect(() => {
    // reset state when opened
    if (open) {
      setSelectedInterest('');
      setPage(Page.REGISTER);
    }
  }, [open]);

  return (
    <Modal open={open} setOpen={setOpen}>
      {page === Page.REGISTER ? (
        <>
          <div className="">
            <div className="flex items-start justify-between">
              <Dialog.Title
                as="h3"
                className="font-grifter text-3xl text-white"
              >
                <span>
                  Tell us <span className="text-emerald-300">more!</span>
                </span>
              </Dialog.Title>
              <button
                className="text-white hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-200"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-6 font-semibold text-lg">
              What brings you to Engi?
            </p>
            <div className="mt-4">
              <div className="flex flex-col gap-y-4">
                {interests.map(({ label, value }) => (
                  <button
                    className={classNames(
                      'py-3 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-200 border',
                      {
                        'border-gray-500 text-gray-300 hover:bg-gray-700 active:bg-gray-600':
                          selectedInterest !== value,
                        'text-gray-800 border-emerald-300 bg-emerald-300 font-medium':
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
            <Button className="w-full" onClick={() => setPage(Page.SUCCESS)}>
              Personalize my updates
            </Button>
          </div>
        </>
      ) : page === Page.SUCCESS ? (
        <>
          <div className="">
            <Dialog.Title as="h3" className="font-grifter text-3xl text-white">
              <span className="block">{"We'll keep you"}</span>
              <span className="text-emerald-300">updated</span>
            </Dialog.Title>
            <p className="mt-6 text-gray-300 max-w-xs">
              You can also share this amazing journey with your friends.
            </p>
            <EnvelopeSvg className="h-40 w-40 mx-auto my-8" />
          </div>
          <Button className="w-full" onClick={() => setPage(Page.SHARE)}>
            Share
          </Button>
          <button
            type="button"
            className="mt-4 w-full border border-white bg-[#00000022] py-4 hover:bg-[#ffffff22]"
            onClick={() => setOpen(false)}
          >
            Dismiss
          </button>
        </>
      ) : (
        <>
          <div className="">
            <div className="flex items-start justify-between">
              <Dialog.Title
                as="h3"
                className="font-grifter text-3xl text-white"
              >
                <span className="text-emerald-300">Share</span>
              </Dialog.Title>
              <button
                className="text-white hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-200"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="font-semibold text-lg mt-6">Page Link</p>
            <CopyLink className="mt-2" value="https://engi.network/" />
            <div className="flex items-center justify-between mt-12 gap-x-4 xs:gap-x-8">
              <button className="p-3 xs:p-4 text-xl xs:text-2xl border border-emerald-300 rounded-full hover:text-gray-300">
                <SiDiscord />
              </button>
              <button className="p-3 xs:p-4 text-xl xs:text-2xl border border-emerald-300 rounded-full hover:text-gray-300">
                <SiTiktok />
              </button>
              <button className="p-3 xs:p-4 text-xl xs:text-2xl border border-emerald-300 rounded-full hover:text-gray-300">
                <SiLinkedin />
              </button>
              <button className="p-3 xs:p-4 text-xl xs:text-2xl border border-emerald-300 rounded-full hover:text-gray-300">
                <SiTwitter />
              </button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
