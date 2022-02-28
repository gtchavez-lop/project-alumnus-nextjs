import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion"
import dayjs from "dayjs"
import { _Transition_BottomMenu, _Transition_Card, _Transition_Page } from "../_Animations"
import { CgClose, CgReadme, CgUser, CgUserList } from "react-icons/cg"
import { useState } from "react"
import Image from "next/image"

const ProfilePopUp = ({ alumni, closeHandler }) => {
    return (
        <motion.div
            variants={_Transition_BottomMenu} initial="initial" animate="animate" exit="exit"
            className="fixed top-0 left-0 w-screen h-screen z-40 bg-base-100 bg-opacity-80 shadow-lg rounded-lg overflow-hidden"
        >
            <motion.div
                // variants={_Transition_BottomMenu} initial="initial" animate="animate" exit="exit"
                layoutId={`${alumni.id}_layout`}
                className="absolute w-full h-5/6 bg-base-200 bottom-0 left-0 p-5 lg:px-20 lg:py-5 overflow-y-auto">
                <div className="flex items-center justify-end w-full left-0 px-5 lg:px-20 absolute">
                    {/* close button */}
                    <div
                        onClick={closeHandler}
                        className="btn btn-secondary btn-square">
                        <CgClose className="h-6 w-6 text-white" />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row mb-16 justify-center">
                    {/* alumni photo */}
                    <div className="w-full lg:w-1/2 h-40 lg:h-auto mt-10 lg:mt-0 flex flex-col gap-10 justify-center items-center">
                        {alumni.alumniDisplayPhoto ? (
                            <div className="w-40 h-40 mask mask-squircle lg:mask-square ">
                                <img className="lg:rounded" src={alumni.alumniDisplayPhoto.url} />
                            </div>
                        ) : (
                            <div className="flex flex-col text-center items-center gap-5">
                                <CgUser className="h-16 w-16 text-white" />
                                <p>Image Unavailable</p>
                            </div>
                        )}
                        <div className="text-center lg:text-left">
                            <motion.h1 className="text-2xl font-bold">{alumni.surname}, {alumni.givenName}</motion.h1>
                            <p className="text-sm">{alumni.programCompleted} - Batch {dayjs(alumni.graduationDate).year()}</p>
                        </div>
                    </div>
                    {/* alimni content */}
                    <div className="flex flex-col mt-10 w-full">
                        {/* info */}
                        <div className="flex flex-col lg:flex-row mt-7 gap-7 justify-around">
                            <div className="flex flex-col gap-2 w-full">
                                <p className="text-xl">Basic Information</p>
                                <div className="bg-base-100 rounded p-5">
                                    <h1 className="text-lg font-bold">Location</h1>
                                    <p className="">{alumni.currentLocation}</p>
                                </div>
                                <div className="bg-base-100 rounded p-5">
                                    <h1 className="text-lg font-bold">Current Email Address</h1>
                                    <p className="">{alumni.currentEmail}</p>
                                </div>
                                <div className="bg-base-100 rounded p-5">
                                    <h1 className="text-lg font-bold">Currently Working</h1>
                                    <p className="">{alumni.isCurrentlyWorking ? "Yes" : "No"}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                {alumni.isCurrentlyWorking && (
                                    <>
                                        <p className="text-xl">Work Information</p>
                                        <div className="bg-base-100 rounded p-5">
                                            <h1 className="text-lg font-bold">Current Work Company</h1>
                                            <p className="">{alumni.company}</p>
                                        </div>
                                        <div className="bg-base-100 rounded p-5">
                                            <h1 className="text-lg font-bold">Started From</h1>
                                            <p className="">{alumni.startingWorkDate}</p>
                                        </div>
                                        {alumni.endingWorkDate != null ? (
                                            <div className="bg-base-100 rounded p-5">
                                                <h1 className="text-lg font-bold">Ended To</h1>
                                                <p className="">{alumni.endingWorkDate}</p>
                                            </div>
                                        ) : (
                                            <div className="flex bg-base-100 rounded p-5 items-center">
                                                <p className="">Currently working there</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

const Alumnus_Card = ({ alumniData }) => {

    const { surname, givenName, programCompleted, graduationDate, id, alumniDisplayPhoto } = alumniData

    const [showProfile, setShowProfile] = useState(false)

    return (
        <>
            <AnimateSharedLayout>
                <AnimatePresence exitBeforeEnter>
                    {showProfile && <ProfilePopUp alumni={alumniData} closeHandler={() => setShowProfile(false)} />}
                </AnimatePresence>
                <motion.div
                    layout
                    variants={_Transition_Card}
                    layoutId={`${id}_layout`}
                    initial="initial" animate="animate" exit="exit"
                    whileHover={{ translateY: -5 }}
                    key={id} className="card card-bordered shadow border-2 border-base-content bg-base-200 select-none">
                    <div className="card-body p-4   ">
                        <div className="flex items-center">
                            {alumniDisplayPhoto && (
                                <div className="w-10 h-10 mr-2 mask mask-circle">
                                    <img src={alumniDisplayPhoto.url} />
                                    {/* <Image src={alumniDisplayPhoto.url} alt={`${surname}_${givenName}_photo`} layout="fill" /> */}
                                </div>
                            )}
                            <h2 className="text-xl flex items-center font-bold mb-0">
                                {surname}, {givenName}
                            </h2>
                        </div>
                        <p className="text-sm">{programCompleted}</p>
                        <p className="text-sm mt-2">
                            <span className="text-slate-500">Graduated since: </span>
                            {dayjs(graduationDate).format("MMMM D, YYYY")}
                        </p>
                        <div className="card-actions justify-end mt-7">
                            <button
                                onClick={() => setShowProfile(true)}
                                className="btn btn-sm btn-primary">
                                <CgUserList size={25} />
                                <span className="ml-3">View Profile</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimateSharedLayout>
        </>
    )
}

export default Alumnus_Card