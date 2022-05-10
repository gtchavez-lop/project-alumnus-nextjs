import Head from 'next/head';
// import { createClient } from 'contentful'
import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gql } from '@apollo/client';
import { CgSpinner } from 'react-icons/cg';
import {
	_Transition_Blob_Bottom,
	_Transition_Blob_Top,
	_Transition_Card,
	_Transition_Page,
} from '../../components/_Animations';
import EventCard from '../../components/events/EventCard';
import _ApolloClient from '../../apolloClient';
import GradientBackground from '../../components/GradientBackground';
import { getEvent } from '../api/events';

const NewsAndEvents = ({}) => {
	const [loaded, setLoaded] = useState(false);
	const [thisEvents, setThisEvents] = useState([]);

	const fetchData = async (e) => {
		const res = await fetch('/api/events');
		const { data } = await res.json();
		console.log(data);
		if (data) {
			setThisEvents(data);
			setLoaded(true);
		}
	};

	useEffect((e) => {
		fetchData();
	}, []);

	return (
		<>
			<Head>
				<title>News and Events - UCC Project Alumnus</title>
				<meta
					name="description"
					content="University of Caloocan City - Alumni Management System"
				/>
			</Head>

			{/* animated gradent bg */}
			<GradientBackground colorLeft={'#DC2626'} colorRight={'#60A5FA'} />

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
				className="absolute top-[120vh] right-[0px] h-[200px] w-[1000px]"
			/>

			<motion.div
				variants={_Transition_Page}
				initial="initial"
				animate="animate"
				exit="exit"
				className="relative z-10 my-32 mt-64 flex min-h-screen flex-col">
				{/* landing section */}
				<section className="relative flex flex-col ">
					<h1 className="text-5xl font-bold text-base-content ">News and Events</h1>
					<p className="mt-5 text-xl">
						See what is happening in the University of Caloocan City.
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

					<motion.p
						variants={_Transition_Card}
						initial="initial"
						animate="animate"
						exit="exit"
						className="bottom-10 mt-5 flex select-none gap-1 text-base-content text-opacity-50">
						<span className="hidden lg:block">Scroll down</span>
						<span className="lg:hidden">Swipe up</span> to see the list
					</motion.p>
				</section>

				{/* Events section */}
				<section className="mt-16 flex min-h-screen flex-col pt-32">
					<h1 className="text-center text-4xl font-bold">Events List</h1>

					{/* loading state if prop is still loading */}
					<AnimatePresence>
						<div className="flex flex-col items-center justify-center gap-5">
							{!loaded && (
								<>
									<motion.div
										animate={{ rotate: ['0deg', '360deg'] }}
										transition={{
											repeat: Infinity,
											duration: 0.75,
											ease: 'linear',
										}}>
										<CgSpinner size={100} />
									</motion.div>
									<p>Fetching Data</p>
								</>
							)}
						</div>
					</AnimatePresence>

					{/* loop events from Table_Events prop */}
					<AnimatePresence>
						<div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
							{loaded &&
								thisEvents.map((event) => <EventCard {...event} key={event._id} />)}
						</div>
					</AnimatePresence>
				</section>
			</motion.div>
		</>
	);
};

export default NewsAndEvents;
