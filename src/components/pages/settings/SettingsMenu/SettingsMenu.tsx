import cn from 'classnames';
import { useState } from 'react';

interface Props {
  items: Array<{ key: string; title: string }>;
  className?: string;
}

function SettingsMenu({ items, className }: Props) {
  const [selectedTab, setSelectedTab] = useState(-1);

  const handleClick = (index: number) => () => {
    setSelectedTab(index);
  };

  return (
    <ul className={cn(className, 'bg-[#232323]/10 backdrop-blur-[100px] py-1')}>
      {items.map(({ key, title }, index) => (
        <li
          key={key}
          onClick={handleClick(index)}
          className={cn('pl-6', {
            'bg-[#232323]/80 text-green-primary font-bold':
              index === selectedTab,
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
