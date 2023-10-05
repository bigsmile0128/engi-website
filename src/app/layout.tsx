import classNames from 'classnames';
import { Metadata } from 'next';
import Script from 'next/script';
import BreakpointInspector from '~/components/BreakpointInspector';
import Providers from '~/components/Providers';
import Footer from '~/components/modules/layout/Footer';
import NavbarContainer from '~/components/modules/layout/NavbarContainer';
import { isDev, isProduction } from '~/utils';
import '~/utils/datetime/dayjs-extend';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Engi Network',
  description: 'Affordable Engineering On-Demand',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={classNames(
          'relative min-h-screen flex flex-col overflow-hidden before:bg-site before:-z-10',
          isDev() ? 'debug-screens' : ''
        )}
      >
        <Providers>
          {/* @ts-expect-error Server Component */}
          <NavbarContainer />
          <main className="w-full h-full">{children}</main>
          <Footer className="mt-auto" />
        </Providers>
        <div id="portal" />
        <BreakpointInspector className={isDev() ? '!block' : ''} />
      </body>
      {isProduction() && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          console.log('loading gtag manager for engi ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}')
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
          </Script>
          <Script id="env-logger">{`
          console.log('🐲 START -- Engi Environment Configuration 🐲');
          console.log(${JSON.stringify(process.env)});
          console.log('🐲 END -- Engi Environment Configuration 🐲');
          `}</Script>
        </>
      )}
    </html>
  );
}
