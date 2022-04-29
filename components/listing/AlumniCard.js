// recyclable card for alumnus

import Image from 'next/image';
import Link from 'next/link';
import {
	motion as m,
	AnimateSharedLayout,
	AnimatePresence,
} from 'framer-motion';
import { useState } from 'react';

import { CgUser, CgCloseO } from 'react-icons/cg';
import { _Transition_Card } from '../../components/_Animations';
import dayjs from 'dayjs';

const Alumnus_Card_Information = ({ data, closeModal }) => {
	const {
		surname,
		givenName,
		programCompleted,
		graduationDate,
		id,
		alumniDisplayPhoto,
		slug,
		currentLocation,
		currentEmail,
	} = data;
	return (
		<>
			<m.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ ease: 'easeOut', duration: 0.2 }}
				onClick={(e) => {
					if (e.target == e.currentTarget) {
						closeModal();
					}
				}}
				className="fixed top-0 left-0 z-[99] flex h-full w-full items-center justify-center bg-base-200 bg-opacity-[0.90]">
				<m.div
					initial={{ translateY: 20 }}
					animate={{ translateY: 0 }}
					exit={{ translateY: 20 }}
					transition={{ ease: 'easeOut', duration: 0.2 }}
					className="card absolute bottom-0 w-full bg-base-300 shadow">
					<div className="card-body w-full gap-5 self-center p-5 md:w-3/4 lg:w-1/2 lg:gap-2 ">
						{/* close button */}
						<div className="absolute right-5 top-5 z-20 flex justify-end">
							<div
								onClick={() => closeModal()}
								className="btn-outline-secondary btn btn-ghost btn-circle">
								<CgCloseO size={25} />
							</div>
						</div>

						{/* display photo */}
						{alumniDisplayPhoto ? (
							<m.div className="avatar justify-center">
								<div
									className="mask mask-squircle relative w-32 bg-base-100"
									data-theme="night">
									<Image layout="fill" src={alumniDisplayPhoto.url} />
									{/* <img src={alumniDisplayPhoto.url} /> */}
								</div>
							</m.div>
						) : (
							<m.div className="avatar justify-center">
								<div className="mask mask-squircle relative w-32 bg-base-100">
									<Image
										layout="fill"
										src={`https://avatars.dicebear.com/api/identicon/${surname}.svg`}
									/>
									{/* <CgUser className="h-32 w-32" /> */}
								</div>
							</m.div>
						)}

						{/* basic infor */}
						<div className="flex w-full flex-col text-center text-2xl">
							<m.span>
								{surname}, {givenName}
							</m.span>
							<m.span className="text-sm">{programCompleted}</m.span>
						</div>

						<m.p className="mt-10 flex w-full max-w-lg flex-col justify-between self-center text-center md:flex-row md:text-left ">
							Graduated at{' '}
							<span className="font-bold text-secondary">
								{dayjs(graduationDate).format('MMMM DD, YYYY')}
							</span>
						</m.p>
						<m.p className="flex w-full max-w-lg flex-col justify-between self-center text-center md:flex-row md:text-left  ">
							Currently located at{' '}
							<span className="font-bold text-secondary">{currentLocation}</span>
						</m.p>
						<m.p className="flex w-full max-w-lg flex-col justify-between self-center text-center md:flex-row md:text-left  ">
							Current Email Address{' '}
							<span className="font-bold text-secondary">{currentEmail}</span>
						</m.p>

						<div className="my-10 grid grid-cols-2 gap-5">
							<div onClick={closeModal} className="btn btn-outline btn-primary">
								Close
							</div>

							<Link href={`/listing/${slug}&${id}`} passHref scroll>
								<div onClick={closeModal} className="btn btn-primary">
									Go to Profile
								</div>
							</Link>
						</div>
					</div>
				</m.div>
			</m.div>
		</>
	);
};

const AlumnusCard = ({ index, data }) => {
	const {
		surname,
		givenName,
		programCompleted,
		graduationDate,
		id,
		alumniDisplayPhoto,
		slug,
	} = data;
	const [isClicked, setIsClicked] = useState(false);

	return (
		<>
			<AnimatePresence>
				{isClicked && (
					<Alumnus_Card_Information
						data={data}
						closeModal={() => setIsClicked(false)}
					/>
				)}
			</AnimatePresence>

			{data && (
				<>
					<m.div
						variants={_Transition_Card}
						initial="initial"
						animate="animate"
						transition={{ ease: 'easeOut', duration: 0.2 }}
						onClick={() => setIsClicked(true)}
						className="transition-color card relative select-none bg-base-200 shadow hover:bg-base-300">
						<m.label
							transition={{ layout: { duration: 0.2, ease: 'easeOut' } }}
							htmlFor={`modal_${id}`}
							className="modal-button cursor-pointer">
							<m.div
								className="card-body p-5"
								transition={{ layout: { duration: 0.2, ease: 'easeOut' } }}>
								<div className="card-title">
									{alumniDisplayPhoto ? (
										<m.div
											transition={{
												layout: { duration: 0.2, ease: 'easeOut' },
											}}
											className=" avatar">
											<div
												className="mask mask-squircle relative w-10 bg-base-100"
												data-theme="night">
												<Image layout="fill" src={alumniDisplayPhoto.url} />
												{/* <img src={alumniDisplayPhoto.url} /> */}
											</div>
										</m.div>
									) : (
										<m.div
											transition={{
												layout: { duration: 0.2, ease: 'easeOut' },
											}}
											className=" avatar">
											<div className="mask mask-squircle relative w-10 bg-base-100">
												<Image
													layout="fill"
													src={`https://avatars.dicebear.com/api/identicon/${surname}.svg`}
												/>
												{/* <CgUser className="h-10 w-10" /> */}
											</div>
										</m.div>
									)}
									<div className="flex flex-col">
										<m.span
											transition={{
												layout: { duration: 0.2, ease: 'easeOut' },
											}}>
											{surname}, {givenName}
										</m.span>
										<m.span
											transition={{
												layout: { duration: 0.2, ease: 'easeOut' },
											}}
											className="text-sm">
											{programCompleted}
										</m.span>
									</div>
								</div>
								<div className="card-actions mt-3 justify-end">
									<p className="flex justify-end text-right text-base-content text-opacity-30">
										<span className="lg:hidden">Tap</span>
										<span className="hidden lg:block">Click</span>
										<span>&nbsp;to see more</span>
									</p>
								</div>
							</m.div>
						</m.label>
					</m.div>
				</>
			)}
		</>
	);
};

export default AlumnusCard;
