import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import { SiDiscord } from '@react-icons/all-files/si/SiDiscord';
import { SiInstagram } from '@react-icons/all-files/si/SiInstagram';
import { SiTiktok } from '@react-icons/all-files/si/SiTiktok';
import { SiTwitter } from '@react-icons/all-files/si/SiTwitter';
import CopyLink from '~/components/CopyLink';
import Modal, { ModalProps } from '~/components/global/Modal/Modal';

export default function ShareModal({ isOpen, setIsOpen }: ModalProps) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex items-center justify-between">
        <Dialog.Title
          as="h3"
          className="font-grifter text-3xl text-green-primary align-baseline -mb-2"
        >
          Share
        </Dialog.Title>
        <button
          type="button"
          className="rounded-md text-gray-400 hover:text-gray-300 active:text-gray-200 focus-green-primary"
          onClick={() => setIsOpen?.(false)}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-8">
        <p className="font-bold mb-2 text-lg">Bit Link</p>
        <CopyLink
          value={typeof window !== 'undefined' ? window.location.href : ''}
        />
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button className="border rounded-full p-3 sm:p-4 border-green-primary/30 hover:border-green-primary hover:text-green-primary focus-green-primary">
          <SiTwitter className="text-xl sm:text-3xl" />
        </button>
        <button className="border rounded-full p-3 sm:p-4 border-green-primary/30 hover:border-green-primary hover:text-green-primary focus-green-primary">
          <SiInstagram className="text-xl sm:text-3xl" />
        </button>
        <button className="border rounded-full p-3 sm:p-4 border-green-primary/30 hover:border-green-primary hover:text-green-primary focus-green-primary">
          <SiDiscord className="text-xl sm:text-3xl" />
        </button>
        <button className="border rounded-full p-3 sm:p-4 border-green-primary/30 hover:border-green-primary hover:text-green-primary focus-green-primary">
          <SiTiktok className="text-xl sm:text-3xl" />
        </button>
      </div>
    </Modal>
  );
}
