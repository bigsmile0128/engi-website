import classNames from 'classnames';
import { useState } from 'react';
import FilePicker from '~/components/FilePicker';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import { DirectoryTree } from '~/types';

type DetailsTabProps = {
  className?: string;
  defaultValue?: string;
  goBack: () => void;
  onChange: ({ bitName }) => void;
};

export default function DetailsTab({
  className,
  onChange,
  goBack,
  defaultValue,
}: DetailsTabProps) {
  const [pathPermissions, setPathPermissions] = useState<
    Record<string, string[]>
  >({});
  const [bitName, setBitName] = useState(defaultValue ?? '');

  const directoryTrees = [
    createDirectoryTree('assets'),
    createDirectoryTree('dist'),
    createDirectoryTree('src'),
  ];

  return (
    <div className={classNames('', className)}>
      <h1 className="font-grifter text-3xl">Bounty Details</h1>
      <label className="block font-bold text-xl mt-12" htmlFor="bit-name">
        Name of the bounty
      </label>
      <Input
        id="bit-name"
        className="block mt-4 w-full"
        type="text"
        placeholder="Name of the bounty"
        value={bitName}
        onChange={(e) => setBitName(e.target.value)}
      />
      <div className="p-8 border border-white/30 mt-12">
        <div className="block font-bold text-xl">Files</div>
        <FilePicker
          className="mt-8"
          directoryTrees={directoryTrees}
          pathPermissions={pathPermissions}
          onChangePermissions={setPathPermissions}
        />
      </div>
      <div className="flex justify-end gap-x-4 mt-8">
        <Button className="" onClick={goBack}>
          Back
        </Button>
        <Button
          className="block !px-24"
          variant="primary"
          onClick={() => onChange({ bitName })}
          disabled={!bitName}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

function createDirectoryTree(root) {
  const directoryTree: DirectoryTree = {
    path: `${root}`,
    name: `${root}`,
    size: 600,
    type: 'directory',
    children: [
      {
        path: `${root}/summer`,
        name: 'summer',
        size: 400,
        type: 'directory',
        children: [
          {
            path: `${root}/summer/june`,
            name: 'june',
            size: 400,
            type: 'directory',
            children: [
              {
                path: `${root}/summer/june/windsurf.jpg`,
                name: 'windsurf.jpg',
                size: 400,
                type: 'file',
                extension: '.jpg',
              },
            ],
          },
        ],
      },
      {
        path: `${root}/winter`,
        name: 'winter',
        size: 200,
        type: 'directory',
        children: [
          {
            path: `${root}/winter/january`,
            name: 'january',
            size: 200,
            type: 'directory',
            children: [
              {
                path: `${root}/winter/january/ski.png`,
                name: 'ski.png',
                size: 100,
                type: 'file',
                extension: '.png',
              },
              {
                path: `${root}/winter/january/snowboard.jpg`,
                name: 'snowboard.jpg',
                size: 100,
                type: 'file',
                extension: '.jpg',
              },
            ],
          },
        ],
      },
    ],
  };

  return directoryTree;
}
