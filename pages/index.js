import Head from 'next/head'
import { motion } from 'framer-motion'
import { _Transition_Page, _Transition_HeroPage } from '../components/_Animations'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import apolloClient from '../apolloClient'
import { gql } from '@apollo/client'
import Event_Card from '../components/events/Event_Card'

// get events as a static prop
export const getStaticProps = async e => {
  const { data } = await apolloClient.query({
    query: gql`
      {
          news_And_Events (last: 1) {
              id
              createdAt
              eventTitle
              eventSlug
              eventAuthors { name authorSlug }
          }
      }
    `
  })

  return {
    props: {
      latestEvent: data.news_And_Events[0]
    },
  }
}

// create Home page
const Home = ({ latestEvent }) => {
  const [_scrollY, _setScrollY] = useState(0)
  const [_innerHeight, _setInnerHeight] = useState(0)


  // scroll to top using useEffect
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  // set inner height and listen to scroll updates
  useEffect(() => {
    _setInnerHeight(window.innerHeight)
    window.addEventListener("scroll", e => {
      _setScrollY(window.scrollY)
    })
  }, [_scrollY])



  return (
    <>
      {/* Head */}
      <Head>
        <title>UCC Project Alumnus</title>
        <meta name="description" content="University of Caloocan City - Alumni Management System" />
      </Head>

      {/* image background */}
      <motion.div
        variants={_Transition_HeroPage}
        initial="initial" animate="animate" exit="exit"
        whileInView={_scrollY < (_innerHeight - 250) ? {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 1,
            ease: [0.2, 1, 0, 1]
          }
        } : {
          opacity: 0,
          scale: 1.2,
          transition: {
            duration: 1,
            ease: [0.2, 1, 0, 1]
          }
        }}
        className='fixed top-0 -z-10 right-0 w-full lg:w-3/4 h-screen'>
        <div className='absolute top-0 z-10 left-0 w-full h-full bg-base-100 bg-opacity-80 lg:bg-opacity-100 lg:bg-transparent lg:bg-gradient-to-r from-base-100  to-transparent' />
        <Image src='/ucc-north.jpg' layout='fill' objectFit='cover' />
      </motion.div>

      {/* hero page */}
      <motion.section
        variants={_Transition_Page}
        initial="initial" animate="animate" exit="exit"
        className="min-h-screen flex flex-col justify-center items-start px-5 lg:px-28 select-none">


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

      {/* latest event page */}
      <motion.section
        className='min-h-screen '
      >
        {/* bavkground */}
        {/* <div className='absolute'>
          <Image src={} />
        </div> */}

        <div className='flex flex-col text-center lg:text-left px-5 lg:px-28'>

        </div>

      </motion.section>


    </>
  )
}

// export Home Page
export default Home