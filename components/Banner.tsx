import React from 'react';

const Banner = () => {
	return (
		<div className='my-4 hidden md:flex h-52 justify-center'>
			<div className='grid max-w-5xl grid-cols-6 rounded-xl bg-blue-700'>
				<div className='col-span-4'>
					<h2 className='mt-8 ml-10 text-3xl font-bold text-white'>Selamat Datang di Aplikasi Presensi</h2>

					<p className='my-5 ml-10 text-sm font-light text-white'>
						Aplikasi Presensi merupakan terobosan baru pada sistem absensi pegawai. Selain bisa menekan pengeluaran
						operasional, Aplikasi Presensi juga mempermudah dalam melakukan perhitungan kehadiran karena data sudah
						terintegrasi dengan aplikasi mobilenya
					</p>
				</div>
				<div className='col-span-2 m-6'>
					<img src='/logo.png' alt='logo' width={150} className='ml-20' />
				</div>
			</div>
		</div>
	);
};

export default Banner;
