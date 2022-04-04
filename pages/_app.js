import '../styles/globals.css'

import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

// import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Navbar_New from '../components/Navbar_New'
import NavBar from '../components/NavBar'
import { AuthProvider } from '../components/_AuthProvider'
import { ListingProvider } from '../components/_AlumniListProvider'

// Root component for all pages
const RootApp = ({ Component, pageProps }) => {
  const router = useRouter()

  return (
    <>
      {/* head */}
      <Head>
        <link rel="icon" href="/pa-transparent-white.png" />
      </Head>

      <AuthProvider>
        <ListingProvider>
          {/* navbar */}
          <Navbar_New />

          {/* body */}
          <AnimatePresence exitBeforeEnter  > {/* detect changes in navigation and trigger animation for all pages */}
            <motion.div className='relative overflow-x-hidden ' key={router.route}>
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
          <Footer />
        </ListingProvider>
      </AuthProvider>
    </>
  )
}

// export root component
export default RootApp