import Head from 'next/head';
// import { createClient } from 'contentful'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
	_Transition_Blob_Bottom,
	_Transition_Page,
	_Transition_Card,
} from '../../components/_Animations';
import Alumnus_Card_New from '../../components/listing/AlumniCard';

import { CgDanger } from 'react-icons/cg';
import { useUserData } from '../../components/Context_UserData';
import _ApolloClient from '../../apolloClient';
import { gql } from '@apollo/client';

export const getServerSideProps = async (e) => {
	const { data } = await _ApolloClient.query({
		query: gql`
			{
				alumniLists {
					id
					surname
					givenName
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
					merchCart {
						merchName
						merchImage {
							url
						}
						merchPrice
					}
				}
			}
		`,
	});

	return {
		props: {
			alumniListData: data.alumniLists,
		},
	};
};

const Listing = ({ alumniListData }) => {
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('surname');
	const [sort, setSort] = useState('ASC');
	const [filteredAlumniList, setFilteredAlumniList] = useState(alumniListData);
	const { userData, setUserData, hasUserData, auth_user } = useUserData();

	const handleSort = (e) => {
		let temp = filteredAlumniList.sort((a, b) => {
			if (sort === 'DSC') {
				return a[filter] > b[filter] ? 1 : -1;
			} else {
				return a[filter] < b[filter] ? 1 : -1;
			}
		});
		setFilteredAlumniList(temp);
	};

	const handleSearch = (e) => {
		if (search) {
			const temp = filteredAlumniList.filter((alumni) => {
				return (
					alumni.givenName.toLowerCase().includes(search.toLowerCase()) ||
					alumni.surname.toLowerCase().includes(search.toLowerCase())
				);
			});
			setFilteredAlumniList(temp);
		} else {
			setFilteredAlumniList(alumniListData);
		}
	};

	useEffect(() => {
		handleSearch();
	}, [search]);

	useEffect(() => {
		handleSearch();
	}, [filter]);

	useEffect(() => {
		handleSort();
	}, [sort]);

	useEffect(() => {
		handleSort();
	}, []);

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
					<section className="mb-36 flex min-h-screen flex-col pt-28">
						<h1 className="text-center text-4xl font-bold">Alumnus List</h1>

						{/* search and filter bar */}
						<div className="my-5 mb-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 ">
							<div className="col-span-2 flex items-center">
								<input
									onChange={(e) => setSearch(e.target.value)}
									type="text"
									placeholder="Search for someone"
									className="input input-bordered w-full"
								/>
							</div>
							<div className="col-span-1 flex items-center justify-evenly">
								<div className="dropdown">
									<label tabIndex={0} className="btn btn-accent btn-outline">
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
							<div className="col-span-1 flex items-center justify-evenly">
								<div className="dropdown">
									<label tabIndex={0} className="btn btn-accent btn-outline">
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

						{/* loop filteredAlumniList and display card on each *IF* the user is existing  */}
						<motion.div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
							{auth_user &&
								filteredAlumniList.map((alumnus, index) => {
									return <Alumnus_Card_New key={index} data={alumnus} />;
								})}
						</motion.div>
					</section>
				)}
			</motion.section>
		</>
	);
};

export default Listing;
