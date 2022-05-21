import Link from 'next/link';
import { motion } from 'framer-motion';
import { _Transition_Page } from '../components/_Animations';
import { useEffect } from 'react';
import { supabase } from '../components/_Supabase';

const Home = ({ data }) => {
  return (
    <>
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
    </>
  );
};

export default Home;
