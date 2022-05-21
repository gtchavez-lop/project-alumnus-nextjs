import { motion } from 'framer-motion';
import GradientTopBar from '../../components/GradientTopBar';
import {
  _Transition_Card,
  _Transition_Page,
} from '../../components/_Animations';
import { supabase } from '../../components/_Supabase';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const MyProfile = ({}) => {
  const [studentData, setStudentData] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hasUser, setHasUser] = useState(false);

  const fetchData = async (e) => {
    const { data, error } = await supabase
      .from('Alumni List')
      .select('*')
      .eq('currentEmail', supabase.auth.user().email);
    if (!error) {
      setStudentData(data[0]);
      setLoaded(true);
    }
  };

  useEffect((e) => {
    setHasUser(supabase.auth.user() ? true : false);
  }, []);

  supabase.auth.onAuthStateChange((authEvent, user) => {
    if (authEvent == 'SIGNED_IN') {
      setHasUser(supabase.auth.user() ? true : false);
    } else {
      setHasUser(supabase.auth.user() ? true : false);
    }
  });

  useEffect(
    (e) => {
      if (hasUser) {
        fetchData();
      }
    },
    [hasUser]
  );

  return (
    <>
      {hasUser && loaded && (
        <motion.div
          variants={_Transition_Page}
          initial="initial"
          animate="animate"
          exit={{
            opacity: 0,
            transition: { duration: 0.25, ease: 'circOut' },
          }}
          className="absolute top-0 left-0 h-[350px] w-full overflow-hidden rounded-b-xl bg-base-300 opacity-40 lg:h-[300px] -z-10"
        >
          <img
            src={`https://picsum.photos/seed/${studentData.studentID}/1024/720`}
            className="h-full w-full object-cover opacity-20"
          />
        </motion.div>
      )}

      {!hasUser && (
        <>
          <motion.div
            variants={_Transition_Page}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 mt-64 flex mb-16 flex-col "
          >
            <p className="text-2xl font-semibold">
              Please sign in to view your profile.
            </p>
            <p className="text-lg font-semibold">
              Sign in using your alumnus account or register here.
            </p>
          </motion.div>
        </>
      )}

      <GradientTopBar colorLeft={'#01E7E7'} colorRight={'#FFFF56'} />

      <motion.div
        variants={_Transition_Page}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`relative z-10 mt-64 flex flex-col ${
          hasUser && 'min-h-screen  mb-32'
        }`}
      >
        {hasUser && loaded && (
          <motion.div
            variants={_Transition_Card}
            initial="initial"
            animate="animate"
            className="relative mt-[100px] mb-32 flex w-full flex-col items-center text-center lg:mt-[50px]"
          >
            <motion.div className="w-full rounded-xl pb-16">
              {/* avatar */}
              <div className="avatar -mt-24 lg:-mt-28 ">
                <div className="relative flex w-44 items-center justify-center overflow-hidden rounded-full bg-base-300 ring ring-base-100 ring-offset-8 ring-offset-transparent lg:w-52">
                  <img
                    src={`https://avatars.dicebear.com/api/adventurer-neutral/${studentData.studentID}.svg`}
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
                          {dayjs(studentData.birthdate).format('MMMM DD, YYYY')}
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
                          {dayjs(studentData.programStartYear).format('YYYY')}
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
  );
};

export default MyProfile;
