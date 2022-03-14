import '../styles/globals.css'

import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

// Root component for all pages
const RootApp = ({ Component, pageProps }) => {
  const router = useRouter()
  return (
    <>
      {/* head */}
      <Head>
        <link rel="icon" href="/pa-transparent-white.png" />
      </Head>

      {/* navbar */}
      <NavBar />

      {/* body */}
      <AnimatePresence exitBeforeEnter  > {/* detect changes in navigation and trigger animation for all pages */}
        <motion.div className='relative overflow-x-hidden' key={router.route}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  )
}

// export root component
export default RootApp