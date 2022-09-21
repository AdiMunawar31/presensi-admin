import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import PegawaiTable from '../components/PegawaiTable';

const pegawai = () => {
	return (
		<Layout title='Pegawai'>
			<PegawaiTable />
		</Layout>
	);
};

export default pegawai;
