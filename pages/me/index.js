import Image from 'next/image';
import { motion } from 'framer-motion';

import { CgPin, CgMail, CgGhostCharacter } from 'react-icons/cg';
import { FaGraduationCap } from 'react-icons/fa';
import {
	_Transition_Card,
	_Transition_Page,
} from '../../components/_Animations';
import { useUserData } from '../../components/Context_UserData';

const MyProfile = ({ alumniList }) => {
	const { userData, auth_user, hasUserData } = useUserData();

	return (
		<>
			{auth_user && hasUserData ? (
				<>
					{/* background image */}
					<motion.div
						variants={_Transition_Page}
						initial="initial"
						animate="animate"
						exit="exit"
						className="absolute top-0 left-0 h-3/4 w-full overflow-hidden rounded-b-lg bg-base-300 opacity-40">
						<img
							src="https://picsum.photos/800/600"
							className="h-full w-full object-cover opacity-20"
						/>
					</motion.div>

					{/* content */}
					<motion.div
						variants={_Transition_Card}
						initial="initial"
						animate="animate"
						exit="exit"
						className="relative mt-64 flex h-screen w-full flex-col items-center text-center">
						<div className="w-full rounded-xl bg-base-300 pb-16">
							{/* avatar */}
							<div className="avatar -mt-24 lg:-mt-28 ">
								<div className="relative w-48 overflow-hidden rounded-full ring ring-secondary ring-offset-4 ring-offset-transparent lg:w-52">
									<Image src={userData.alumniDisplayPhoto.url} layout="fill" />
								</div>
							</div>

							{/* profile detail */}
							<div className="mt-16">
								<p className="text-4xl font-bold lg:text-5xl">
									{userData.surname}, {userData.givenName}
								</p>
								<p className="mt-5 flex items-center justify-center gap-3 text-xl">
									<span>
										<CgPin size={25} />
									</span>
									<span>{userData.currentLocation}, Philippines</span>
								</p>
								<p className="mt-10 flex items-center justify-center gap-3 text-lg">
									<span>
										<FaGraduationCap size={25} />
									</span>
									<span>{userData.programCompleted}</span>
								</p>
								<p className="mt-2 flex items-center justify-center gap-3 text-lg">
									<span>
										<CgMail size={25} />
									</span>
									<span>{userData.currentEmail}</span>
								</p>
							</div>
						</div>
					</motion.div>
				</>
			) : (
				<>
					<motion.div
						variants={_Transition_Page}
						initial="initial"
						animate="animate"
						exit="exit"
						className="relative flex h-screen w-full flex-col items-center justify-center">
						<CgGhostCharacter size={60} />
						<p className="mt-5 text-center text-4xl">Please sign in</p>
						<p className="text-center">
							You will see your profile here once you signed in
						</p>
					</motion.div>
				</>
			)}
		</>
	);
};

export default MyProfile;
