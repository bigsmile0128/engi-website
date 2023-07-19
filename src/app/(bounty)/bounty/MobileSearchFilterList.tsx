import { Dialog } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import Checkbox from '~/components/global/Checkbox/Checkbox';
import useSearchFields from '~/utils/hooks/useSearchFields';
import {
  MAX_FUNDING,
  MIN_FUNDING,
  createdAfterOptions,
  statusOptions,
} from './SearchFilterList';

interface MobileSearchFilterListProps {
  className?: string;
  onChange: (searchParams: URLSearchParams) => void;
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
  const { data: searchFields, isLoading: isLoadingSearchFields } =
    useSearchFields();

  // store state of filters independently from query params because user needs to click Apply
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [createdAfter, setCreatedAfter] = useState('');
  const [minFunding, setMinFunding] = useState(MIN_FUNDING);
  const [maxFunding, setMaxFunding] = useState(MAX_FUNDING);
  const [bitStatus, setBitStatus] = useState('');

  // update state search filter values on query param change
  useEffect(() => {
    const technologies = searchParams.getAll('technology') ?? [];
    setSelectedTechnologies(technologies);
    let minFunding =
      parseInt(searchParams.get('funding-min') ?? '0') || MIN_FUNDING;
    let maxFunding =
      parseInt(searchParams.get('funding-max') ?? '0') || MAX_FUNDING;

    if (minFunding >= maxFunding) {
      minFunding = MIN_FUNDING;
      maxFunding = MAX_FUNDING;
    }
    setMinFunding(minFunding);
    setMaxFunding(maxFunding);
    setCreatedAfter(searchParams.get('created-after') ?? '');
    setBitStatus(searchParams.get('status') ?? '');
  }, [searchParams, visible]);

  let numActiveFilters = 0;
  if (selectedTechnologies.length > 0) {
    numActiveFilters++;
  }
  if (createdAfter) {
    numActiveFilters++;
  }
  if (minFunding !== MIN_FUNDING || maxFunding !== MAX_FUNDING) {
    numActiveFilters++;
  }

  const onApplyFilters = () => {
    const searchParams = new URLSearchParams();
    selectedTechnologies.forEach((technology) =>
      searchParams.append('technology', technology)
    );
    if (createdAfter) {
      searchParams.set('created-after', createdAfter);
    }
    if (minFunding !== MIN_FUNDING || maxFunding !== MAX_FUNDING) {
      searchParams.set('funding-min', minFunding.toString());
      searchParams.set('funding-max', maxFunding.toString());
    }

    onChange(searchParams);
    onChangeVisible(false);
  };

  return (
    <Dialog
      className={classNames(
        'flex fixed inset-0 bg-secondary before:z-10 tablet:before:bg-site',
        className
      )}
      open={visible}
      onClose={() => onChangeVisible(false)}
    >
      <Dialog.Panel className="w-full z-20 py-16">
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
            <Button
              className="!py-2 !px-6"
              onClick={() => onChange(new URLSearchParams())}
            >
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
              Technologies
              {selectedTechnologies.length > 0
                ? ` (${selectedTechnologies.length})`
                : ''}
            </legend>
            <div className="flex flex-col gap-y-2">
              {(searchFields?.technologies ?? []).map(({ label, value }) => (
                <Checkbox
                  key={'mobile' + value}
                  id={'mobile' + value}
                  label={label}
                  checked={selectedTechnologies.includes(value)}
                  onChange={(checked) => {
                    if (checked) {
                      setSelectedTechnologies([...selectedTechnologies, value]);
                    } else {
                      setSelectedTechnologies(
                        selectedTechnologies.filter((lang) => lang !== value)
                      );
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="my-6 w-full border-t border-gray-500 opacity-50" />
          <div>
            <legend className="mb-4">Status</legend>
            <div className="flex flex-col gap-y-2">
              {statusOptions.map(({ label, value }) => (
                <Checkbox
                  key={'mobile' + value}
                  id={'mobile' + value}
                  label={label}
                  checked={value === bitStatus}
                  onChange={(checked) => {
                    if (checked) {
                      setBitStatus(value);
                    } else {
                      setBitStatus('');
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div className="my-6 w-full border-t border-gray-500 opacity-50" />
          {/* <div>
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
          </div> */}
          <div className="tablet:hidden flex justify-between gap-4 mt-12">
            <Button
              className="text-sm text-primary underline hover:text-green-primary"
              variant="link"
              onClick={() => onChange(new URLSearchParams())}
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
