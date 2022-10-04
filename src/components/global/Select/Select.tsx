import { ReactNode, useState } from 'react';

interface Props {
  items: Array<ReactNode>;
  onSelect: (values: Array<number>) => void;
  multi?: boolean;
}

function Selection({ items, onSelect, multi = false }: Props) {
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

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {items.map((item, index) => {
        return (
          <div key={`multi_select_${index}`} onClick={handleClick(index)}>
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default Selection;
