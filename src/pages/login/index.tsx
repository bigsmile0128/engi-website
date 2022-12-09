import React from 'react';
import classNames from 'classnames';

type LoginProps = {
  className?: string;
};

export default function Login({ className }: LoginProps) {
  return (
    <div className={classNames('', className)}>
      {/* TODO: login page */}
      Login page
    </div>
  );
}
