import { ChangeEvent, useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import styles from './ImageCropper.module.css';

function ImageCropper() {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZoom(Number(event.target.value));
  };

  return (
    <div className="relative h-[350px] w-[350px] m-auto">
      <div className="absolute top-0 left-0 right-0 bottom-5">
        <Cropper
          image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid={false}
        />
      </div>
      <div
        className={`flex items-center justify-center left-0 right-0 absolute -bottom-10 bg-[#232323]/80 backdrop-blur-[2px] rounded-[4px] py-4 ${styles.controls}`}
      >
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
      </div>
    </div>
  );
}

export default ImageCropper;
