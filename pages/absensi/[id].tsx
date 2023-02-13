import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import DetailAbsensiTable from '../../components/DetailAbsensiTable';
import DailyReportTable from '../../components/DailyReportTable';
import { useRouter } from 'next/router';

const DetailAbsensi = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Layout title='Detail Absensi'>
			<DetailAbsensiTable uid={id} />
		</Layout>
	);
};

export default DetailAbsensi;
