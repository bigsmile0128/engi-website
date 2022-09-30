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
    <div className="mt-9">
      <ImageCropper />
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
