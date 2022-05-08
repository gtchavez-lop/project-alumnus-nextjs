import { AnimatePresence, motion } from 'framer-motion';
import { CgDanger } from 'react-icons/cg';
import {
	_Transition_Blob_Left,
	_Transition_Card,
} from '../../components/_Animations';
import { useUserData } from '../../components/Context_UserData';
import GradientBackground from '../../components/GradientBackground';
import { useState, useEffect } from 'react';

const RegisterPage = (e) => {
	const { auth_user, hasUserData, userData } = useUserData();
	const [_pageCount, _setPageCount] = useState(1);
	const [_userDetails, _setUserDetails] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		idNumber: '',
	});
	const [passwordError, _setPasswordError] = useState(false);

	useEffect(() => {
		console.log('userData', _userDetails);
	}, [_userDetails]);

	return (
		<>
			{/* <motion.div
				variants={_Transition_Blob_Left}
				initial="initial"
				animate="animate"
				exit="exit"
				className="absolute top-0 left-0 -z-20 h-full w-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500"
			/> */}

			<GradientBackground colorLeft={'#EC4899'} colorRight={'#EAB308'} />

			<AnimatePresence>
				<div className="relative z-10 my-32 mt-64 flex min-h-screen flex-col">
					{!auth_user ? (
						<motion.div
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="relative flex flex-col ">
							<h1 className="text-center text-5xl font-bold text-base-content">
								Register to get a basic account
							</h1>

							<p className="mt-5 text-center text-xl">
								Help us make your experience memorable
							</p>

							<div className="divider my-16" />

							{_pageCount === 1 && (
								<motion.form
									variants={_Transition_Card}
									initial="initial"
									animate="animate"
									exit="exit"
									className="form-control w-full max-w-md gap-3 self-center">
									<label className="form-control">
										<span>Email Address</span>
										<input
											onChange={(e) => {
												_setUserDetails({
													..._userDetails,
													email: e.target.value,
												});
											}}
											value={_userDetails.email}
											type="email"
											className={`input input-bordered ${
												!_userDetails.email.includes('@') && 'input-error'
											}`}
										/>
									</label>
									<label className="form-control">
										<span>Password</span>
										<input
											onChange={(e) => {
												_setUserDetails({
													..._userDetails,
													password: e.target.value,
												});
											}}
											value={_userDetails.password}
											type="password"
											className="input input-bordered"
										/>
									</label>
									<label className="form-control">
										<span>Confirm Password</span>
										<input
											onChange={(e) => {
												_setUserDetails({
													..._userDetails,
													confirmPassword: e.target.value,
												});
												_setPasswordError(!(_userDetails.password == e.target.value));
											}}
											value={_userDetails.confirmPassword}
											type="password"
											className={`input input-bordered ${passwordError && 'input-error'}`}
										/>
										{passwordError && (
											<label className="label">
												<span className="label-text-alt text-error">
													Password does not match
												</span>
											</label>
										)}
									</label>
									<label className="form-control mt-10 gap-2">
										<span className="text-center">
											We need to verify your identity on the next page
										</span>
										<div
											onClick={(e) => {
												if (userData.password == userData.confirmPassword) {
													_setPageCount(2);
												}
											}}
											className="btn btn-block">
											<span>Next</span>
										</div>
										<div className="dropdown-hover dropdown mt-10 flex flex-col items-center ">
											<span className="text-center opacity-50">
												What is a basic account?
											</span>
											<span className="dropdown-content mt-7 max-w-sm rounded bg-base-300 p-5">
												<p>
													A basic account is an entry type of user account that lets the user
													to view upcoming news and events on the university
												</p>
											</span>
										</div>
									</label>
									<div className="divider " />
									<label className="text-center">
										<span>Or Sign in using the navigation bar above</span>
									</label>
								</motion.form>
							)}

							{_pageCount === 2 && (
								<motion.form
									variants={_Transition_Card}
									initial="initial"
									animate="animate"
									exit="exit"
									className="form-control w-full max-w-md gap-3 self-center">
									<label className="form-control w-full">
										<span>Card Instance Number</span>
										<div className="input-group ">
											<input type="text" className={`input input-bordered w-full`} />
											<div className="btn">Check</div>
										</div>
									</label>

									<p className="mt-10 flex flex-col gap-3 opacity-50">
										<span>
											This will automatically check your Card Instance Number in our local
											database center
										</span>
										<span>
											Expect a delay as we automatically check your card instance number.
										</span>
									</p>

									<div
										onClick={(e) => _setPageCount(1)}
										className="mt-16 grid grid-cols-1 gap-3 lg:grid-cols-2">
										<div className="btn btn-outline btn-ghost">Back</div>
										<div className="btn btn-secondary">Next</div>
									</div>
								</motion.form>
							)}
						</motion.div>
					) : (
						<motion.div
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="card  max-w-fit select-none self-center bg-base-300 ">
							<div className="card-body items-center">
								<CgDanger size={40} />
								<span className="mt-5">Please sign out to register an account</span>
							</div>
						</motion.div>
					)}
				</div>
			</AnimatePresence>
		</>
	);
};

export default RegisterPage;
