import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({ children, title = 'Crypto Tracker' }) => {
  return (
    <div className='layout' style={{ backgroundColor: '#f0f2f5' }}>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className="flex justify-center py-10">
        {/* <Link href='/' passHref>
         
        </Link> */}
      </header>
      <main className="container mx-auto px-4">{children}</main>
    </div>
  );
};

export default Layout;
