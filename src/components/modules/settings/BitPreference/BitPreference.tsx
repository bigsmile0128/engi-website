import { useState } from 'react';
import cn from 'classnames';
import Button from '~/components/global/Button/Button';
import { langData } from './BitPreference.utils';
import styles from './BitPreference.module.css';

function BitPreference() {
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
      <h2 className="font-grifter font-bold text-xl hidden md:block">
        Bit Preference
      </h2>
      <h6 className="text-secondary mt-4 hidden md:block">
        Help us personalize your bit recommendations.
      </h6>
      {/* TODO: migrate to new Select component */}
      {/* <MultiSelect
        items={renderItems()}
        onSelect={handleSelect}
        multi
        className="mt-12"
      /> */}
      <div className="text-right mt-20">
        <Button
          onClick={handleSave}
          variant="primary"
          className="w-2/5 mr-6"
          disabled={disableSave}
        >
          Save Changes
        </Button>
        <Button
          onClick={() => {}}
          variant="default"
          className="w-1/5"
          disabled={disableSave}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default BitPreference;
