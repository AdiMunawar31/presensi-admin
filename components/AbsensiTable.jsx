import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { FaFileExport, FaPlus } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from './Loader';

const AbsensiTable = () => {
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
		<div className='mx-8 my-4 w-3/4 rounded-md bg-white dark:bg-gray-900 p-8 shadow-lg'>
			<div className='block items-center justify-between pb-6 sm:flex '>
				<div>
					<h2 className='font-semibold'>Absensi Pegawai</h2>
					<span className='text-xs'>Daftar Semua Pegawai</span>
				</div>
			</div>
			<div>
				{isLoading ? (
					<Loader />
				) : (
					<div className='-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8'>
						<div className='inline-block min-w-full overflow-hidden rounded-lg shadow'>
							<table className='w-full' id='table-pegawai-absensi'>
								<thead>
									<tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-200 dark:text-gray-400 dark:bg-gray-800'>
										<th className='px-4 py-3'>Nama Pegawai</th>
										<th className='px-4 py-3'>NIK Pegawai</th>
										<th className='px-4 py-3'>Detail Absensi</th>
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
																alt='avatar'
																loading='lazy'
															/>
															<div className='absolute inset-0 rounded-full shadow-inner' aria-hidden='true' />
														</div>
														<div>
															<p className='font-semibold'>{emp.nama}</p>
														</div>
													</div>
												</td>
												<td className='px-4 py-3 text-sm'>
													<div>
														<p>{emp.nik}</p>
													</div>
												</td>
												<td className='px-4 py-3 text-xs'>
													<Link href={`/absensi/${emp.uid}`}>
														<a className='px-4 py-2 rounded font-semibold leading-tight text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'>
															DETAIL
														</a>
													</Link>
												</td>
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

export default AbsensiTable;
