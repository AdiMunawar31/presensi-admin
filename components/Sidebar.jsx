import React, { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FiUser, FiUsers } from 'react-icons/fi';
import { BsClipboardData } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
	const router = useRouter();
	const { user } = useAuth();

	// console.log({ user });

	return (
		<div>
			<div className='fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar'>
				<div className='overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow'>
					<ul className='flex flex-col py-4 space-y-1'>
						<li className='px-5 hidden md:block'>
							<div className='flex flex-row items-center h-8'>
								<div className='text-sm font-light tracking-wide text-gray-400 uppercase'>Main</div>
							</div>
						</li>
						<li>
							<Link href='/'>
								{router.pathname !== '/' ? (
									<a className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'>
										<span className='inline-flex justify-center items-center ml-4'>
											<AiOutlineHome className='text-xl -mt-1' />
										</span>
										<span className='ml-2 text-sm tracking-wide truncate'>Dashboard</span>
									</a>
								) : (
									<a className='relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:hover:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:hover:border-gray-800 pr-6'>
										<span className='inline-flex justify-center items-center ml-4'>
											<AiOutlineHome className='text-xl -mt-1' />
										</span>
										<span className='ml-2 text-sm tracking-wide truncate'>Dashboard</span>
									</a>
								)}
							</Link>
						</li>
						<li>
							<Link href='/pegawai'>
								{router.pathname !== '/pegawai' ? (
									<a className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'>
										<span className='inline-flex justify-center items-center ml-4'>
											<FiUsers className='text-xl -mt-1' />
										</span>
										<span className='ml-2 text-sm tracking-wide truncate'>Pegawai</span>
										<span className='hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full'>
											New
										</span>
									</a>
								) : (
									<a className='relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:hover:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:hover:border-gray-800 pr-6'>
										<span className='inline-flex justify-center items-center ml-4'>
											<FiUsers className='text-xl -mt-1' />
										</span>
										<span className='ml-2 text-sm tracking-wide truncate'>Pegawai</span>
										<span className='hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full'>
											New
										</span>
									</a>
								)}
							</Link>
						</li>

						{user.email == 'munawar.adi31@gmail.com' || user.email == 'noegraha858@gmail.com' ? (
							<li>
								<Link href='/absensi'>
									{router.pathname !== '/absensi' ? (
										<a className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'>
											<span className='inline-flex justify-center items-center ml-4'>
												<BsClipboardData className='text-xl -mt-1' />
											</span>
											<span className='ml-2 text-sm tracking-wide truncate'>Absensi</span>
										</a>
									) : (
										<a className='relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:hover:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:hover:border-gray-800 pr-6'>
											<span className='inline-flex justify-center items-center ml-4'>
												<BsClipboardData className='text-xl -mt-1' />
											</span>
											<span className='ml-2 text-sm tracking-wide truncate'>Absensi</span>
										</a>
									)}
								</Link>
							</li>
						) : (
							''
						)}

						{/* Section 2 */}

						<li className='px-5 hidden md:block'>
							<div className='flex flex-row items-center mt-5 h-8'>
								<div className='text-sm font-light tracking-wide text-gray-400 uppercase'>PROFILE</div>
							</div>
						</li>
						<li>
							<Link href='/profile'>
								{router.pathname !== '/profile' ? (
									<a className='relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'>
										<span className='inline-flex justify-center items-center ml-4'>
											<FiUser className='text-xl -mt-1' />
										</span>
										<span className='ml-2 text-sm tracking-wide truncate'>Profile</span>
									</a>
								) : (
									<a className='relative flex flex-row items-center h-11 focus:outline-none bg-blue-800 dark:hover:bg-gray-600 text-white-600 text-white-800 border-l-4 border-blue-500 dark:hover:border-gray-800 pr-6'>
										<span className='inline-flex justify-center items-center ml-4'>
											<FiUser className='text-xl -mt-1' />
										</span>
										<span className='ml-2 text-sm tracking-wide truncate'>Profile</span>
									</a>
								)}
							</Link>
						</li>
					</ul>
				</div>
			</div>
			{/* ./Sidebar */}
		</div>
	);
};

export default Sidebar;
