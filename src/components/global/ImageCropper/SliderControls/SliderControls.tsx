import styles from './SliderControls.module.css';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { ChangeEvent, useState } from 'react';

interface Props {
  max: number;
  min: number;
  onChange: (value: number) => void;
}

const SLIDER_STEP = 0.1;

function SliderControls({ min, max, onChange }: Props) {
  const [zoom, setZoom] = useState(1);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(event.target.value));
    onChange(Number(event.target.value));
  };

  const handleZoomOut = () => {
    const nextZoomValue = zoom - SLIDER_STEP;

    if (nextZoomValue < min) {
      return;
    }

    setZoom((prev) => prev - SLIDER_STEP);
    onChange(zoom - SLIDER_STEP);
  };

  const handleZoomIn = () => {
    const nextZoomValue = zoom + SLIDER_STEP;

    if (nextZoomValue > max) {
      return;
    }

    setZoom((prev) => prev + SLIDER_STEP);
    onChange(zoom + SLIDER_STEP);
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 
          left-0 right-0 absolute -bottom-10 bg-[#232323]/80
          backdrop-blur-[2px] rounded-[4px] py-4 px-2 ${styles.controls}`}
    >
      <button aria-labelledby="zoom-out" onClick={handleZoomOut}>
        <FiMinus />
      </button>
      <input
        type="range"
        value={zoom}
        min={min}
        max={max}
        step={SLIDER_STEP}
        aria-labelledby="Zoom"
        onChange={handleChange}
        className={styles.zoom_range}
      />
      <button aria-labelledby="zoom-in" onClick={handleZoomIn}>
        <FiPlus />
      </button>
    </div>
  );
}

export default SliderControls;
