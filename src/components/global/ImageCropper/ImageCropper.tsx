import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import SliderControls from './SliderControls/SliderControls';

interface Props {
  imageSrc: string;
}

function ImageCropper({ imageSrc }: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [, setArea] = useState<Area>({ x: 0, y: 0, width: 0, height: 0 });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setArea(croppedAreaPixels);
  }, []);

  const handleChange = (value: number) => {
    setZoom(value);
  };

  return (
    <div className="relative h-[350px] w-[350px] m-auto">
      <div className="absolute top-0 left-0 right-0 bottom-5">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid={false}
        />
      </div>
      <SliderControls onChange={handleChange} min={1} max={3} />
    </div>
  );
}

export default ImageCropper;
