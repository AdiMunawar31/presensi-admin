import type { NextPage } from 'next';
import Banner from '../components/Banner';
import Layout from '../components/Layout';
import Stats from '../components/Stats';

const Home: NextPage = () => {
	return (
		<Layout title='Dashboard'>
			<Stats />
			<Banner />
		</Layout>
	);
};

export default Home;
