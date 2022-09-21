import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { FaFileExport, FaPlus } from 'react-icons/fa';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../configs/firebase';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import Loader from './Loader';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const AbsensiTable = ({ uid }) => {
	const [absensi, setAbsensi] = useState([]);
	const [employee, setEmployee] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [hadir, setHadir] = useState(0);
	const [tidakHadir, setTidakHadir] = useState(0);
	const [izin, setIzin] = useState(0);

	const router = useRouter();

	const date = new Date();

	const tahun = date.getFullYear();
	const bulan = date.getMonth();
	const tanggal = date.getDate();
	const hari = date.getDay();

	const jam = date.getHours();

	const now = `${bulan + 1}-${tanggal}-${tahun}`;

	switch (hari) {
		case 0:
			hari = 'Minggu';
			break;
		case 1:
			hari = 'Senin';
			break;
		case 2:
			hari = 'Selasa';
			break;
		case 3:
			hari = 'Rabu';
			break;
		case 4:
			hari = 'Kamis';
			break;
		case 5:
			hari = "Jum'at";
			break;
		case 6:
			hari = 'Sabtu';
			break;
	}
	switch (bulan) {
		case 0:
			bulan = 'Januari';
			break;
		case 1:
			bulan = 'Februari';
			break;
		case 2:
			bulan = 'Maret';
			break;
		case 3:
			bulan = 'April';
			break;
		case 4:
			bulan = 'Mei';
			break;
		case 5:
			bulan = 'Juni';
			break;
		case 6:
			bulan = 'Juli';
			break;
		case 7:
			bulan = 'Agustus';
			break;
		case 8:
			bulan = 'September';
			break;
		case 9:
			bulan = 'Oktober';
			break;
		case 10:
			bulan = 'November';
			break;
		case 11:
			bulan = 'Desember';
			break;
	}
	const tampilTanggal = `${hari}, ${tanggal} ${bulan} ${tahun}`;

	useEffect(() => {
		setIsLoading(true);
		async function fetchData() {
			const colRef = collection(db, `pegawai/${uid}/presensi`);
			const queryAbsen = query(colRef, orderBy('tanggal', 'asc'));

			const docSnap = await getDocs(queryAbsen);
			if (!docSnap.empty) {
				let absensi = [];
				docSnap.docs.forEach((doc) => {
					absensi.push({ ...doc.data(), id: doc.id });
				});
				setAbsensi(absensi);
				setIsLoading(false);
			} else {
				setAbsensi([]);
				setIsLoading(false);
			}
		}

		async function fetchDataPegawai() {
			const docRef = doc(db, 'pegawai', uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setEmployee(docSnap.data());
			} else {
				setEmployee([]);
			}
		}
		fetchData();
		fetchDataPegawai();
	}, []);

	const setAbsen = async (e) => {
		if (jam > 13 && jam < 15) {
			Swal.fire({
				title: 'Yakin?',
				text: 'Apakah pegawai ini tidak hadir hari ini?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ya!',
				cancelButtonText: 'Tidak',
			}).then((result) => {
				if (result.isConfirmed) {
					setDoc(doc(db, `pegawai/${uid}/presensi`, now), {
						date: date.toISOString(),
						day: tampilTanggal,
					});

					Swal.fire('Berhasil!', 'Telah menyatakan pegawai tidak hadir hari ini.', 'success').then(() =>
						router.push('/absensi')
					);
				}
			});
		} else {
			Swal.fire('Gagal!', 'Untuk menyatakan pegawai tidak hadir hanya bisa dilakukan pada jam 13:00 - 15:00.', 'error');
		}
	};

	const deleteAbsen = async (e) => {
		if (absensi.length >= 20) {
			Swal.fire({
				title: 'Yakin?',
				text: 'Apakah anda yakin akan menghapus data absensi bulan ini?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Ya!',
				cancelButtonText: 'Tidak',
			}).then((result) => {
				if (result.isConfirmed) {
					async function deleteData() {
						const q = query(collection(db, `pegawai/${uid}/presensi`));
						const querySnapshot = await getDocs(q);

						const deleteOps = [];

						querySnapshot.forEach((doc) => {
							deleteOps.push(deleteDoc(doc.ref));
							console.log(doc);
						});
						Promise.all(deleteOps).then(() => console.log('documents deleted'));
					}

					deleteData();

					Swal.fire('Berhasil!', 'Data absensi bulan ini telah berhasil dihapus', 'success').then(() =>
						router.push('/absensi')
					);
				}
			});
		} else {
			Swal.fire('Gagal!', 'Absensi per bulan hanya bisa dihapus jika sudah melebihi 20 hari.', 'error');
		}
	};

	return (
		<div className='mx-8 my-4 w-3/4 rounded-md bg-white dark:bg-gray-900 p-8 shadow-lg'>
			<div className='block items-center justify-between pb-6 sm:flex '>
				<div>
					<h1 className='font-bold'>{employee.nama}</h1>
					<span className='text-sm'>{employee.pekerjaan}</span>
				</div>
				<div className='mt-4 block items-center justify-center sm:mt-0 sm:flex'>
					<div className='mt-4 space-x-8 sm:ml-10 sm:mt-0 lg:ml-40'>
						<ReactHTMLTableToExcel
							table='table-pegawai'
							sheet='Sheets'
							filename={employee.nama ? employee.nama : ''}
							buttonText='Export Excel'
							className='cursor-pointer inline-flex rounded-md bg-green-600 px-4 py-2 font-semibold text-sm text-white'
						/>
						<button
							onClick={deleteAbsen}
							className='cursor-pointer inline-flex rounded-md bg-red-600 px-4 py-2 font-semibold text-sm text-white'
						>
							Delete Absensi Bulan Ini
						</button>
					</div>
				</div>
			</div>
			<div>
				{isLoading ? (
					<Loader />
				) : (
					<div className='-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8'>
						<div className='inline-block min-w-full overflow-hidden rounded-lg shadow'>
							{absensi.length !== 0 ? (
								<table className='w-full' id='table-pegawai'>
									<thead>
										<tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-200 dark:text-gray-400 dark:bg-gray-800'>
											<th className='px-4 py-3'>Hari-Ke</th>
											<th className='px-4 py-3'>Hari/Tanggal Absensi</th>
											<th className='px-6 py-3'>Masuk</th>
											<th className='px-6 py-3'>Keluar</th>
											<th className='px-4 py-3'>Hadir</th>
											<th className='px-4 py-3'>Tidak Hadir</th>
											<th className='px-4 py-3'>Izin</th>
										</tr>
									</thead>
									<tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
										{absensi.map((absen, i) => {
											{
												absen.masuk != null && absen.keluar != null ? (hadir += 1) : hadir;
												absen.masuk == null && absen.keluar == null ? (tidakHadir += 1) : tidakHadir;
												absen.masuk != null && absen.keluar == null ? (izin += 1) : izin;
											}
											return (
												<tr
													key={i}
													className='bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400'
												>
													<td className='px-4 py-3'>
														<div className='ml-4 text-sm'>
															<p className='font-semibold'>{i + 1}</p>
														</div>
													</td>
													<td className='px-4 py-3'>
														<div className='text-sm'>
															<div>
																<p className='font-semibold'>{absen.hari == null ? absen.masuk.hari : absen.hari}</p>
															</div>
														</div>
													</td>
													<td className='px-6 py-3 text-sm'>
														<div>
															<p>{absen.masuk != null && absen.masuk != '' ? absen.masuk.jam : '-'}</p>
														</div>
													</td>
													<td className='px-6 py-3 text-sm'>
														<div>
															<p>{absen.keluar != null && absen.keluar != '' ? absen.keluar.jam : '-'}</p>
														</div>
													</td>
													<td className='px-4 py-3'>
														<div className='ml-4 text-sm'>
															<p>{absen.masuk != null && absen.keluar != null ? 1 : 0}</p>
														</div>
													</td>
													<td className='px-4 py-3'>
														<div className='ml-8 text-sm'>
															<p>{absen.masuk == null && absen.keluar == null ? 1 : 0}</p>
														</div>
													</td>
													<td className='px-4 py-3'>
														<div className='ml-2 text-sm'>
															<p>{absen.masuk != null && absen.keluar == null ? 1 : 0}</p>
														</div>
													</td>
												</tr>
											);
										})}
										<tr className=' dark:bg-gray-900 bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400'>
											<td colSpan={3} className='px-4 py-3'>
												<div className='ml-2 text-sm'></div>
											</td>
											<td className='px-4 py-3'>
												<div className='ml-8 text-sm'>
													<p>Total:</p>
												</div>
											</td>
											<td className='px-4 py-3'>
												<div className='ml-4 text-sm'>
													<p>{hadir}</p>
												</div>
											</td>
											<td className='px-4 py-3'>
												<div className='ml-8 text-sm'>
													<p>{tidakHadir}</p>
												</div>
											</td>
											<td className='px-4 py-3'>
												<div className='ml-2 text-sm'>
													<p>{izin}</p>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							) : (
								<span className='min-w-full h-60 flex justify-center items-center'>
									Data absensi bulan ini belum ada
								</span>
							)}
						</div>
						<p className='text-red-500 text-xs italic py-2'>
							*Notes : Dinyatakan hadir apabila telah melakukan absen masuk dan absen keluar
						</p>
					</div>
				)}
			</div>
			<Link href='/absensi'>
				<a className='cursor-pointer inline-flex rounded bg-red-600 px-4 py-2 text-white text-xs'>Kembali</a>
			</Link>
			<div className='cursor-pointer inline-flex rounded ml-2 bg-blue-600 px-4 py-2 text-white text-xs'>
				Total Records : {absensi.length}
			</div>
			<button
				onClick={setAbsen}
				className='cursor-pointer inline-flex rounded ml-2 bg-yellow-500 px-4 py-2 text-black text-xs'
			>
				Tidak Hadir Hari Ini
			</button>
		</div>
	);
};

export default AbsensiTable;
