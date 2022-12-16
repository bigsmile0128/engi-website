import classNames from 'classnames';
import { Language } from '~/types';
import Tag from './global/Tag/Tag';
import LanguageIcon from './LanguageIcon';

type LanguageTagProps = {
  className?: string;
  isLoading?: boolean;
  value?: Language;
};

const displayNameMap = {
  [Language.C_SHARP]: 'C#',
  // [Language.JAVA]: 'Java',
  [Language.JAVA_SCRIPT]: 'JavaScript',
  [Language.PYTHON]: 'Python',
  [Language.RUST]: 'Rust',
  // [Language.TYPESCRIPT]: 'TypeScript',
};

export default function LanguageTag({
  className,
  value,
  isLoading,
}: LanguageTagProps) {
  return (
    <Tag
      className={classNames(
        'flex items-center gap-x-2',
        isLoading ? 'children:skeleton' : '',
        className
      )}
    >
      <LanguageIcon value={value} className="text-orange-primary" />
      <span>{displayNameMap[value] ?? value}</span>
    </Tag>
  );
}
