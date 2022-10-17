import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';
import CreatedJobsTab from './CreatedJobsTab';

type AccountTabsProps = {
  className?: string;
  accountId: string;
};

export default function AccountTabs({
  className,
  accountId,
}: AccountTabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="hidden w-full md:flex gap-x-16 border-b border-white/30">
        {['Created', 'Coded'].map((name) => (
          <Tab as={Fragment} key={name}>
            {({ selected }) => (
              <button
                className={classNames(
                  'flex items-center text-center py-2 -mb-[1px]',
                  'text-xl',
                  'outline-none focus-visible:ring-1 focus-visible:ring-green-primary',
                  selected
                    ? 'text-green-primary font-bold border-green-primary border-b-[3px]'
                    : 'text-white/80'
                )}
              >
                {name}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-12">
        <Tab.Panel>
          <CreatedJobsTab accountId={accountId} />
        </Tab.Panel>
        <Tab.Panel>
          <CreatedJobsTab accountId={accountId} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
