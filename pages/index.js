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
        <div className=" absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-br from-base-100 to-base-300 opacity-90 " />

        <div
          style={{
            opacity: 1 - scrollY.get() / 500,
            top: -(scrollY.get() / 20),
          }}
          className="relative h-full w-full"
        >
          <Image
            src="/ucc-north.jpg"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </motion.div>

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

      <motion.section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-32">
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          className="card "
        >
          <figure className="p-7 flex items-center h-64">
            <img
              src="/reconnect.svg"
              className="w-full h-full object-contain"
            />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-2xl text-center justify-center underline underline-offset-2">
              Reconnect with the people you know
            </h1>
            <p className="text-center">
              We want you to find people you had a connection with on your days
              here in the university and to find something and get involved.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          className="card "
        >
          <figure className="p-7 flex items-center h-64">
            <img src="/rekindle.svg" className="w-full h-full object-contain" />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-2xl text-center justify-center underline underline-offset-2">
              Rekindle memories you had
            </h1>
            <p className="text-center">
              See what other people you know or knew are doing and bring back
              memories that come back with it as well. Never forget the people
              who were there back then as we provide the platform to help you
              find them.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, translateY: 100 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          className="card md:col-span-full lg:col-span-1"
        >
          <figure className="p-7 flex items-center h-64">
            <img src="/relive.svg" className="w-full h-full object-contain" />
          </figure>
          <div className="card-body">
            <h1 className="card-title text-2xl text-center justify-center underline underline-offset-2">
              Relive the lives you spent
            </h1>
            <p className="text-center">
              Be a part of their lives. Be a part of the community. Be something
              unique. Be yourself. This platform will help you to let those
              sparks burn again
            </p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen gap-5 place-items-center">
        <div className="lg:hidden">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a"
          />
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-4xl text-center lg:text-right">
            Your platform to be connected once more
          </p>
          <p className="text-center lg:text-right">
            There are numerous advantages to using a Project Alumnus for
            university alumni. Alumni can use this platform to stay in touch
            with their alma mater, discover stories, and connect with other
            alumni. It gives students, staff, faculty, and others connected to
            the university an easy way to keep up with campus news and events.
            Furthermore, using Project Alumnus allows alumni to interact
            directly with one another and form relationships that would not be
            possible otherwise.
          </p>
        </div>
        <div className="hidden lg:block">
          <img
            className="w-full h-screen object-cover"
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a"
          />
        </div>
      </motion.section>

      <motion.section
        id="about-pa"
        className="flex flex-col items-center gap-2 mb-64 mt-16"
      >
        <p className="text-4xl text-center">What is Project Alumnus?</p>
        <p className="text-center max-w-2xl">
          Project Alumnus is a social platform for university alumni to connect
          with each other and reach out their stories. We provide a platform to
          connect with people who had a connection with you in the university.
          We want to help you find people you had a connection with on your days
          here in the university and to find something and get involved.
        </p>
        <Link href={'/register'}>
          <div className="btn btn-secondary max-w-md w-full mt-16">
            give it a try
          </div>
        </Link>
      </motion.section>
    </>
  );
};

export default Home;
