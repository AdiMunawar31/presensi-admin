import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { FaFileExport, FaPlus } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from './Loader';

const PegawaiTable = () => {
	const [employee, setEmployee] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// console.log(employee);
	useEffect(() => {
		setIsLoading(true);
		async function fetchData() {
			const colRef = collection(db, 'pegawai');

			const docSnap = await getDocs(colRef);
			if (!docSnap.empty) {
				let employee = [];
				docSnap.docs.forEach((doc) => {
					employee.push({ ...doc.data(), id: doc.id });
				});
				setEmployee(employee);
				setIsLoading(false);
			} else {
				setEmployee([]);
			}
		}
		fetchData();
	}, []);
	return (
		<div className='mx-8 my-4 rounded-md bg-white dark:bg-gray-900 p-8 shadow-lg'>
			<div className='block items-center justify-between pb-6 sm:flex '>
				<div>
					<h2 className='font-semibold'>Pegawai</h2>
					<span className='text-xs'>Daftar Semua Pegawai</span>
				</div>
				<div className='mt-4 block items-center justify-between sm:mt-0 sm:flex'>
					<div className='mt-4 space-x-8 sm:ml-10 sm:mt-0 lg:ml-40'>
						<ReactHTMLTableToExcel
							table='table-pegawai'
							sheet='Sheets'
							filename='Daftar Pegawai'
							buttonText='Export Excel'
							className='cursor-pointer inline-flex rounded-md bg-green-600 px-4 py-2 font-semibold text-sm text-white'
						/>
						{/* <Link href='/tambah_pegawai'>
							<button className='cursor-pointer inline-flex rounded-md bg-blue-600 text-sm px-4 py-2 font-semibold text-white'>
								<FaPlus className='mt-1 mr-1' /> <span>Tambah Pegawai</span>
							</button>
						</Link> */}
					</div>
				</div>
			</div>
			<div>
				{isLoading ? (
					<Loader />
				) : (
					<div className='-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8'>
						<div className='inline-block min-w-full overflow-hidden rounded-lg shadow'>
							<table className='w-full' id='table-pegawai'>
								<thead>
									<tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-200 dark:text-gray-400 dark:bg-gray-800'>
										<th className='px-4 py-3'>Nama</th>
										<th className='px-4 py-3'>NIK</th>
										<th className='px-4 py-3'>Email</th>
										{/* <th className='px-4 py-3'>Role</th> */}
										<th className='px-4 py-3'>Jabatan</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
									{employee.map((emp, i) => {
										return (
											<tr
												key={i}
												className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400'
											>
												<td className='px-4 py-3'>
													<div className='flex items-center text-sm'>
														<div className='relative hidden w-8 h-8 mr-3 rounded-full md:block'>
															<img
																className='object-cover w-full h-full rounded-full'
																src={
																	emp.avatar != '' && emp.avatar != null
																		? emp.avatar
																		: `https://ui-avatars.com/api/?name=${emp.nama}&background=27A8FD&color=fff&bold=true`
																}
																alt=''
																loading='lazy'
															/>
															<div className='absolute inset-0 rounded-full shadow-inner' aria-hidden='true' />
														</div>
														<div>
															<p className='font-semibold'>{emp.nama}</p>
														</div>
													</div>
												</td>
												<td className='px-4 py-3 text-sm'>{emp.nik}</td>
												<td className='px-4 py-3 text-sm'>{emp.email}</td>
												{/* <td className='px-4 py-3 text-xs'>
													<span className='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100'>
														{emp.role}
													</span>
												</td> */}
												<td className='px-4 py-3 text-sm'>{emp.jabatan}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PegawaiTable;
