import { useState } from 'react';
import cn from 'classnames';
import Select from '~/components/global/Select/Select';
import Button from '~/components/global/Button/Button';
import { langData } from './JobPreference.utils';
import styles from './JobPreference.module.css';

function JobPreference() {
  const [selectedLangs, setSelectedLangs] = useState<Array<number>>([]);
  const renderItems = () =>
    langData.map(({ icon, title }, index) => {
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

  const handleSave = () => {};
  const disableSave =
    !selectedLangs || (!!selectedLangs && selectedLangs.length <= 0);

  return (
    <div className="p-8">
      <h2 className="font-grifter font-bold text-3xl hidden md:block">
        What languages does your company use?{' '}
      </h2>
      <h6 className="text-secondary mt-4 hidden md:block">
        Help us personalize your job recommendations.
      </h6>
      <Select
        items={renderItems()}
        onSelect={handleSelect}
        multi
        className="mt-12"
      />
      <div className="text-center mt-8">
        <Button
          onClick={handleSave}
          variant="primary"
          className="w-2/5"
          disabled={disableSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default JobPreference;
