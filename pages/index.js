import Head from 'next/head'
import { motion } from 'framer-motion'
import { _Transition_Page } from '../components/_Animations'

export default function Home() {
  return (
    <>
      <Head>
        <title>UCC Project Alumnus</title>
        <meta name="description" content="University of Caloocan City - Alumni Management System" />
      </Head>


      <motion.div
        variants={_Transition_Page}
        initial="initial" animate="animate" exit="exit"
        className="min-h-screen flex justify-center items-center"
      >
        <p>This is a landing page</p>
      </motion.div>

    </>
  )
}
