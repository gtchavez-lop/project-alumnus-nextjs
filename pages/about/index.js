import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../components/Logo';
import { motion } from 'framer-motion';
import { CgArrowLeft, CgArrowRight } from 'react-icons/cg';
import {
	_Transition_Card,
	_Transition_Page,
} from '../../components/_Animations';

const About = (e) => {
	return (
		<>
			{/* hero image */}
			<motion.div
				variants={_Transition_Card}
				initial="initial"
				animate="animate"
				className="absolute top-0 left-0 z-[-2] h-full w-full">
				<div className="relative left-0 h-full w-full opacity-50 lg:w-3/4">
					<Image
						layout="fill"
						objectFit="cover"
						objectPosition={'50% 50%'}
						src={
							'https://images.unsplash.com/photo-1602306834394-6c8b7ea0ed9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
						}
					/>
					{/* filter */}
					<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-tr from-transparent to-base-100 lg:bg-gradient-to-r " />
				</div>
			</motion.div>
			<motion.main
				variants={_Transition_Page}
				initial="initial"
				animate="animate"
				exit="exit">
				<div className="min-h-screen">
					{/* greeting */}
					<section className="flex h-screen w-full items-center justify-end">
						<p className="relative max-w-lg text-right text-3xl lg:text-4xl">
							We are students of{' '}
							<span className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-black text-transparent">
								Computer Science
							</span>
							, from{' '}
							<span className="bg-gradient-to-bl from-sky-400 to-sky-200 bg-clip-text font-black text-transparent">
								University of Caloocan City
							</span>
							. Pursuing modern web development through{' '}
							<span className="bg-gradient-to-tr from-violet-500 to-orange-300 bg-clip-text font-black text-transparent">
								simplicity and efficiency
							</span>
							.
						</p>
					</section>
				</div>
				<div className="py-16 pb-64">
					{/* meet the team */}
					<section className="flex w-full flex-col items-center justify-center">
						<p className="relative max-w-lg text-center text-3xl lg:text-4xl">
							Meet the team
						</p>
						<div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
							{/* lead dev card */}
							<div className="card col-span-full bg-base-100 shadow transition-all hover:shadow-lg">
								<figure className="px-10 pt-10">
									<img
										src="/profile/gerald.jpg"
										alt="Gerald Chavez"
										className="h-32 w-32 rounded-xl "
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">Gerald Chavez</h2>
									<p className="text-secondary">
										Lead Project Developer and Creative Director
									</p>
								</div>
							</div>
							{/* members card */}
							<div className="card bg-base-100 shadow transition-all hover:shadow-lg ">
								<figure className="px-10 pt-10">
									<img
										src="/profile/charles.jpg"
										alt="Charles"
										className="h-32 w-32 rounded-xl object-cover"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">Charles Daniel Turiaga</h2>
									<p className="text-secondary">Development and Revision</p>
								</div>
							</div>
							<div className="card bg-base-100 shadow transition-all hover:shadow-lg ">
								<figure className="px-10 pt-10">
									<img
										src="https://api.lorem.space/image/face?w=175&h=175"
										alt="Khyle"
										className="h-32 w-32 rounded-xl object-cover"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">Khyle Andrei Remolona</h2>
									<p className="text-secondary">Development and Documentation</p>
								</div>
							</div>
							<div className="card bg-base-100 shadow transition-all hover:shadow-lg ">
								<figure className="px-10 pt-10">
									<img
										src="/profile/carlo.jpg"
										alt="Carlo"
										className="h-32 w-32 rounded-xl object-cover"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">Carlo Diaz</h2>
									<p className="text-secondary">Content Management</p>
								</div>
							</div>
							<div className="card bg-base-100 shadow transition-all hover:shadow-lg ">
								<figure className="px-10 pt-10">
									<img
										src="/profile/miks.png"
										alt="Mikkie"
										className="h-32 w-32 rounded-xl object-cover"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">Mikkie Gregorio</h2>
									<p className="text-secondary">Content Management</p>
								</div>
							</div>
							<div className="card bg-base-100 shadow transition-all hover:shadow-lg ">
								<figure className="px-10 pt-10">
									<img
										src="/profile/ken.jpg"
										alt="Shoes"
										className="h-32 w-32 rounded-xl object-cover"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">Ken Castillo</h2>
									<p className="text-secondary">Quality Assurance and Documentation</p>
								</div>
							</div>
							<div className="card bg-base-100 shadow transition-all hover:shadow-lg ">
								<figure className="px-10 pt-10">
									<img
										src="/profile/pamintuan.jpg"
										alt="WiseMan"
										className="h-32 w-32 rounded-xl object-cover"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">John Josuah Pamintuan</h2>
									<p className="text-secondary">Quality Assurance</p>
								</div>
							</div>
							<div className="card bg-base-100 shadow transition-all hover:shadow-lg ">
								<figure className="px-10 pt-10">
									<img
										src="/profile/ibarra.jpg"
										alt="Ibarra"
										className="h-32 w-32 rounded-xl object-cover"
									/>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title">Jade Ivan Ibarra</h2>
									<p className="text-secondary">Quality Assurance</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</motion.main>
		</>
	);
};

export default About;
