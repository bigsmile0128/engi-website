import classNames from 'classnames';
import TechnologyIcon from './TechnologyIcon';
import Tag from './global/Tag/Tag';
import useSearchFields from '~/utils/hooks/useSearchFields';

type TechnologyTagProps = {
  className?: string;
  isLoading?: boolean;
  value?: string;
};

export default function TechnologyTag({
  className,
  value,
  isLoading,
}: TechnologyTagProps) {
  const { data, isLoading: isLoadingSearchFields } = useSearchFields();
  return (
    <Tag
      className={classNames(
        'flex items-center gap-x-2',
        isLoading || isLoadingSearchFields ? 'children:skeleton' : '',
        className
      )}
    >
      <TechnologyIcon value={value} className="text-orange-primary" />
      <span>
        {data?.technologies?.find((technology) => technology.value === value)
          ?.label ?? value}
      </span>
    </Tag>
  );
}
