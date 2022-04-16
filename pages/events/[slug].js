import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { _Transition_Page } from '../../components/_Animations';
import { CgArrowLeft } from 'react-icons/cg';
import _ApolloClient from '../../apolloClient';
import { gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';
import markdownComponents from '../../components/events/_MarkdownComponents';

export const getServerSideProps = async (e) => {
	const { slug } = e.query;

	const { data } = await _ApolloClient.query({
		query: gql`
			{
				newsAndEvents(where: { eventSlug: "${slug}" }) {
					createdAt
					createdBy {
						id
					}
					eventContent {
						html
						markdown
					}
					eventAuthors {
						name
					}
					eventTags
					displayImage {
						url
					}
					eventTitle
				}
			}
		`,
	});

	return {
		props: {
			event: data.newsAndEvents,
			slug: slug,
		},
	};
};

const SingleEvent = ({ slug, event }) => {
	const { eventContent, eventTags, eventTitle, eventAuthors } = event;

	return (
		<>
			{event && (
				<motion.div
					variants={_Transition_Page}
					initial="initial"
					animate="animate"
					exit="exit"
					className="min-h-screen">
					{/* get event title */}
					<div className="flex items-center py-5 pt-32 text-3xl font-bold lg:text-5xl ">
						<Link
							href={{
								pathname: '/events',
							}}>
							<motion.div
								className="flex cursor-pointer items-center gap-5"
								whileHover={{ translateX: -10 }}>
								<CgArrowLeft size={40} />
								<span>{eventTitle}</span>
							</motion.div>
						</Link>
					</div>

					{/* content */}
					<div className="pb-20 pt-5">
						{/* get author's name */}
						<p className="my-2 flex text-gray-400 ">Posted by</p>
						<p className="my-2 mb-5 flex items-center text-gray-400">
							<span className="ml-2  font-bold text-base-content">
								{eventAuthors.name}
							</span>
						</p>

						{/* get event tags */}
						<div className="mb-10 flex select-none flex-wrap gap-2">
							{eventTags.map((tag, index) => (
								<div key={index} className="badge badge-primary capitalize">
									{tag}
								</div>
							))}
						</div>

						<div className="divider" />

						{/* render event content as a markdown to html */}
						<div className="mb-32">
							<ReactMarkdown components={markdownComponents}>
								{eventContent.markdown}
							</ReactMarkdown>
						</div>
					</div>
				</motion.div>
			)}
		</>
	);
};

export default SingleEvent;
