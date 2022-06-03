import Link from 'next/link';
import {
  AiOutlineArrowDown,
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineBook,
  AiOutlineUser,
  AiOutlineQuestion,
  AiOutlineLogout,
  AiOutlineBgColors,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from './_Supabase';
import Logo from './Logo';
import toast, { Toaster } from 'react-hot-toast';
import { themeChange } from 'theme-change';

const MobileContextMenu = ({ closeHandler }) => {
  const [hasUser, setHasUser] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setHasUser(false);
  };

  useEffect((e) => {
    setHasUser(supabase.auth.user() ? true : false);
  }, []);

  supabase.auth.onAuthStateChange((authEvent, user) => {
    setHasUser(user ? true : false);
    closeHandler(authEvent == 'SIGNED_IN' && false);
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed w-screen h-screen bg-base-300 bg-opacity-60 z-[90] lg:hidden "
        onClick={(e) => e.target == e.currentTarget && closeHandler(false)}
      >
        <motion.div
          initial={{ translateY: -20 }}
          animate={{
            translateY: 0,
            transition: { duration: 0.25, easings: [0.22, 0.82, 0.33, 0.98] },
          }}
          exit={{
            translateY: -20,
            transition: { duration: 0.25, easings: [0.77, 0.02, 0.87, 0.12] },
          }}
          className="py-8 pt-24 w-full bg-base-300 flex justify-center"
        >
          <div className="max-w-4xl px-10 w-full self-center flex flex-col">
            <ul className="gap-2 grid grid-cols-1 md:grid-cols-2">
              <Link href={'/'}>
                <li
                  onClick={(e) => closeHandler(false)}
                  className="btn btn-ghost no-animation items-center justify-start gap-3"
                >
                  <AiOutlineHome size={20} />
                  <span>Home</span>
                </li>
              </Link>
              <Link href={'/me'}>
                <li
                  onClick={(e) => closeHandler(false)}
                  className="btn btn-ghost no-animation items-center justify-start gap-3"
                >
                  <AiOutlineUser size={20} />
                  <span>My Profile</span>
                </li>
              </Link>
              <Link href={'/alumni'}>
                <li
                  onClick={(e) => closeHandler(false)}
                  className="btn btn-ghost no-animation items-center justify-start gap-3"
                >
                  <AiOutlineMenu size={20} />
                  <span>Alumni List</span>
                </li>
              </Link>
              <Link href={'/events'}>
                <li
                  onClick={(e) => closeHandler(false)}
                  className="btn btn-ghost no-animation items-center justify-start gap-3"
                >
                  <AiOutlineBook size={20} />
                  <span>News and Events</span>
                </li>
              </Link>
              <Link href={'/about'}>
                <li
                  onClick={(e) => closeHandler(false)}
                  className="btn btn-ghost no-animation items-center justify-start gap-3"
                >
                  <AiOutlineQuestion size={20} />
                  <span>About Us</span>
                </li>
              </Link>
              <p className="mt-2">Double tap to change theme</p>
              <li
                data-toggle-theme="dark,light"
                onClick={(e) => themeChange(false)}
                className="btn btn-ghost no-animation items-center justify-start gap-3 mb-3"
              >
                <AiOutlineBgColors size={20} />
                <span>Change Theme</span>
              </li>

              <div className="divider col-span-full" />
              {/* <li>
                  <a className="bg-error text-error-content">
                  </a>
                </li> */}
              {hasUser ? (
                <li
                  onClick={handleSignOut}
                  className="btn btn-error items-center text-error-content justify-start gap-3"
                >
                  <AiOutlineLogout size={20} />
                  <span>Sign Out</span>
                </li>
              ) : (
                <>
                  <li className=" items-center justify-start gap-3">
                    <label
                      htmlFor="signInModal"
                      className="btn btn-secondary btn-block"
                    >
                      Sign In
                    </label>
                  </li>
                  <li className="btn btn-ghost items-center justify-start gap-3">
                    <AiOutlineUserAdd size={20} />
                    <span>Register</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

const Navbar = (e) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [mobileContextMenuOpen, setMobileContextMenuOpen] = useState(false);
  const [threshholdReached, setThreshholdReached] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = async (e) => {
    setIsSigningIn(true);
    const { data, error } = await supabase.auth.signIn({
      email: user.email,
      password: user.password,
    });
    if (!error) {
      setIsSigningIn(false);
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: [0, 1, 1, 1, 0], translateX: [-20, 0, 0, 0, 0] }}
          transition={{ duration: 2 }}
        >
          <div className="alert alert-success">
            <p>
              {supabase.auth.user() ? supabase.auth.user().email : 'A user'}{' '}
              signed in
            </p>
          </div>
        </motion.div>
      ));
    } else {
      setIsSigningIn(false);
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: [0, 1, 1, 1, 0], translateX: [-20, 0, 0, 0, 0] }}
          transition={{ duration: 2 }}
        >
          <div className="alert alert-error">
            <p>{error.message}</p>
          </div>
        </motion.div>
      ));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: [0, 1, 1, 1, 0], translateX: [-20, 0, 0, 0, 0] }}
        transition={{ duration: 2 }}
      >
        <div className="alert alert-info">
          <p>Account signed out</p>
        </div>
      </motion.div>
    ));
    setHasUser(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 75) {
      setThreshholdReached(true);
    } else {
      setThreshholdReached(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // check if user is signed in
    setHasUser(supabase.auth.user() ? true : false);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      {/* mobile context menu */}
      <AnimatePresence exitBeforeEnter>
        {mobileContextMenuOpen && (
          <MobileContextMenu
            closeHandler={setMobileContextMenuOpen}
            setSigningIn={setIsSigningIn}
          />
        )}
      </AnimatePresence>

      <div>
        <Toaster position="bottom-left" reverseOrder={false} />
      </div>

      <nav
        className={`flex justify-center transition-all fixed w-screen top-0 left-0 z-[95] ${
          threshholdReached ? 'bg-base-300 py-5' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-4xl w-full px-10 lg:px-0 flex justify-between">
          {/* logo */}
          <div>
            <Link href={'/'}>
              <div className="btn btn-ghost flex items-center gap-3">
                <Logo width={25} height={25} />
                {!threshholdReached && <div className="">Project Alumnus</div>}
              </div>
            </Link>
          </div>

          {/* desktop dropdown */}
          <div className="hidden lg:flex gap-4 items-center">
            {isSigningIn ? (
              <>
                <p>Auth Loading</p>
              </>
            ) : (
              <>
                {/* quick links */}
                {hasUser ? (
                  <div className="flex gap-2">
                    <Link href={'/alumni'}>
                      <div className="btn btn-ghost">Alumni List</div>
                    </Link>
                    <Link href={'/events'}>
                      <div className="btn btn-ghost">News and Events</div>
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link href={'/register'}>
                      <div className="btn btn-ghost">Sign Up</div>
                    </Link>

                    <label htmlFor="signInModal" className="btn btn-secondary">
                      Sign In
                    </label>
                  </div>
                )}
              </>
            )}
            {/* dropdown */}
            <div className="dropdown dropdown-hover dropdown-end">
              <label className="btn btn-circle">
                <AiOutlineArrowDown size={20} />
              </label>
              <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-64">
                <Link href={'/'}>
                  <li>
                    <a>
                      <AiOutlineHome size={20} />
                      <span>Home</span>
                    </a>
                  </li>
                </Link>
                <Link href={'/me'}>
                  <li>
                    <a>
                      <AiOutlineUser size={20} />
                      <span>My Profile</span>
                    </a>
                  </li>
                </Link>
                <Link href={'/alumni'}>
                  <li>
                    <a>
                      <AiOutlineMenu size={20} />
                      <span>Alumni List</span>
                    </a>
                  </li>
                </Link>
                <Link href={'/events'}>
                  <li>
                    <a>
                      <AiOutlineBook size={20} />
                      <span>News and Events</span>
                    </a>
                  </li>
                </Link>
                <Link href={'/about'}>
                  <li>
                    <a>
                      <AiOutlineQuestion size={20} />
                      <span>About Us</span>
                    </a>
                  </li>
                </Link>
                <p className="mt-4 opacity-50">Double Click to change theme</p>
                <li
                  data-toggle-theme="dark,light"
                  onClick={(e) => themeChange(false)}
                >
                  <a>
                    <AiOutlineBgColors size={20} />
                    <span>Change Theme</span>
                  </a>
                </li>
                <div className="divider" />
                {hasUser ? (
                  <li>
                    <label
                      htmlFor="signOut_modal"
                      className="btn btn-error text-error-content"
                    >
                      <AiOutlineLogout size={20} />
                      <span>Sign Out</span>
                    </label>
                  </li>
                ) : (
                  <li>
                    <label htmlFor="signInModal" className="btn btn-secondary">
                      Sign In
                    </label>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* mobile context menu button */}
          <div className="flex lg:hidden">
            <div
              onClick={(e) =>
                setMobileContextMenuOpen(mobileContextMenuOpen ? false : true)
              }
              className="btn btn-circle"
            >
              <motion.div
                animate={{ rotate: mobileContextMenuOpen ? -180 : 0 }}
              >
                <AiOutlineArrowDown size={20} />
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      {/* signInModal */}
      <input type="checkbox" id="signInModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex flex-col mt-10">
            <h2 className="text-center text-3xl font-bold">
              Sign In to your Alumnus Account
            </h2>
            <div className="grid grid-cols-1 gap-5 mt-10">
              <div className="flex flex-col gap-2">
                <label className="text-base">Email</label>
                <input
                  className="input input-bordered"
                  type="text"
                  placeholder="juandelacruz@mail.com"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-base">Password</label>
                <input
                  className="input input-bordered "
                  type="password"
                  placeholder="Your strong password here"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 justify-between items-center">
                <div className="flex flex-col">
                  <label className="text-base">Remember Me</label>
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked ? true : false)
                    }
                  />
                </div>

                <Link href={'/recover'}>
                  <label htmlFor="signInModal" className="link">
                    Forgot Password?
                  </label>
                </Link>
              </div>
            </div>
          </div>
          <div className="modal-action items-center">
            <label htmlFor="signInModal" className="btn">
              Close
            </label>
            <label
              htmlFor="signInModal"
              onClick={handleSignIn}
              className="btn btn-secondary"
            >
              Sign In
            </label>
          </div>
        </div>
      </div>

      {/* sign out modal */}
      <input type="checkbox" id="signOut_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="flex flex-col mt-10">
            <h2 className="text-center text-xl font-bold">
              Are you sure you want to sign out?
            </h2>
          </div>
          <div className="modal-action">
            <label htmlFor="signOut_modal" className="btn">
              Close
            </label>
            <label
              htmlFor="signOut_modal"
              onClick={handleSignOut}
              className="btn btn-error"
            >
              Sign Out
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
