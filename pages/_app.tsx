import type { AppProps } from 'next/app';
import { Manrope, Space_Grotesk } from 'next/font/google';
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
  return (
    <div className={`${bodyFont.variable} ${displayFont.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
