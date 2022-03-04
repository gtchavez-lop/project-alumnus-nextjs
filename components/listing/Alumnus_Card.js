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
                <motion.div
                    layoutId={`${alumni.id}_profile_button`}
                    className="flex items-center justify-end w-full left-0 px-5 lg:px-20 absolute">
                    {/* close button */}
                    <motion.div
                        onClick={closeHandler}
                        className="btn btn-primary btn-square">
                        <CgClose className="h-6 w-6 text-white" />
                    </motion.div>
                </motion.div>
                <motion.div className="flex flex-col lg:flex-row mb-16 justify-center">
                    {/* alumni photo */}
                    <motion.div className="w-full lg:w-1/2 h-40 lg:h-auto mt-10 lg:mt-0 flex flex-col gap-10 justify-center items-center">
                        {alumni.alumniDisplayPhoto ? (
                            <motion.div layoutId={`${alumni.id}_photo_layout`} className="w-40 h-40 mask mask-squircle">
                                <motion.div
                                    className="relative w-40 h-40">
                                    <Image layout="fill" objectFit="cover" alt={alumni.surname} src={alumni.alumniDisplayPhoto.url} />
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.div
                                layoutId={`${alumni.id}_photo_layout_none`}
                                className="flex flex-col text-center items-center gap-5">
                                <CgUser className="h-16 w-16 text-white" />
                                <motion.p>Image Unavailable</motion.p>
                            </motion.div>
                        )}
                        <motion.div className="text-center lg:text-left">
                            <motion.h1 layoutId={`${alumni.id}_name_layout`} className="text-2xl font-bold">{alumni.surname}, {alumni.givenName}</motion.h1>
                            <motion.p layoutId={`${alumni.id}_program_layout`} className="text-sm">{alumni.programCompleted} - Batch {dayjs(alumni.graduationDate).year()}</motion.p>
                        </motion.div>
                    </motion.div>
                    {/* alimni content */}
                    <motion.div className="flex flex-col mt-10 w-full">
                        {/* info */}
                        <motion.div className="flex flex-col lg:flex-row mt-7 gap-7 justify-around">
                            <motion.div className="flex flex-col gap-2 w-full">
                                <motion.p className="text-xl">Basic Information</motion.p>
                                <motion.div className="bg-base-100 rounded p-5">
                                    <motion.h1 className="text-lg font-bold">Location</motion.h1>
                                    <motion.p className="">{alumni.currentLocation}</motion.p>
                                </motion.div>
                                <motion.div className="bg-base-100 rounded p-5">
                                    <motion.h1 className="text-lg font-bold">Current Email Address</motion.h1>
                                    <motion.p className="">{alumni.currentEmail}</motion.p>
                                </motion.div>
                                <motion.div className="bg-base-100 rounded p-5">
                                    <motion.h1 className="text-lg font-bold">Birthdate</motion.h1>
                                    <motion.p className="">{alumni.birthDate ? `${dayjs(alumni.birthDate).format("MMMM D, YYYY")} (${dayjs().diff(dayjs(alumni.birthDate), 'years')})` : "Undefined"}</motion.p>
                                </motion.div>
                                <motion.div className="bg-base-100 rounded p-5">
                                    <motion.h1 className="text-lg font-bold">Currently Working</motion.h1>
                                    <motion.p className="">{alumni.isCurrentlyWorking ? "Yes" : "No"}</motion.p>
                                </motion.div>
                            </motion.div>

                            <motion.div className="flex flex-col gap-2 w-full">
                                {alumni.isCurrentlyWorking && (
                                    <>
                                        <motion.p className="text-xl">Work Information</motion.p>
                                        <motion.div className="bg-base-100 rounded p-5">
                                            <motion.h1 className="text-lg font-bold">Current Work Company</motion.h1>
                                            <motion.p className="">{alumni.company}</motion.p>
                                        </motion.div>
                                        <motion.div className="bg-base-100 rounded p-5">
                                            <motion.h1 className="text-lg font-bold">Started From</motion.h1>
                                            <motion.p className="">{alumni.startingWorkDate}</motion.p>
                                        </motion.div>
                                        {alumni.endingWorkDate != null ? (
                                            <motion.div className="bg-base-100 rounded p-5">
                                                <motion.h1 className="text-lg font-bold">Ended To</motion.h1>
                                                <motion.p className="">{alumni.endingWorkDate}</motion.p>
                                            </motion.div>
                                        ) : (
                                            <motion.div className="flex bg-base-100 rounded p-5 items-center">
                                                <motion.p className="">Currently working there</motion.p>
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
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
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    key={id} className="card shadow bg-base-300 select-none">
                    <motion.div className="card-body p-4   ">
                        <motion.div className="flex items-center relative">
                            {alumniDisplayPhoto ? (
                                <motion.div
                                    layoutId={`${id}_photo_layout`} className="w-10 h-10 mr-2 mask mask-circle relative">
                                    <Image layout="fill" objectFit="cover" src={alumniDisplayPhoto.url} alt={`${surname}_${givenName}_photo`} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    layoutId={`${id}_photo_layout_none`} className="w-10 h-10 mr-2 mask mask-circle relative">
                                    <CgUser className="h-10 w-10 text-white" />
                                </motion.div>
                            )}
                            <motion.h2 layoutId={`${id}_name_layout`} className="text-xl flex items-center font-bold mb-0">
                                {surname}, {givenName}
                            </motion.h2>
                        </motion.div>
                        <motion.p layoutId={`${id}_program_layout`} className="text-sm">{programCompleted}</motion.p>
                        <motion.p className="text-sm mt-2">
                            <motion.span className="text-slate-500">Graduated since: </motion.span>
                            {dayjs(graduationDate).format("MMMM D, YYYY")}
                        </motion.p>
                        <motion.div
                            layoutId={`${id}_profile_button`}
                            className="card-actions justify-end mt-7">
                            <motion.div
                                onClick={() => setShowProfile(true)}
                                className="btn btn-sm btn-primary">
                                <CgUserList size={25} />
                                <span className="ml-3">View Profile</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </AnimateSharedLayout>
        </>
    )
}

export default Alumnus_Card