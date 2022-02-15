import { motion, AnimatePresence } from "framer-motion"
import Alumnus_Card from "../../components/listing/Alumnus_Card"
import { useEffect, useState } from "react"
import _SupabaseClient from "../../components/_SupabaseClient"
import { _Transition_Blob_Bottom, _Transition_Blob_Top, _Transition_Page } from "../../components/_Animations"
import { CgSpinner } from "react-icons/cg"
import Head from "next/head"
import _sanityClient from "../../components/_sanityClient"

export const getServerSideProps = async () => {
    const alumniList = await _sanityClient.fetch('*[_type == "alumnus" ]')
    return {
        props: {
            listing: alumniList
        }
    }
}

const Listing = ({ listing }) => {

    return (
        <>

            <Head>
                <title>Alumni List - UCC Project Alumnus</title>
                <meta name="description" content="University of Caloocan City - Alumni Management System" />
            </Head>

            {/* desgn | blob */}
            <motion.div
                variants={_Transition_Blob_Bottom}
                initial="initial" animate="animate" exit="exit"
                className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600"
            />
            {/* event pag */}
            <motion.div
                variants={_Transition_Page}
                initial="initial" animate="animate" exit="exit"
                className="relative min-h-screen flex flex-col px-5 lg:px-20 z-10 "
            >

                {/* initial page */}
                <section className="relative min-h-screen flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold text-center text-base-content ">
                        Alumni Members List
                    </h1>
                    {/* description */}
                    <p className="text-center text-xl mt-12">
                        See people who became part of the University of Caloocan City.
                    </p>

                    {/* scrolldown */}
                    <p className="absolute bottom-10 select-none text-base-content text-opacity-50">Scroll Down to see more</p>
                </section>

                {/* events content */}
                <section className="min-h-screen flex flex-col pt-28 mb-36">
                    <h1 className="text-4xl font-bold text-center">Alumnus List</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
                        <div className="form-control my-10">
                            <label className="label">
                                <span className="label-text">Search an Alumnus</span>
                            </label>
                            <div className="flex space-x-2">
                                <input type="text" placeholder="Find someone here..." className="w-full input input-base-100 input-bordered" />
                                <button className="btn btn-primary">Find</button>
                            </div>
                        </div>

                    </div>


                    <AnimatePresence>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {listing && listing.map((alumnus) => (
                                <Alumnus_Card {...alumnus} key={alumnus.student_id} />
                            ))}
                        </div>
                    </AnimatePresence>
                    {/* <AnimatePresence>
                        <div className="mt-10 flex flex-col gap-5 justify-center items-center">
                            {!loaded && (
                                <>
                                    <motion.div
                                        animate={{ rotate: ["0deg", '360deg'] }}
                                        transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
                                    >
                                        <CgSpinner size={100} />
                                    </motion.div>
                                    <p>Fetching Data</p>
                                </>
                            )}
                        </div>
                    </AnimatePresence> */}
                </section>

            </motion.div>
        </>
    )
}

export default Listing