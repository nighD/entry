import './globals.css';
import { Inter } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import ToasterProvider from './providers/ToasterProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Entry Level',
  description: 'Entry Level Testing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const classString = inter.className + " flex flex-col w-full min-h-screen justify-start";
  return (
    <html lang="en">
      <body className={classString}>
        <ClientOnly>
          <ToasterProvider />
            {children}
        </ClientOnly>
      </body>
    </html>
  );
}
