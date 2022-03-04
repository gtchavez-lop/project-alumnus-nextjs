import { _Transition_Blob_Left, _Transition_Card, _Transition_Page, _Transition_Slide_Left } from "../../components/_Animations"
import { motion, useMotionValue, AnimateSharedLayout } from "framer-motion"
import React, { useEffect, useState, CSSProperties, useRef } from 'react'
import { CgDanger } from 'react-icons/cg'

import { getAuth, } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebaseApp from '../../firebaseConfig'
import Image from "next/image"

const RegisterPage = e => {

    const [_regStep, _setRegStep] = useState(4)
    const [_isWorking, _setIsWorking] = useState(false)

    const [user, loading, error] = useAuthState(getAuth(firebaseApp));

    const _userDisplayPhoto = useRef()
    // const [_userDisplayPhoto, _setUserDisplayPhoto] = useState({})
    const [_userTOR, _setUserTOR] = useState()

    const _setDisplayPhoto = async ctx => {
        const file = ctx.target.files[0]
        _userDisplayPhoto.current = file
        console.log(_userDisplayPhoto.current)

        // const response = await fetch(`${process.env.GRAPHCMS_URL}/upload`, {
        //     method: 'POST',
        //     headers: {
        //         "Authorization": `Bearer ${process.env.GRAPHCMS_ASSET_KEY_DRAFT}`,
        //     },
        //     body: file,
        // })
        // const data = await response.json()
    }

    return (
        <>
            <motion.div variants={_Transition_Blob_Left} initial="initial" animate="animate" exit="exit"
                className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 fixed top-0 left-0 w-full h-full -z-20"
            />
            <motion.div
                variants={_Transition_Page} initial="initial" animate="animate" exit="exit"
                className="min-h-screen px-5 lg:px-32 gap-5 lg:mt-0">

                <section className="min-h-screen flex justify-center items-center relative">
                    <div className="flex flex-col text-center">
                        <h1 className="text-5xl font-bold text-center text-base-content ">
                            Register an Account
                        </h1>
                        <p className="text-center text-xl mt-5">
                            Register an account to get started and get access to the most of the features.
                        </p>
                        <p className="text-center text-sm">
                            <span className="text-red-500">*</span>
                            Only graduates of University of Caloocan City can register an account.
                        </p>
                    </div>

                    {/* scroll down to register */}
                    {(!user && !loading) ? (
                        <motion.p
                            variants={_Transition_Card}
                            initial="initial" animate="animate" exit="exit"
                            className="absolute bottom-10 select-none text-base-content text-opacity-50">Scroll Down to see the form</motion.p>
                    ) : (
                        <motion.div
                            variants={_Transition_Card}
                            initial="initial" animate="animate" exit="exit"
                            className="absolute bottom-10 select-none alert shadow-lg bg-base-300">
                            <div>
                                <CgDanger size={25} />
                                <span>Please sign out to register an account</span>
                            </div>
                        </motion.div>
                    )}
                </section>

                {(!user && !loading) && (
                    <motion.section
                        variants={_Transition_Card}
                        initial="initial" animate="animate" exit="exit"
                        className="min-h-screen flex flex-col-reverse lg:flex-row justify-end lg:justify-between relative">
                        {/* form */}
                        <motion.div layout className="flex flex-col w-full gap-3 max-w-xl">
                            <AnimateSharedLayout>
                                {/* step 1 */}
                                {_regStep == 1 && (
                                    <motion.div
                                        layout
                                        variants={_Transition_Slide_Left} initial="initial" animate="animate" exit="exit"
                                        className="form-control w-full">

                                        <p className="text-3xl mb-10">Account Detail</p>

                                        <label className="input-group input-group-vertical">
                                            <span>Your email address</span>
                                            <input type="text" placeholder="Type here" className="input input-bordered input-primary" />
                                        </label>

                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Your Password</span>
                                            <input type="password" placeholder="Type here" className="input input-bordered input-primary" />
                                        </label>

                                        <div className="flex w-full justify-between gap-2">
                                            <div />
                                            <a onClick={() => _setRegStep(2)} className="btn btn-primary mt-7 flex items-center">
                                                Next
                                            </a>
                                        </div>
                                    </motion.div>
                                )}

                                {/* step 2 */}
                                {_regStep == 2 && (
                                    <motion.div
                                        layout
                                        variants={_Transition_Slide_Left} initial="initial" animate="animate"
                                        className="form-control w-full">


                                        <p className="text-3xl mb-10">Personal Information</p>

                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Your Full Name</span>
                                            <div className="input-group w-full">
                                                <input type="text" placeholder="Surname" className="input input-bordered input-primary w-full" />
                                                <input type="text" placeholder="Given Name" className="input input-bordered input-primary w-full" />
                                                <input type="text" placeholder="Middle Initial" className="input input-bordered input-primary w-1/2" />
                                            </div>
                                        </label>
                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Your Birthdate</span>
                                            <div className="input-group w-full">
                                                <input type="date" placeholder="Birthdate" className="input input-bordered input-primary w-full" />
                                            </div>
                                        </label>
                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Your Current Location (City Approximate)</span>
                                            <input type="text" placeholder="Your current location here" className="input input-bordered input-primary" />
                                        </label>
                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Program Completed</span>
                                            <div className="input-group w-full">
                                                <input type="text" placeholder="Program" className="input input-bordered input-primary w-full" />
                                                <input type="date" placeholder="Date Graduated" className="input input-bordered input-primary w-full" />
                                            </div>
                                        </label>


                                        <div className="flex w-full justify-between gap-2">
                                            <a onClick={() => _setRegStep(1)} className="btn btn-primary mt-7">Prev</a>
                                            <a onClick={() => _setRegStep(3)} className="btn btn-primary mt-7">Next</a>
                                        </div>
                                    </motion.div>
                                )}

                                {/* step 3 */}
                                {_regStep == 3 && (
                                    <motion.div
                                        variants={_Transition_Slide_Left} initial="initial" animate="animate"
                                        className="form-control w-full">


                                        <p className="text-3xl mb-10">Current Status</p>

                                        <label className="flex items-center mt-2">
                                            <input type="checkbox" checked={_isWorking} onChange={e => _setIsWorking(e.target.checked)} className="toggle toggle-primary mr-5" />
                                            <span>Do you currently work?</span>
                                        </label>
                                        {_isWorking && (
                                            <motion.div className="mt-5">
                                                <label className="input-group input-group-vertical mt-2">
                                                    <span>Current Work</span>
                                                    <input type="text" placeholder="Middle Initial" className="input input-bordered input-primary" />
                                                </label>
                                                <label className="input-group input-group-vertical mt-2">
                                                    <span>Current Company</span>
                                                    <input type="text" placeholder="Middle Initial" className="input input-bordered input-primary" />
                                                </label>
                                            </motion.div>
                                        )}


                                        <div className="flex w-full justify-between gap-2">
                                            <a onClick={() => _setRegStep(_regStep - 1)} className="btn btn-primary mt-7">Prev</a>
                                            <a onClick={() => _setRegStep(_regStep + 1)} className="btn btn-primary mt-7">Next</a>
                                        </div>
                                    </motion.div>
                                )}

                                {/* step 4 */}
                                {_regStep == 4 && (
                                    <motion.div
                                        variants={_Transition_Slide_Left} initial="initial" animate="animate"
                                        className="form-control w-full">


                                        <p className="text-3xl mb-10">Display Photo</p>

                                        {_userDisplayPhoto.current && (
                                            <Image src={`/${URL.createObjectURL(_userDisplayPhoto.current)}`} width={200} height={200} />
                                        )}
                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Upload Photo</span>
                                            <input type="file" name="alumniDisplayPhoto"
                                                accept="image/*"
                                                onChange={e => _setDisplayPhoto(e)}
                                                className="form-control w-full bg-base-100 px-2 py-3 text-base-content rounded cursor-pointer" />
                                        </label>


                                        <div className="flex w-full justify-between gap-2">
                                            <a onClick={() => _setRegStep(_regStep - 1)} className="btn btn-primary mt-7">Prev</a>
                                            <a onClick={() => _setRegStep(_regStep + 1)} className="btn btn-primary mt-7">Next</a>
                                        </div>
                                    </motion.div>
                                )}

                                {/* step 5 */}
                                {_regStep == 5 && (
                                    <motion.div
                                        variants={_Transition_Slide_Left} initial="initial" animate="animate"
                                        className="form-control w-full">

                                        <p className="text-3xl mb-10">Verification</p>

                                        <label className="flex items-center mt-2">
                                            <input type="checkbox" checked={_isWorking} onChange={e => _setIsWorking(e.target.checked)} className="toggle toggle-primary mr-5" />
                                            <span>Do you currently work?</span>
                                        </label>
                                        {_isWorking && (
                                            <motion.div className="mt-5">
                                                <label className="input-group input-group-vertical mt-2">
                                                    <span>Current Work</span>
                                                    <input type="text" placeholder="Middle Initial" className="input input-bordered input-ghost" />
                                                </label>
                                                <label className="input-group input-group-vertical mt-2">
                                                    <span>Current Company</span>
                                                    <input type="text" placeholder="Middle Initial" className="input input-bordered input-ghost" />
                                                </label>
                                            </motion.div>
                                        )}

                                        <div className="flex w-full justify-between gap-2">
                                            <a onClick={() => _setRegStep(_regStep - 1)} className="btn btn-primary mt-7">Prev</a>
                                            <a onClick={() => _setRegStep(_regStep + 1)} className="btn btn-primary mt-7">Next</a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimateSharedLayout>
                        </motion.div>

                        {/* steps */}
                        <div>
                            <ul className="steps steps-horizontal lg:steps-vertical mb-16 lg:mb-0 lg:mt-10 transition-all duration-100">
                                <li className={`step ${_regStep >= 1 ? 'step-primary' : ""}`}>Account Detail</li>
                                <li className={`step ${_regStep >= 2 ? 'step-primary' : ""}`}>Personal Information</li>
                                <li className={`step ${_regStep >= 3 ? 'step-primary' : ""}`}>Current Status</li>
                                <li className={`step ${_regStep >= 4 ? 'step-primary' : ""}`}>Display Photo</li>
                                <li className={`step ${_regStep >= 5 ? 'step-primary' : ""}`}>Verification</li>
                            </ul>

                        </div>
                    </motion.section>
                )}

            </motion.div>
        </>
    )
}

export default RegisterPage