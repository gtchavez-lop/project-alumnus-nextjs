import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  _Transition_Card,
  _Transition_Page,
} from '../../components/_Animations';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '../../components/_Supabase';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';

const components = {
  h1: (props) => <h1 className="text-2xl font-bold mb-4 mt-7" {...props} />,
  h2: (props) => <h2 className="text-xl font-bold mb-4 mt-7" {...props} />,
  h3: (props) => <h3 className="text-lg font-bold mb-4 mt-7" {...props} />,
  h4: (props) => <h4 className="text-md font-bold mb-4 mt-7" {...props} />,
  h5: (props) => <h5 className="text-sm font-bold mb-4 mt-7" {...props} />,
  h6: (props) => <h6 className="text-xs font-bold mb-4 mt-7" {...props} />,
  p: (props) => <p className="text-base-content mb-4 " {...props} />,
  hr: (props) => <div className="divider max-w-md mb-4 mt-7" {...props} />,
  code: (props) => (
    <code className="text-sm bg-base-300 p-1 px-2 rounded-md" {...props} />
  ),
  a: (props) => (
    <a
      className="btn-link text-secondary"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
};

const EventPage = (e) => {
  const router = useRouter();

  const [eventData, setEventData] = useState(false);
  const [slug, setSlug] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [authorName, setAuthorName] = useState(false);
  const [errorLoaded, setErrorLoaded] = useState(false);

  const fetchAuthor = async (id) => {
    const { data: author, error } = await supabase
      .from('Event Authors')
      .select('name')
      .eq('id', id);

    if (!error) {
      setAuthorName(author[0].name);
    }
  };

  //   async fetch data
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('News and Events')
        .select('*')
        .eq('slug', slug);
      const author_id = data[0].authorID;
      if (!error) {
        setEventData(data[0]);
        fetchAuthor(author_id);
        setLoaded(true);
      } else {
        setErrorLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   fetch data on load
  useEffect(() => {
    setSlug(window.location.pathname.substring(8));
    fetchData();
  }, [slug]);

  return (
    <>
      <motion.main
        className="min-h-screen"
        variants={_Transition_Page}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {loaded ? (
          <motion.div
            variants={_Transition_Card}
            initial="initial"
            animate="animate"
            className="flex flex-col py-5 pt-40 pb-32"
          >
            <Link
              href={{
                pathname: '/events',
              }}
            >
              <motion.div
                className="flex cursor-pointer items-center gap-5 text-3xl lg:text-5xl"
                whileHover={{ translateX: -10 }}
              >
                <AiOutlineArrowLeft size={40} />
                <span className="font-bold">{eventData.title}</span>
              </motion.div>
            </Link>

            {/* content */}
            <div className="pb-20 pt-5">
              {/* get author's name */}
              <p className="my-2 flex text-gray-400 ">Posted by</p>
              <p className="my-2 flex items-center text-gray-400">
                <span className="ml-2  font-bold text-base-content">
                  {authorName ? authorName : 'Admin'}
                </span>
              </p>
              <p className="ml-2 mb-5 flex items-center text-gray-400">
                On &nbsp;
                <span>
                  {dayjs(eventData.created_at).format('MMM DD, YYYY - hh:mma')}
                </span>
              </p>
              {/* get event tags */}
              <div className="mb-10 flex select-none flex-wrap gap-2">
                {eventData.tags.map((tag, index) => (
                  <div key={index} className="badge badge-primary capitalize">
                    {tag}
                  </div>
                ))}
              </div>

              <div className="divider max-w-sm mx-auto my-16" />

              <ReactMarkdown components={components}>
                {eventData.content}
              </ReactMarkdown>
              <div className="divider max-w-sm mx-auto my-16" />
            </div>
          </motion.div>
        ) : (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <p>Content Loading</p>
          </div>
        )}
      </motion.main>
    </>
  );
};

export default EventPage;
