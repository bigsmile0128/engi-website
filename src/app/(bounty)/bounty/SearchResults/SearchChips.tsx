import classNames from 'classnames';
import qs from 'qs';
import { RiCloseFill } from 'react-icons/ri';
import Tag from '~/components/global/Tag/Tag';
import useSearchFields from '~/utils/hooks/useSearchFields';

type SearchChipsProps = {
  className?: string;
  onChange: (searchParams: URLSearchParams) => void;
  searchParams: URLSearchParams;
};

const keyToSchemaMap = {
  'created-after': 'createdAfter',
  technology: 'technologies',
  status: 'status',
};

export default function SearchChips({
  className,
  onChange,
  searchParams,
}: SearchChipsProps) {
  const { data: searchFields, isLoading } = useSearchFields();
  const params = qs.parse(searchParams.toString());
  const chips: {
    key: string;
    label: string;
    value: any;
  }[] = [];
  Object.entries(params).forEach(([key, value]) => {
    if (key === 'page') {
      return;
    }
    // URL key does not always match field in graphQL
    const fieldKey = keyToSchemaMap[key];
    if (Array.isArray(value)) {
      chips.push(
        ...value.map((v) => ({
          key,
          value: v,
          label:
            searchFields?.[fieldKey]?.find((option) => option.value === v)
              ?.label ?? value,
        }))
      );
    } else {
      chips.push({
        key,
        value,
        label:
          searchFields?.[fieldKey]?.find((option) => option.value === value)
            ?.label ?? value,
      });
    }
  });

  if (chips.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames(
        'flex flex-wrap items-center gap-4 w-full',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      {chips.map(({ key, label, value }) => (
        <Tag key={`${key}-${value}`} className="flex items-center gap-2 pr-2">
          <span>{label}</span>
          <button
            className="text-white/80 hover:text-green-primary focus-green-primary"
            onClick={() => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.delete(key);
              const paramValue = searchParams.getAll(key);

              // if array of values, append the other values
              if (Array.isArray(paramValue)) {
                const newValues = paramValue.filter((v) => v !== value);
                newValues.forEach((value) =>
                  newSearchParams.append(key, value)
                );
              }

              onChange(newSearchParams);
            }}
          >
            <RiCloseFill className="h-5 w-5" />
          </button>
        </Tag>
      ))}
      <button
        className="text-sm text-secondary hover:text-green-primary underline focus-green-primary"
        onClick={() => onChange(new URLSearchParams())}
      >
        Clear all
      </button>
    </div>
  );
}
