import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { IoLogOutOutline } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';
import Head from 'next/head';
import DarkMode from './DarkMode';

const Navbar = () => {
	const { logout } = useAuth();
	const router = useRouter();

	return (
		<div>
			<div className='fixed w-full flex items-center justify-between h-14 text-white z-10'>
				<div className='flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-blue-700 dark:bg-gray-800 border-none'>
					<img src='/logo.png' alt='logo' height={40} width={40} />
					<span className='font-bold ml-2'>PEMDES MEKARJAYA</span>
				</div>
				<div className='flex justify-between items-center h-14 bg-blue-700 dark:bg-gray-800 header-right'>
					<div></div>
					<ul className='flex items-center'>
						<DarkMode />
						<li>
							<div className='block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700' />
						</li>
						<li>
							<div
								className='flex items-center mr-4 hover:text-blue-100 cursor-pointer'
								onClick={async () => {
									await logout();
								}}
							>
								<IoLogOutOutline className='mr-2 text-white text-lg' />
								Logout
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
