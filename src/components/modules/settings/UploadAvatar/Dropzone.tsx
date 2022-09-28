import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function Dropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log('files===>', acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center border border-dashed border-[white]/30 py-20"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
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
            Drag and drop an image, or Browse
            <span className="text-xs text-secondary">
              1200x1200 or higher recommended. Max 10MB each
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Dropzone;
