import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }) {
  return (
    <div className="bg-landing bg-cover relative min-h-screen flex flex-col">
      <Navbar />
      <div className="overflow-hidden">{children}</div>
      <Footer className="mt-auto" />
    </div>
  );
}
