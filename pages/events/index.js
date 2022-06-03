import { motion, AnimatePresence } from 'framer-motion';
import {
  _Transition_Page,
  _Transition_Card,
} from '../../components/_Animations';
import { useEffect, useState } from 'react';
import { supabase } from '../../components/_Supabase';
import { CgSpinner } from 'react-icons/cg';
import { AiOutlineLoading } from 'react-icons/ai';
import dayjs from 'dayjs';
import GradientTopBar from '../../components/GradientTopBar';
import Link from 'next/link';
import EventCard from '../../components/evets/EventCard';

export const getStaticProps = async () => {
  const { data: events, error } = await supabase
    .from('News and Events')
    .select('id, title, created_at, slug');

  if (!error) {
    return {
      props: {
        newsAndEvents: events,
      },
    };
  }
};

const NewsAndEvents = ({ newsAndEvents }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(
    (e) => {
      if (newsAndEvents) setLoaded(true);
      //   console.log(newsAndEvents);
    },
    [newsAndEvents]
  );

  return (
    <>
      <GradientTopBar colorLeft={'#DC2626'} colorRight={'#60A5FA'} />
      <motion.div
        variants={_Transition_Page}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 mt-64 mb-32 flex min-h-screen flex-col"
      >
        {/* landing section */}
        <section className="relative flex flex-col ">
          <h1 className="text-5xl font-bold text-base-content ">
            News and Events
          </h1>
          <p className="mt-5 text-xl">
            See what is happening in the University of Caloocan City.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: 1,
              transformOrigin: 'left',
              transition: { delay: 0.25, duration: 0.5, ease: 'circOut' },
            }}
            className="divider my-5"
          />

          <motion.p
            variants={_Transition_Card}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bottom-10 mt-5 flex select-none gap-1 text-base-content text-opacity-50"
          >
            <span className="hidden lg:block">Scroll down</span>
            <span className="lg:hidden">Swipe up</span> to see the list
          </motion.p>
        </section>

        {/* Events section */}
        <section className="mt-56 flex flex-col">
          <h1 className="text-center text-4xl font-bold">Events List</h1>

          {/* loading state if prop is still loading */}
          <AnimatePresence>
            <div className="flex flex-col items-center justify-center gap-5">
              {!loaded && (
                <>
                  <motion.div
                    animate={{ rotate: ['0deg', '360deg'] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.75,
                      ease: 'linear',
                    }}
                    className="mt-10"
                  >
                    <AiOutlineLoading size={25} />
                  </motion.div>
                  <p>Fetching Data</p>
                </>
              )}
            </div>
          </AnimatePresence>

          {/* loop events from Table_Events prop */}
          <AnimatePresence>
            <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
              {loaded &&
                newsAndEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </AnimatePresence>
        </section>
      </motion.div>
    </>
  );
};

export default NewsAndEvents;
