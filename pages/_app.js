import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { motion } from 'framer-motion'
import NavBar from '../components/NavBar'
import '../styles/globals.css'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <link rel="icon" href="/pa-transparent-white.png" />
      </Head>
      <NavBar />
      <AnimatePresence exitBeforeEnter  >
        <motion.div className='relative' key={router.route}>
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default MyApp
