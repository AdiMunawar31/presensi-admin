import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import AbsensiTable from '../../components/AbsensiTable';

const absensi = () => {
	return (
		<Layout title='Absensi Pegawai'>
			<AbsensiTable />
		</Layout>
	);
};

export default absensi;
