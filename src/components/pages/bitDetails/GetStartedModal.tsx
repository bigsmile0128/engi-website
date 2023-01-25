import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

import CopyLink from '~/components/CopyLink';
import Button from '~/components/global/Button/Button';
import Modal, { ModalProps } from '~/components/global/Modal/Modal';

type GetStartedModalProps = {
  bitId: string;
};

export default function GetStartedModal({
  bitId,
  isOpen,
  setIsOpen,
}: ModalProps & GetStartedModalProps) {
  return (
    <Modal
      className="md:max-w-md lg:max-w-lg"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="flex items-start justify-between gap-4">
        <Dialog.Title
          as="h3"
          className="font-grifter text-3xl align-baseline -mb-2"
        >
          To start the job, you will need to{' '}
          <span className="text-green-primary">use the CLI</span>
        </Dialog.Title>
        <button
          type="button"
          className="rounded-md text-gray-400 hover:text-gray-300 active:text-gray-200 focus-green-primary"
          onClick={() => setIsOpen(false)}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-col mt-8">
        <p className="font-bold mb-2 text-lg">Command</p>
        <CopyLink
          value={
            typeof window !== 'undefined'
              ? `docker compose run cli engi job get ${bitId} | tee /tmp/demo-csharp-job.json`
              : ''
          }
        />
        <Button className="mt-8 mx-auto" variant="primary">
          View CLI Documentation
        </Button>
      </div>
    </Modal>
  );
}
