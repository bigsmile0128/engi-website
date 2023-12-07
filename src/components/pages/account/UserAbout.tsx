'use client';

import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { MdLaptop, MdModeEdit } from 'react-icons/md';
import { RiGroupLine } from 'react-icons/ri';
import Personalization from '~/app/getting-started/Personalization';
import Button from '~/components/global/Button/Button';
import Modal from '~/components/global/Modal/Modal';
import { Engineer } from '~/types';

type UserAboutProps = {
  accountId: string;
  className?: string;
  data: Engineer;
};

export default function UserAbout({
  className,
  accountId,
  data,
}: UserAboutProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChangeUserType = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <div
      className={classNames(
        'flex flex-col items-start gap-y-8',
        'bg-secondary/10 backdrop-blur-[100px] p-8',
        className
      )}
    >
      <span className="font-bold text-2xl">About</span>
      {/* <div>
        <span className="font-medium text-xl">Social Media</span>
        <div className="mt-4 flex items-start flex-col gap-y-4 tablet:flex-row tablet:items-center gap-x-12">
          <div className="flex items-center gap-2">
            <RiTwitterFill className="h-6 w-6" />
            <span className="font-medium text-secondary">
              https://twitter.com/engi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <RiDiscordFill className="h-6 w-6" />
            <span className="font-medium text-secondary">
              https://discord.com/engi
            </span>
          </div>
        </div>
      </div> */}
      <div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-xl">Type of user</span>
          {accountId === 'me' && (
            <button
              className="hover:text-green-primary focus-green-primary"
              onClick={() => setIsModalOpen(true)}
            >
              <MdModeEdit />
            </button>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2">
          {data.userType === 'BUSINESS' ? (
            <RiGroupLine className="h-6 w-6" />
          ) : data.userType === 'FREELANCER' ? (
            <MdLaptop className="h-6 w-6" />
          ) : null}
          <span className="font-medium text-secondary">
            {data.userType ? _.capitalize(data.userType) : 'N/A'}
          </span>
        </div>
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="flex items-center justify-between">
          <Dialog.Title
            as="h3"
            className="font-grifter text-3xl text-green-primary align-baseline -mb-2"
          >
            Personalize
          </Dialog.Title>
          <button
            type="button"
            className="rounded-md text-gray-400 hover:text-gray-300 active:text-gray-200 focus-green-primary"
            onClick={() => setIsModalOpen(false)}
          >
            <span className="sr-only">Close</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Personalization
          className="mt-8 w-full"
          currentUserType={data.userType}
          onSuccess={onChangeUserType}
        />
        <Button
          className="mt-8 w-full"
          onClick={() => setIsModalOpen(false)}
          variant="primary"
        >
          Close
        </Button>
      </Modal>
    </div>
  );
}
