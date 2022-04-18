import React from 'react';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import CopyLink from '../CopyLink';
import Modal, { ModalProps } from '../Modal';
import { SiDiscord, SiInstagram, SiTiktok, SiTwitter } from 'react-icons/si';

export default function ShareModal({ open, setOpen }: ModalProps) {
  return (
    <Modal open={open} setOpen={setOpen}>
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
    </Modal>
  );
}
