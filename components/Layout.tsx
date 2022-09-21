import Head from 'next/head';
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, title }: { children: React.ReactNode; title: string }) => {
	return (
		<div className='min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white'>
			<Head>
				<meta name='description' content='PRESENCE APP' />
				<meta name='keywords' content='PRESENCE, Next Js, Firebase' />

				<link rel='shortcut icon' href='/logo.png' type='image/x-icon' />

				<title>{title}</title>
			</Head>
			<Navbar />
			<Sidebar />
			<div className='h-full ml-14 mt-14 mb-10 md:ml-64'>{children}</div>
		</div>
	);
};

export default Layout;
