import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import Layout from '../components/Layout';

const Profile = () => {
	return (
		<Layout title='Profile'>
			<div className='m-12'>
				<div className='grid grid-cols-1 md:grid-cols-2'>
					<div className='p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg'>
						<h1 className='text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight'>
							Kantor Desa
						</h1>
						<p className='text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2'>
							Mekarjaya Kec. Pancalang Kab. Kuningan
						</p>
						<div className='flex items-center mt-8 text-gray-600 dark:text-gray-400'>
							<FiMapPin className='text-2xl' />
							<div className='ml-4 text-md tracking-wide font-semibold w-full'>
								Jl Raya Sumber Linggarj, Mekarjaya, Kec. Pancalang, Kabupaten Kuningan, Jawa Barat 45557
							</div>
						</div>
						<div className='flex items-center my-6 text-gray-600 dark:text-gray-400'>
							<BsTelephone className='text-2xl' />
							<div className='ml-4 text-md tracking-wide font-semibold w-40'>081220556031</div>
						</div>
						<div className='flex items-center mt-4 text-gray-600 dark:text-gray-400'>
							<AiOutlineMail className='text-2xl' />
							<div className='ml-4 text-md tracking-wide font-semibold w-40'>mekarjaya@info.com</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
