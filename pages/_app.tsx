import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../helpers/ProtectedRoute';
import { ThemeProvider } from 'next-themes';

const noAuthRequired = ['/login'];

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<ThemeProvider attribute='class'>
			<AuthContextProvider>
				{noAuthRequired.includes(router.pathname) ? (
					<Component {...pageProps} />
				) : (
					<ProtectedRoute>
						<Component {...pageProps} />
					</ProtectedRoute>
				)}
			</AuthContextProvider>
		</ThemeProvider>
	);
}

export default MyApp;
