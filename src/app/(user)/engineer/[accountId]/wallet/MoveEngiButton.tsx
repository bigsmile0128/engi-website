'use client';

import classNames from 'classnames';
import { useState } from 'react';
import { RiExchangeLine } from 'react-icons/ri';
import Button from '~/components/global/Button/Button';
import EngiIcon from '~/components/global/icons/EngiIcon';
import MoveEngiModal from './MoveEngiModal';
import { CurrentUserInfo } from '~/types';

type MoveEngiButtonProps = {
  className?: string;
  user: CurrentUserInfo;
};

export default function MoveEngiButton({
  className,
  user,
}: MoveEngiButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div className={classNames('', className)}>
      <MoveEngiModal
        isOpen={isModalVisible}
        setIsOpen={setIsModalVisible}
        user={user}
      />
      <Button
        className="flex justify-center items-center whitespace-nowrap"
        onClick={() => setIsModalVisible(true)}
      >
        <RiExchangeLine className="h-5 w-5" />
        <span className="ml-3">
          Move{' '}
          <EngiIcon className="inline-block h-2.5 w-2.5 text-green-primary" />
          ngi
        </span>
      </Button>
    </div>
  );
}
