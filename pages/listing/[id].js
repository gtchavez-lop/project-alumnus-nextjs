import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import _ApolloClient from '../../apolloClient';
import { gql } from '@apollo/client';
import {
	_Transition_Card,
	_Transition_Page,
} from '../../components/_Animations';

import { CgPin, CgMail, CgArrowLeft, CgWorkAlt } from 'react-icons/cg';
import { FaGraduationCap } from 'react-icons/fa';
import dayjs from 'dayjs';

const AlumniPage = ({}) => {
	const router = useRouter();

	const [alumniData, setAlumniData] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [isError, setIsError] = useState(false);
	const slug_id = router.query.id;

	// scroll to top on page load
	useEffect(() => {}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
		const fetchData = async () => {
			try {
				const response = await fetch('/api/alumnus');
				const { data } = await response.json();

				const filteredData = data.filter((alumni) => {
					return alumni.alumnusID === slug_id;
				});

				setAlumniData(filteredData[0]);
				setLoaded(true);
			} catch (error) {
				setIsError(true);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			{isError ? (
				<div className="flex min-h-screen flex-col items-center justify-center">
					<h1 className="text-2xl font-bold text-error">Error</h1>
					<p>There was an error loading the alumni data.</p>
					<p>Plase go back. Or go back to home</p>
				</div>
			) : (
				<>
					{loaded && alumniData && !isError ? (
						<>
							<motion.div
								variants={_Transition_Page}
								initial="initial"
								animate="animate"
								exit={{ opacity: 0, transition: { duration: 0.25, ease: 'circOut' } }}
								className="absolute top-0 left-0 h-[340px] w-screen overflow-hidden rounded-b-xl bg-base-300 opacity-40 lg:h-[300px]">
								<img
									src={`https://picsum.photos/seed/${alumniData.surname}_${alumniData.givenName}/1024/720`}
									className="h-full w-full object-cover opacity-20"
								/>
							</motion.div>

							<motion.div
								variants={_Transition_Card}
								initial="initial"
								animate="animate"
								exit="exit"
								className="relative mt-[350px] mb-32 flex w-full flex-col items-center text-center lg:mt-[300px]">
								{/* backbutton */}
								<Link href="/listing">
									<div className="btn btn-primary btn-square absolute top-0 left-0 -mt-8 flex gap-5 lg:-mt-6">
										<CgArrowLeft size={25} />
									</div>
								</Link>
								{/* contact button */}

								<div className="btn btn-primary btn-square absolute top-0 right-0 -mt-8 flex gap-5 lg:-mt-6">
									<CgMail size={25} />
								</div>

								<motion.div className="w-full rounded-xl pb-16">
									{/* avatar */}
									<div className="avatar -mt-24 lg:-mt-28 ">
										<div className="relative flex w-44 items-center justify-center overflow-hidden rounded-full bg-base-300 ring ring-base-100 ring-offset-8 ring-offset-transparent lg:w-52">
											{alumniData.alumniDisplayPhoto ? (
												<motion.div
													variants={_Transition_Card}
													initial="initial"
													animate="animate">
													<Image src={alumniData.alumniDisplayPhoto.url} layout="fill" />
												</motion.div>
											) : (
												<img
													src={`https://avatars.dicebear.com/api/identicon/${alumniData.surname}.svg`}
													// layout="fill"
												/>
											)}
										</div>
									</div>

									<div className="mt-12 lg:mt-7">
										{/* mobile layout */}
										<p className="mb-2 text-4xl font-semibold">
											{alumniData.givenName} {alumniData.middleName} {alumniData.surname}
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
															{dayjs(alumniData.birthdate).format('MMMM DD, YYYY')}
														</p>
													</div>
													<div className="flex flex-col items-center">
														<p>Current Locaton</p>
														<p className="font-semibold text-secondary">
															{alumniData.currentLocation}
														</p>
													</div>
													<div className="col-span-full flex flex-col items-center">
														<p>Current Email</p>
														<p className="font-semibold text-secondary">
															{alumniData.currentEmail}
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
															{alumniData.programCompleted}
														</p>
													</div>
													<div className="flex flex-col items-center">
														<p>Batch Year</p>
														<p className="font-semibold text-secondary">
															{dayjs(alumniData.programStartYear).format('YYYY')}
														</p>
													</div>
													<div className="flex flex-col items-center">
														<p>Graduation Year</p>
														<p className="font-semibold text-secondary">
															{dayjs(alumniData.programStartYear).format('YYYY')}
														</p>
													</div>
												</div>
											</div>
										</div>

										{/* occupational status */}
										<div className="card mt-10 bg-base-200 shadow-lg">
											<div className="card-body">
												<p className="card-title justify-center">Occupational Status</p>

												{/* only show if alumniData.isCurrentlyWorking is true */}
												{alumniData.isCurrentlyWorking ? (
													<>
														<div className="mt-5 grid grid-cols-1 gap-y-5  px-2 lg:grid-cols-2">
															<div className="flex flex-col items-center">
																<p>Curent Workplace</p>
																<p className="font-semibold text-secondary">
																	{alumniData.currentCompany}
																</p>
															</div>
															<div className="flex flex-col items-center">
																<p>Curent Occupation</p>
																<p className="font-semibold text-secondary">
																	{alumniData.currentPosition}
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
								</motion.div>
							</motion.div>
						</>
					) : (
						<div className="flex min-h-screen flex-col items-center justify-center">
							<h1>Loading...</h1>
							<p>Please wait while we load the alumni data.</p>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default AlumniPage;
