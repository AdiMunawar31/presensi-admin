import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
// import 'firebase/firestore';
import { db } from '../configs/firebase';
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	setDoc,
	updateDoc,
	writeBatch,
} from 'firebase/firestore';

const DailyReport = ({ uid }) => {
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const [reports, setReports] = useState({});

	const [absensi, setAbsensi] = useState([]);
	const [employee, setEmployee] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// Get a new write batch

	const handleMonthChange = (e) => {
		setMonth(e.target.value);
	};

	const handleYearChange = (e) => {
		setYear(e.target.value);
	};

	const handleReportChange = (day, e) => {
		setReports({ ...reports, [day]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			const batch = writeBatch(db);
			Object.entries(reports).forEach(([day, report]) => {
				// const ref = db.collection(`pegawai/${uid}/presensi`).doc(`${month + 1}-${day}-${year}`);
				const ref = collection(db, `pegawai/${uid}/presensi`);
				console.log(report);
				batch.set(ref, { report });
			});
			await batch.commit();
			console.log('Reports saved successfully!');
		} catch (error) {
			console.error('Error saving reports:', error);
		}
	};

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

	return (
		<div>
			<div>
				<label>Month:</label>
				<select value={month} onChange={handleMonthChange}>
					<option value={0}>January</option>
					<option value={1}>February</option>
					<option value={2}>March</option>
					{/* Add options for the rest of the months */}
				</select>
				<label>Year:</label>
				<select value={year} onChange={handleYearChange}>
					<option value={2022}>2022</option>
					<option value={2023}>2023</option>
					{/* Add options for other years */}
				</select>
				<button onClick={handleSubmit}>Submit</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Report</th>
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
						<tr key={day}>
							<td>{`${month + 1}/${day}/${year}`}</td>
							<td>
								<input type='text' value={day || ''} onChange={(e) => handleReportChange(day, e)} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DailyReport;
