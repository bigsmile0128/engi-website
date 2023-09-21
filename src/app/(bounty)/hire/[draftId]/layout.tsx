import classNames from 'classnames';
import React from 'react';
import Nav from './Nav';

export default async function DraftLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: {
    draftId: string;
  };
}) {
  const draftId = decodeURIComponent(params.draftId);

  return (
    <div className={classNames('max-w-page flex flex-col py-24')}>
      <Nav className="mb-12" draftId={draftId} />
      {children}
    </div>
  );
}
