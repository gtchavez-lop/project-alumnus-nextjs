import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, useViewportScroll, AnimatePresence } from 'framer-motion';
import { themeChange } from 'theme-change';
import { CgChevronDown, CgSpinner } from 'react-icons/cg';

import {
	useAuthState,
	useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebaseConfig';
import Logo from './Logo';

import { _Transition_Card } from '../components/_Animations';
import { useUserData } from './Context_UserData';

const Navbar = (e) => {
	const { scrollY } = useViewportScroll();
	const [_scrollY, _setScrollY] = useState(0);
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [_thresholdReached, _setThresholdReached] = useState(false);
	const [_themeSelected, _setThemeSelected] = useState('');
	const [_modalOpen, _setModalOpen] = useState(false);
	const [_mobileMenuOpen, _setMobileMenuOpen] = useState(false);
	const [_user, _setUser] = useState({
		email: '',
		password: '',
	});
	const [
		signInWithEmailAndPassword,
		signInWithEmailAndPasswordUser,
		signInWithEmailAndPasswordLoading,
		signInWithEmailAndPasswordError,
	] = useSignInWithEmailAndPassword(getAuth(firebaseApp));

	const { auth_user, hasUserData, auth_loading, _userData } = useUserData();

	useEffect(() => {
		themeChange(false);
		_setThemeSelected(window.localStorage.getItem('theme'));
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', (e) => {
			scrollY.get() > 100
				? _setThresholdReached(true)
				: _setThresholdReached(false);
			_setScrollY(scrollY.get());
		});
	}, [_scrollY]);

	const updateUserInput = (e) => {
		switch (e.target.type) {
			case 'email':
				_setUser({
					..._user,
					email: e.target.value,
				});
				break;
			case 'password':
				_setUser({
					..._user,
					password: e.target.value,
				});
				break;
		}
	};

	// update theme
	useEffect(() => {
		themeChange(false);
	}, [_themeSelected]);

	// submit form
	const handleSubmit = async (e) => {
		await signInWithEmailAndPassword(_user.email, _user.password);
		console.log(signInWithEmailAndPasswordUser);
	};

	return (
		<>
			{/* modal */}
			<AnimatePresence>
				{isSigningOut && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={(e) => {
							if (e.target === e.currentTarget) setIsSigningOut(false);
						}}
						className="fixed z-[98] flex h-screen w-screen items-center justify-center bg-base-300 bg-opacity-[98]">
						<motion.div
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="card mx-5 bg-base-100 shadow md:mx-0">
							<div className="card-body">
								<h2 className="card-title justify-center text-center">
									Are you sure you want to sign out?
								</h2>
								<div className="card-actions mt-5 grid grid-cols-1 md:grid-cols-2">
									<div
										className="btn btn-ghost w-full"
										onClick={() => {
											signOut(getAuth(firebaseApp));
											setIsSigningOut(false);
										}}>
										Yes
									</div>
									<div
										className="btn btn-secondary w-full"
										onClick={() => setIsSigningOut(false)}>
										No
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* mobile menu */}
			<AnimatePresence>
				{_mobileMenuOpen && (
					<motion.div
						onClick={(e) => {
							if (e.target === e.currentTarget) _setMobileMenuOpen(false);
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
						className="fixed top-0 left-0 z-[80] h-screen w-screen bg-base-200 bg-opacity-75 lg:hidden">
						<motion.div
							initial={{ opacity: 0, translateY: '-100px' }}
							animate={{
								opacity: 1,
								translateY: 0,
								transition: {
									duration: 0.5,
									ease: [0.07, 0.85, 0.16, 0.94],
								},
							}}
							exit={{
								translateY: '-200px',
								transition: {
									duration: 0.5,
									delay: 0.2,
									ease: [0.07, 0.85, 0.16, 0.94],
								},
							}}
							className="absolute top-0 left-0 w-screen bg-base-300 pb-10 shadow-lg">
							<div className="mt-32 flex flex-col items-center gap-2 px-10">
								<Link href={'/'} passHref scroll>
									<div
										onClick={(e) => _setMobileMenuOpen(false)}
										className="btn no-animation btn-block">
										Home
									</div>
								</Link>
								<Link href={'/events'} passHref scroll={false}>
									<div
										onClick={(e) => _setMobileMenuOpen(false)}
										className="btn no-animation btn-block">
										Events
									</div>
								</Link>
								<Link href={'/listing'} passHref scroll={false}>
									<div
										onClick={(e) => _setMobileMenuOpen(false)}
										className="btn no-animation btn-block">
										Alumni List
									</div>
								</Link>
								<Link href={'/about'} passHref scroll={false}>
									<div
										onClick={(e) => _setMobileMenuOpen(false)}
										className="btn no-animation btn-block">
										About Us
									</div>
								</Link>
								{!auth_user && (
									<Link href={'/about'} passHref scroll={true}>
										<div
											onClick={(e) => _setMobileMenuOpen(false)}
											className="btn no-animation btn-block">
											Register an Account
										</div>
									</Link>
								)}
								<div className="divider my-5" />
								<div className="grid w-full grid-cols-2 gap-2">
									{auth_user ? (
										<div
											onClick={(e) => {
												_setMobileMenuOpen(false);
												setIsSigningOut(true);
											}}
											className="btn btn-error no-animation btn-block">
											Sign out
										</div>
									) : (
										<div
											onClick={(e) => {
												_setMobileMenuOpen(false);
												_setModalOpen(true);
											}}
											className="btn btn-secondary no-animation btn-block">
											Sign In
										</div>
									)}
									<div
										className="btn btn-ghost no-animation btn-block"
										data-toggle-theme="dark,light"
										onClick={() => {
											themeChange(false);
											_setThemeSelected(window?.localStorage?.getItem('theme'));
										}}>
										{_themeSelected === 'dark' ? 'Light Mode' : 'Dark Mode'}
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<div
				className={`${
					!_thresholdReached ? 'bg-opacity-0 py-7' : 'bg-opacity-100 py-2'
				}  fixed z-[90] flex w-full items-center justify-center bg-base-200 px-10  transition-all duration-200 md:px-20 lg:px-0`}>
				<nav className="navbar max-w-4xl">
					<div className="navbar-start">
						<Link href="/" passHref scroll>
							<a className="btn btn-ghost flex gap-3 text-lg normal-case">
								<span>
									<Logo width={25} height={25} strokeColor="#D926A9" />
								</span>
								<span className="hidden lg:block">Project Alumnus</span>
							</a>
						</Link>
					</div>
					<div className="navbar-end gap-4">
						<div className="hidden justify-end gap-1 lg:flex">
							{_userData && auth_user ? (
								<>
									<Link href="/events" passHref scroll={false}>
										<a className="btn btn-ghost">Events</a>
									</Link>
									<Link href="/listing" passHref scroll={false}>
										<a className="btn btn-ghost">Listing</a>
									</Link>
									<Link href="/about" passHref scroll={false}>
										<a className="btn btn-ghost">About Us</a>
									</Link>
								</>
							) : (
								<>
									<div onClick={(e) => _setModalOpen(true)} className="btn btn-ghost">
										Sign In
									</div>
									<Link href={'/register'} passHref scroll>
										<div className="btn btn-ghost">Sign Up</div>
									</Link>
								</>
							)}
						</div>

						{/* desktop dropdown */}
						<div
							aria-disabled={!auth_loading}
							className="dropdown-hover dropdown-end dropdown hidden lg:inline-block">
							<label tabIndex={0} className="avatar btn btn-ghost btn-circle">
								{_userData && auth_user && !auth_loading ? (
									<div className="relative hidden w-10 overflow-hidden rounded-full lg:block">
										{/* <Image
											src={_userData.displayPhoto}
											loader={(e) => <CgSpinner size={25} />}
											objectFit="cover"
											layout="fill"
											alt="user profile"
											placeholder="/pa-transparent.png"
										/> */}
										<img src={_userData.displayPhoto} />
									</div>
								) : (
									<CgChevronDown size={25} />
								)}
							</label>
							<ul
								tabIndex={0}
								className="dropdown-content menu rounded-box menu-compact w-52 bg-base-100 p-2 shadow">
								{auth_user && _userData && !auth_loading ? (
									<>
										<li
											onClick={(e) => {
												setIsSigningOut(true);
											}}>
											<a>Logout</a>
										</li>
										<div className="divider" />
										<Link href="/me" passHref scroll={false}>
											<li>
												<a>Profile</a>
											</li>
										</Link>
									</>
								) : (
									<>
										<li onClick={(e) => _setModalOpen(true)}>
											<a>Sign In</a>
										</li>
										<li>
											<a>Sign Up</a>
										</li>
										<div className="divider" />
									</>
								)}
								<Link href="/events" passHref scroll={false}>
									<li>
										<a>Events</a>
									</li>
								</Link>
								<Link href="/listing" passHref scroll={false}>
									<li>
										<a>Listing</a>
									</li>
								</Link>
								<div className="divider" />
								<li>
									{_themeSelected === 'dark' ? (
										<a data-set-theme="light" onClick={() => _setThemeSelected('light')}>
											Light Mode
										</a>
									) : (
										<a data-set-theme="dark" onClick={() => _setThemeSelected('dark')}>
											Dark Mode
										</a>
									)}
								</li>
							</ul>
						</div>

						{/* mobile menu button */}
						<div
							className="avatar btn btn-ghost btn-circle lg:hidden"
							onClick={(e) => _setMobileMenuOpen(!_mobileMenuOpen)}>
							{auth_user && auth_user ? (
								<div className="relative hidden w-10 overflow-hidden rounded-full lg:block">
									{/* <Image
										src={_userData.displayPhoto}
										priority
										objectFit="cover"
										layout="fill"
									/> */}
									<img src={_userData.displayPhoto} />
								</div>
							) : (
								<CgChevronDown size={25} />
							)}
						</div>
					</div>
				</nav>
			</div>

			{/* login modal */}
			<AnimatePresence exitBeforeEnter>
				{_modalOpen && (
					<motion.div
						key="modal"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						onClick={(e) => {
							e.currentTarget === e.target && _setModalOpen(false);
						}}
						className="fixed z-[99] flex h-full w-full items-center justify-center bg-base-300 bg-opacity-[0.97]">
						<motion.div
							key="modal_body"
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="mx-10 w-full max-w-xl">
							<p className="text-2xl">Sign in with your account</p>
							<form
								className="form-group my-10 flex flex-col gap-3"
								onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}>
								<label className="label" htmlFor="email">
									<span className="label-text">Email</span>
								</label>
								<input
									onChange={(e) => updateUserInput(e)}
									type="email"
									id="email"
									placeholder="juan_delacruz@mail.com"
									className="input input-bordered  "
								/>
								<label htmlFor="password" className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									onChange={(e) => updateUserInput(e)}
									type="password"
									id="password"
									placeholder="••••••••••••••••"
									className="input input-bordered  "
								/>
							</form>
							<label className="modal-action grid grid-cols-2">
								<a
									onClick={(e) => _setModalOpen(false)}
									className="btn btn-outline btn-ghost w-full">
									Close
								</a>
								<div
									onClick={(e) => {
										handleSubmit(e);
										_setModalOpen(false);
									}}
									className="btn btn-secondary w-full">
									Sign In
								</div>
							</label>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Navbar;
