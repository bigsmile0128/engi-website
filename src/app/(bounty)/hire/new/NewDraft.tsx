'use client';

import { Dialog } from '@headlessui/react';
import Link from 'next/link';
import TargetSvg from 'public/img/bitCreation/target.svg';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { RiAddCircleLine, RiRefreshLine } from 'react-icons/ri';
import LoginModal from '~/components/LoginModal';
import Button from '~/components/global/Button/Button';
import Modal from '~/components/global/Modal/Modal';
import Select from '~/components/global/Select';
import useCreateDraft from '~/utils/hooks/useCreateDraft';
import useGithubBranchCommits from '~/utils/hooks/useGithubBranchCommits';
import useGithubRepositories from '~/utils/hooks/useGithubRepositories';
import useGithubRepositoryBranches from '~/utils/hooks/useGithubRepositoryBranches';
import Nav from '../[draftId]/Nav';
import useSubstrateAccounts from '~/utils/hooks/useSubstrateAccounts';
import { GITHUB_APP_LINK } from '~/utils/links';

type NewDraftProps = {
  walletId: string;
};

export default function NewDraft({ walletId }: NewDraftProps) {
  const [repo, setRepo] = useState<any>(null);
  const [branch, setBranch] = useState<any>(null);
  const [commit, setCommit] = useState<any>(null);
  const [modalType, setModalType] = useState('');

  const {
    isLoading: isLoadingRepositories,
    isError: isErrorRepositories,
    data: repos,
    isFetching: isFetchingRepositories,
    refetch: refetchRepositories,
    error: errorRepositories,
  } = useGithubRepositories();

  const { data: substrateAccounts } = useSubstrateAccounts();

  const substrateAccount = substrateAccounts?.find(
    (account) => account.address === walletId
  );

  const isNotEnrolled =
    (errorRepositories?.cause as Error)?.message === 'NOT_ENROLLED_TO_GITHUB';

  const {
    isLoading: isLoadingBranches,
    // isError: isErrorBranches,
    data: branches,
    isFetching: isFetchingBranches,
    refetch: refetchBranches,
  } = useGithubRepositoryBranches(repo?.value);
  const {
    isLoading: isLoadingCommits,
    // isError: isErrorCommits,
    data: commits,
    isFetching: isFetchingCommits,
    refetch: refetchCommits,
  } = useGithubBranchCommits(repo?.value, branch?.value);

  const draftMutation = useCreateDraft();

  const isLoadingAnalysis = draftMutation.isLoading;

  useEffect(() => {
    if (draftMutation.isSuccess) {
      setModalType('success');
    }
  }, [draftMutation.isSuccess]);

  return (
    <div className="pb-12">
      <Nav draftId="" disabled className="mb-12" />
      {/* only show login modal if user receives an error other than NOT_ENROLLED */}
      {isErrorRepositories && !isNotEnrolled && (
        <LoginModal onSuccess={refetchRepositories} />
      )}
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
          <Link className="w-full mt-8" href="/hire">
            <Button className="w-full" variant="primary">
              Continue
            </Button>
          </Link>
        </>
      </Modal>
      <div className="max-w-page md:!max-w-xl">
        <h4 className="font-bold text-xl">Step 1: Select Repository</h4>
        <p className="text-secondary mt-4">
          Select an existing repository URL for creating a new bounty. The
          directory must be a Rust project and have a .git directory.
        </p>
        <div className="flex items-center gap-2 mt-8">
          <label className="font-bold text-xl">Repository</label>
          <a
            className="text-xl text-green-primary hover:text-green-primary/80"
            href={GITHUB_APP_LINK}
            target="_blank"
            rel="noreferrer"
          >
            <RiAddCircleLine />
          </a>
          <button
            className="text-xl text-green-primary hover:text-green-primary/80"
            disabled={isLoadingRepositories || isFetchingRepositories}
            onClick={() => refetchRepositories()}
          >
            <RiRefreshLine
              className={
                isLoadingRepositories || isFetchingRepositories
                  ? 'animate-spin'
                  : ''
              }
            />
          </button>
        </div>
        <Select
          className="mt-2"
          options={(repos ?? []).map((repo) => ({
            label: repo.fullName,
            value: repo.fullName,
          }))}
          placeholder="Select a repository..."
          value={repo}
          onChange={(repo) => {
            setRepo(repo);
            setBranch(null);
            setCommit(null);
          }}
          isDisabled={isLoadingRepositories || isFetchingRepositories}
        />
        <div className="flex items-center gap-2 mt-6">
          <label className="font-bold text-xl">Branch</label>
          <button
            className="text-xl text-green-primary hover:text-green-primary/80 disabled:text-gray-400"
            disabled={!repo || isLoadingBranches || isFetchingBranches}
            onClick={() => refetchBranches()}
          >
            <RiRefreshLine
              className={
                isLoadingBranches || isFetchingBranches ? 'animate-spin' : ''
              }
            />
          </button>
        </div>
        <Select
          className="mt-2"
          options={(branches ?? []).map((branch) => ({
            label: branch,
            value: branch,
          }))}
          placeholder="Select a branch..."
          value={branch}
          onChange={(branch) => {
            setBranch(branch);
            setCommit(null);
          }}
          isDisabled={!repo || isLoadingBranches || isFetchingBranches}
        />
        <div className="flex items-center gap-2 mt-6">
          <label className="font-bold text-xl">Commit</label>
          <button
            className="text-xl text-green-primary hover:text-green-primary/80 disabled:text-gray-400"
            disabled={!branch || isLoadingCommits || isFetchingCommits}
            onClick={() => refetchCommits()}
          >
            <RiRefreshLine
              className={
                isLoadingCommits || isFetchingCommits ? 'animate-spin' : ''
              }
            />
          </button>
        </div>
        <Select
          className="mt-2"
          options={(commits ?? []).map((commit) => ({
            label: commit.message,
            value: commit.sha,
          }))}
          placeholder="Select a commit..."
          value={commit}
          onChange={(commit) => setCommit(commit)}
          isDisabled={!branch || isLoadingCommits || isFetchingCommits}
        />
        <Button
          variant="primary"
          className="relative mt-8 ml-auto !px-24 flex items-center justify-center"
          disabled={!repo || !branch || !commit || isLoadingAnalysis}
          onClick={() =>
            draftMutation.mutate({
              repository: repo?.value,
              branch: branch?.value,
              commit: commit?.value,
              substrateAccount,
            })
          }
        >
          <span className={isLoadingAnalysis ? 'text-transparent' : ''}>
            Analyze
          </span>
          {isLoadingAnalysis && (
            <div className="animate-spin absolute h-5 w-5">
              <AiOutlineLoading className="text-lg text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
