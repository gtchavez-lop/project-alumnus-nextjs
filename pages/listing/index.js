import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import GradientTopBar from '../../components/GradientTopBar';
import {
  _Transition_Card,
  _Transition_Page,
} from '../../components/_Animations';
import { useState, useEffect } from 'react';
import { supabase } from '../../components/_Supabase';
import AlumniCard from '../../components/listing/AlumniCard';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useAlumniListContext } from '../../components/AlumniListContext';

const AlumniListing = ({}) => {
  const { alumniList } = useAlumniListContext();
  const [loaded, setLoaded] = useState(false);
  const [mainAlumniList, setMainAlumniList] = useState(false);
  const [searchTempContainer, setSearchTempContainer] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasUser, setHasUser] = useState(false);

  const searchForAlumni = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setIsSearching(searchQuery.length > 0 ? true : false);
    const tempContainer = mainAlumniList.filter((alumni) => {
      return (
        alumni.surname.toLowerCase().includes(searchQuery) ||
        alumni.givenName.toLowerCase().includes(searchQuery)
      );
    });
    setSearchTempContainer(tempContainer ? tempContainer : []);
  };

  useEffect((e) => {
    console.log('Alumni List Loaded');
    if (alumniList) setLoaded(true);
    if (alumniList) setMainAlumniList(alumniList);
  }, []);

  useEffect(
    (e) => {
      setHasUser(supabase.auth.user() ? true : false);
      if (hasUser) {
        // remove current user from list
        const tempList = alumniList.filter((alumni) => {
          return alumni.currentEmail !== supabase.auth.user().email;
        });

        setMainAlumniList(tempList);
      }
    },
    [alumniList]
  );

  supabase.auth.onAuthStateChange((authEvent, user) => {
    setHasUser(supabase.auth.user() ? true : false);
    if (authEvent === 'SIGNED_IN') {
      // remove current user from list
      const tempList = alumniList.filter((alumni) => {
        return alumni.currentEmail !== supabase.auth.user().email;
      });

      setMainAlumniList(tempList);
    }
  });

  return (
    <>
      <GradientTopBar colorLeft={'#10B981'} colorRight={'#9333EA'} />
      <motion.div
        variants={_Transition_Page}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 mt-64 flex mb-32 flex-col"
      >
        <section className="relative flex flex-col ">
          <h1 className="text-5xl font-bold text-base-content ">Alumni List</h1>
          <p className="mt-5 text-xl">
            See people who became part of the University of Caloocan City.
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

          {/* display a toast if the user is not signed in */}
          {hasUser ? (
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
          ) : (
            <motion.div
              variants={_Transition_Card}
              initial="initial"
              animate="animate"
              className="alert"
            >
              <p>Please sign in to see this list</p>
            </motion.div>
          )}

          {hasUser && (
            <>
              {/* listing section */}
              <motion.section
                variants={_Transition_Card}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-36 flex min-h-screen flex-col pt-28"
              >
                {/* search and filter tab */}
                <div className="my-5 mb-10 grid grid-cols-1 gap-2 lg:grid-cols-4 ">
                  <div className="col-span-4 flex items-center lg:col-span-2">
                    <input
                      type="text"
                      placeholder="Type a name to search then press enter"
                      className="input input-bordered w-full"
                      onChange={(e) =>
                        e.target.value.length < 1 && setIsSearching(false)
                      }
                      onKeyUp={(e) =>
                        e.code === 'Enter' ? searchForAlumni(e) : null
                      }
                    />
                  </div>
                  <div className="col-span-4 flex items-center lg:col-span-2 lg:gap-16">
                    <div className="grid w-full grid-cols-2 gap-3">
                      <select disabled className="select w-full">
                        <option value="ASC">Ascending</option>
                        <option value="DSC">Descending</option>
                      </select>
                      <select disabled className="select w-full">
                        <option value="givenName">Given Name</option>
                        <option value="suname">Surname</option>
                        <option value="createdAt">Created At</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* grid section */}
                <AnimateSharedLayout>
                  <motion.div
                    layout
                    className="my-5 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-1"
                    style={{ gridTemplateRows: 'masonry' }}
                  >
                    {/* alumni card */}
                    {loaded &&
                      !isSearching &&
                      mainAlumniList.map((item, iterator) => (
                        <div key={iterator}>
                          <AlumniCard data={item} />
                        </div>
                      ))}

                    {isSearching &&
                      searchTempContainer.map((item, iterator) => (
                        <div key={iterator}>
                          <AlumniCard data={item} />
                        </div>
                      ))}

                    {searchTempContainer.length === 0 && isSearching && (
                      <motion.div
                        variants={_Transition_Card}
                        initial="initial"
                        animate="animate"
                        layout
                        className="flex flex-grow flex-col items-center gap-3 col-span-full"
                      >
                        <div className="flex gap-3">
                          <AiOutlineInfoCircle size={25} />
                          <span className="text-base">No alumni found</span>
                        </div>
                        <div>
                          <p className="text-base">
                            If you are searching for yourself, please go to your
                            profile {/* <Link href={'/me'}> */}
                            <span className="cursor-pointer font-bold">
                              here
                            </span>
                            {/* </Link> */}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimateSharedLayout>
              </motion.section>
            </>
          )}
        </section>
      </motion.div>
    </>
  );
};

export default AlumniListing;
