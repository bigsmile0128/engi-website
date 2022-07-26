import Image from 'next/image';
import Footer from './Footer';
import Navbar from './Navbar';

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    //bg-landing bg-cover cause performance issue
    <main className="relative min-h-screen flex flex-col">
      <div className="absolute w-full h-full -z-40">
        <Image
          src="/img/website-bg.png"
          alt="bgImage"
          layout="fill"
          objectFit="cover"
          loading="lazy"
          sizes="100vw"
        />
      </div>
      <Navbar />
      <div className="overflow-hidden">{children}</div>
      <Footer className="mt-auto" />
    </main>
  );
}
