import Head from 'next/head';
// import { createClient } from 'contentful'
import { motion } from 'framer-motion';
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
		limit: 4,
	});

	const fetchData = async (e) => {
		const res = await fetch('/api/alumniList');
		const { alumniLists } = await res.json();

		if (alumniLists) {
			let temp = alumniLists.filter((alumni) => {
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

			{/* animated background */}
			<motion.div
				variants={_Transition_Blob_Bottom}
				initial="initial"
				animate="animate"
				exit="exit"
				className="absolute top-0 left-0 z-0 h-screen w-full bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600"
			/>

			{/* listing section */}
			<motion.section
				variants={_Transition_Page}
				initial="initial"
				animate="animate"
				exit="exit"
				className="relative z-10 flex min-h-screen flex-col ">
				<section className="relative flex min-h-screen flex-col items-center justify-center">
					<h1 className="text-center text-5xl font-bold text-base-content ">
						Alumni Members List
					</h1>
					<p className="mt-5 text-center text-xl">
						See people who became part of the University of Caloocan City.
					</p>

					{/* display a toast if the user is not signed in */}
					{auth_user ? (
						<motion.p
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="absolute bottom-10 select-none text-base-content text-opacity-50">
							Scroll Down to see the list
						</motion.p>
					) : (
						<motion.div
							variants={_Transition_Card}
							initial="initial"
							animate="animate"
							exit="exit"
							className="alert absolute bottom-10 select-none bg-base-300 shadow-lg">
							<div>
								<CgDanger size={25} />
								<span>Please sign in to view the list</span>
							</div>
						</motion.div>
					)}
				</section>

				{auth_user && (
					<motion.section className="mb-36 flex min-h-screen flex-col pt-28">
						<h1 className="text-center text-4xl font-bold">Alumnus List</h1>

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
								<div className=" flex items-center justify-evenly gap-3">
									<div className="dropdown">
										<label tabIndex={0} className="btn btn-outline btn-accent">
											Sort by
										</label>
										<ul
											tabIndex={0}
											className="dropdown-content menu rounded-box mt-3 w-52 bg-base-300 p-2 shadow">
											<li onClick={(e) => setSort('ASC')}>
												<a>Ascending</a>
											</li>
											<li onClick={(e) => setSort('DSC')}>
												<a>Descending</a>
											</li>
										</ul>
									</div>
									<p>{sort === 'ASC' ? 'Ascending' : 'Descending'}</p>
								</div>
								<div className=" flex items-center justify-evenly gap-3">
									<div className="dropdown">
										<label tabIndex={0} className="btn btn-outline btn-accent">
											Filter by
										</label>
										<ul
											tabIndex={0}
											className="dropdown-content menu rounded-box mt-3 w-52 bg-base-300 p-2 shadow">
											<li onClick={(e) => setFilter('givenName')}>
												<a>Given Name</a>
											</li>
											<li onClick={(e) => setFilter('surname')}>
												<a>Surname</a>
											</li>
											<li onClick={(e) => setFilter('createdAt')}>
												<a>Created at</a>
											</li>
										</ul>
									</div>
									<p>
										{(filter === 'givenName' && 'Given Name') ||
											(filter === 'surname' && 'Surname') ||
											(filter === 'createdAt' && 'Created at')}
									</p>
								</div>
							</div>
						</div>

						{/* loop filteredAlumniList and display card on each *IF* the user is existing  */}
						<motion.div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
							{auth_user &&
								filteredAlumniList &&
								filteredAlumniList.map((alumni, index) => {
									if (index < pagination.limit * pagination.page) {
										return <Alumnus_Card_New key={index} data={alumni} />;
									}
								})}
						</motion.div>
						{/* check if filteredAlumniList is empty  */}
						{filteredAlumniList.length < 1 && (
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
									<span className="text-base">
										If you are searching for yourself, please go to your profile here
									</span>
								</div>
							</motion.div>
						)}

						{/* load more */}
						{/* check if limit is reached to alumnilistdata */}
						{filteredAlumniList.length > pagination.limit * pagination.page ? (
							<div
								onClick={(e) => {
									e.preventDefault();
									setPagination({ ...pagination, page: pagination.page + 1 });
								}}
								className="btn btn-block mt-5">
								Load More
							</div>
						) : (
							<>
								{filteredAlumniList.length > 4 && (
									<div
										onClick={(e) => {
											e.preventDefault();
											setPagination({ ...pagination, page: 1 });
										}}
										className="btn btn-outline btn-ghost btn-block mt-5">
										See Less
									</div>
								)}
							</>
						)}
					</motion.section>
				)}
			</motion.section>
		</>
	);
};

export default Listing;
