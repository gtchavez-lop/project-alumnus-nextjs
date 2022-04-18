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

import { CgPin, CgMail, CgArrowLeft } from 'react-icons/cg';
import { FaGraduationCap } from 'react-icons/fa';

const AlumniPage = (e) => {
	const router = useRouter();

	const [alumniData, setAlumniData] = useState({});
	const [loaded, setLoaded] = useState(false);
	const [isError, setIsError] = useState(false);

	// scroll to top on page load
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		try {
			const slug = router.query.id.split('&');
			_ApolloClient
				.query({
					query: gql`
                        {
                            alumniList(where: { id: "${slug[1]}" }) {
                                surname
                                givenName
                                middleInitial
                                alumniDisplayPhoto {
                                    url
                                }
                                birthDate
                                createdAt
                                slug
                                currentEmail
                                currentLocation
                                programCompleted
                                graduationDate
                                isCurrentlyWorking
                                company
                                workPosition
                            }
                        }
                    `,
				})
				.then((res) => {
					setAlumniData(res.data.alumniList);
					console.log(alumniData ? alumniData : 'No data');
					setLoaded(true);
				});
		} catch (error) {
			setIsError(true);
		}
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
					<motion.div
						variants={_Transition_Page}
						initial="initial"
						animate="animate"
						exit="exit"
						className="absolute top-0 left-0 h-3/4 w-full overflow-hidden rounded-b-lg bg-base-300 opacity-40">
						<img
							src="https://source.unsplash.com/1600x900/?alumni"
							className="h-full w-full object-cover opacity-20"
						/>
					</motion.div>
					{loaded && alumniData ? (
						<motion.div
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="relative mt-64 flex h-screen w-full flex-col items-center text-center">
							{/* backbutton */}
							<div
								onClick={() => router.back()}
								className="btn btn-primary absolute top-0 left-16 -mt-6 hidden gap-5 bg-base-300 lg:flex">
								<CgArrowLeft size={25} />
								<span>Go Back</span>
							</div>

							<div className="w-full rounded-xl bg-base-300 pb-16">
								{/* avatar */}
								<div className="avatar -mt-24 lg:-mt-28 ">
									<div className="relative flex w-48 items-center justify-center overflow-hidden rounded-full bg-base-300 ring ring-secondary ring-offset-4 ring-offset-transparent lg:w-52">
										{alumniData.alumniDisplayPhoto ? (
											<>
												<Image
													src={alumniData.alumniDisplayPhoto.url}
													layout="fill"
												/>
											</>
										) : (
											<img
												src={`https://avatars.dicebear.com/api/identicon/${alumniData.surname}.svg`}
												// layout="fill"
											/>
										)}
									</div>
								</div>

								<div className="mt-16">
									{/* backbutton mobile */}
									<div
										onClick={() => router.back()}
										className="btn btn-ghost mb-10 flex gap-2 lg:hidden">
										<CgArrowLeft size={20} />
										<span>Go Back</span>
									</div>
									<p className="text-3xl font-bold lg:text-4xl">
										{alumniData.surname}, {alumniData.givenName}
									</p>
									<p className="mt-5 flex items-center justify-center gap-3 text-xl">
										<span>
											<CgPin size={25} />
										</span>
										<span>{alumniData.currentLocation}, Philippines</span>
									</p>

									<p className="mt-10 flex items-center justify-center gap-3 text-lg">
										<span>
											<FaGraduationCap size={25} />
										</span>
										<span>{alumniData.programCompleted}</span>
									</p>
									<p className="mt-2 flex items-center justify-center gap-3 text-lg">
										<span>
											<CgMail size={25} />
										</span>
										<span>{alumniData.currentEmail}</span>
									</p>
								</div>
							</div>
						</motion.div>
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
