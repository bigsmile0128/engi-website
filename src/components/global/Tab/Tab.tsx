import React from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import cn from 'classnames';
import { Children, ReactNode, useState } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  defaultIndex?: number;
  onChange?: (index: number) => void;
  tabLabels: Array<ReactNode>;
  tabListClassname?: string;
}

function Tab({
  tabLabels,
  children,
  onChange,
  defaultIndex = 0,
  className,
  tabListClassname,
}: Props) {
  const [selectedTab, setSelectTab] = useState<number>(-1);
  const handleTabChange = (index: number) => {
    onChange && onChange(index);
    setSelectTab(index);
  };

  const rootClasses = cn(className, 'w-full');
  const tabListClasses = cn(
    tabListClassname,
    'flex p-1 space-x-1 bg-primary-white/[0.14]'
  );

  return (
    <div className={rootClasses}>
      <HeadlessTab.Group
        onChange={handleTabChange}
        selectedIndex={selectedTab}
        defaultIndex={defaultIndex}
      >
        <HeadlessTab.List className={tabListClasses}>
          {tabLabels.map((element, index) => (
            <HeadlessTab
              key={index}
              className={({ selected }) =>
                cn(
                  'text-sm leading-5 font-medium focus:outline-none',
                  selected
                    ? ''
                    : 'text-primary-white hover:bg-white/[0.12] hover:text-blue-100'
                )
              }
            >
              {element}
            </HeadlessTab>
          ))}
        </HeadlessTab.List>
        {!!children && (
          <HeadlessTab.Panels className="mt-4">
            {Children.map(children, (child, idx) => (
              <HeadlessTab.Panel key={idx} className={cn('focus:outline-none')}>
                {child}
              </HeadlessTab.Panel>
            ))}
          </HeadlessTab.Panels>
        )}
      </HeadlessTab.Group>
    </div>
  );
}

export default Tab;
