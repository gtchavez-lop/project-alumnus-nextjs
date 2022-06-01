import GradientTopBar from '../../components/GradientTopBar';
import { AnimatePresence, motion } from 'framer-motion';
import { _Transition_Card } from '../../components/_Animations';
import { useState, useEffect } from 'react';
import { supabase } from '../../components/_Supabase';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { AiOutlineWarning } from 'react-icons/ai';
import toast from 'react-hot-toast';

const RegisterPage = (e) => {
  const router = useRouter();
  const [_pageCount, _setPageCount] = useState(1);
  const [passwordError, _setPasswordError] = useState(false);
  const [studentIDFound, _setStudentIDFound] = useState('placeholder');
  const [hasUser, setHasUser] = useState(false);
  const [_userDetails, _setUserDetails] = useState({
    currentEmail: '',
    password: '',
    confirmPassword: '',
    studentID: '',
    givenName: '',
    surname: '',
    middleName: '',
    isVerfiied: false,
    birthdate: '',
    currentLocation: 'Caloocan City',
    programCompleted: 'BS Computer Science',
    programStartDate: '',
    graduationDate: '',
    isCurrentlyWorking: false,
    currentCompany: '',
    currentPosition: '',
    securityQuestion: 'What is your favorite color?',
    securityAnswer: '',
  });

  const findStudentID = async (e) => {
    const { data, error } = await supabase
      .from('Alumni List')
      .select('studentID, givenName, surname, middleName, isVerified')
      .eq('studentID', _userDetails.studentID)
      .eq('isVerified', false);
    if (error) {
      _setStudentIDFound(false);
      setTimeout(() => {
        _setStudentIDFound('placeholder');
      }, 1000);
    } else {
      if (data[0]) {
        _setStudentIDFound(true);
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
              <p>Student ID Available</p>
            </div>
          </motion.div>
        ));
        _setUserDetails({
          ..._userDetails,
          givenName: data[0].givenName,
          surname: data[0].surname,
          middleName: data[0].middleName,
        });
      } else {
        _setStudentIDFound(false);
        _setUserDetails({ ..._userDetails, studentID: '' });
        toast.custom((t) => (
          <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              translateX: [-20, 0, 0, 0, 0],
            }}
            transition={{ duration: 3 }}
          >
            <div className="alert alert-warning">
              <p>Student ID has been used and is not available</p>
            </div>
          </motion.div>
        ));
        setTimeout(() => {
          _setStudentIDFound('placeholder');
        }, 1000);
      }
    }
  };

  const handleSignUp = async (e) => {
    // go to the top of the page
    window.scrollTo(0, 0);

    const { data, error } = await supabase
      .from('Alumni List')
      .update({
        studentID: _userDetails.studentID,
        givenName: _userDetails.givenName,
        surname: _userDetails.surname,
        middleName: _userDetails.middleName,
        isVerified: true,
        birthdate: dayjs(_userDetails.birthdate).format('YYYY-MM-DD'),
        currentEmail: _userDetails.currentEmail,
        currentLocation: _userDetails.currentLocation,
        programCompleted: _userDetails.programCompleted,
        programStartDate: dayjs(_userDetails.programStartDate).format(
          'YYYY-MM-DD'
        ),
        graduationDate: dayjs(_userDetails.graduationDate).format('YYYY-MM-DD'),
        isCurrentlyWorking: _userDetails.isCurrentlyWorking,
        currentCompany: _userDetails.currentCompany,
        currentPosition: _userDetails.currentPosition,
      })
      .eq('studentID', _userDetails.studentID);
    if (error) {
      console.log(error);
    } else {
      // redirect to home page
      router.push('/');
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <div className="alert alert-success">
            <p>
              Please verify your account by clicking the link sent to your email
              address.
            </p>
          </div>
        </motion.div>
      ));
    }
  };

  const registerAccount = async (e) => {
    _setPageCount(5);
    const { data, error } = await supabase.auth.signUp({
      email: _userDetails.currentEmail,
      password: _userDetails.password,
    });
    if (error) {
      alert(`${error.message}. The window will now reload.`);
      router.reload();
    } else {
      handleSignUp();
    }
  };

  supabase.auth.onAuthStateChange((state, user) => {
    setHasUser(supabase.auth.user() ? true : false);
  });

  useEffect((e) => {
    setHasUser(supabase.auth.user() ? true : false);
  });

  return (
    <>
      <GradientTopBar colorLeft={'#EC4899'} colorRight={'#EAB308'} />
      <div className="relative z-10  mt-64 flex min-h-screen flex-col">
        <motion.div
          variants={_Transition_Card}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative flex flex-col mb-32"
        >
          <h1 className="text-center text-5xl font-bold text-base-content">
            Register to get a basic account
          </h1>
          <p className="mt-5 text-center text-xl">
            Help us make your experience memorable
          </p>
          <div className="divider my-16" />

          {/* alert if user is signed in */}
          {hasUser ? (
            <motion.div
              variants={_Transition_Card}
              initial="initial"
              animate="animate"
              className="alert shadow-lg self-center max-w-md"
            >
              <div>
                <AiOutlineWarning size={25} />
                <p>Please sign out to register</p>
              </div>
            </motion.div>
          ) : (
            <>
              {_pageCount === 1 && (
                <motion.div
                  variants={_Transition_Card}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="form-control w-full max-w-md gap-3 self-center"
                >
                  <p className="text-2xl">
                    Before you register, we need to find your Student ID
                  </p>
                  <label className="form-control mt-5">
                    <span>Your Student ID</span>
                    <input
                      onChange={(e) => {
                        _setStudentIDFound(null);
                        _setUserDetails({
                          ..._userDetails,
                          studentID: e.target.value,
                        });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (!studentIDFound) {
                            // reset studentdetails
                            _setUserDetails({
                              ..._userDetails,
                              currentEmail: '',
                              currentLocation: 'Caloocan City',
                              programCompleted: 'BS Computer Science',
                              programStartDate: '',
                              birthdate: '',
                              graduationDate: '',
                              isCurrentlyWorking: false,
                              currentCompany: '',
                              currentPosition: '',
                            });
                            findStudentID();
                          } else {
                            _setPageCount(2);
                          }
                        }
                      }}
                      value={_userDetails.studentID}
                      placeholder="Enter your Student ID and press enter"
                      type="text"
                      className={`input input-bordered`}
                    />
                    <span>Press Enter to find your Student ID</span>
                  </label>
                  {studentIDFound === true && (
                    <>
                      <div
                        className="btn btn-secondary mt-5"
                        onClick={(e) => {
                          _setPageCount(2);
                        }}
                      >
                        <p>Next Step</p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
              {_pageCount === 2 && (
                <motion.div
                  variants={_Transition_Card}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="form-control w-full max-w-md gap-3 self-center"
                >
                  <p className="text-2xl">
                    Now set your email address and password
                  </p>
                  <label className="form-control mt-5">
                    <span>Your Email Address</span>
                    <input
                      onChange={(e) => {
                        _setUserDetails({
                          ..._userDetails,
                          currentEmail: e.target.value,
                        });
                      }}
                      value={_userDetails.currentEmail}
                      placeholder="delacruz_juan@mail.com"
                      type="text"
                      className={`input input-bordered`}
                    />
                  </label>
                  <label className="form-control mt-5">
                    <span>Your Strong Password</span>
                    <input
                      onChange={(e) => {
                        _setUserDetails({
                          ..._userDetails,
                          password: e.target.value,
                        });
                      }}
                      value={_userDetails.password}
                      placeholder="Enter your strong password"
                      type="password"
                      className={`input input-bordered`}
                    />
                    <span>
                      *Please use a combination of uppercase and lowercase
                      characters, numbers, and special characters to make your
                      password unlikely to be stolen
                    </span>
                  </label>
                  <label className="form-control mt-5">
                    <span>Confirm Password</span>
                    <input
                      onChange={(e) => {
                        _setUserDetails({
                          ..._userDetails,
                          confirmPassword: e.target.value,
                        });
                      }}
                      value={_userDetails.confirmPassword}
                      placeholder="Confirm your password here"
                      type="password"
                      className={`input input-bordered`}
                    />
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
                    <div
                      className="btn btn-ghost mt-5"
                      onClick={(e) => {
                        window.scrollTo(0, 100);
                        _setPageCount(1);
                      }}
                    >
                      <p>Find student id</p>
                    </div>
                    <div
                      className="btn btn-secondary mt-5"
                      onClick={(e) => {
                        window.scrollTo(0, 100);
                        _setPageCount(3);
                      }}
                      disabled={
                        !(
                          _userDetails.password == _userDetails.confirmPassword
                        ) ||
                        _userDetails.password == '' ||
                        _userDetails.confirmPassword == ''
                      }
                    >
                      <p>Next Step</p>
                    </div>
                  </div>
                </motion.div>
              )}
              {_pageCount === 3 && (
                <motion.div
                  variants={_Transition_Card}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="form-control w-full max-w-md gap-3 self-center"
                >
                  <p className="text-2xl">Set your personal details</p>
                  <p className="text-lg mt-2">
                    We provided you some information that was found in your
                    Student ID publicly recorded in the university.
                  </p>
                  <p className="opacity-50 mt-2">
                    You can change these information later.
                  </p>
                  <div className="form-control mt-5 gap-8">
                    {/* given name */}
                    <div className="flex flex-col">
                      <span className="text-xl">Given Name</span>
                      <input
                        disabled
                        value={_userDetails.givenName}
                        type="text"
                        className={`input input-bordered`}
                      />
                    </div>
                    {/* middle name */}
                    <div className="flex flex-col">
                      <span className="text-xl">Middle Name</span>
                      <input
                        disabled
                        value={_userDetails.middleName}
                        type="text"
                        className={`input input-bordered`}
                      />
                    </div>
                    {/* surname */}
                    <div className="flex flex-col">
                      <span className="text-xl">Surname</span>
                      <input
                        disabled
                        value={_userDetails.surname}
                        type="text"
                        className={`input input-bordered`}
                      />
                    </div>
                    <div className="divider w-1/2 self-center" />
                    {/* current location */}
                    <div className="flex flex-col">
                      <p className="text-xl">
                        Your Current Location{' '}
                        <span className="text-error">*</span>
                      </p>
                      <input
                        onChange={(e) => {
                          _setUserDetails({
                            ..._userDetails,
                            currentLocation: e.target.value || 'Caloocan City',
                          });
                        }}
                        value={_userDetails.currentLocation}
                        type="text"
                        className={`input input-bordered`}
                        placeholder="If this is empty, we will automatically set it to Caloocan City"
                      />
                      <span className="opacity-50">
                        City Approximate(i.e. Caloocan City)
                      </span>
                    </div>
                    {/* birthdate */}
                    <div className="flex flex-col">
                      <p className="text-xl">
                        Your Birthdate <span className="text-error">*</span>
                      </p>
                      <input
                        onChange={(e) => {
                          _setUserDetails({
                            ..._userDetails,
                            birthdate: dayjs(e.target.value).format(
                              'YYYY-MM-DD'
                            ),
                          });
                        }}
                        value={_userDetails.birthdate}
                        type="date"
                        max={'2005-12-30'}
                        className={`input input-bordered`}
                      />
                    </div>
                    {/* program completed */}
                    <div className="flex flex-col">
                      <p className="text-xl">
                        Program Completed <span className="text-error">*</span>
                      </p>
                      <select
                        onChange={(e) => {
                          _setUserDetails({
                            ..._userDetails,
                            programCompleted: e.target.value,
                          });
                          console.log(e.target.value);
                        }}
                        value={_userDetails.programCompleted}
                        className="select select-bordered"
                      >
                        <option disabled>College of Liberal Arts</option>
                        <option value="BS Computer Science">
                          BS Computer Science
                        </option>
                        <option value="BS Information System">
                          BS Information System
                        </option>
                        <option value="BS Information Technology">
                          BS Information Technology
                        </option>
                        <option value="BS Entertainment and Multimedia Computing">
                          BS Entertainment and Multimedia Computing
                        </option>
                        <option value="BS Mathematics">BS Mathematics</option>
                        <option value="BS Psychology">BS Psychology</option>
                        <option value="Bachelor of Public Administration">
                          Bachelor of Public Administration
                        </option>
                        <option value="Bachelor of Public Administration (Special Program)">
                          Bachelor of Public Administration (Special Program)
                        </option>
                        <option value="AB Communication">
                          AB Communication
                        </option>
                        <option value="AB Political Science">
                          AB Political Science
                        </option>
                      </select>
                      {/* <input
                        onChange={(e) => {
                          _setUserDetails({
                            ..._userDetails,
                            programCompleted: e.target.value,
                          });
                        }}
                        value={_userDetails.programCompleted}
                        type="text"
                        className={`input input-bordered`}
                      /> */}
                      <span className="opacity-50">
                        Please tap the form above to select your program
                      </span>
                    </div>
                    {/* program start date */}
                    <div className="flex flex-col">
                      <p className="text-xl">
                        Program Starting Date{' '}
                        <span className="text-error">*</span>
                      </p>
                      <input
                        onChange={(e) => {
                          _setUserDetails({
                            ..._userDetails,
                            programStartDate: dayjs(e.target.value).format(
                              'YYYY-MM-DD'
                            ),
                          });
                        }}
                        value={_userDetails.programStartDate}
                        type="date"
                        className={`input input-bordered`}
                      />
                      <span className="opacity-50">
                        When did you start your program?
                      </span>
                    </div>
                    {/* graduation date */}
                    <div className="flex flex-col">
                      <p className="text-xl">
                        Graduation Date <span className="text-error">*</span>
                      </p>
                      <input
                        onChange={(e) => {
                          _setUserDetails({
                            ..._userDetails,
                            graduationDate: dayjs(e.target.value).format(
                              'YYYY-MM-DD'
                            ),
                          });
                        }}
                        value={_userDetails.graduationDate}
                        type="date"
                        className={`input input-bordered`}
                      />
                      <span className="opacity-50">
                        When did you graduate in this program?
                      </span>
                    </div>
                    {/* is working */}
                    <div className="flex flex-col">
                      <span className="text-xl">Occupation Status</span>
                      <div className="flex gap-5 items-center my-3">
                        <input
                          onChange={(e) => {
                            _setUserDetails({
                              ..._userDetails,
                              isCurrentlyWorking: e.target.checked,
                            });
                          }}
                          checked={_userDetails.isCurrentlyWorking}
                          type="checkbox"
                          className={`input input-bordered toggle my-2`}
                        />
                        <span className="">
                          {_userDetails.isCurrentlyWorking
                            ? 'I am currently employed'
                            : 'I am not currently employed'}
                        </span>
                      </div>
                      <span className="opacity-50">
                        If you are employed, 2 more input fields will show below
                      </span>
                    </div>
                    {_userDetails.isCurrentlyWorking && (
                      <>
                        <motion.div
                          variants={_Transition_Card}
                          initial="initial"
                          animate="animate"
                          className="flex flex-col"
                        >
                          <span>Current Company</span>
                          <input
                            onChange={(e) => {
                              _setUserDetails({
                                ..._userDetails,
                                currentCompany: e.target.value,
                              });
                            }}
                            value={_userDetails.currentCompany}
                            type="text"
                            className={`input input-bordered my-2`}
                          />
                          <span className="opacity-50">
                            What is your current company?
                          </span>
                        </motion.div>
                        <motion.div
                          variants={_Transition_Card}
                          initial="initial"
                          animate="animate"
                          className="flex flex-col"
                        >
                          <span>Current Work Position</span>
                          <input
                            onChange={(e) => {
                              _setUserDetails({
                                ..._userDetails,
                                currentPosition: e.target.value,
                              });
                            }}
                            disabled={!_userDetails.currentCompany}
                            value={_userDetails.currentPosition}
                            type="text"
                            className={`input input-bordered my-2`}
                          />
                          <span className="opacity-50">
                            {!_userDetails.currentCompany &&
                              'Please state where you are currently employed first'}
                          </span>
                        </motion.div>
                      </>
                    )}
                    {/* security question */}
                    <div className="flex flex-col">
                      <p className="text-xl">
                        Security Question <span className="text-error">*</span>
                      </p>
                      <select
                        onChange={(e) => {
                          _setUserDetails({
                            ..._userDetails,
                            securityQuestion: e.target.value,
                          });
                        }}
                        value={_userDetails.securityQuestion}
                        className="select select-bordered"
                      >
                        <option disabled>Security Question</option>
                        <option value="What is your favorite color?">
                          What is your favorite color?
                        </option>
                        <option value="What is your favorite food?">
                          What is your favorite food?
                        </option>
                        <option value="What is your favorite movie?">
                          What is your favorite movie?
                        </option>
                        <option value="What is your favorite sport?">
                          What is your favorite sport?
                        </option>
                        <option value="What is your favorite video game?">
                          What is your favorite video game?
                        </option>
                        <option value="What is your favorite book?">
                          What is your favorite book?
                        </option>
                        <option value="What is your favorite song?">
                          What is your favorite song?
                        </option>
                        <option value="What is your favorite TV show?">
                          What is your favorite TV show?
                        </option>
                        <option value="What is your favorite movie?">
                          What is your favorite movie?
                        </option>
                      </select>
                      <span className="opacity-50">
                        What is your security question?
                      </span>
                    </div>
                    {/* security answer */}
                    <div className="flex flex-col">
                      <p className="text-xl">
                        Security Answer <span className="text-error">*</span>
                      </p>
                      <input
                        onChange={(e) => {
                          _setUserDetails({
                            ..._userDetails,
                            securityAnswer: e.target.value,
                          });
                        }}
                        value={_userDetails.securityAnswer}
                        type="text"
                        className={`input input-bordered`}
                      />
                      <span className="opacity-50">
                        What is your security answer?
                      </span>
                    </div>
                  </div>

                  {(!_userDetails.currentEmail ||
                    !_userDetails.password ||
                    !_userDetails.currentLocation ||
                    !_userDetails.birthdate ||
                    !_userDetails.programCompleted ||
                    !_userDetails.programStartDate ||
                    !_userDetails.graduationDate ||
                    !_userDetails.securityQuestion ||
                    !_userDetails.securityAnswer) && (
                    <p className="text-error mt-10">* This field is required</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 mt-16 gap-5">
                    <button
                      onClick={(e) => {
                        window.scrollTo(0, 100);
                        _setPageCount(_pageCount - 1);
                      }}
                      className="btn btn-ghost"
                    >
                      Go Back
                    </button>
                    <button
                      className="btn btn-secondary"
                      disabled={
                        !_userDetails.currentEmail ||
                        !_userDetails.password ||
                        !_userDetails.currentLocation ||
                        !_userDetails.birthdate ||
                        !_userDetails.programCompleted ||
                        !_userDetails.programStartDate ||
                        !_userDetails.graduationDate
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        // scroll to top
                        window.scrollTo(0, 100);
                        _setPageCount(4);
                      }}
                    >
                      <p>Next Step </p>
                    </button>
                  </div>
                </motion.div>
              )}
              {_pageCount === 4 && (
                <motion.div
                  variants={_Transition_Card}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="form-control w-full max-w-md gap-3 self-center"
                >
                  <p className="text-2xl">Summary of Details</p>
                  <p className="text-lg mt-2">
                    Here&apos;s a summary of your details. Please check if
                    everything is correct.
                  </p>

                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Student ID</span>
                    <span className="text-sm text-accent font-bold">
                      {_userDetails.studentID}
                    </span>
                  </div>
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Full Name</span>
                    <span className="text-sm text-accent font-bold">
                      {_userDetails.givenName} {_userDetails.middleName}{' '}
                      {_userDetails.surname}{' '}
                    </span>
                  </div>
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Email</span>
                    <span className="text-sm text-accent font-bold">
                      {_userDetails.currentEmail}
                    </span>
                  </div>
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Location</span>
                    <span className="text-sm text-accent font-bold">
                      {_userDetails.currentLocation}
                    </span>
                  </div>
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Birthdate</span>
                    <span className="text-sm text-accent font-bold">
                      {dayjs(_userDetails.birthdate).format('MMMM DD, YYYY')}
                    </span>
                  </div>
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Program Completed</span>
                    <span className="text-sm text-accent font-bold">
                      {_userDetails.programCompleted}
                    </span>
                  </div>
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Program Starting Date</span>
                    <span className="text-sm text-accent font-bold">
                      {dayjs(_userDetails.programStartDate).format(
                        'MMMM DD, YYYY'
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Graduation Date</span>
                    <span className="text-sm text-accent font-bold">
                      {dayjs(_userDetails.graduationDate).format(
                        'MMMM DD, YYYY'
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Occupation Status</span>
                    <span className="text-sm text-accent font-bold">
                      {_userDetails.isCurrentlyWorking ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {_userDetails.isCurrentlyWorking && (
                    <>
                      <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                        <span>Current Company</span>
                        <span className="text-sm text-accent font-bold">
                          {_userDetails.currentCompany}
                        </span>
                      </div>
                      <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                        <span>Current Work Position</span>
                        <span className="text-sm text-accent font-bold">
                          {_userDetails.currentPosition}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Security Question</span>
                    <span className="text-sm text-accent font-bold">
                      {_userDetails.securityQuestion}
                    </span>
                  </div>
                  <div className="flex flex-col bg-base-200 p-4 rounded-xl">
                    <span>Security Answer</span>
                    <span className="text-sm text-accent font-bold">
                      {_userDetails.securityAnswer}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-7">
                    <button
                      className="btn btn-ghost"
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo(0, 100);
                        _setPageCount(3);
                      }}
                    >
                      <p>Go back</p>
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo(0, 100);
                        registerAccount();
                      }}
                    >
                      <p>Submit</p>
                    </button>
                  </div>
                </motion.div>
              )}
              {/* waiting */}
              {_pageCount === 5 && (
                <motion.div
                  variants={_Transition_Card}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="form-control w-full max-w-md gap-3 self-center"
                >
                  <p className="text-2xl">Registration in Progress</p>
                  <p className="text-lg mt-2">
                    Please wait while we process your registration. You will be
                    redirected to the home page in a few seconds.
                  </p>
                </motion.div>
              )}
            </>
          )}
          {/*  */}
        </motion.div>
      </div>
    </>
  );
};
export default RegisterPage;
