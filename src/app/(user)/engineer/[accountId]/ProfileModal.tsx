import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import NextImage from 'next/image';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { RiCloseCircleFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import Modal from '~/components/global/Modal/Modal';
import Slider from '~/components/global/Slider/Slider';
import { Engineer } from '~/types';
import useUpdateUser, { UpdateUserArgs } from './useUpdateUser';

type ProfileModalProps = {
  className?: string;
  data: Engineer;
  isOpen: boolean;
  onSuccess: () => void;
  setIsOpen: Dispatch<boolean>;
};

export default function ProfileModal({
  className,
  data,
  isOpen,
  onSuccess,
  setIsOpen,
}: ProfileModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState('');
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [displayName, setDisplayName] = useState(data.displayName);

  useEffect(() => {
    // reset state on close in case modal was closed without saving
    if (!isOpen) {
      setFile(null);
      setCroppedFile(null);
      setImageSrc('');
      setDisplayName(data.displayName);
    }
  }, [isOpen, data]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      toast.error('A valid image file is required.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // set image source for image cropper
      setImageSrc(reader.result as string);
      // set file for sending to S3
      setFile(acceptedFiles[0]);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop,
    maxFiles: 1,
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback(
    async (croppedArea, croppedAreaPixels) => {
      if (!file) {
        return;
      }
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      const prevFile = file as File;
      const newFile = new File([croppedImg], prevFile.name, {
        type: croppedImg.type,
        lastModified: prevFile.lastModified,
      });
      setCroppedFile(newFile);
    },
    [imageSrc, file]
  );

  const mutation = useUpdateUser();

  const onSave = async () => {
    const args: UpdateUserArgs = {};

    if (displayName !== data.displayName) {
      args.displayName = displayName;
    }
    if (croppedFile) {
      args.imageFile = croppedFile;
    }

    mutation.mutate(args);
  };

  useEffect(() => {
    if (mutation.isSuccess && isOpen) {
      toast.success('Successfully updated profile.');
      setIsOpen(false);
      onSuccess();
      mutation.reset();
    } else if (mutation.isError) {
      toast.error('Failed to update profile.');
      mutation.reset();
    }
  }, [mutation, isOpen, setIsOpen, onSuccess]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex items-center justify-between">
        <Dialog.Title
          as="h3"
          className="font-grifter text-4xl align-baseline -mb-2"
        >
          Update Profile
        </Dialog.Title>
        <button
          type="button"
          className="rounded-md text-gray-400 hover:text-gray-300 active:text-gray-200 focus-green-primary"
          onClick={() => setIsOpen(false)}
        >
          <span className="sr-only">Close</span>
          <XIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div
        className={classNames(
          'mt-8 w-full relative flex flex-col items-start',
          className
        )}
      >
        <p className="font-grifter text-xl">Display name</p>
        <Input
          className="w-full"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <p className="mt-4 font-grifter text-xl">Avatar</p>
        {imageSrc ? (
          <div className="w-full">
            <div className="relative h-64">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
              />
              <button className="absolute -top-4 -right-4 text-red-primary">
                <RiCloseCircleFill className="h-8 w-8" />
              </button>
            </div>
            <div className="w-full flex items-center gap-4 h-12">
              <span className="font-bold text-sm text-secondary uppercase">
                ZOOM
              </span>
              <Slider
                className="-mt-4 w-full"
                value={zoom}
                min={1}
                max={3}
                step={0.01}
                onChange={(zoom) => setZoom(zoom)}
                renderThumb={({ key, ...props }) => {
                  return (
                    <div
                      key={key}
                      {...props}
                      className={classNames(
                        props.className,
                        'h-4 w-4 bg-green-primary rounded-full relative flex justify-center items-center focus-green-primary'
                      )}
                    />
                  );
                }}
                renderTrack={({ key, ...props }) => {
                  return (
                    <div
                      key={key}
                      {...props}
                      className={classNames(
                        props.className,
                        'h-0.5 top-[7px] bg-[#FFFFFF22]',
                        {
                          'bg-green-primary': key === '-0',
                        }
                      )}
                    />
                  );
                }}
              />
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={classNames(
              'h-64 w-64 border border-dashed border-tertiary',
              'flex flex-col items-center justify-center',
              'text-lg text-center cursor-pointer hover:bg-black/[.14]'
            )}
          >
            <input {...getInputProps()} />
            <NextImage
              src="/img/settings/add-image.svg"
              height={80}
              width={80}
              alt="add image"
            />
            {isDragActive ? (
              <p className="mt-2">Drop it here</p>
            ) : (
              <p className="mt-2">Choose a file or drag it here</p>
            )}
            <p className="text-xs text-secondary">10MB max</p>
          </div>
        )}
        <div className="mt-8 w-full self-start flex items-center gap-4">
          <Button variant="default" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            variant="primary"
            onClick={onSave}
            inProgress={mutation.isLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });
}

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to create canvas.');
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');

  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    throw new Error('Failed to create canvas.');
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject('Failed to create blob.');
          return;
        }
        resolve(blob);
      },
      'image/jpeg',
      1.0 // image quality
    );
  });
}
