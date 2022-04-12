import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useState, useEffect } from 'react'

import { motion, useViewportScroll } from 'framer-motion'
import { _Transition_HeroPage, _Transition_Page } from '../components/_Animations'


const Home = e => {
  const { scrollY } = useViewportScroll()

  const [_scrollY, _setScrollY] = useState(0)
  // set inner height and listen to scroll updates
  useEffect(() => {
    // _setInnerHeight(window.innerHeight)
    window.addEventListener("scroll", e => {
      _setScrollY(scrollY.get())
    })
  }, [_scrollY])

  return (
    <>
      {/* Head */}
      <Head>
        <title>UCC Project Alumnus</title>
        <meta name="description" content="University of Caloocan City - Alumni Management System" />
      </Head>

      <motion.div
        className='fixed top-0 -z-10 right-0 w-screen h-screen'>
        <div className='absolute top-0 z-10 left-0 w-full h-full bg-base-300 bg-opacity-80 ' />

        <div
          style={{ opacity: 1 - (scrollY.get() / 500), top: -(scrollY.get() / 20) }}
          className='relative w-full h-full' >
          <Image src='/ucc-north.jpg' layout='fill' objectFit='cover' priority />
        </div>
      </motion.div>

      {/* hero page */}
      <motion.section
        variants={_Transition_Page}
        initial="initial" animate="animate" exit="exit"
        className="min-h-screen flex flex-col justify-center items-start select-none">


        <div className='flex flex-col text-center lg:text-left w-full lg:mt-10'>
          <p className='text-5xl'>Reconnect.</p>
          <p className='text-5xl'>Rekindle.</p>
          <p className='text-5xl'>Relive.</p>
        </div>
        <div className='flex flex-col text-center max-w-sm self-center lg:self-start lg:text-left lg:max-w-md mt-7'>
          <p className=''>Graduating from the University doesn&#39;t end there. Find and invite people to see what&#39;s the life of the next generation</p>

          {/* coa to "/register" */}
          <Link href='/register' scroll={false} passHref>
            <a className='btn btn-primary lg:w-max mt-5'>Apply for an Alumnus Account</a>
          </Link>
        </div>
      </motion.section>

      {/* Reconnect Page */}
      <section
        className="py-28 flex flex-col justify-center items-center select-none">
        <motion.p className='text-5xl flex flex-col lg:flex-row text-center lg:gap-4' initial={{ opacity: 0, translateX: 100 }} whileInView={{ opacity: 1, translateX: 0 }}>
          <span className='font-bold'>Reconnect</span>
          <span className="font-thin">with the people you know</span>
        </motion.p>
        <motion.p className='max-w-lg text-center mt-5' initial={{ opacity: 0, translateX: -100 }} whileInView={{ opacity: 1, translateX: 0 }}>
          We want you to find people you had a connection with on your days here in the university and to find something and get involved.
        </motion.p>

      </section>

      {/* Rekindle Page */}
      <section
        className="py-28 flex flex-col justify-center items-center select-none">
        <motion.p className='text-5xl flex flex-col lg:flex-row text-center lg:gap-4' initial={{ opacity: 0, translateX: -100 }} whileInView={{ opacity: 1, translateX: 0 }}>
          <span className='font-bold'>Rekindle</span>
          <span className="font-thin">memories you had</span>
        </motion.p>
        <motion.p className='max-w-lg text-center mt-5' initial={{ opacity: 0, translateX: 100 }} whileInView={{ opacity: 1, translateX: 0 }}>
          See what other people you know or knew are doing and bring back memories that come back with it as well. Never forget the people who were there back then as we provide the platform to help you find them.
        </motion.p>

      </section>

      {/* Relive Page */}
      <section
        className="py-28 flex flex-col justify-center items-center select-none mb-32">
        <motion.p className='text-5xl flex flex-col lg:flex-row text-center lg:gap-4' initial={{ opacity: 0, translateX: 100 }} whileInView={{ opacity: 1, translateX: 0 }}>
          <span className='font-bold'>Relive</span>
          <span className="font-thin">the lives you spent</span>
        </motion.p>
        <motion.p className='max-w-lg text-center mt-5' initial={{ opacity: 0, translateX: -100 }} whileInView={{ opacity: 1, translateX: 0 }}>
          Be a part of their lives. Be a part of the community. Be something unique. Be yourself. This platform will help you to let those sparks burn again
        </motion.p>

      </section>

    </>
  )
}

export default Home