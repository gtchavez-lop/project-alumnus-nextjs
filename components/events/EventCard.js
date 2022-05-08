import { AnimatePresence, motion } from 'framer-motion';
import dayjs from 'dayjs';
import { _Transition_Card } from '../_Animations';
import Link from 'next/link';
import { useState } from 'react';
import { CgReadme, CgSpinner } from 'react-icons/cg';

const EventCard = ({ title, slug, _createdAt, _id }) => {
	const [loading, setLoading] = useState(false);

	return (
		<Link
			href={{
				pathname: `/events/${slug}`,
			}}
			scroll={false}>
			<motion.div
				onClick={() => setLoading(true)}
				variants={_Transition_Card}
				initial="initial"
				animate="animate"
				exit="exit"
				id={`eventCard_${_id}`}
				className="card cursor-pointer bg-base-200 shadow transition-colors hover:bg-base-300 hover:text-neutral-content">
				<div className="card-body p-5">
					<h2 className="card-title">{title}</h2>
					<p className="text-sm">
						<span className="text-slate-500">Created At: </span>
						{dayjs(_createdAt).format('MM/DD/YYYY - h:mma')}
					</p>
					{/* <p className="text-sm">
                    <span className="text-slate-500">Created By: </span>
                    {eventAuthors.name}
                </p> */}
					<div className="card-actions mt-10 flex select-none items-center justify-end">
						{!loading ? (
							<>
								<p className="hidden text-right lg:block">Click to view this event</p>
								<p className="text-right lg:hidden">Tap to view this event</p>
							</>
						) : (
							<>
								<p>Content Pre-loading</p>
								<motion.div
									animate={{ rotate: ['0deg', '360deg'] }}
									transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}>
									<CgSpinner size={35} />
								</motion.div>
							</>
						)}
					</div>
				</div>
			</motion.div>
		</Link>
	);
};

export default EventCard;
