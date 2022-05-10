import Head from 'next/head';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
	_Transition_Blob_Bottom,
	_Transition_Page,
	_Transition_Card,
} from '../../components/_Animations';
import Alumnus_Card_New from '../../components/listing/AlumniCard';

import { CgDanger, CgInfo } from 'react-icons/cg';
import { useUserData } from '../../components/Context_UserData';
import _ApolloClient from '../../apolloClient';
import { getAlumniList } from '../api/alumniList';
import GradientBackground from '../../components/GradientBackground';

const Listing = ({}) => {
	const [alumniListData, setAlumniListData] = useState([]);
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('surname');
	const [sort, setSort] = useState('ASC');
	const { userData, setUserData, hasUserData, auth_user } = useUserData();
	const [filteredAlumniList, setFilteredAlumniList] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 6,
	});

	const fetchData = async (e) => {
		const sanityRes = await fetch('/api/alumnus');
		const { data } = await sanityRes.json();

		if (data) {
			let temp = data.filter((alumni) => {
				return alumni.currentEmail !== userData.currentEmail;
			});
			setAlumniListData(temp);
			setFilteredAlumniList(temp);
			setLoaded(temp ? true : false);
		}
	};

	const handleSort = (e) => {
		let temp = alumniListData.sort((a, b) => {
			if (sort === 'ASC') {
				return a[filter] > b[filter] ? 1 : -1;
			} else {
				return a[filter] < b[filter] ? 1 : -1;
			}
		});
		setFilteredAlumniList(temp);
	};

	const handleSearch = (e) => {
		if (search) {
			let temp = alumniListData.filter((alumni) => {
				return (
					alumni.surname.toLowerCase().includes(search.toLowerCase()) ||
					alumni.givenName.toLowerCase().includes(search.toLowerCase()) ||
					alumni.currentEmail.toLowerCase().includes(search.toLowerCase())
				);
			});
			setFilteredAlumniList(temp);
		} else {
			setFilteredAlumniList(alumniListData);
			setPagination({
				page: 1,
				limit: 4,
			});
		}
	};

	// trigger on load
	useEffect(
		(e) => {
			fetchData();
			console.log(filteredAlumniList);
		},
		[userData]
	);

	useEffect(() => {
		handleSearch();
	}, [search]);

	useEffect(() => {
		handleSort();
	}, [filter]);

	useEffect(() => {
		handleSort();
	}, [sort]);

	return (
		<>
			<Head>
				<title>Alumni List - UCC Project Alumnus</title>
				<meta
					name="description"
					content="University of Caloocan City - Alumni Management System"
				/>
			</Head>

			{/* gradient background */}
			<GradientBackground colorLeft={'#10B981'} colorRight={'#9333EA'} />

			{/* listing section */}
			<motion.section
				variants={_Transition_Page}
				initial="initial"
				animate="animate"
				exit="exit"
				className="relative z-10 my-32 mt-64 flex min-h-screen flex-col">
				<section className="relative flex flex-col ">
					<h1 className="text-5xl font-bold text-base-content ">Alumni List</h1>
					<p className="mt-5 text-xl">
						See people who became part of the University of Caloocan City.
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

					{/* display a toast if the user is not signed in */}
					{auth_user ? (
						<motion.p
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="bottom-10 mt-5 flex select-none gap-1 text-base-content text-opacity-50">
							<span className="hidden lg:block">Scroll down</span>
							<span className="lg:hidden">Swipe up</span> to see the list
						</motion.p>
					) : (
						<motion.div
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="alert relative mt-32 max-w-xl select-none justify-center bg-base-300 shadow-lg">
							<CgDanger size={25} />
							<p>Please sign in to view the list</p>
						</motion.div>
					)}
				</section>

				{auth_user && (
					<motion.section
						variants={_Transition_Card}
						initial="initial"
						animate="animate"
						exit="exit"
						className="mb-36 flex min-h-screen flex-col pt-28">
						{/* search and filter bar */}
						<div className="my-5 mb-10 grid grid-cols-1 gap-2 lg:grid-cols-4 ">
							<div className="col-span-4 flex items-center lg:col-span-2">
								<input
									onChange={(e) => setSearch(e.target.value)}
									type="text"
									placeholder="Search for someone"
									className="input input-bordered w-full"
								/>
							</div>
							<div className="col-span-4 flex items-center lg:col-span-2 lg:gap-16">
								<div className="grid w-full grid-cols-2 gap-3">
									<select
										className="select w-full"
										onChange={(e) => setSort(e.target.value)}>
										<option value="ASC">Ascending</option>
										<option value="DSC">Descending</option>
									</select>
									<select
										className="select w-full"
										onChange={(e) => setFilter(e.target.value)}>
										<option value="givenName">Given Name</option>
										<option value="suname">Surname</option>
										<option value="createdAt">Created At</option>
									</select>
								</div>
							</div>
						</div>

						{/* loop filteredAlumniList and display card on each *IF* the user is existing  */}
						<motion.div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
							{/* accent */}
							<motion.div
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{
									scale: 1,
									opacity: 0.5,
									transition: { duration: 0.25, ease: 'circOut' },
								}}
								exit={{
									opacity: 0,
								}}
								style={{
									backgroundImage:
										'radial-gradient(#d926a9 2px, transparent 2px), radial-gradient(#d926a9 2px, transparent 2px)',
									backgroundPosition: '0, 0, 0, 0',
									backgroundSize: '30px 30px',
								}}
								className="absolute bottom-[-10vh] left-[-50px] -z-10 h-[800px] w-[250px]"
							/>
							{auth_user &&
								loaded &&
								filteredAlumniList &&
								filteredAlumniList.map((alumni, index) => {
									if (index < pagination.limit * pagination.page) {
										return <Alumnus_Card_New key={index} data={alumni} />;
									}
								})}
						</motion.div>
						{/* check if filteredAlumniList is empty  */}
						{!loaded && (
							<motion.div
								variants={_Transition_Card}
								initial="initial"
								animate="animate"
								className="flex flex-grow flex-col items-center gap-3">
								<div className="flex gap-3">
									<CgInfo size={25} />
									<span className="text-base">No alumni found</span>
								</div>
								<div>
									<p className="text-base">
										If you are searching for yourself, please go to your profile{' '}
										<Link href={'/me'}>
											<span className="cursor-pointer font-bold">here</span>
										</Link>
									</p>
								</div>
							</motion.div>
						)}

						{/* load more */}
						{/* check if limit is reached to alumnilistdata */}
						{filteredAlumniList.length > pagination.limit * pagination.page ? (
							<motion.div
								onClick={(e) => {
									e.preventDefault();
									setPagination({ ...pagination, page: pagination.page + 1 });
								}}
								className="btn btn-block mt-5">
								Load More
							</motion.div>
						) : (
							<>
								<AnimatePresence>
									{filteredAlumniList.length > 6 && (
										<motion.div
											onClick={(e) => {
												e.preventDefault();
												setPagination({ ...pagination, page: 1 });
											}}
											className="btn btn-outline btn-ghost btn-block mt-5">
											See Less
										</motion.div>
									)}
								</AnimatePresence>
							</>
						)}
					</motion.section>
				)}
			</motion.section>
		</>
	);
};

export default Listing;
