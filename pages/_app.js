import '../styles/globals.css';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import UserDataProvider from '../components/Context_UserData';
import Footer from '../components/Footer';
import Head from 'next/head';

const RootApp = ({ Component, pageProps }) => {
	const router = useRouter();

	return (
		<>
			<Head>
				{/* favicon */}
				<link rel="icon" href="/pa-transparent-white.png" />
			</Head>

			<UserDataProvider>
				<Navbar />

				<div className="flex w-full justify-center overflow-x-hidden">
					<div className="flex w-full max-w-5xl flex-col self-center px-10 md:px-20 xl:px-0">
						<AnimatePresence exitBeforeEnter>
							<motion.div key={router.route}>
								<Component {...pageProps} />
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				<Footer />
			</UserDataProvider>
		</>
	);
};

export default RootApp;
