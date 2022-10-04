import { ReactNode, useState } from 'react';

interface Props {
  items: Array<ReactNode>;
  onSelect: () => void;
  multi?: boolean;
}

function Selection({ items, onSelect, multi = false }: Props) {
  const [selectedItems, setSelectedItems] = useState();

  const handleClick = () => {};

  return (
    <div>
      {items.map((item, index) => {
        return (
          <div key={`multi_select_${index}`} onClick={handleClick}>
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default Selection;
