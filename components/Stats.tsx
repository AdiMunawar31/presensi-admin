import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import { db } from '../configs/firebase';

const Stats = () => {
	const [employee, setEmployee] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// console.log(employee);
	useEffect(() => {
		setIsLoading(true);
		async function fetchData() {
			const colRef = collection(db, 'pegawai');

			const docSnap = await getDocs(colRef);
			if (!docSnap.empty) {
				let employee: any = [];
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
		<div className='mx-7'>
			{/* Statistics Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4'>
				<div className='bg-blue-600 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group'>
					<div className='flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
						<FiUsers className='text-xl text-blue-900' />
					</div>
					<div className='text-right'>
						<span className='text-3xl mr-2'>{employee.length}</span>
						<span>Pegawai</span>
					</div>
				</div>
			</div>
			{/* ./Statistics Cards */}
		</div>
	);
};

export default Stats;
