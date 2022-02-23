import '../styles/globals.css'

import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <link rel="icon" href="/pa-transparent-white.png" />
      </Head>
      <NavBar />
      <AnimatePresence exitBeforeEnter  >
        <motion.div className='relative overflow-x-hidden' key={router.route}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default MyApp
