import React from 'react';
import Navbar from './Navbar';

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }) {
  return (
    <div className="bg-landing bg-cover relative min-h-screen">
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
}
