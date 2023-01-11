import { Dialog } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import Checkbox from '~/components/global/Checkbox/Checkbox';
import Slider from '~/components/global/Slider/Slider';
import {
  createdAfterOptions,
  languageOptions,
  MAX_FUNDING,
  MIN_FUNDING,
} from './SearchFilterList';

interface MobileSearchFilterListProps {
  className?: string;
  onChange: (searchParams) => void;
  onChangeVisible: (visible: boolean) => void;
  searchParams: URLSearchParams;
  visible: boolean; // filter list visible for mobile or tablet
}

export default function MobileSearchFilterList({
  className,
  searchParams,
  onChange,
  onChangeVisible,
  visible,
}: MobileSearchFilterListProps) {
  // store state of filters independently from query params because user needs to click Apply
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [createdAfter, setCreatedAfter] = useState('');
  const [minFunding, setMinFunding] = useState(MIN_FUNDING);
  const [maxFunding, setMaxFunding] = useState(MAX_FUNDING);

  useEffect(() => {
    // update state search filter values on query param change
    const languages = searchParams.getAll('language');
    setSelectedLanguages(languages);
    let minFunding = parseInt(searchParams.get('funding-min')) || MIN_FUNDING;
    let maxFunding = parseInt(searchParams.get('funding-max')) || MAX_FUNDING;

    if (minFunding >= maxFunding) {
      minFunding = MIN_FUNDING;
      maxFunding = MAX_FUNDING;
    }
    setMinFunding(minFunding);
    setMaxFunding(maxFunding);
    setCreatedAfter(searchParams.get('created-after'));
  }, [searchParams, visible]);

  let numActiveFilters = 0;
  if (selectedLanguages.length > 0) {
    numActiveFilters++;
  }
  if (createdAfter) {
    numActiveFilters++;
  }
  if (minFunding !== MIN_FUNDING || maxFunding !== MAX_FUNDING) {
    numActiveFilters++;
  }

  const onApplyFilters = () => {
    const searchParams: Record<string, any> = {};
    if (selectedLanguages.length > 0) {
      searchParams.language = selectedLanguages;
    }
    if (createdAfter) {
      searchParams['created-after'] = createdAfter;
    }
    if (minFunding !== MIN_FUNDING || maxFunding !== MAX_FUNDING) {
      searchParams['funding-min'] = minFunding;
      searchParams['funding-max'] = maxFunding;
    }

    onChange(searchParams);
    onChangeVisible(false);
  };

  return (
    <Dialog
      className={classNames(
        'flex absolute inset-0 bg-secondary before:z-10 tablet:before:bg-site',
        className
      )}
      open={visible}
      onClose={() => onChangeVisible(false)}
    >
      <Dialog.Panel className="w-full z-20 mt-16">
        <Dialog.Title className="flex items-center gap-2 max-w-page relative">
          <button
            className="hover:text-green-primary"
            onClick={() => onChangeVisible(false)}
          >
            <RiCloseLine className="w-6 h-6 tablet:h-10 tablet:w-10" />
          </button>
          <span
            className={classNames(
              'font-grifter text-xl -mb-2',
              'absolute top-0 left-1/2 -translate-x-1/2',
              'tablet:text-3xl tablet:static tablet:translate-x-0'
            )}
          >
            Filters
          </span>
          <div className="hidden tablet:flex items-center gap-4 ml-auto">
            <Button
              className="!py-2 !px-6"
              variant="primary"
              disabled={numActiveFilters === 0}
              onClick={() => onApplyFilters()}
            >
              Apply{numActiveFilters ? ` (${numActiveFilters})` : ''}
            </Button>
            <Button className="!py-2 !px-6" onClick={() => onChange({})}>
              Clear All
            </Button>
          </div>
        </Dialog.Title>
        <Dialog.Description className="max-w-page mt-12 tablet:mt-16">
          <div>
            <legend className="mb-4">Date of Publication</legend>
            <div className="flex flex-col gap-y-2">
              {createdAfterOptions.map(({ label, value }) => (
                <Checkbox
                  key={'mobile' + value}
                  id={'mobile' + value}
                  label={label}
                  checked={value === createdAfter}
                  onChange={(checked) => {
                    if (checked) {
                      setCreatedAfter(value);
                    } else {
                      setCreatedAfter('');
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="my-6 w-full border-t border-gray-500 opacity-50" />
          <div>
            <legend className="mb-4">
              Language
              {selectedLanguages.length > 0
                ? ` (${selectedLanguages.length})`
                : ''}
            </legend>
            <div className="flex flex-col gap-y-2">
              {languageOptions.map(({ label, value }) => (
                <Checkbox
                  key={'mobile' + value}
                  id={'mobile' + value}
                  label={label}
                  checked={selectedLanguages.includes(value)}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedLanguages([...selectedLanguages, value]);
                    } else {
                      setSelectedLanguages(
                        selectedLanguages.filter((lang) => lang !== value)
                      );
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="my-6 w-full border-t border-gray-500 opacity-50" />
          <div>
            <legend className="text-sm mb-2">Estimated Funding</legend>
            <Slider
              min={MIN_FUNDING}
              max={MAX_FUNDING}
              minDistance={1}
              value={[minFunding, maxFunding]}
              onAfterChange={([minFunding, maxFunding]) => {
                setMinFunding(minFunding);
                setMaxFunding(maxFunding);
              }}
            />
          </div>
          <div className="tablet:hidden flex justify-between gap-4 mt-12">
            <Button
              className="text-sm text-primary underline hover:text-green-primary"
              variant="link"
              onClick={() => onChange({})}
            >
              Clear All
            </Button>
            <Button variant="primary" onClick={() => onApplyFilters()}>
              Show results
            </Button>
          </div>
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  );
}
