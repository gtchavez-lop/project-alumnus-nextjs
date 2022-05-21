import GradientTopBar from '../../components/GradientTopBar';
import { AnimatePresence, motion } from 'framer-motion';
import { _Transition_Card } from '../../components/_Animations';
import { useState, useEffect } from 'react';
import { supabase } from '../../components/_Supabase';

const RegisterPage = (e) => {
  const [_pageCount, _setPageCount] = useState(1);
  const [passwordError, _setPasswordError] = useState(false);
  const [studentIDFound, _setStudentIDFound] = useState('placeholder');
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
    currentLocation: '',
    programCompleted: '',
    programStartDate: '',
    graduationDate: '',
    isCurrentlyWorking: false,
    currentCompany: '',
    currentPosition: '',
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
        _setUserDetails({
          ..._userDetails,
          givenName: data[0].givenName,
          surname: data[0].surname,
          middleName: data[0].middleName,
        });
      } else {
        _setStudentIDFound(false);
        setTimeout(() => {
          _setStudentIDFound('placeholder');
        }, 1000);
      }
    }
  };

  return (
    <>
      <GradientTopBar colorLeft={'#EC4899'} colorRight={'#EAB308'} />
      <div className="relative z-10 my-32 mt-64 flex min-h-screen flex-col">
        <motion.div
          variants={_Transition_Card}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative flex flex-col "
        >
          <h1 className="text-center text-5xl font-bold text-base-content">
            Register to get a basic account
          </h1>
          <p className="mt-5 text-center text-xl">
            Help us make your experience memorable
          </p>
          <div className="divider my-16" />
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
                    _setUserDetails({
                      ..._userDetails,
                      studentID: e.target.value,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') findStudentID();
                  }}
                  value={_userDetails.studentID}
                  placeholder="Enter your Student ID and press enter"
                  type="text"
                  className={`input input-bordered`}
                />
                <span>Press Enter to find your Student ID</span>
              </label>
              {studentIDFound === false && _userDetails.studentID && (
                <div className="alert alert-warning">
                  Student ID not Available
                </div>
              )}
              {studentIDFound === true && (
                <>
                  <div className="alert alert-success mt-2">
                    Student ID Available
                  </div>
                  <div className="btn btn-secondary mt-5">
                    <p>Next Step</p>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};
export default RegisterPage;
