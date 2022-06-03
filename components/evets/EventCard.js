import { motion } from 'framer-motion';
import { _Transition_Card } from '../_Animations';
import Link from 'next/link';
import { useState } from 'react';
import dayjs from 'dayjs';

const EventCard = (props) => {
  const { event } = props;
  const [loading, setLoading] = useState(false);
  return (
    <motion.div
      variants={_Transition_Card}
      initial="initial"
      animate="animate"
      exit="exit"
      key={event._id}
    >
      {!loading ? (
        <Link href={`/events/${event.slug}`}>
          <div
            onClick={(e) => setLoading(true)}
            className="card bg-base-300 cursor-pointer"
          >
            <div className="card-body">
              <p className="card-title">{event.title}</p>
              <p>
                Posted on {dayjs(event.created_at).format('MMM D YYYY, hh:MMa')}
              </p>
            </div>
          </div>
        </Link>
      ) : (
        <div className="card bg-base-300 cursor-pointer">
          <div className="card-body">
            <p className="card-title">{event.title}</p>
            <p>
              Posted on {dayjs(event.created_at).format('MMM D YYYY, hh:MMa')}
            </p>
            <p className="mt-10 opacity-50">Content Loading...</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EventCard;
