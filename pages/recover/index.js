import GradientTopBar from '../../components/GradientTopBar';
import { motion } from 'framer-motion';
import {
  _Transition_Card,
  _Transition_Page,
} from '../../components/_Animations';
import { useState, useEffect } from 'react';
import { useAlumniListContext } from '../../components/AlumniListContext';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { supabase } from '../../components/_Supabase';

const Recover = () => {
  const { alumniList } = useAlumniListContext();
  const [email, setEmail] = useState('');
  const [page, setPage] = useState(1);
  const [emailFound, setEmailFound] = useState(false);
  const [accountDetails, setAccountDetails] = useState({});
  const [Answer, setAnswer] = useState('');
  const [hasUser, setHasUser] = useState(false);

  const FindEmail = (e) => {
    setEmailFound(false);

    // check if email is in alumni list
    const foundAlumni = alumniList.find((alumni) => {
      return alumni.currentEmail === email;
    });

    if (foundAlumni) {
      setEmailFound(true);
      setAccountDetails(foundAlumni);
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
            <p>Account found</p>
          </div>
        </motion.div>
      ));
    } else {
      setEmailFound(false);
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
            <p>Account not found</p>
          </div>
        </motion.div>
      ));
    }
  };

  const sendMagicLink = async (e) => {
    const { data, error } = await supabase.auth.signIn({
      email: email,
    });
    if (error) {
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
          <div className="alert alert-success">
            <p>Magic Link Sent</p>
          </div>
        </motion.div>
      ));
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, translateX: -20 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            translateX: [-20, 0, 0, 0, 0],
          }}
          transition={{ duration: 2 }}
        >
          <div className="alert alert-info">
            <p>You will be redirected to the home page</p>
          </div>
        </motion.div>
      ));

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    }
  };

  //   check if user has an account
  const checkUser = async (e) => {
    setHasUser((await supabase.auth.user()) ? true : false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  supabase.auth.onAuthStateChange((authEvent, user) => {
    if (authEvent == 'SIGNED_IN') {
      setHasUser(true);
    } else if (authEvent == 'SIGNED_OUT') {
      setHasUser(false);
    }
  });

  return (
    <>
      <GradientTopBar colorLeft={'#FB5607'} colorRight={'#FE6D73'} />

      <motion.div
        variants={_Transition_Page}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative z-10 mt-64 flex mb-32 flex-col"
      >
        <section className="relative flex flex-col ">
          <h1 className="text-5xl font-bold text-base-content ">
            Recover Account
          </h1>
          <p className="mt-5 text-xl">
            Recover lost account by entering your email address.
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

          {hasUser && (
            <motion.div
              variants={_Transition_Card}
              initial="initial"
              animate="animate"
              className="alert"
            >
              <p>Please sign in to see this list</p>
            </motion.div>
          )}

          {page == 1 && !hasUser && (
            <motion.div
              variants={_Transition_Card}
              initial="initial"
              animate="animate"
              className="mt-16 flex flex-col w-full max-w-md self-center"
            >
              <p className="text-2xl">Find your email</p>
              <input
                disabled={emailFound}
                type="email"
                placeholder="delacruzjuan@mail.com"
                className="input input-bordered "
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    setEmail(e.target.value);
                  } else {
                    setEmail('');
                    setEmailFound(false);
                  }
                }}
              />
              {!emailFound && (
                <div onClick={FindEmail} className="btn btn-secondary mt-10">
                  Find Email
                </div>
              )}
              {emailFound && (
                <div
                  onClick={(e) => setPage(2)}
                  className="btn btn-warning mt-10"
                >
                  Reset Password
                </div>
              )}
            </motion.div>
          )}

          {page == 2 && !hasUser && (
            <motion.div
              variants={_Transition_Card}
              initial="initial"
              animate="animate"
              className="my-16 flex flex-col w-full max-w-md self-center"
            >
              <p className="text-2xl">Answer the security question</p>
              <p className="text-xl mt-10 ">
                {accountDetails.securityQuestion}
              </p>
              <input
                type="password"
                placeholder="Answer"
                className="input input-bordered "
                onChange={(e) => {
                  if (e.target.value.length > 0) {
                    setAnswer(e.target.value);
                  } else {
                    setAnswer('');
                  }
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  onClick={(e) => setPage(1)}
                  className="btn btn-ghost mt-10"
                >
                  Back
                </div>
                <div
                  onClick={(e) => {
                    if (Answer.length > 0) {
                      if (Answer === accountDetails.securityAnswer) {
                        setPage(3);
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
                              <p>Incorrect answer</p>
                            </div>
                          </motion.div>
                        ));
                      }
                    }
                  }}
                  className="btn btn-secondary mt-10"
                >
                  Answer
                </div>
              </div>
            </motion.div>
          )}

          {/* change password */}
          {page == 3 && !hasUser && (
            <motion.div
              variants={_Transition_Card}
              initial="initial"
              animate="animate"
              className="my-16 flex flex-col w-full max-w-md self-center"
            >
              <p className="text-2xl">Send Magic Link</p>
              <p className="text-xl mt-10 ">
                We will send you a magic link to your registered email.
              </p>
              <p className="text-xl mt-10 ">
                Please update your password inside the My Profile page.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  onClick={(e) => setPage(2)}
                  className="btn btn-ghost mt-10"
                >
                  Back
                </div>
                <button
                  onClick={(e) => {
                    sendMagicLink();
                  }}
                  className="btn btn-secondary mt-10"
                >
                  Send Link
                </button>
              </div>
            </motion.div>
          )}
        </section>
      </motion.div>
    </>
  );
};

export default Recover;
