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
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../firebaseConfig';
import Logo from './Logo';

import { _Transition_Card } from '../components/_Animations';
import { useUserData } from './Context_UserData';

const Navbar = (e) => {
	const { scrollY } = useViewportScroll();
	const [_scrollY, _setScrollY] = useState(0);
	const [_thresholdReached, _setThresholdReached] = useState(false);
	const [_themeSelected, _setThemeSelected] = useState('');
	const [_modalOpen, _setModalOpen] = useState(false);
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

	const { auth_user, hasUserData, userData } = useUserData();

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

	// submit form
	const handleSubmit = async (e) => {
		await signInWithEmailAndPassword(_user.email, _user.password);
		console.log(signInWithEmailAndPasswordUser);
	};

	return (
		<>
			<div
				className={`${
					!_thresholdReached ? 'bg-opacity-0' : 'bg-opacity-100'
				} fixed z-[90] flex w-full items-center justify-center bg-base-200 px-10 transition-colors md:px-20 xl:px-0`}>
				<div className="navbar max-w-5xl">
					<div className="navbar-start hidden md:flex">
						<Link href="/" passHref scroll>
							<a className="btn btn-ghost flex gap-3 text-lg normal-case">
								<span>
									<Logo width={25} height={25} strokeColor="#D926A9" />
								</span>
								<span>Project Alumnus</span>
							</a>
						</Link>
					</div>
					<div className="navbar-start md:hidden">
						<Link href="/" passHref scroll>
							<div className="btn btn-ghost btn-square">
								<Logo width={25} height={25} />
							</div>
						</Link>
					</div>
					<div className="navbar-end gap-4">
						<div className="hidden justify-end gap-1 md:flex">
							{auth_user && hasUserData ? (
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
									<a onClick={(e) => _setModalOpen(true)} className="btn btn-ghost">
										Sign In
									</a>
									<a className="btn btn-ghost">Sign Up</a>
								</>
							)}
						</div>
						<div className="dropdown-hover dropdown-end dropdown">
							<label tabIndex={0} className="avatar btn btn-circle btn-ghost">
								{auth_user && hasUserData ? (
									<div className="relative w-10 overflow-hidden rounded-full">
										<Image
											src={userData.alumniDisplayPhoto.url}
											priority
											objectFit="cover"
											layout="fill"
										/>
									</div>
								) : (
									<CgChevronDown size={25} />
								)}
							</label>
							<ul
								tabIndex={0}
								className="dropdown-content menu rounded-box menu-compact w-52 bg-base-100 p-2 shadow">
								{auth_user && hasUserData ? (
									<>
										<li
											onClick={(e) => {
												signOut(getAuth(firebaseApp));
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
					</div>
				</div>
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
							className="w-full max-w-xl">
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
									className="btn btn-primary w-full">
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
