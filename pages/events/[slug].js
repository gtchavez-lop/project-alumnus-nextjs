import Link from 'next/link';
import { motion } from 'framer-motion';
import { _Transition_Page } from '../../components/_Animations';
import { CgArrowLeft } from 'react-icons/cg';
import _ApolloClient from '../../apolloClient';
import { gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import markdownComponents from '../../components/events/_MarkdownComponents';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const SingleEvent = ({ slug, event }) => {
	const router = useRouter();
	const [thisEvent, setThisEvent] = useState({});
	const [loaded, setLoaded] = useState(false);

	const fetchData = async (e) => {
		const { slug } = router.query;
		const res = await fetch('/api/events');
		const { data } = await res.json();
		const { news_And_Events } = data;

		if (news_And_Events) {
			let temp = news_And_Events.filter((event) => {
				return event.eventSlug === slug;
			});
			setLoaded(temp[0] ? true : false);
			setThisEvent(temp[0]);
		}
	};
	// scroll to top on page load
	useEffect((e) => {
		window.scrollTo(0, 0);
		fetchData();
	}, []);

	return (
		<>
			{loaded ? (
				<motion.div
					variants={_Transition_Page}
					initial="initial"
					animate="animate"
					exit="exit"
					className="min-h-screen">
					{/* get event title */}
					<div className="flex items-center py-5 pt-40 text-3xl font-bold lg:text-5xl ">
						<Link
							href={{
								pathname: '/events',
							}}>
							<motion.div
								className="flex cursor-pointer items-center gap-5"
								whileHover={{ translateX: -10 }}>
								<CgArrowLeft size={40} />
								<span>{thisEvent.eventTitle}</span>
							</motion.div>
						</Link>
					</div>

					{/* content */}
					<div className="pb-20 pt-5">
						{/* get author's name */}
						<p className="my-2 flex text-gray-400 ">Posted by</p>
						<p className="my-2 mb-5 flex items-center text-gray-400">
							<span className="ml-2  font-bold text-base-content">
								{thisEvent.eventAuthors ? thisEvent.eventAuthors.name : 'Admin'}
							</span>
						</p>

						{/* get event tags */}
						<div className="mb-10 flex select-none flex-wrap gap-2">
							{thisEvent.eventTags.map((tag, index) => (
								<div key={index} className="badge badge-primary capitalize">
									{tag}
								</div>
							))}
						</div>

						<div className="divider" />

						{/* render event content as a markdown to html */}
						<div className="mb-32">
							<ReactMarkdown components={markdownComponents}>
								{thisEvent.eventContent.markdown}
							</ReactMarkdown>
						</div>
					</div>
				</motion.div>
			) : (
				<div className="flex min-h-screen flex-col items-center justify-center">
					<p>Something went wrong here.</p>
					<p>Please go back or go home</p>
				</div>
			)}
		</>
	);
};

export default SingleEvent;
