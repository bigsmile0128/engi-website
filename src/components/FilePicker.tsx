import { ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import _ from 'lodash';
import mime from 'mime-types';
import { useMemo, useState } from 'react';
import { RiAddLine, RiDeleteBin5Line, RiPencilFill } from 'react-icons/ri';
import { DirectoryTree, File as FileType, Folder as FolderType } from '~/types';
import Button from './global/Button/Button';
import Checkbox from './global/Checkbox/Checkbox';

type FilePickerProps = {
  className?: string;
  directoryTrees: DirectoryTree[];
  onChangePermissions: (pathPermissions) => void;
  pathPermissions: Record<string, string[]>;
};

enum Permission {
  ADDABLE = 'ADDABLE',
  DELETABLE = 'DELETABLE',
  EDITABLE = 'EDITABLE',
}

export default function FilePicker({
  className,
  directoryTrees,
  pathPermissions,
  onChangePermissions,
}: FilePickerProps) {
  const [selectedPaths, setSelectedPaths] = useState<string[]>([]);

  const allNodes = useMemo(
    () => getAllChildren(directoryTrees),
    [directoryTrees]
  );

  const directoryPaths = useMemo(() => {
    return allNodes
      .filter((node) => node.type === 'directory')
      .map((node) => node.path);
  }, [allNodes]);

  const filePaths = useMemo(() => {
    return allNodes
      .filter((node) => node.type === 'file')
      .map((node) => node.path);
  }, [allNodes]);

  const selectedDirectories = selectedPaths.filter((path) =>
    directoryPaths.some((p) => p === path)
  );

  const selectedFiles = selectedPaths.filter((path) =>
    filePaths.some((p) => p === path)
  );

  const isSelectedDeletable =
    selectedDirectories.length > 0 &&
    selectedDirectories.filter((path) =>
      pathPermissions[path]?.some(
        (permission) => permission === Permission.DELETABLE
      )
    ).length === selectedDirectories.length;

  const isSelectedAddable =
    selectedDirectories.length > 0 &&
    selectedDirectories.filter((path) =>
      pathPermissions[path]?.some(
        (permission) => permission === Permission.ADDABLE
      )
    ).length === selectedDirectories.length;

  const isSelectedEditable =
    selectedFiles.length > 0 &&
    selectedFiles.filter((path) =>
      pathPermissions[path]?.some(
        (permission) => permission === Permission.EDITABLE
      )
    ).length === selectedFiles.length;

  return (
    <div className={classNames('', className)}>
      <div className="p-4 bg-secondary/40 flex items-center gap-6">
        <span className="block font-medium mr-8">Mark as:</span>
        {/* allow toggling permissions all selected */}
        <Button
          className={classNames(
            '!py-1 !px-2 !text-xs flex items-center justify-center gap-1',
            isSelectedDeletable
              ? '!border-green-primary !text-green-primary'
              : ''
          )}
          onClick={() =>
            onChangePermissions(
              updatePermissions({
                pathPermissions,
                paths: selectedPaths,
                permission: Permission.DELETABLE,
                active: !isSelectedDeletable,
              })
            )
          }
        >
          <RiDeleteBin5Line className="h-4 w-4" />
          Deletable
        </Button>
        <Button
          className={classNames(
            '!py-1 !px-2 !text-xs flex items-center justify-center gap-1',
            isSelectedAddable ? '!border-green-primary !text-green-primary' : ''
          )}
          onClick={() =>
            onChangePermissions(
              updatePermissions({
                pathPermissions,
                paths: selectedPaths,
                permission: Permission.ADDABLE,
                active: !isSelectedAddable,
              })
            )
          }
        >
          <RiAddLine className="h-4 w-4" />
          Addable
        </Button>
        <Button
          className={classNames(
            '!py-1 !px-2 !text-xs flex items-center justify-center gap-1',
            isSelectedEditable
              ? '!border-green-primary !text-green-primary'
              : ''
          )}
          onClick={() =>
            onChangePermissions(
              updatePermissions({
                pathPermissions,
                paths: selectedPaths,
                permission: Permission.EDITABLE,
                active: !isSelectedEditable,
              })
            )
          }
        >
          <RiPencilFill className="h-4 w-4" />
          Editable
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-end px-4 py-2">
          {/* fixed width to line up with folder and file options */}
          <div className="font-medium text-xs text-secondary uppercase w-32">
            type
          </div>
          {/* slight padding to compensate for exact width to line up with options */}
          <div className="font-medium text-xs text-secondary uppercase w-16 pl-0.5">
            options
          </div>
        </div>
        {directoryTrees.map((directoryTree) =>
          directoryTree.type === 'directory' ? (
            <Folder
              className=""
              key={directoryTree.path}
              {...directoryTree}
              onSelect={setSelectedPaths}
              selectedPaths={selectedPaths}
              pathPermissions={pathPermissions}
              onChangePermissions={onChangePermissions}
            />
          ) : (
            <File
              key={directoryTree.path}
              className=""
              extension={directoryTree.extension}
              name={directoryTree.name}
              path={directoryTree.path}
              type={directoryTree.type}
              size={directoryTree.size}
              onSelect={setSelectedPaths}
              selectedPaths={selectedPaths}
              pathPermissions={pathPermissions}
              onChangePermissions={onChangePermissions}
            />
          )
        )}
      </div>
    </div>
  );
}

function Folder({
  className,
  children,
  onSelect,
  selectedPaths,
  name,
  path,
  pathPermissions,
  onChangePermissions,
}: {
  className?: string;
  onChangePermissions: (pathPermissions: Record<string, string[]>) => void;
  onSelect: (files: string[]) => void;
  pathPermissions: Record<string, string[]>;
  selectedPaths: string[];
} & FolderType) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isChecked = selectedPaths.some((p) => p === path);
  const isDeletable = pathPermissions[path]?.some(
    (permission) => permission === Permission.DELETABLE
  );
  const isAddable = pathPermissions[path]?.some(
    (permission) => permission === Permission.ADDABLE
  );

  return (
    <div className={classNames('flex flex-col gap-2', className)}>
      <div className="flex items-center px-4 py-2 bg-black/[.14]">
        <Checkbox
          id={path}
          checked={isChecked}
          onChange={() => {
            const allChildren = getAllChildrenPaths(children);
            if (!isChecked) {
              // select self and all children
              onSelect(_.uniq([...selectedPaths.concat(allChildren), path]));
            } else {
              // deselect self and all children
              onSelect(
                selectedPaths.filter(
                  (p) =>
                    !(allChildren.some((child) => child === p) || p === path)
                )
              );
            }
          }}
          label={name}
          labelClassName="font-medium !text-base"
          className=""
        />
        <button className="p-2" onClick={() => setIsExpanded(!isExpanded)}>
          <ChevronRightIcon
            className={classNames('h-4 w-4', isExpanded ? 'rotate-90' : '')}
          />
        </button>
        <span className="ml-auto text-xs text-secondary w-32">folder</span>
        <FolderOptions
          className=""
          isDeletable={isDeletable}
          onChangeDeletable={(isDeletable: boolean) => {
            const newPathPermissions = updatePermissions({
              pathPermissions,
              path,
              permission: Permission.DELETABLE,
              active: isDeletable,
            });
            onChangePermissions(newPathPermissions);
          }}
          isAddable={isAddable}
          onChangeAddable={(isAddable: boolean) => {
            const newPathPermissions = updatePermissions({
              pathPermissions,
              path,
              permission: Permission.ADDABLE,
              active: isAddable,
            });
            onChangePermissions(newPathPermissions);
          }}
        />
      </div>
      {isExpanded && (
        <div className="pl-8 flex flex-col gap-2">
          {children.map((directoryTree) =>
            directoryTree.type === 'directory' ? (
              <Folder
                className=""
                key={directoryTree.path}
                onSelect={onSelect}
                selectedPaths={selectedPaths}
                pathPermissions={pathPermissions}
                onChangePermissions={onChangePermissions}
                {...directoryTree}
              />
            ) : (
              <File
                key={directoryTree.path}
                className=""
                onSelect={onSelect}
                selectedPaths={selectedPaths}
                pathPermissions={pathPermissions}
                onChangePermissions={onChangePermissions}
                {...(directoryTree as FileType)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

function File({
  className,
  extension,
  name,
  onSelect,
  path,
  type,
  selectedPaths,
  size,
  pathPermissions,
  onChangePermissions,
}: {
  className?: string;
  onChangePermissions: (pathPermissions: Record<string, string[]>) => void;
  onSelect: (files: string[]) => void;
  pathPermissions: Record<string, string[]>;
  selectedPaths: string[];
} & FileType) {
  const isChecked = selectedPaths.some((p) => p === path);
  const isEditable = pathPermissions[path]?.some(
    (permission) => permission === Permission.EDITABLE
  );

  return (
    <div className={classNames('flex items-center px-4 py-2', className)}>
      <Checkbox
        id={path}
        checked={isChecked}
        onChange={() =>
          isChecked
            ? onSelect(selectedPaths.filter((p) => p !== path))
            : onSelect([...selectedPaths, path])
        }
        label={name}
        labelClassName="!text-base !text-secondary"
      />
      <span className="ml-auto text-xs text-secondary w-32">
        {mime.lookup(path)}
      </span>
      <FileOptions
        className=""
        isEditable={isEditable}
        onChangeAddable={(isEditable: boolean) => {
          const newPathPermissions = updatePermissions({
            pathPermissions,
            path,
            permission: Permission.EDITABLE,
            active: isEditable,
          });
          onChangePermissions(newPathPermissions);
        }}
      />
    </div>
  );
}

function FolderOptions({
  className,
  isDeletable,
  onChangeDeletable,
  isAddable,
  onChangeAddable,
}: {
  className?: string;
  isAddable: boolean;
  isDeletable: boolean;
  onChangeAddable: (isAddable: boolean) => void;
  onChangeDeletable: (isDeletable: boolean) => void;
}) {
  return (
    <div
      className={classNames(
        'flex items-center gap-2 w-16 justify-end',
        className
      )}
    >
      <Button
        className={classNames(
          '!p-1',
          isDeletable ? '!border-green-primary !text-green-primary' : ''
        )}
        onClick={() => onChangeDeletable(!isDeletable)}
      >
        <RiDeleteBin5Line className="h-4 w-4" />
      </Button>
      <Button
        className={classNames(
          '!p-1',
          isAddable ? '!border-green-primary !text-green-primary' : ''
        )}
        onClick={() => onChangeAddable(!isAddable)}
      >
        <RiAddLine className="h-4 w-4" />
      </Button>
    </div>
  );
}

function FileOptions({
  className,
  isEditable,
  onChangeAddable,
}: {
  className?: string;
  isEditable: boolean;
  onChangeAddable: (isEditable: boolean) => void;
}) {
  return (
    <div
      className={classNames(
        'flex items-center gap-2 w-16 justify-end',
        className
      )}
    >
      <Button
        className={classNames(
          '!p-1',
          isEditable ? '!border-green-primary !text-green-primary' : ''
        )}
        onClick={() => onChangeAddable(!isEditable)}
      >
        <RiPencilFill className="h-4 w-4" />
      </Button>
    </div>
  );
}

function getAllChildren(children: DirectoryTree[]) {
  const allChildren: DirectoryTree[] = [];

  // BFS to get all nodes in folder
  const queue: DirectoryTree[] = [...children];
  while (queue.length !== 0) {
    const directoryTree = queue.shift() as DirectoryTree;
    allChildren.push(directoryTree);
    if (directoryTree.type === 'directory') {
      queue.push(...directoryTree.children);
    }
  }

  return allChildren;
}

function getAllChildrenPaths(children: DirectoryTree[]) {
  return getAllChildren(children).map((child) => child.path);
}

function updatePermissions({
  pathPermissions,
  path,
  paths,
  permission,
  active,
}: {
  active: boolean;
  path?: string;
  pathPermissions: Record<string, string[]>;
  paths?: string[]; // optional array to update instead of single path
  permission: Permission;
}) {
  if (!path && !paths) {
    return pathPermissions;
  }
  const newPathPermissions = { ...pathPermissions };

  const pathsToUpdate: string[] = paths ?? [path as string];

  pathsToUpdate.forEach((path) => {
    // initiate if missing
    newPathPermissions[path] = newPathPermissions[path] || [];

    if (active) {
      newPathPermissions[path].push(permission);
    } else {
      newPathPermissions[path] = newPathPermissions[path].filter(
        (p) => p !== permission
      );
    }
  });

  return newPathPermissions;
}
