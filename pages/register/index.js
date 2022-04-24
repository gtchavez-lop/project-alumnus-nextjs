import { AnimatePresence, motion } from 'framer-motion';
import { CgDanger } from 'react-icons/cg';
import {
	_Transition_Blob_Left,
	_Transition_Card,
} from '../../components/_Animations';
import { useUserData } from '../../components/Context_UserData';

const RegisterPage = (e) => {
	const { auth_user, hasUserData, userData } = useUserData();

	return (
		<>
			<motion.div
				variants={_Transition_Blob_Left}
				initial="initial"
				animate="animate"
				exit="exit"
				className="absolute top-0 left-0 -z-20 h-full w-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500"
			/>

			<AnimatePresence>
				<div className="flex min-h-screen flex-col justify-center">
					{!auth_user ? (
						<motion.div
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="flex w-full flex-col items-center justify-center">
							<p className="text-3xl font-bold">
								Register to get a basic account
							</p>

							<motion.form className="form-control mt-10 w-full max-w-md gap-3">
								<label className="form-control">
									<span>Email Address</span>
									<input type="email" className="input input-bordered" />
								</label>
								<label className="form-control">
									<span>Password</span>
									<input type="password" className="input input-bordered" />
								</label>
								<label className="form-control mt-10 gap-2">
									<div className="btn btn-block">
										<span>Sign Up</span>
									</div>
									<div className="dropdown-hover dropdown flex flex-col items-center">
										<span className="text-center">
											What is a basic account?
										</span>
										<span className="dropdown-content mt-7 max-w-sm rounded bg-base-300 p-5">
											<p>
												A basic account is an entry type of user account that
												lets the user to view upcoming news and events on the
												university
											</p>
										</span>
									</div>
								</label>
								<div className="divider " />
								<label className="text-center">
									<span>Or Sign in using the navigation bar above</span>
								</label>
							</motion.form>
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
								<span className="mt-5">
									Please sign out to register an account
								</span>
							</div>
						</motion.div>
					)}
				</div>
			</AnimatePresence>
		</>
	);
};

export default RegisterPage;
