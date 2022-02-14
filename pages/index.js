import Head from 'next/head'
import { motion } from 'framer-motion'
import { _Transition_Page, _Transition_HeroPage } from '../components/_Animations'
import Image from 'next/image'

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
        className="min-h-screen flex flex-col justify-center items-start px-5 lg:px-28"
      >
        <motion.div
          variants={_Transition_HeroPage}
          initial="initial" animate="animate" exit="exit"
          className='fixed top-0 -z-10 right-0 w-full lg:w-3/4 h-screen'>
          <div className='absolute top-0 z-10 left-0 w-full h-full bg-base-100 bg-opacity-80 lg:bg-opacity-100 lg:bg-transparent lg:bg-gradient-to-r from-base-100  to-transparent' />
          <Image src='/ucc-north.jpg' layout='fill' objectFit='cover' />
        </motion.div>
        <div className='flex px-10 flex-col text-center lg:text-left w-full lg:max-w-md mt-16 lg:mt-32'>
          <p className='text-5xl'>Reconnect.</p>
          <p className='text-5xl'>Rekindle.</p>
          <p className='text-5xl'>Relive.</p>
        </div>
        <div className='flex px-10 flex-col text-center lg:text-left lg:max-w-md'>
          <p className='mt-16'>Graduating from the University doesn&#39;t end there. Find and invite people to see what&#39;s the life of the next generation</p>

          <button className='btn btn-primary lg:w-max mt-5'>Apply for an Alumnus Account</button>
        </div>
      </motion.div>

    </>
  )
}
