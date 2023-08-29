import { useState } from 'react';
import FilePicker from '../FilePicker';
import { DirectoryTree } from '~/types';

export default {
  title: 'FilePicker',
  component: FilePicker,
};

const Template = (args) => {
  const [pathPermissions, setPathPermissions] = useState<
    Record<string, string[]>
  >({});

  const directoryTrees = [
    createDirectoryTree('assets'),
    createDirectoryTree('dist'),
    createDirectoryTree('src'),
  ];

  return (
    <div className="max-w-page my-12">
      <FilePicker
        {...args}
        directoryTrees={directoryTrees}
        pathPermissions={pathPermissions}
        onChangePermissions={setPathPermissions}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  className: '',
};

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
