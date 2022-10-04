import { ReactNode, useState } from 'react';
import Select from '~/components/global/Select/Select';
import JavaScriptIcon from 'public/img/settings/javascript.svg';
import CPlusPlusIcon from 'public/img/settings/c-plus-plus.svg';
import PythonIcon from 'public/img/settings/python.svg';
import HtmlIcon from 'public/img/settings/html5.svg';
import RustIcon from 'public/img/settings/rust.svg';
import TypescriptIcon from 'public/img/settings/typescript.svg';
import ReactIcon from 'public/img/settings/reactjs.svg';
import cn from 'classnames';
import styles from './JobPreference.module.css';

type SelectItem = {
  icon: ReactNode;
  title: string;
};

const itemData: SelectItem[] = [
  {
    icon: <JavaScriptIcon width={33} height={33} />,
    title: 'Javascript',
  },
  {
    icon: <CPlusPlusIcon width={33} height={33} />,
    title: 'C++',
  },
  {
    icon: <PythonIcon width={33} height={33} />,
    title: 'Python',
  },
  {
    icon: <HtmlIcon width={33} height={33} />,
    title: 'HTML',
  },
  {
    icon: <RustIcon width={33} height={33} />,
    title: 'Rust',
  },
  {
    icon: <TypescriptIcon width={33} height={33} />,
    title: 'Typescript',
  },
  {
    icon: <ReactIcon width={33} height={33} />,
    title: 'React',
  },
];

function JobPreference() {
  const [selectedLangs, setSelectedLangs] = useState<Array<number>>([]);
  const renderItems = () =>
    itemData.map(({ icon, title }, index) => {
      const foundIndex = selectedLangs.indexOf(index);
      const isSelected = foundIndex > -1;
      const itemClasses = cn(
        { 'border-green-primary/20': isSelected },
        { 'border-white/20': !isSelected },
        styles.lang_item,
        'flex justify-between items-center border px-4 py-3'
      );

      return (
        <button
          key={title}
          className={itemClasses}
          data-checked={isSelected}
          aria-label={title}
        >
          <div className="mr-2">{icon}</div>
          <div
            className={cn('text-xl', {
              'text-green-primary font-bold': isSelected,
            })}
          >
            {title}
          </div>
        </button>
      );
    });

  const handleSelect = (values: Array<number>) => {
    setSelectedLangs(values);
  };

  return (
    <div className="p-8">
      <h2 className="font-grifter font-bold text-3xl">
        What languages does your company use?{' '}
      </h2>
      <h6 className="text-secondary mt-4">
        Help us personalize your job recommendations.
      </h6>
      <Select
        items={renderItems()}
        onSelect={handleSelect}
        multi
        className="mt-12"
      />
    </div>
  );
}

export default JobPreference;
