import Link from 'next/link';
import { motion, useViewportScroll } from 'framer-motion';
import Image from 'next/image';
import {
  _Transition_HeroPage,
  _Transition_Page,
} from '../components/_Animations';
import { useEffect, useState } from 'react';

const Home = ({}) => {
  const { scrollY } = useViewportScroll();

  const [_scrollY, _setScrollY] = useState(0);
  // set inner height and listen to scroll updates
  useEffect(() => {
    // _setInnerHeight(window.innerHeight)
    window.addEventListener('scroll', (e) => {
      _setScrollY(scrollY.get());
    });
  }, [_scrollY]);
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={_Transition_HeroPage}
        className="fixed top-0 right-0 -z-10 h-screen w-screen"
      >
        <div className=" absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-br from-base-100 to-base-300 opacity-80 " />

        <div
          style={{
            opacity: 1 - Math.min(scrollY.get() / 300, 1),
            transform: `translateY(-${scrollY.get() / 10}px)`,
          }}
          className="relative h-[110vh] w-full"
        >
          <Image src="/landing.jpg" layout="fill" objectFit="cover" priority />
        </div>
      </motion.div>

      {/* landing */}
      <motion.section
        variants={_Transition_Page}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex min-h-screen select-none flex-col items-start w-full lg:w-1/2 justify-center"
      >
        <motion.div className="relative flex w-full self-center text-left lg:mt-10 h-20 overflow-hidden">
          <p className="text-5xl mt-4">Re</p>
          <motion.div
            animate={{
              translateY: [0, 0, -80, -80, -80 * 2, -80 * 2, -80 * 3],
            }}
            transition={{
              repeat: Infinity,
              ease: 'easeInOut',
              duration: 3,
            }}
            className="w-full h-[400%]"
          >
            <div className="h-20 flex items-center justify-start ">
              <p className="text-5xl col-span-full font-bold">connect.</p>
            </div>
            <div className="h-20 flex items-center justify-start ">
              <p className="text-5xl col-span-full font-bold">kindle.</p>
            </div>
            <div className="h-20 flex items-center justify-start ">
              <p className="text-5xl col-span-full font-bold">live.</p>
            </div>
            <div className="h-20 flex items-center justify-start ">
              <p className="text-5xl col-span-full font-bold">connect.</p>
            </div>
          </motion.div>
        </motion.div>
        <div className="mt-7 flex max-w-sm flex-col text-left lg:max-w-md ">
          <p className="">
            Graduating from the University doesn&#39;t end there. Find and
            invite people to see what&#39;s the life of the next generation
          </p>
          <div className="divider" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* coa to "/register" */}
            <Link href="/register" scroll={false} passHref>
              <a className="btn btn-primary  ">Try for free</a>
            </Link>
            {/* coa to "/register" */}
            <Link href="#about-pa" scroll passHref>
              <a className="btn btn-secondary  ">See what this is</a>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* detail */}
      <motion.section className="flex flex-col mt-16 mb-52 gap-10">
        <motion.div className="flex flex-col lg:flex-row lg:items-center">
          <div className="relative w-full h-32 lg:h-64">
            <Image src={'/reconnect.svg'} layout="fill" />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-center lg:text-left text-2xl lg:text-3xl font-bold underline">
              Reconnect with the people you know
            </p>
            <p className="text-center lg:text-left">
              We want you to find people you had a connection with on your days
              here in the university and to find something and get involved.
            </p>
          </div>
        </motion.div>
        <motion.div className="flex flex-col lg:flex-row-reverse lg:items-center">
          <div className="relative w-full h-32 lg:h-64">
            <Image src={'/rekindle.svg'} layout="fill" />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-center lg:text-right text-2xl lg:text-3xl font-bold underline">
              Rekindle memories you had
            </p>
            <p className="text-center lg:text-right">
              See what other people you know or knew are doing and bring back
              memories that come back with it as well. Never forget the people
              who were there back then as we provide the platform to help you
              find them.
            </p>
          </div>
        </motion.div>
        <motion.div className="flex flex-col lg:flex-row lg:items-center">
          <div className="relative w-full h-32 lg:h-64">
            <Image src={'/relive.svg'} layout="fill" />
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-center lg:text-left text-2xl lg:text-3xl font-bold underline">
              Relive the lives you spent
            </p>
            <p className="text-center lg:text-left">
              Be a part of their lives. Be a part of the community. Be something
              unique. Be yourself. This platform will help you to let those
              sparks burn again
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* the paltform */}
      <motion.section className="flex flex-col mb-52 gap-10">
        <p className="text-4xl text-center">
          Your platform to be connected once more
        </p>
        <p className="text-center self-center max-w-xl">
          There are numerous advantages to using a Project Alumnus for
          university alumni. Alumni can use this platform to stay in touch with
          their alma mater, discover stories, and connect with other alumni. It
          gives students, staff, faculty, and others connected to the university
          an easy way to keep up with campus news and events. Furthermore, using
          Project Alumnus allows alumni to interact directly with one another
          and form relationships that would not be possible otherwise.
        </p>
      </motion.section>

      {/* abotu */}
      <motion.section
        id="about-pa"
        className="flex flex-col mt-16 mb-52 gap-10 items-center"
      >
        <p className="text-4xl text-center">What is Project Alumnus?</p>
        <p className="text-center max-w-xl">
          Project Alumnus is a social platform for university alumni to connect
          with each other and reach out their stories. We provide a platform to
          connect with people who had a connection with you in the university.
          We want to help you find people you had a connection with on your days
          here in the university and to find something and get involved.
        </p>
        <Link href={'/register'}>
          <div className="btn btn-secondary max-w-md w-full mt-10">
            give it a try
          </div>
        </Link>
      </motion.section>
    </>
  );
};

export default Home;
