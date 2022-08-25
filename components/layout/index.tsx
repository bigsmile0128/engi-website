import cn from 'classnames';
import Footer from './Footer';
import Navbar from './Navbar';
import styles from './layout.module.css';

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={cn('relative min-h-screen flex flex-col', styles.main_bg)}>
      <div className="absolute w-full h-full -z-40"></div>
      <Navbar />
      <div className="">{children}</div>
      <Footer className="mt-auto" />
    </main>
  );
}
