import Head from 'next/head';
// import { createClient } from 'contentful'
import { useEffect, useState } from 'react';
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

export const getStaticProps = async (e) => {
	const { data } = await _ApolloClient.query({
		query: gql`
			{
				news_And_Events {
					eventTitle
					eventSlug
					eventTags
					eventContent {
						markdown
					}
					eventAuthors {
						name
					}
					id
					publishedAt
					publishedBy {
						id
					}
				}
			}
		`,
	});
	return {
		props: {
			events: data.news_And_Events,
		},
	};
};

const NewsAndEvents = ({ events }) => {
	const [loaded, setLoaded] = useState(true);
	return (
		<>
			<Head>
				<title>News and Events - UCC Project Alumnus</title>
				<meta
					name="description"
					content="University of Caloocan City - Alumni Management System"
				/>
			</Head>

			{/* animated background */}
			<motion.div
				variants={_Transition_Blob_Top}
				initial="initial"
				animate="animate"
				exit="exit"
				className="absolute top-0 left-0 z-0 h-full w-full bg-gradient-to-tl from-teal-600 via-blue-700 to-purple-600"
			/>

			<motion.div
				variants={_Transition_Page}
				initial="initial"
				animate="animate"
				exit="exit"
				className="relative z-10 flex min-h-screen flex-col ">
				{/* landing section */}
				<section className="relative flex min-h-screen flex-col items-center justify-center">
					<h1 className="text-center text-5xl font-bold text-base-content ">
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
						className="absolute bottom-10 select-none text-base-content text-opacity-50">
						Scroll down to see the events
					</motion.p>
				</section>

				{/* Events section */}
				<section className="flex min-h-screen flex-col py-32">
					<h1 className="text-center text-4xl font-bold">Events</h1>

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
