import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const login = () => {
	const router = useRouter();
	const { login }: any = useAuth();
	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const handleLogin = async (e: any) => {
		e.preventDefault();

		try {
			await login(data.email, data.password);
			router.push('/');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<Head>
				<link rel='shortcut icon' href='/logo.png' type='image/x-icon' />
				<title>Login</title>
			</Head>
			<div className='min-h-screen bg-gray-100 dark:bg-gray-700 flex flex-col justify-center sm:py-12'>
				<div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
					<div className='flex justify-center items-center mb-8 -mt-16'>
						<Image src='/logo.png' alt='logo' height={120} width={120} layout='intrinsic' />
					</div>
					<div className='bg-white dark:bg-gray-800 shadow w-full rounded-lg divide-y divide-gray-200 dark:divide-gray-900'>
						<div className='px-5 py-7'>
							<label className='font-semibold text-sm text-gray-600 pb-1 block'>E-mail</label>
							<input
								type='email'
								className='border rounded-lg p-3 mt-1 mb-5 text-sm w-full dark:border-gray-900 dark:bg-gray-700'
								onChange={(e: any) =>
									setData({
										...data,
										email: e.target.value,
									})
								}
								value={data.email}
								required
							/>

							<label className='font-semibold text-sm text-gray-600 pb-1 block'>Password</label>
							<input
								type='password'
								className='border rounded-lg p-3 mt-1 mb-5 text-sm w-full dark:border-gray-900 dark:bg-gray-700'
								onChange={(e: any) =>
									setData({
										...data,
										password: e.target.value,
									})
								}
								value={data.password}
								required
							/>

							<button
								type='submit'
								className='transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block'
							>
								<span className='inline-block mr-2'>Login</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default login;
