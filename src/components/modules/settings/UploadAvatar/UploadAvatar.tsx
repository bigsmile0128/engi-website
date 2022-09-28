import Button from '~/components/Button';
import Dropzone from './Dropzone';

function UploadAvatar() {
  const handleClickSave = () => {};

  return (
    <div className="p-8">
      <h2 className="font-grifter font-bold text-3xl">Upload your Avatar</h2>
      <h6>Help us personalize avatar.</h6>
      <div className="my-12">
        <Dropzone />
      </div>
      <div className="text-center">
        <Button onClick={handleClickSave} variant="primary" className="w-2/5">
          Save
        </Button>
      </div>
    </div>
  );
}

export default UploadAvatar;
