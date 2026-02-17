import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Manrope, Space_Grotesk } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { capturePosthogPageView, initPosthog, registerPosthogErrorTracking } from '../lib/telemetry/posthog';
import '../styles/globals.css';

const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body'
});

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display'
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    initPosthog();
    const detachErrorTracking = registerPosthogErrorTracking();

    if (typeof window !== 'undefined') {
      capturePosthogPageView(`${window.location.pathname}${window.location.search}`);
    }

    const handleRouteChange = (url: string) => {
      capturePosthogPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      detachErrorTracking();
    };
  }, [router.events]);

  return (
    <div className={`${bodyFont.variable} ${displayFont.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
