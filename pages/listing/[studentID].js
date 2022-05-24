import { motion } from 'framer-motion';
import GradientTopBar from '../../components/GradientTopBar';
import {
  _Transition_Card,
  _Transition_Page,
} from '../../components/_Animations';
import { useState, useEffect } from 'react';
import { supabase } from '../../components/_Supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CgArrowLeft, CgMail } from 'react-icons/cg';
import dayjs from 'dayjs';

const StudentPage = (e) => {
  const [studentID, setStudentID] = useState(false);
  const [studentData, setStudentData] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hasStudent, setHasStudent] = useState(true);
  const [hasUser, setHasUser] = useState(false);
  const router = useRouter();
  const { studentID: studentIDQuery } = router.query;

  const fetchStudentData = async (e) => {
    const id = window?.location.pathname.substring(9);
    setStudentID(id);

    const { data, error } = await supabase
      .from('Alumni List')
      .select('*')
      .eq('studentID', id);

    if (!error) {
      setStudentData(data[0]);
      setLoaded(true);
      setHasStudent(true);
    } else {
      setHasStudent(false);
    }
  };

  useEffect((e) => {
    setHasUser(supabase.auth.user() ? true : false);
  }, []);

  supabase.auth.onAuthStateChange((e) => {
    setHasUser(supabase.auth.user() ? true : false);
  });

  useEffect(
    (e) => {
      const id = window?.location.pathname.substring(9);
      setStudentID(id);
      fetchStudentData();
    },
    [studentIDQuery]
  );

  return (
    <>
      {/* <GradientTopBar colorLeft={'#DC2626'} colorRight={'#60A5FA'} /> */}

      {hasUser ? (
        <>
          {hasStudent && studentID && (
            <motion.div
              variants={_Transition_Page}
              initial="initial"
              animate="animate"
              exit={{
                opacity: 0,
                transition: { duration: 0.25, ease: 'circOut' },
              }}
              className="absolute top-0 left-0 h-[350px] w-full overflow-hidden rounded-b-xl bg-base-300 opacity-40 lg:h-[300px]"
            >
              <img
                src={`https://picsum.photos/seed/${studentID}/1024/720`}
                className="h-full w-full object-cover opacity-20"
              />
            </motion.div>
          )}
          <motion.div
            variants={_Transition_Page}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 mt-64 flex mb-32 flex-col min-h-screen"
          >
            {!hasStudent && (
              <>
                <p className="text-2xl font-semibold">
                  Looks like that person did not exist in our database
                </p>
                <p className="text-lg font-semibold">
                  Please go back and check if you requested the correct student
                  ID
                </p>
              </>
            )}
            {hasStudent && (
              <motion.div
                variants={_Transition_Card}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative mt-[100px] mb-32 flex w-full flex-col items-center text-center lg:mt-[50px]"
              >
                {/* backbutton */}
                <Link href="/listing">
                  <div className="btn btn-primary btn-square absolute top-0 left-0 -mt-8 flex gap-5 lg:-mt-6">
                    <CgArrowLeft size={25} />
                  </div>
                </Link>
                {/* contact button */}
                <div className="btn btn-primary btn-square absolute top-0 right-0 -mt-8 flex gap-5 lg:-mt-6">
                  <CgMail size={25} />
                </div>

                {/* content */}
                <motion.div className="w-full rounded-xl pb-16">
                  {/* avatar */}
                  <div className="avatar -mt-24 lg:-mt-28 ">
                    <div className="relative flex w-44 items-center justify-center overflow-hidden rounded-full bg-base-300 ring ring-base-100 ring-offset-8 ring-offset-transparent lg:w-52">
                      <img
                        src={`https://avatars.dicebear.com/api/adventurer-neutral/${studentID}.svg`}
                        // layout="fill"
                      />
                    </div>
                  </div>
                  {/* details */}
                  <div className="mt-12 ">
                    <p className="mb-2 text-4xl font-semibold">
                      {studentData.surname} {studentData.givenName}
                    </p>
                    {/* personal details */}
                    <div className="card mt-10 bg-base-200 shadow-lg">
                      <div className="card-body">
                        <p className="card-title justify-center">
                          Public Personal Information
                        </p>
                        <div className="mt-5 grid grid-cols-1 gap-y-5  px-2 lg:grid-cols-2">
                          <div className="flex flex-col items-center">
                            <p>Birthday</p>
                            <p className="font-semibold text-secondary">
                              {dayjs(studentData.birthdate).format(
                                'MMMM DD, YYYY'
                              )}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p>Current Locaton</p>
                            <p className="font-semibold text-secondary">
                              {studentData.currentLocation}
                            </p>
                          </div>
                          <div className="col-span-full flex flex-col items-center">
                            <p>Current Email</p>
                            <p className="font-semibold text-secondary">
                              {studentData.currentEmail || 'Unspecified'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* academic details */}
                    <div className="card mt-10 bg-base-200 shadow-lg">
                      <div className="card-body">
                        <p className="card-title justify-center">
                          Academic Summary
                        </p>
                        <div className="mt-5 grid grid-cols-1 gap-y-5  px-2 lg:grid-cols-2">
                          <div className="flex flex-col items-center">
                            <p>Program Completed</p>
                            <p className="font-semibold text-secondary">
                              {studentData.programCompleted}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <p>Batch Year</p>
                            <p className="font-semibold text-secondary">
                              {dayjs(studentData.programStartYear).format(
                                'YYYY'
                              )}
                            </p>
                          </div>
                          <div className="flex flex-col items-center col-span-full">
                            <p>Graduation Year</p>
                            <p className="font-semibold text-secondary">
                              {dayjs(studentData.graduationDate).format('YYYY')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* occupational status */}
                    <div className="card mt-10 bg-base-200 shadow-lg">
                      <div className="card-body">
                        <p className="card-title justify-center">
                          Occupational Status
                        </p>

                        {/* only show if alumniData.isCurrentlyWorking is true */}
                        {studentData.isCurrentlyWorking ? (
                          <>
                            <div className="mt-5 grid grid-cols-1 gap-y-5  px-2 lg:grid-cols-2">
                              <div className="flex flex-col items-center">
                                <p>Curent Workplace</p>
                                <p className="font-semibold text-secondary">
                                  {studentData.currentCompany}
                                </p>
                              </div>
                              <div className="flex flex-col items-center">
                                <p>Curent Occupation</p>
                                <p className="font-semibold text-secondary">
                                  {studentData.currentPosition}
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <p>Detail Unpsecified</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </>
      ) : (
        <motion.div
          variants={_Transition_Page}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10 mt-64 flex mb-32 flex-col "
        >
          <>
            <p className="text-2xl font-semibold">
              You do not have a permission to view this page.
            </p>
            <p className="text-lg font-semibold">
              Please sign in to view this page.
            </p>
          </>
        </motion.div>
      )}
    </>
  );
};

export default StudentPage;
