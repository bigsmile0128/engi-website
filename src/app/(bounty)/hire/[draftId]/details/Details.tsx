'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'react-toastify';
import FilePicker, { Permission } from '~/components/FilePicker';
import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import { DirectoryTree, Draft } from '~/types';
import useUpdateDraft from '~/utils/hooks/useUpdateDraft';

type DraftDetailsContentProps = {
  className?: string;
  draft: Draft;
};

export default function DraftDetailsContent({
  className,
  draft,
}: DraftDetailsContentProps) {
  const router = useRouter();
  const mutation = useUpdateDraft();
  const [name, setName] = useState(draft.name ?? '');

  const defaultPermissions = useMemo(() => {
    const pathPermissions = {};

    const splitGlobPattern = (globPattern) => {
      const match = globPattern.match(/^\{(.*)\}$/);
      if (match) {
        return match[1].split(',').filter((path) => Boolean(path));
      }
      return [];
    };

    const updatePermissions = (globPattern, permission: Permission) => {
      if (globPattern) {
        splitGlobPattern(globPattern).forEach((path) => {
          pathPermissions[path] = pathPermissions[path] ?? [];
          pathPermissions[path].push(permission);
        });
      }
    };

    updatePermissions(draft.isAddable, Permission.ADDABLE);
    updatePermissions(draft.isDeletable, Permission.DELETABLE);
    updatePermissions(draft.isEditable, Permission.EDITABLE);

    return pathPermissions;
  }, [draft]);

  const [pathPermissions, setPathPermissions] =
    useState<Record<string, string[]>>(defaultPermissions);

  useEffect(() => {
    if (mutation.error?.message) {
      toast.error(mutation.error.message);
    } else if (mutation.isSuccess) {
      router.push(`/hire/${encodeURIComponent(draft.id)}/funding`);
    }
  }, [mutation.error, mutation.isSuccess, router, draft]);

  const directoryTrees: DirectoryTree[] = useMemo(() => {
    try {
      return JSON.parse(draft?.analysis?.directoryEntries ?? '');
    } catch (e) {
      console.warn(e);
      return [];
    }
  }, [draft]);

  const onSubmit = () => {
    const addableDirectories: string[] = [];
    const deletableDirectories: string[] = [];
    const editableFiles: string[] = [];
    Object.entries(pathPermissions).forEach(([path, permissions]) => {
      if (permissions.includes(Permission.ADDABLE)) {
        addableDirectories.push(path);
      }
      if (permissions.includes(Permission.DELETABLE)) {
        deletableDirectories.push(path);
      }
      if (permissions.includes(Permission.EDITABLE)) {
        editableFiles.push(path);
      }
    });

    const addableGlob =
      addableDirectories.length > 0 ? `{${addableDirectories.join(',')}}` : '';
    const deletableGlob =
      deletableDirectories.length > 0
        ? `{${deletableDirectories.join(',')}}`
        : '';
    const editableGlob =
      editableFiles.length > 0 ? `{${editableFiles.join(',')}}` : '';

    mutation.mutate({
      id: draft.id,
      name,
      isAddable: addableGlob,
      isDeletable: deletableGlob,
      isEditable: editableGlob,
    });
  };

  return (
    <div className={classNames('', className)}>
      <label className="block font-bold text-xl mt-12" htmlFor="bit-name">
        Name of the bounty
      </label>
      <Input
        id="bit-name"
        className="block mt-4 w-full"
        type="text"
        placeholder="Name of the bounty"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        <Link href={`/hire/${encodeURIComponent(draft.id)}/tests`}>
          <Button className="">Back</Button>
        </Link>
        <Button
          variant="primary"
          className="relative !px-24 flex items-center justify-center"
          disabled={!name}
          onClick={() => onSubmit()}
        >
          <span className={mutation.isLoading ? 'text-transparent' : ''}>
            Continue
          </span>
          {mutation.isLoading && (
            <div className="animate-spin absolute h-5 w-5">
              <AiOutlineLoading className="text-lg text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
