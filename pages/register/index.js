import { _Transition_Blob_Left, _Transition_Page, _Transition_Slide_Left } from "../../components/_Animations"
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { useState } from 'react'
import { CgChevronRight } from 'react-icons/cg'

const RegisterPage = e => {

    const [_regStep, _setRegStep] = useState(1)

    return (
        <>
            <motion.div variants={_Transition_Blob_Left} initial="initial" animate="animate" exit="exit"
                className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 fixed top-0 left-0 w-full h-full -z-10"
            />
            <motion.div
                variants={_Transition_Page} initial="initial" animate="animate" exit="exit"
                className="min-h-screen flex flex-col-reverse lg:flex-row justify-end lg:justify-between items-center px-5 lg:px-32 gap-5 mt-64 lg:mt-0">

                {/* steps */}
                <div className="flex flex-col w-5/6 lg:w-1/2">
                    <ul className="steps">
                        <li className={`step step-info`}>Authentication</li>
                        <li className={`step ${_regStep > 1 ? "step-info" : ""}`}>Basic Info</li>
                        <li className={`step ${_regStep > 2 ? "step-info" : ""}`}>Verification</li>
                        <li className={`step ${_regStep > 3 ? "step-info" : ""}`}>Confirmation</li>
                    </ul>

                    {/* form */}
                    <motion.div layout className="flex flex-col w-full gap-3 mt-5">
                        <AnimateSharedLayout>
                            {/* step 1 */}
                            {_regStep == 1 && (
                                <motion.div
                                    layout
                                    variants={_Transition_Slide_Left} initial="initial" animate="animate" exit="exit"
                                    className="form-control w-full">
                                    <label className="input-group input-group-vertical">
                                        <span>Your email address</span>
                                        <input type="text" placeholder="Type here" className="input input-bordered input-ghost" />
                                    </label>

                                    <label className="input-group input-group-vertical mt-2">
                                        <span>Your Password</span>
                                        <input type="password" placeholder="Type here" className="input input-bordered input-ghost" />
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
                                    <label className="input-group input-group-vertical mt-2">
                                        <span>Your Full Name</span>
                                        <div className="input-group w-full">
                                            <input type="text" placeholder="Surname" className="input input-bordered input-ghost w-full" />
                                            <input type="text" placeholder="Given Name" className="input input-bordered input-ghost w-full" />
                                            <input type="text" placeholder="Middle Initial" className="input input-bordered input-ghost w-1/2" />
                                        </div>
                                    </label>
                                    <label className="input-group input-group-vertical mt-2">
                                        <span>Your Current Location (City Approximate)</span>
                                        <input type="text" placeholder="Your current location here" className="input input-bordered input-ghost" />
                                    </label>
                                    <label className="input-group input-group-vertical mt-2">
                                        <span>Program Completed</span>
                                        <div className="input-group w-full">
                                            <input type="text" placeholder="Program" className="input input-bordered input-ghost w-full" />
                                            <input type="date" placeholder="Date Graduated" className="input input-bordered input-ghost w-full" />
                                        </div>
                                    </label>


                                    <div className="flex w-full justify-between gap-2">
                                        <a onClick={() => _setRegStep(1)} className="btn btn-primary mt-7">Prev</a>
                                        <a onClick={() => _setRegStep(3)} className="btn btn-primary mt-7">Next</a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimateSharedLayout>
                    </motion.div>
                </div>

                {/* title */}
                <div className="flex flex-col lg:text-right text-center">
                    <p className="text-5xl">Register an Account</p>
                    <p>Register and keep with the updates</p>
                </div>
            </motion.div>
        </>
    )
}

export default RegisterPage