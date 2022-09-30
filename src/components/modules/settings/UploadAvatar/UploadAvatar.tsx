import { useState } from 'react';
import Button from '~/components/global/Button/Button';
import ImageCropper from '~/components/global/ImageCropper/ImageCropper';
import Dropzone from './Dropzone';

function UploadAvatar() {
  const [image, setImage] = useState<File>();
  const handleClickSave = () => {};
  const onFileDrop = (file: File) => {
    console.log('files===>', file);
    setImage(file);
  };

  const renderDropzone = () => (
    <div>
      <div className="my-12">
        <Dropzone onFileDrop={onFileDrop} />
      </div>
      <div className="text-center">
        <Button onClick={handleClickSave} variant="primary" className="w-2/5">
          Save
        </Button>
      </div>
    </div>
  );

  const renderImageCropper = () => (
    <div>
      <div className="mt-9 min-h-[400px]">
        <ImageCropper imageSrc="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000" />
      </div>
      <div className="text-center">
        <Button onClick={handleClickSave} variant="primary" className="w-2/5">
          Save
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <h2 className="font-grifter font-bold text-3xl">Upload your Avatar</h2>
      <h6>Help us personalize your avatar.</h6>
      {!!image ? renderImageCropper() : renderDropzone()}
    </div>
  );
}

export default UploadAvatar;
