import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Input from '~/components/global/Input/Input';
import Button from '~/components/global/Button/Button';
import { useQuery } from 'react-query';
import { AiOutlineLoading } from 'react-icons/ai';
import Modal from '~/components/global/Modal/Modal';
import { Dialog } from '@headlessui/react';
import TargetSvg from 'public/img/jobCreation/target.svg';

type RepositoryTabProps = {
  className?: string;
  onChange: (repoUrl) => void;
  defaultValue?: string;
};

export default function RepositoryTab({
  className,
  onChange,
  defaultValue,
}: RepositoryTabProps) {
  const [repoUrl, setRepoUrl] = useState(defaultValue ?? '');
  const [modalType, setModalType] = useState('');
  const {
    isLoading,
    isFetching,
    fetchStatus,
    data: isValidRepo,
    refetch,
    status,
  } = useQuery(['analyze', repoUrl], () => validateRepo(repoUrl), {
    enabled: false,
    refetchOnWindowFocus: false,
    // disable cache so modal doesn't show up when going back to this step
    cacheTime: 0,
  });

  useEffect(() => {
    if (isValidRepo) {
      setModalType('success');
    }
  }, [isValidRepo]);

  const isValidating = isFetching && fetchStatus === 'fetching';

  return (
    <div className={classNames('', className)}>
      <h4 className="font-bold text-xl">Step 1: Enter Repository</h4>
      <p className="text-secondary mt-4">
        Enter existing repository URL for creating a new job. The directory must
        be a Rust project and have a .git directory.
      </p>
      <label htmlFor="repo-url" className="block font-bold text-xl mt-12">
        Enter Repository
      </label>
      <Input
        id="repo-url"
        className="block mt-4 w-full max-w-sm"
        type="text"
        placeholder="Repository URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <Button
        variant="primary"
        className="relative mt-8 !px-24 flex items-center justify-center"
        disabled={isValidating}
        onClick={() => refetch()}
      >
        <span className={isValidating ? 'text-transparent' : ''}>Analyze</span>
        {isValidating && (
          <div className="animate-spin absolute h-5 w-5">
            <AiOutlineLoading className="text-lg text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        )}
      </Button>
      <Modal
        isOpen={modalType === 'success'}
        setIsOpen={() => setModalType('')}
      >
        <>
          <div className="">
            <Dialog.Title
              as="h3"
              className="font-grifter text-3xl text-green-primary"
            >
              Success!
            </Dialog.Title>
            <p className="mt-2 text-secondary max-w-xs">
              This is a valid codebase. We can do this!
            </p>
            <div className="flex items-center justify-center">
              <TargetSvg className="mt-4 w-3/4" />
            </div>
          </div>
          <Button
            className="w-full mt-8"
            variant="primary"
            onClick={() => onChange(repoUrl)}
          >
            Continue
          </Button>
        </>
      </Modal>
    </div>
  );
}

async function sleep(ms) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

// TODO: replace with analyze API when ready
async function validateRepo(repoUrl: string) {
  if (!repoUrl) {
    return false;
  }

  await sleep(2000);
  return true;
}
