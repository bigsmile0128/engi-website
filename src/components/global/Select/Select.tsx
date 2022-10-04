import { ReactNode, useState } from 'react';
import cn from 'classnames';

interface Props {
  items: Array<ReactNode>;
  onSelect: (values: Array<number>) => void;
  multi?: boolean;
  className?: string;
}

function Selection({ items, onSelect, multi = false, className }: Props) {
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);

  const handleClick = (index: number) => () => {
    let temp = [...selectedItems];

    if (multi) {
      const foundIndex = temp.indexOf(index);

      if (foundIndex > -1) {
        temp.splice(foundIndex, 1);
      } else {
        temp = [...selectedItems, index];
      }
    } else {
      temp = [index];
    }

    onSelect(temp);
    setSelectedItems(temp);
  };

  const rootClasses = cn(className, 'flex flex-wrap justify-center gap-5');

  return (
    <div className={rootClasses}>
      {items.map((item, index) => {
        return (
          <div
            key={`multi_select_${index}`}
            onClick={handleClick(index)}
            className="cursor-pointer"
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default Selection;
