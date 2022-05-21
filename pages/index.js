import Link from 'next/link';
import { motion, useViewportScroll } from 'framer-motion';
import Image from 'next/image';
import {
  _Transition_HeroPage,
  _Transition_Page,
} from '../components/_Animations';
import { useEffect, useState } from 'react';

const Home = ({ data }) => {
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
        className="flex min-h-screen select-none flex-col items-start justify-center"
      >
        <div className="flex w-full flex-col text-center lg:mt-10 lg:text-left">
          <p className="text-5xl">Reconnect.</p>
          <p className="text-5xl">Rekindle.</p>
          <p className="text-5xl">Relive.</p>
        </div>
        <div className="mt-7 flex max-w-sm flex-col self-center text-center lg:max-w-md lg:self-start lg:text-left">
          <p className="">
            Graduating from the University doesn&#39;t end there. Find and
            invite people to see what&#39;s the life of the next generation
          </p>

          {/* coa to "/register" */}
          <Link href="/register" scroll={false} passHref>
            <a className="btn btn-primary btn-block mt-16">
              Apply for an Alumnus Account
            </a>
          </Link>
        </div>
      </motion.section>

      {/* Reconnect Page */}
      <section className="flex select-none flex-col items-center justify-center py-28">
        <motion.p
          className="flex flex-col text-center text-5xl lg:gap-4"
          initial={{ opacity: 0, translateX: 100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
        >
          <span className="font-bold">Reconnect</span>
          <span className="font-thin">with the people you know</span>
        </motion.p>
        <motion.p
          className="mt-5 max-w-lg text-center"
          initial={{ opacity: 0, translateX: -100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
        >
          We want you to find people you had a connection with on your days here
          in the university and to find something and get involved.
        </motion.p>
      </section>
      {/* Rekindle Page */}
      <section className="flex select-none flex-col items-center justify-center py-28">
        <motion.p
          className="flex flex-col text-center text-5xl lg:gap-4"
          initial={{ opacity: 0, translateX: -100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
        >
          <span className="font-bold">Rekindle</span>
          <span className="font-thin">memories you had</span>
        </motion.p>
        <motion.p
          className="mt-5 max-w-lg text-center"
          initial={{ opacity: 0, translateX: 100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
        >
          See what other people you know or knew are doing and bring back
          memories that come back with it as well. Never forget the people who
          were there back then as we provide the platform to help you find them.
        </motion.p>
      </section>

      {/* Relive Page */}
      <section className="mb-32 flex select-none flex-col items-center justify-center py-28">
        <motion.p
          className="flex flex-col text-center text-5xl  lg:gap-4"
          initial={{ opacity: 0, translateX: 100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
        >
          <span className="font-bold">Relive</span>
          <span className="font-thin">the lives you spent</span>
        </motion.p>
        <motion.p
          className="mt-5 max-w-lg text-center"
          initial={{ opacity: 0, translateX: -100 }}
          whileInView={{ opacity: 1, translateX: 0 }}
        >
          Be a part of their lives. Be a part of the community. Be something
          unique. Be yourself. This platform will help you to let those sparks
          burn again
        </motion.p>
      </section>
    </>
  );
};

export default Home;
