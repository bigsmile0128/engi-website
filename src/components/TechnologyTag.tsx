import classNames from 'classnames';
import { Technology } from '~/types';
import Tag from './global/Tag/Tag';
import TechnologyIcon from './TechnologyIcon';

type TechnologyTagProps = {
  className?: string;
  isLoading?: boolean;
  value?: Technology;
};

const displayNameMap = {
  [Technology.C_SHARP]: 'C#',
  // [Language.JAVA]: 'Java',
  [Technology.JAVA_SCRIPT]: 'JavaScript',
  [Technology.PYTHON]: 'Python',
  [Technology.RUST]: 'Rust',
  // [Language.TYPESCRIPT]: 'TypeScript',
};

export default function TechnologyTag({
  className,
  value,
  isLoading,
}: TechnologyTagProps) {
  return (
    <Tag
      className={classNames(
        'flex items-center gap-x-2',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <TechnologyIcon value={value} className="text-orange-primary" />
      <span>{displayNameMap[value] ?? value}</span>
    </Tag>
  );
}
