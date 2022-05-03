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

export const getInitialProps = async (e) => {
	const res = await fetch('/api/events');
	const data = await res.json();

	return {
		props: {
			events: data.news_And_Events,
		},
	};
};

const NewsAndEvents = ({}) => {
	const [loaded, setLoaded] = useState(false);
	const [events, setEvents] = useState([]);

	const fetchData = async (e) => {
		const res = await fetch('/api/events');
		const { data } = await res.json();

		if (data) {
			setEvents(data.news_And_Events);
			setLoaded(true);
		}
	};

	useEffect((e) => {
		fetchData();
	}, []);

	useCallback(
		(e) => {
			setLoaded(events ? true : false);
		},
		[events]
	);

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
			<GradientBackground colorLeft={'#0D9488'} colorRight={'#60A5FA'} />

			<motion.div
				variants={_Transition_Page}
				initial="initial"
				animate="animate"
				exit="exit"
				className="relative z-10 flex min-h-screen flex-col ">
				{/* landing section */}
				<section className="relative my-32 flex flex-col items-center justify-center">
					<h1 className="mt-16 text-center text-4xl font-bold text-base-content lg:mt-24 lg:text-5xl">
						News and Events
					</h1>
					<p className="mt-5 text-center text-xl">
						See what is happening in the University of Caloocan City.
					</p>

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
				<section className="flex min-h-screen flex-col py-32">
					<h1 className="text-center text-4xl font-bold">Events List</h1>

					{/* loading state if prop is still loading */}
					<AnimatePresence>
						<div className="mt-10 flex flex-col items-center justify-center gap-5">
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
								events.map((event) => <EventCard {...event} key={event.id} />)}
						</div>
					</AnimatePresence>
				</section>
			</motion.div>
		</>
	);
};

export default NewsAndEvents;
