import React from 'react';
import classNames from 'classnames';
import avatarImg from 'public/img/avatar.png';
import Image from 'next/image';
import { MdModeEdit } from 'react-icons/md';
import { SiJava, SiPython, SiRust, SiTypescript } from 'react-icons/si';
import EngiAmount from '~/components/EngiAmount';
import Balance from '~/components/pages/account/Balance';
import AccountTabs from '~/components/pages/account/AccountTabs';
import { useRouter } from 'next/router';

type AccountDetailsProps = {
  className?: string;
};

export default function AccountDetails({ className }: AccountDetailsProps) {
  const router = useRouter();
  const { accountId } = router.query as { accountId: string };
  return (
    <div className={classNames('py-24', className)}>
      <div className="max-w-page">
        <div className="flex flex-col items-center sm:flex-row gap-x-16">
          <div className="h-40 w-40">
            <Image src={avatarImg} alt="avatar" />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-x-2">
              <span className="font-bold text-2xl">John Doe</span>
              <button className="text-white/80 hover:text-green-primary">
                <MdModeEdit className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-x-8 mt-4">
              <SiRust className="h-8 w-8 text-white/80" />
              <SiPython className="h-8 w-8 text-white/80" />
              <SiTypescript className="h-8 w-8 text-white/80" />
              <SiJava className="h-8 w-8 text-white/80" />
            </div>
            <div className="flex flex-col sm:flex-row gap-x-8 gap-y-2 mt-4">
              <span className="font-bold text-lg">123 Bits Solved</span>
              <EngiAmount
                value={1.23 * Math.pow(10, 18)}
                suffix=" earned"
                valueClassName="font-bold text-lg ml-1"
                iconClassName="h-3 w-3 mt-1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="max-w-page">
          <Balance className="mt-12 p-8 bg-[#232323]/40 backdrop-blur-[200px]" />
        </div>
      </div>
      <div className="max-w-page mt-16">
        <AccountTabs accountId={accountId} />
      </div>
    </div>
  );
}
