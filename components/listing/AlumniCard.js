import { AnimatePresence, motion } from 'framer-motion';
import { _Transition_Card } from '../_Animations';
import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';

const ContextMenu = ({ alumniData }) => {
  return (
    <>
      <div className="absolute w-full h-full top-0 left-0 bg-base-300">
        <p>aklsjhkajsdh</p>
      </div>
    </>
  );
};

const AlumniCard = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);
  const {
    id,
    studentID,
    surname,
    givenName,
    programCompleted,
    graduationDate,
  } = data;
  return (
    <motion.div className="relative">
      <motion.div
        variants={_Transition_Card}
        initial="initial"
        animate="animate"
        key={id}
        layout
        onClick={() => setShowDetails(!showDetails)}
        className="card cursor-pointer hover:bg-base-300"
      >
        <motion.div layout className="card-body lg:p-5 p-3">
          <motion.div layout className="flex gap-4 items-center">
            {/* image */}
            <div className="avatar ml-10 lg:ml-0 w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden">
              <img
                src={`https://avatars.dicebear.com/api/adventurer-neutral/${studentID}.svg`}
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="card-title">
                {surname} {givenName}
              </p>
              <p className="">{programCompleted}</p>
            </div>
          </motion.div>
          <AnimatePresence>
            {showDetails && (
              <motion.div className="flex flex-col items-center my-5">
                <div className="grid grid-cols-2 max-w-md gap-2 mb-6">
                  <p className="text-right">Program Graduated</p>
                  <p className="text-secondary font-semibold">
                    {programCompleted}
                  </p>
                  <p className="text-right">Graduation Year</p>
                  <p className="text-secondary font-semibold">
                    {dayjs(graduationDate).format('YYYY')}
                  </p>
                </div>
                <Link href={`/listing/${studentID}`}>
                  <motion.div className="btn btn-block btn-secondary max-w-md">
                    Show Profile
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AlumniCard;