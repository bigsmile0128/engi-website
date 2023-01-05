import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onFileDrop: (file: File) => void;
}

const MAX_FILE_SIZE_BYTE = 10 * 1024 * 1024;

const dropzoneConfig = {
  maxFiles: 1,
  maxSize: MAX_FILE_SIZE_BYTE,
  multiple: false,
  accept: {
    'image/*': [],
  },
};

function Dropzone({ onFileDrop }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (!acceptedFiles || !acceptedFiles.length) {
        return;
      }

      const files = acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.onload = () => {};
        reader.readAsDataURL(file);
        return file;
      });

      onFileDrop(files[0]);
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...dropzoneConfig,
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center border border-dashed border-[white]/30 py-20"
    >
      <input {...getInputProps()} />
      <div>
        <div className="flex w-fit border border-[white]/60 backdrop-blur-[11px] bg-[#161b28]/30 p-4 m-auto mb-6">
          <Image
            src="/img/settings/add-image.svg"
            height={27}
            width={27}
            alt="add image"
          />
        </div>
        <p className="flex flex-col">
          {isDragActive
            ? 'Drop the files here ...'
            : 'Drag and drop an image, or Browse'}
          <span className="text-xs text-secondary">
            1200x1200 or higher recommended. Max 10MB each
          </span>
        </p>
      </div>
    </div>
  );
}

export default Dropzone;
