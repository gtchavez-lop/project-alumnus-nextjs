import { AnimatePresence, motion } from "framer-motion"
import dayjs from "dayjs"
import { _Transition_BottomMenu, _Transition_Card, _Transition_Page } from "../_Animations"
import { CgClose, CgReadme, CgUser, CgUserList } from "react-icons/cg"
import { useState } from "react"

const ProfilePopUp = ({ alumni, closeHandler }) => {
    return (
        <motion.div
            className="fixed top-0 left-0 w-screen h-screen z-40 bg-base-100 bg-opacity-80 shadow-lg rounded-lg overflow-hidden"
        >
            <motion.div
                variants={_Transition_BottomMenu} initial="initial" animate="animate" exit="exit"
                className="absolute w-full h-5/6  bg-base-200 bottom-0 left-0 p-5 lg:px-20 lg:py-5">
                <div className="flex items-center justify-end w-full left-0 px-5 lg:px-20 absolute">
                    {/* close button */}
                    <button
                        onClick={closeHandler}
                        className="btn btn-secondary btn-square">
                        <CgClose className="h-6 w-6 text-white" />
                    </button>
                </div>
                <div className="flex justify-between items-center h-full">
                    {/* alumni photo */}
                    {/* alimni content */}
                    <div className="flex flex-col justify-center">
                        <div>
                            <h1 className="text-2xl font-bold">{alumni.surname}, {alumni.givenName}</h1>
                            <p className="text-sm">{alumni.programCompleted} - Batch {dayjs(alumni.graduationDate).year()}</p>
                        </div>
                        <div className="flex mt-16 gap-2">
                            <div className="bg-base-100 rounded p-5">
                                <h1 className="text-lg font-bold">Location</h1>
                                <p className="text-xl">{alumni.currentLocation}</p>
                            </div>
                            <div className="bg-base-100 rounded p-5">
                                <h1 className="text-lg font-bold">Current Email Address</h1>
                                <p className="text-xl">{alumni.currentEmail}</p>
                            </div>
                            <div className="bg-base-100 rounded p-5">
                                <h1 className="text-lg font-bold">Currently Working</h1>
                                <p className="text-xl">{alumni.isCurrentlyWorking ? "Yes" : "No"}</p>
                            </div>
                        </div>
                        <div className="flex mt-5 gap-2">
                            {alumni.isCurrentlyWorking && (
                                <>
                                    <div className="bg-base-100 rounded p-5">
                                        <h1 className="text-lg font-bold">Current Work Company</h1>
                                        <p className="text-xl">{alumni.company}</p>
                                    </div>
                                    <div className="bg-base-100 rounded p-5">
                                        <h1 className="text-lg font-bold">Started From</h1>
                                        <p className="text-xl">{alumni.startingWorkDate}</p>
                                    </div>
                                    {alumni.endingWorkDate != null ? (
                                        <div className="bg-base-100 rounded p-5">
                                            <h1 className="text-lg font-bold">Ended To</h1>
                                            <p className="text-xl">{alumni.endingWorkDate}</p>
                                        </div>
                                    ) : (
                                        <div className="flex bg-base-100 rounded p-5 items-center">
                                            <p className="text-xl">Currently working there</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

const Alumnus_Card = ({ alumniData }) => {

    const { surname, givenName, programCompleted, graduationDate, id } = alumniData

    const [showProfile, setShowProfile] = useState(false)

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {showProfile && <ProfilePopUp alumni={alumniData} closeHandler={() => setShowProfile(false)} />}
            </AnimatePresence>
            <motion.div
                variants={_Transition_Card}
                initial="initial" animate="animate" exit="exit"
                whileHover={{ translateY: -5 }}
                key={id} className="card card-bordered shadow border-2 border-base-content bg-base-200 select-none">
                <div className="card-body p-5">
                    <h2 className="card-title flex items-center">
                        <CgUser size={30} />
                        <span className="ml-5">{surname}, {givenName}</span>
                    </h2>

                    <p>
                        {programCompleted}
                    </p>
                    <p className="text-sm mt-2">
                        <span className="text-slate-500">Graduated since: </span>
                        {dayjs(graduationDate).format("MMMM D, YYYY")}
                    </p>
                    <div className="card-actions justify-end mt-5">
                        <button
                            onClick={() => setShowProfile(true)}
                            className="btn btn-sm">
                            <CgUserList size={25} />
                            <span className="ml-3">View Profile</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Alumnus_Card