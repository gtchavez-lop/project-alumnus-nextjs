import Link from 'next/link';
import { motion } from 'framer-motion';
import { _Transition_Page } from '../../components/_Animations';
import { CgArrowLeft } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { portableTextRender } from '../../components/events/_MarkdownComponents';
import BlockContent from '@sanity/block-content-to-react';

const SingleEvent = ({}) => {
	const router = useRouter();
	const [thisEvent, setThisEvent] = useState({});
	const [loaded, setLoaded] = useState(false);
	const { slug } = router.query;

	const fetchData = async (e) => {
		const res = await fetch('/api/events');
		const { data } = await res.json();

		if (data) {
			let temp = data.filter((event) => {
				return event.slug === slug;
			});
			console.log(temp);
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
								<span>{thisEvent.title}</span>
							</motion.div>
						</Link>
					</div>

					{/* content */}
					<div className="pb-20 pt-5">
						{/* get author's name */}
						<p className="my-2 flex text-gray-400 ">Posted by</p>
						<p className="my-2 mb-5 flex items-center text-gray-400">
							<span className="ml-2  font-bold text-base-content">
								{thisEvent.authorName ? thisEvent.authorName : 'Admin'}
							</span>
						</p>

						{/* get event tags */}
						<div className="mb-10 flex select-none flex-wrap gap-2">
							{thisEvent.tags.map((tag, index) => (
								<div key={index} className="badge badge-primary capitalize">
									{tag}
								</div>
							))}
						</div>

						<div className="divider" />

						{/* render event content as a markdown to html */}
						<div className="mb-32">
							<BlockContent
								blocks={thisEvent.content}
								serializers={portableTextRender}
							/>
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
