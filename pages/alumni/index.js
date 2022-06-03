import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import GradientTopBar from '../../components/GradientTopBar';
import {
  _Transition_Card,
  _Transition_Page,
} from '../../components/_Animations';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../components/_Supabase';
import AlumniCard from '../../components/listing/AlumniCard';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useAlumniListContext } from '../../components/AlumniListContext';

const AlumniListing = ({}) => {
  const { alumniList } = useAlumniListContext();
  const [loaded, setLoaded] = useState(false);
  const [mainAlumniList, setMainAlumniList] = useState(alumniList);
  const [searchTempContainer, setSearchTempContainer] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [orderBy, setOrderBy] = useState('asc');
  const [sortBy, setSortBy] = useState('surname');
  const [searchQuery, setSearchQuery] = useState('');
  const alumniList_ref = useRef([]);

  const searchForAlumni = (input) => {
    setIsSearching(searchQuery.length > 0 ? true : false);
    const tempContainer = mainAlumniList.filter((alumni) => {
      return (
        alumni.surname.toLowerCase().includes(searchQuery) ||
        alumni.givenName.toLowerCase().includes(searchQuery)
      );
    });
    const sortedTempContainer = tempContainer.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return orderBy === 'asc' ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return orderBy === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSearchTempContainer(sortedTempContainer ? sortedTempContainer : []);
  };

  useEffect(
    (e) => {
      if (alumniList) {
        setLoaded(true);
        setMainAlumniList(alumniList);
        sortList();
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

  const sortList = (e) => {
    const sortedList = mainAlumniList.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return orderBy === 'asc' ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return orderBy === 'asc' ? 1 : -1;
      }
      return 0;
    });
    const filteredList = sortedList.filter((alumni) => {
      return supabase.auth.user()
        ? alumni.currentEmail !== supabase.auth.user().email
        : true;
    });

    alumniList_ref.current = filteredList;
  };

  const searchAndFilter = (e) => {
    searchForAlumni();
  };

  useEffect(
    (e) => {
      setHasUser(supabase.auth.user() ? true : false);
      if (hasUser) {
        // remove current user from list
        const tempList = alumniList.filter((alumni) => {
          return alumni.currentEmail !== supabase.auth.user().email;
        });
        const sortedTempList = tempList.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) {
            return orderBy === 'asc' ? -1 : 1;
          }
          if (a[sortBy] > b[sortBy]) {
            return orderBy === 'asc' ? 1 : -1;
          }
          return 0;
        });
        setMainAlumniList(sortedTempList);
      }
    },
    [alumniList]
  );

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
                  <div className="col-span-4 flex flex-col lg:flex-row lg:items-center lg:col-span-2 gap-2">
                    <input
                      type="text"
                      placeholder="Find someone..."
                      className="input input-bordered w-full"
                      onChange={(e) => {
                        e.target.value.length < 1 && setIsSearching(false);
                        setSearchQuery(e.target.value ? e.target.value : '');
                      }}
                      onKeyUp={(e) =>
                        e.code === 'Enter' ? searchAndFilter() : null
                      }
                    />
                    <div
                      onClick={searchAndFilter}
                      className="btn btn-secondary"
                    >
                      Search and filter
                    </div>
                  </div>
                  <div className="col-span-4 grid grid-cols-2 lg:col-span-2 gap-2">
                    <select
                      onChange={(e) => {
                        setOrderBy(e.currentTarget.value);
                      }}
                      className="select w-full select-bordered"
                    >
                      <option value="asc">Ascending</option>
                      <option value="dsc">Descending</option>
                    </select>
                    <select
                      onChange={(e) => {
                        setSortBy(e.currentTarget.value);
                      }}
                      className="select w-full select-bordered"
                      value={sortBy}
                    >
                      <option value="givenName">Given Name</option>
                      <option value="suname">Surname</option>
                      {/* <option value="createdAt">Created At</option> */}
                    </select>
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
