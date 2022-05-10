import Image from 'next/image';
import { motion } from 'framer-motion';

import { CgPin, CgMail, CgGhostCharacter } from 'react-icons/cg';
import { FaGraduationCap } from 'react-icons/fa';
import {
	_Transition_Card,
	_Transition_Page,
} from '../../components/_Animations';
import { useUserData } from '../../components/Context_UserData';
import dayjs from 'dayjs';
import GradientBackground from '../../components/GradientBackground';

const MyProfile = ({ alumniList }) => {
	const { userData, auth_user, hasUserData, _userData } = useUserData();

	return (
		<>
			<GradientBackground colorLeft={'#01E7E7'} colorRight={'#FFFF56'} />

			{auth_user && _userData ? (
				<>
					{/* background image */}
					<motion.div
						variants={_Transition_Page}
						initial="initial"
						animate="animate"
						exit={{ opacity: 0, transition: { duration: 0.25, ease: 'circOut' } }}
						className="absolute top-0 left-0 z-[-99] h-[340px] w-screen overflow-hidden rounded-b-xl bg-base-300 opacity-40 lg:h-[300px]">
						<img
							src={`https://picsum.photos/seed/${_userData.surname}_${_userData.givenName}/1024/720`}
							className="h-full w-full object-cover opacity-20"
						/>
					</motion.div>

					{/* content */}
					<motion.div
						variants={_Transition_Card}
						initial="initial"
						animate="animate"
						exit="exit"
						className="relative mt-[350px] mb-32 flex w-full flex-col items-center text-center lg:mt-[300px]">
						<div className="w-full rounded-xl pb-16">
							{/* avatar */}

							<div className="avatar -mt-24 lg:-mt-28 ">
								<div className="relative flex w-44 items-center justify-center overflow-hidden rounded-full bg-base-300 ring ring-base-100 ring-offset-8 ring-offset-transparent lg:w-52">
									{_userData.displayPhoto ? (
										<Image src={_userData.displayPhoto} layout="fill" />
									) : (
										<img
											src={`https://avatars.dicebear.com/api/identicon/${_userData.surname}.svg`}
										/>
									)}
								</div>
							</div>

							{/* profile detail */}
							<div className="mt-12 lg:mt-7">
								<p className="mb-2 text-4xl font-semibold">
									{_userData.givenName} {_userData.middleName} {_userData.surname}
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
													{dayjs(_userData.birthdate).format('MMMM DD, YYYY')}
												</p>
											</div>
											<div className="flex flex-col items-center">
												<p>Current Locaton</p>
												<p className="font-semibold text-secondary">
													{_userData.currentLocation}
												</p>
											</div>
											<div className="col-span-full flex flex-col items-center">
												<p>Current Email</p>
												<p className="font-semibold text-secondary">
													{_userData.currentEmail}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* academic details */}
								<div className="card mt-10 bg-base-200 shadow-lg">
									<div className="card-body">
										<p className="card-title justify-center">Academic Summary</p>
										<div className="mt-5 grid grid-cols-1 gap-y-5  px-2 lg:grid-cols-2">
											<div className="flex flex-col items-center">
												<p>Program Completed</p>
												<p className="font-semibold text-secondary">
													{_userData.programCompleted}
												</p>
											</div>
											<div className="flex flex-col items-center">
												<p>Batch Year</p>
												<p className="font-semibold text-secondary">
													{dayjs(_userData.programStartYear).format('YYYY')}
												</p>
											</div>
											<div className="col-span-full flex flex-col items-center">
												<p>Graduation Year</p>
												<p className="font-semibold text-secondary">
													{dayjs(_userData.programStartYear).format('YYYY')}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* occupational status */}
								<div className="card mt-10 bg-base-200 shadow-lg">
									<div className="card-body">
										<p className="card-title justify-center">Occupational Status</p>

										{/* only show if _userData.isCurrentlyWorking is true */}
										{_userData.isCurrentlyWorking ? (
											<>
												<div className="mt-5 grid grid-cols-1 gap-y-5  px-2 lg:grid-cols-2">
													<div className="flex flex-col items-center">
														<p>Curent Workplace</p>
														<p className="font-semibold text-secondary">
															{_userData.currentCompany}
														</p>
													</div>
													<div className="flex flex-col items-center">
														<p>Curent Occupation</p>
														<p className="font-semibold text-secondary">
															{_userData.currentPosition}
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
						</div>
					</motion.div>
				</>
			) : (
				<>
					<motion.div
						variants={_Transition_Page}
						initial="initial"
						animate="animate"
						exit="exit"
						className="relative flex h-screen w-full flex-col items-center justify-center">
						<CgGhostCharacter size={60} />
						<p className="mt-5 text-center text-4xl">Please sign in</p>
						<p className="text-center">
							You will see your profile here once you signed in
						</p>
					</motion.div>
				</>
			)}
		</>
	);
};

export default MyProfile;
