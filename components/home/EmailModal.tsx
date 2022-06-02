import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import classNames from 'classnames';
import { XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import {
  SiDiscord,
  SiJava,
  SiJavascript,
  SiLinkedin,
  SiPython,
  SiRust,
  SiTiktok,
  SiTwitter,
} from 'react-icons/si';

import Modal, { ModalProps } from 'components/Modal';
import Button from 'components/Button';
import EnvelopeSvg from './img/envelope.svg';
import CopyLink from 'components/CopyLink';
import Checkbox from 'components/Checkbox';

enum Interest {
  PROGRAMMER = 'engi-programmer',
  BUSINESS = 'engi-business',
  INVESTOR = 'engi-investor',
  CURIOUS = 'engi-curious',
}

enum BusinessReason {
  UI = 'ui-engineering',
  SMART_CONTRACT = 'smart-contract',
  LIBRARY = 'library',
  OTHER = 'other',
}

interface EmailModalProps extends ModalProps {
  onInterestClick: (interest) => void;
}

enum Page {
  REGISTER,
  SUCCESS,
  SHARE,
}

export default function EmailModal({
  isOpen,
  setIsOpen,
  onInterestClick,
}: EmailModalProps) {
  // TODO: reset to empty string
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(
    Interest.PROGRAMMER
  );
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedBusinessReasons, setSelectedBusinessReasons] = useState<
    BusinessReason[]
  >([]);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [page, setPage] = useState(Page.REGISTER);

  useEffect(() => {
    // reset state when opened
    if (isOpen) {
      setSelectedInterest(Interest.PROGRAMMER);
      setSelectedLanguage('');
      setSelectedBusinessReasons([]);
      setPage(Page.REGISTER);
    }
  }, [isOpen]);

  const onChangeBusinessReason = (checked, businessReason: BusinessReason) => {
    if (checked) {
      setSelectedBusinessReasons([...selectedBusinessReasons, businessReason]);
    } else {
      setSelectedBusinessReasons(
        selectedBusinessReasons.filter((reason) => reason !== businessReason)
      );
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
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
                onClick={() => setIsOpen(false)}
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
                <InterestButton
                  label="I'm a programmer"
                  value={Interest.PROGRAMMER}
                  onClick={(value) => setSelectedInterest(value)}
                  active={selectedInterest === Interest.PROGRAMMER}
                />
                {selectedInterest === Interest.PROGRAMMER && (
                  <div>
                    <p className="mb-2">What is your primary language?</p>
                    <div className="grid grid-rows-2 grid-cols-2 gap-x-4 gap-y-4 text-[#F27B50] text-lg">
                      <LanguageButton
                        onClick={() => setSelectedLanguage('javascript')}
                        active={selectedLanguage === 'javascript'}
                      >
                        <SiJavascript />
                      </LanguageButton>
                      <LanguageButton
                        onClick={() => setSelectedLanguage('python')}
                        active={selectedLanguage === 'python'}
                      >
                        <SiPython />
                      </LanguageButton>
                      <LanguageButton
                        onClick={() => setSelectedLanguage('rust')}
                        active={selectedLanguage === 'rust'}
                      >
                        <SiRust />
                      </LanguageButton>
                      <LanguageButton
                        onClick={() => setSelectedLanguage('java')}
                        active={selectedLanguage === 'java'}
                      >
                        <SiJava />
                      </LanguageButton>
                    </div>
                  </div>
                )}
                <InterestButton
                  label="I'm a business"
                  value={Interest.BUSINESS}
                  onClick={(value) => setSelectedInterest(value)}
                  active={selectedInterest === Interest.BUSINESS}
                />
                {selectedInterest === Interest.BUSINESS && (
                  <div>
                    <p className="mb-2">
                      What type of work do you want to get done?
                    </p>
                    <div className="flex flex-col gap-y-4">
                      {[
                        { label: 'UI Engineering', value: BusinessReason.UI },
                        {
                          label: 'Smart Contract',
                          value: BusinessReason.SMART_CONTRACT,
                        },
                        {
                          label: 'Library/SDK Development',
                          value: BusinessReason.LIBRARY,
                        },
                        { label: 'Other', value: BusinessReason.OTHER },
                      ].map(({ label, value }) => (
                        <Checkbox
                          key={value}
                          id={value}
                          label={label}
                          checked={selectedBusinessReasons.includes(value)}
                          onChange={(checked) => {
                            onChangeBusinessReason(checked, value);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <InterestButton
                  label="I'm an investor"
                  value={Interest.INVESTOR}
                  onClick={(value) => setSelectedInterest(value)}
                  active={selectedInterest === Interest.INVESTOR}
                />
                <InterestButton
                  label="I'm curious"
                  value={Interest.CURIOUS}
                  onClick={(value) => setSelectedInterest(value)}
                  active={selectedInterest === Interest.CURIOUS}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Button
              className="w-full"
              onClick={() => {
                onInterestClick(selectedInterest);
                setPage(Page.SUCCESS);
              }}
            >
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
            onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <p className="font-semibold text-lg mt-6">Page Link</p>
            <CopyLink className="mt-2" value="https://engi.network/" />
            <div className="flex items-center justify-between mt-12 gap-x-4 xs:gap-x-8  text-xl xs:text-2xl">
              <Link href="https://twitter.com/engi_network">
                <a
                  className="p-3 xs:p-4 border border-emerald-300 rounded-full hover:text-gray-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SiDiscord />
                </a>
              </Link>
              {/* <Link href="https://twitter.com/engi_network">
                <a className="p-3 xs:p-4 border border-emerald-300 rounded-full hover:text-gray-300" target="_blank" rel="noreferrer">
                  <SiTiktok />
                </a>
              </Link> */}
              <Link href="https://linkedin.com/company/engi-network">
                <a
                  className="p-3 xs:p-4 border border-emerald-300 rounded-full hover:text-gray-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SiLinkedin />
                </a>
              </Link>
              <Link href="https://twitter.com/engi_network">
                <a
                  className="p-3 xs:p-4 border border-emerald-300 rounded-full hover:text-gray-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SiTwitter />
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}

export function InterestButton({ active, label, value, onClick }) {
  return (
    <button
      className={classNames(
        'py-3 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-200 border',
        active
          ? 'text-gray-800 border-emerald-300 bg-emerald-300 font-medium'
          : 'border-gray-500 text-gray-300 hover:bg-gray-700 active:bg-gray-600'
      )}
      key={value}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
}

export function LanguageButton({ className = '', active, children, ...props }) {
  return (
    <button
      className={classNames(
        'py-3 flex items-center justify-center border border-gray-500 bg-gradient-to-r from-[#ffffff22] via-[#ffffff11]',
        active ? 'border-emerald-300' : 'hover:border-gray-300'
      )}
      {...props}
    >
      {children}
    </button>
  );
}
