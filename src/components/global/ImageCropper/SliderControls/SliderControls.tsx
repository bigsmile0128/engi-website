import styles from './SliderControls.module.css';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { ChangeEvent, useState } from 'react';

interface Props {
  onChange: (value: number) => void;
}

function SliderControls({ onChange }: Props) {
  const [zoom, setZoom] = useState(1);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(event.target.value));
    onChange(Number(event.target.value));
  };

  return (
    <div
      className={`flex items-center justify-center 
          left-0 right-0 absolute -bottom-10 bg-[#232323]/80 
          backdrop-blur-[2px] rounded-[4px] py-4 px-2 ${styles.controls}`}
    >
      <button>
        <FiMinus className="" />
      </button>
      <input
        type="range"
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        aria-labelledby="Zoom"
        onChange={handleChange}
        className={styles.zoom_range}
      />
      <button>
        <FiPlus className="" />
      </button>
    </div>
  );
}

export default SliderControls;
