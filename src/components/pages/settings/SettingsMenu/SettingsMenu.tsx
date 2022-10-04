import cn from 'classnames';
import { useState } from 'react';
import { SETTINGS_TAB } from '../Settings.utils';

interface Props {
  className?: string;
  items: Array<{ key: SETTINGS_TAB; title: string }>;
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
    <ul className={cn(className, 'bg-[#232323]/10 backdrop-blur-[100px] py-1')}>
      {items.map(({ key, title }, index) => (
        <li
          key={key}
          onClick={handleClick(key)}
          className={cn('pl-6', {
            'bg-[#232323]/80 text-green-primary font-bold': key === selectedTab,
          })}
        >
          <button
            className={cn('flex w-full py-3 border-[white]/30', {
              'border-b': index !== items.length - 1,
            })}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SettingsMenu;
