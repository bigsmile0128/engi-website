import { ChevronRightIcon } from '@heroicons/react/outline';
import cn from 'classnames';
import { useState } from 'react';
import { SETTINGS_TAB, LinkItem } from '../Settings.utils';

interface Props {
  className?: string;
  items: Array<LinkItem>;
  onChange: (key: SETTINGS_TAB) => void;
}

function SettingsMenu({ items, className, onChange }: Props) {
  const [selectedTab, setSelectedTab] = useState<SETTINGS_TAB>(
    SETTINGS_TAB.PERSONAL_INFO
  );

  const handleClick = (key: SETTINGS_TAB) => () => {
    setSelectedTab(key);
    onChange(key);
  };

  return (
    <ul className={cn(className)}>
      {items.map((item, index) => {
        const isSelected = item.key === selectedTab;

        return (
          <li
            key={item.key}
            onClick={handleClick(item.key)}
            className={cn('md:pl-6 flex', {
              'bg-[#232323]/80 text-green-primary font-bold': isSelected,
            })}
          >
            <button
              className={cn('flex w-full py-3 border-[white]/30 items-center', {
                'border-b': index !== items.length - 1,
              })}
            >
              <item.icon
                className={cn(
                  ' w-5 h-5 md:hidden mr-3',
                  {
                    'text-green-primary': isSelected,
                  },
                  {
                    'text-white': !isSelected,
                  }
                )}
              />
              <span className="flex-grow text-left">{item.title}</span>
              <ChevronRightIcon
                className={cn(
                  'w-5 h-5 md:hidden',
                  {
                    'text-green-primary': isSelected,
                  },
                  {
                    'text-white': !isSelected,
                  }
                )}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default SettingsMenu;
