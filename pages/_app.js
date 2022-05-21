import Navbar from '../components/Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Head from 'next/head';

const MainComponent = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        {/* favicon */}
        <link rel="icon" href="/pa-transparent-white.png" />
        {/* title */}
        <title>
          {' '}
          {router.pathname === '/'
            ? 'Project Alumnus'
            : 'Project Alumnus | ' +
              router.pathname.substring(1).charAt(0).toUpperCase()}
          {router.pathname.substring(2)}{' '}
        </title>
      </Head>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-full max-w-4xl px-10 lg:px-0">
          <AnimatePresence exitBeforeEnter>
            <motion.div key={router.route}>
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainComponent;
