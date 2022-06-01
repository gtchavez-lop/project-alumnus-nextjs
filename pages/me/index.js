import { motion } from 'framer-motion';
import GradientTopBar from '../../components/GradientTopBar';
import {
  _Transition_Card,
  _Transition_Page,
} from '../../components/_Animations';
import { supabase } from '../../components/_Supabase';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const MyProfile = ({}) => {
  const [studentData, setStudentData] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

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

  const changePassword = async (e) => {
    if (NewPassword.length > 0) {
      const { data, error } = await supabase.auth.update({
        email: supabase.auth.user().email,
        password: NewPassword,
      });
      if (!error) {
        setNewPassword('');
        setConfirmPassword('');
        setSecurityAnswer('');
        setEditMode(false);
        toast.custom((t) => (
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              translateX: [-20, 0, 0, 0, 0],
            }}
            transition={{ duration: 2 }}
          >
            <div className="alert alert-success">
              <p>Account password updated</p>
            </div>
          </motion.div>
        ));
      } else {
        toast.custom((t) => (
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              translateX: [-20, 0, 0, 0, 0],
            }}
            transition={{ duration: 2 }}
          >
            <div className="alert alert-error">
              <p>{error.message}</p>
            </div>
          </motion.div>
        ));
      }
    }
  };

  useEffect(
    (e) => {
      if (hasUser) {
        fetchData();
      }
    },
    [hasUser]
  );

  const handleChange = async (e) => {
    setEditMode(false);
    const { data, error } = await supabase
      .from('Alumni List')
      .update({
        surname: studentData.surname,
        givenName: studentData.givenName,
        middleName: studentData.middleName,
        birthdate: dayjs(studentData.birthdate).format('YYYY-MM-DD'),
        currentLocation: studentData.currentLocation,
        programCompleted: studentData.programCompleted,
        programStartDate: studentData.programStartDate,
        graduationDate: studentData.graduationDate,
        isCurrentlyWorking: studentData.isCurrentlyWorking,
        currentCompany: studentData.currentCompany,
        currentPosition: studentData.currentPosition,
      })
      .eq('studentID', studentData.studentID)
      .eq('currentEmail', supabase.auth.user().email);
    if (!error) {
      router.reload();
    }
  };

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
            {/* edit button mobile */}
            {editMode ? (
              <>
                <label
                  htmlFor="confirmEditModal"
                  className="btn btn-secondary btn-square absolute top-0 right-0 -mt-8 flex gap-5 lg:-mt-6"
                >
                  <AiOutlineSave size={25} />
                </label>
              </>
            ) : (
              <div
                onClick={(e) => {
                  setEditMode(true);
                }}
                className="btn btn-secondary btn-square absolute top-0 right-0 -mt-8 flex gap-5 lg:-mt-6"
              >
                <AiOutlineEdit size={25} />
              </div>
            )}

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
                {editMode ? (
                  <>
                    <motion.div
                      variants={_Transition_Card}
                      initial="initial"
                      animate="animate"
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      <div className="flex flex-col items-start">
                        <span>Given Name</span>
                        <input
                          onChange={(e) =>
                            setStudentData({
                              ...studentData,
                              givenName: e.target.value,
                            })
                          }
                          value={studentData.givenName}
                          type="text"
                          className="input input-bordered input-secondary text-xl w-full"
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <span>Middle Name</span>
                        <input
                          onChange={(e) =>
                            setStudentData({
                              ...studentData,
                              middleName: e.target.value,
                            })
                          }
                          value={studentData.middleName}
                          type="text"
                          className="input input-bordered input-secondary text-xl w-full"
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <span>Surname</span>
                        <input
                          onChange={(e) =>
                            setStudentData({
                              ...studentData,
                              surname: e.target.value,
                            })
                          }
                          value={studentData.surname}
                          type="text"
                          className="input input-bordered input-secondary text-xl w-full"
                        />
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <motion.p
                    variants={_Transition_Card}
                    initial="initial"
                    animate="animate"
                    className="text-4xl font-semibold"
                  >
                    {studentData.surname} {studentData.givenName}
                  </motion.p>
                )}

                {/* personal details */}
                <div className="card mt-10 bg-base-200 shadow-lg">
                  <div className="card-body">
                    <p className="card-title justify-center">
                      Public Personal Information
                    </p>
                    {editMode ? (
                      <>
                        <div className="mt-5 grid grid-cols-1 gap-4  px-2 lg:grid-cols-2">
                          <div className="flex flex-col items-start">
                            <span>Birthday</span>
                            <input
                              onChange={(e) =>
                                setStudentData({
                                  ...studentData,
                                  birthdate: e.target.value,
                                })
                              }
                              value={studentData.birthdate}
                              type="date"
                              className="input input-bordered input-secondary w-full"
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <span>Current Locaton</span>
                            <input
                              onChange={(e) =>
                                setStudentData({
                                  ...studentData,
                                  currentLocation: e.target.value,
                                })
                              }
                              value={studentData.currentLocation}
                              type="text"
                              className="input input-bordered input-secondary w-full"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>

                {/* academic details */}
                <div className="card mt-10 bg-base-200 shadow-lg">
                  <div className="card-body">
                    <p className="card-title justify-center">
                      Academic Summary
                    </p>
                    {editMode ? (
                      <div className="mt-5 grid grid-cols-1 gap-5  px-2 lg:grid-cols-2">
                        <div className="flex flex-col items-start">
                          <p>Program Completed</p>
                          <input
                            onChange={(e) =>
                              setStudentData({
                                ...studentData,
                                programCompleted: e.target.value,
                              })
                            }
                            value={studentData.programCompleted}
                            type="text"
                            className="input input-bordered input-secondary w-full"
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <p>Program Starting Date</p>
                          <input
                            onChange={(e) =>
                              setStudentData({
                                ...studentData,
                                programStartDate: e.target.value,
                              })
                            }
                            value={studentData.programStartDate}
                            type="date"
                            className="input input-bordered input-secondary w-full"
                          />
                        </div>
                        <div className="flex flex-col items-start">
                          <p>Graduation Date</p>
                          <input
                            onChange={(e) =>
                              setStudentData({
                                ...studentData,
                                graduationDate: e.target.value,
                              })
                            }
                            value={studentData.graduationDate}
                            type="date"
                            className="input input-bordered input-secondary w-full"
                          />
                        </div>
                      </div>
                    ) : (
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
                            {dayjs(studentData.programStartDate).format('YYYY')}
                          </p>
                        </div>
                        <div className="flex flex-col items-center col-span-full">
                          <p>Graduation Year</p>
                          <p className="font-semibold text-secondary">
                            {dayjs(studentData.graduationDate).format('YYYY')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* occupational status */}
                <div className="card mt-10 bg-base-200 shadow-lg">
                  <div className="card-body">
                    <p className="card-title justify-center">
                      Occupational Status
                    </p>

                    {editMode ? (
                      <>
                        <div className="mt-5 grid grid-cols-1 gap-5  px-2 lg:grid-cols-2">
                          <div className="flex flex-col items-start">
                            <p className="flex-grow-0">Is Currently Working</p>
                            <input
                              onChange={(e) =>
                                setStudentData({
                                  ...studentData,
                                  isCurrentlyWorking: e.target.checked,
                                })
                              }
                              checked={studentData.isCurrentlyWorking}
                              type="checkbox"
                              className="toggle toggle-secondary mt-2"
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <p>Current Company</p>
                            <input
                              onChange={(e) =>
                                setStudentData({
                                  ...studentData,
                                  currentCompany: e.target.value,
                                })
                              }
                              value={studentData.currentCompany}
                              type="text"
                              className="input input-bordered input-secondary w-full"
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <p>Current Position</p>
                            <input
                              onChange={(e) =>
                                setStudentData({
                                  ...studentData,
                                  currentPosition: e.target.value,
                                })
                              }
                              value={studentData.currentPosition}
                              type="text"
                              className="input input-bordered input-secondary w-full"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>

                {/* change password section */}
                {editMode && (
                  <div className="card mt-10 bg-base-200 shadow-lg">
                    <div className="card-body">
                      <p className="card-title justify-center">
                        Change Password
                      </p>

                      <p className="">
                        Please answer the security question before proceeding to
                        change password
                      </p>

                      <p className="text-xl mt-10 font-bold">
                        {studentData.securityQuestion}
                      </p>

                      <input
                        className="input input-bordered input-secondary self-center max-w-lg w-full text-center mb-10"
                        type="password"
                        placeholder="Answer"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                      />
                      {securityAnswer == studentData.securityAnswer && (
                        <>
                          <p className="">Set your new password</p>
                          <input
                            className="input input-bordered input-secondary self-center max-w-lg w-full text-center mb-5"
                            type="password"
                            value={NewPassword}
                            placeholder="Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <input
                            className="input input-bordered input-secondary self-center max-w-lg w-full text-center mb-10"
                            type="password"
                            value={ConfirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          {NewPassword == ConfirmPassword &&
                            NewPassword &&
                            ConfirmPassword && (
                              <button
                                onClick={changePassword}
                                className="btn btn-primary self-center max-w-sm w-full text-center"
                              >
                                Change Password
                              </button>
                            )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* confirm edit modal */}
      <input type="checkbox" id="confirmEditModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Changes?</h3>
          <h3 className="">
            Selecting both options will reload the page and prefetch your data
            again to its old or new state
          </h3>
          <div className="modal-action grid grid-cols-2">
            <label
              onClick={(e) => router.reload()}
              htmlFor="confirmEditModal"
              className="btn btn-ghost"
            >
              No
            </label>
            <div onClick={(e) => handleChange()} className="btn btn-secondary">
              Yes
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
