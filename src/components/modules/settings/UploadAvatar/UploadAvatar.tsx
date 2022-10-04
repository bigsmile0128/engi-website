import { useState } from 'react';
import Button from '~/components/global/Button/Button';
import ImageCropper from '~/components/global/ImageCropper/ImageCropper';
import { uploadImageToS3 } from '~/services/aws';
import Dropzone from './Dropzone';

function UploadAvatar() {
  const [image, setImage] = useState<File>();
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);

  const handleUploaded = async () => {
    try {
      const response = await uploadImageToS3({
        file: image,
        name: `${image.name}`,
      });

      setHasUploaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveCroppedImage = () => {};

  const onFileDrop = (file: File) => {
    setImage(file);
    setHasUploaded(false);
  };

  const renderDropzone = () => (
    <div>
      <div className="my-12">
        <Dropzone onFileDrop={onFileDrop} />
      </div>
      <div className="text-center">
        <Button
          onClick={handleUploaded}
          variant="primary"
          className="w-2/5"
          disabled={!image}
        >
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
        <Button
          onClick={handleSaveCroppedImage}
          variant="primary"
          className="w-2/5"
        >
          Save
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <h2 className="font-grifter font-bold text-3xl">Upload your Avatar</h2>
      <h6 className="text-secondary">Help us personalize your avatar.</h6>
      {hasUploaded ? renderImageCropper() : renderDropzone()}
    </div>
  );
}

export default UploadAvatar;
