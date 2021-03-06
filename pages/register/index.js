import { _Transition_Blob_Left, _Transition_Card, _Transition_Page, _Transition_Slide_Left } from "../../components/_Animations"
import { motion, useMotionValue, AnimateSharedLayout } from "framer-motion"
import React, { useEffect, useState, CSSProperties, useRef } from 'react'
import { CgDanger, CgUser } from 'react-icons/cg'

import { getAuth } from 'firebase/auth'
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import firebaseApp from '../../firebaseConfig'
import Image from "next/image"
import { gql, useMutation } from "@apollo/client"
import slugify from "slugify"
import apolloClient from "apolloClient"
import { useAuth } from "../../components/_AuthProvider"

const RegisterPage = e => {
    const [createUserWithEmailAndPassword, reg_user, reg_loading, reg_error] = useCreateUserWithEmailAndPassword(getAuth(firebaseApp));
    const { loading: currentUserLoading, currentUser } = useAuth()

    const [_regStep, _setRegStep] = useState(1)
    const [_isWorking, _setIsWorking] = useState(false)

    const [reg_password, set_regPassword] = useState('');

    const [_userDisplayPhoto, _setUserDisplayPhoto] = useState()
    const [regID, setRegID] = useState('')

    const [_userRegData, _setUserRegData] = useState({
        surname: "",
        givenName: "",
        middleInitial: "",
        currentEmail: "",
        isVerified: false,
        slug: "",
        birthdate: "",
        currentLocation: "",
        programCompleted: "",
        graduationDate: "",
        isCurrentlyWorking: false,
        company: "",
        workPosition: "",
    })

    // queries
    const query_publishUser = gql`
        mutation {
            publishAlumniList (where: {
                id: "${regID}"
            }) {
                id
            }
        }
    `
    const query_createUser = gql`
        mutation {
            createAlumniList (data: {
                surname: "${_userRegData.surname}",
                givenName: "${_userRegData.givenName}",
                currentEmail: "${_userRegData.currentEmail}",
                isVerified: ${_userRegData.isVerified},
                slug: "${slugify(`${_userRegData.surname} ${_userRegData.givenName}`)}",
                birthdate: "${_userRegData.birthdate}",
                currentLocation: "${_userRegData.currentLocation}",
                programCompleted: "${_userRegData.programCompleted}",
                graduationDate: "${_userRegData.graduationDate}",
                isCurrentlyWorking: ${_userRegData.isCurrentlyWorking},
                company: "${_userRegData.company}",
                workPosition: "${_userRegData.workPosition}",
            }) {
                id
            }
        }
    `
    const [mutate_publishUser, { data: publishUserData, loading: publishUserLoading, error: publishUserError }] = useMutation(query_publishUser, { client: apolloClient })
    const [mutate_createUser, { data: createUserData, loading: createUserLoading, error: createUserError }] = useMutation(query_createUser, { client: apolloClient })


    const CreateUser_Firebase = async e => {
        createUserWithEmailAndPassword(_userRegData.currentEmail, reg_password)
        await CreateUser_GraphCMS();
    }

    const CreateUser_GraphCMS = async e => {
        await mutate_createUser()
        console.log(createUserData, createUserLoading, createUserError)
        setRegID(publishUserData.createAlumniList.id)
        await PublishUser_GraphCMS();
    }

    const PublishUser_GraphCMS = async e => {
        await mutate_publishUser()
        if (publishUserData) {
            // redirect to the alumni list
            alert("Successfully registered! Please login to continue.")
            window.location.href = `/`
        }
    }

    return (
        <>
            <motion.div variants={_Transition_Blob_Left} initial="initial" animate="animate" exit="exit"
                className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 fixed top-0 left-0 w-full h-full -z-20"
            />
            <motion.div
                variants={_Transition_Page} initial="initial" animate="animate" exit="exit"
                className=" px-5 lg:px-32 gap-5 lg:mt-0 flex flex-col lg:grid lg:grid-cols-2 lg:gap-10">

                <section className="h-[100vh] flex justify-center items-center relative">
                    <div className="flex flex-col text-center ">
                        <h1 className="text-5xl font-bold text-center text-base-content lg:text-left">
                            Register an Account
                        </h1>
                        <p className="text-center text-xl mt-5 lg:text-left">
                            Register an account to get started and get access to the most of the features.
                        </p>
                        <p className="text-center text-sm lg:text-left">
                            <span className="text-red-500">*</span>
                            Only graduates of University of Caloocan City can register an account.
                        </p>
                    </div>

                    {/* scroll down to register */}
                    {(!currentUser && !currentUserLoading) ? (
                        <motion.p
                            variants={_Transition_Card}
                            initial="initial" animate="animate" exit="exit"
                            className="absolute bottom-10 select-none text-base-content text-opacity-50 lg:hidden">Scroll Down to see the form</motion.p>
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

                {(!currentUser && !currentUserLoading) && (
                    <motion.section
                        variants={_Transition_Card}
                        initial="initial" animate="animate" exit="exit"
                        className="min-h-screen flex flex-col items-center lg:justify-center relative">

                        <progress class="progress progress-primary w-1/2 my-10" value={_regStep} max={5} />
                        {/* form */}
                        <motion.div className="flex w-full gap-3 max-w-xl">
                            <>
                                {/* step 1 */}
                                {_regStep == 1 && (
                                    <motion.div
                                        layout
                                        variants={_Transition_Slide_Left} initial="initial" animate="animate" exit="exit"
                                        className="form-control w-full">

                                        <p className="text-3xl mb-10">Account Detail</p>

                                        <label className="input-group input-group-vertical">
                                            <span>Your email address</span>
                                            <input
                                                value={_userRegData.currentEmail}
                                                onChange={e => _setUserRegData({ ..._userRegData, currentEmail: e.target.value })}
                                                type="text" placeholder="Type here" className="input input-bordered input-primary" />
                                        </label>

                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Your Password</span>
                                            <input
                                                value={reg_password}
                                                onChange={e => (set_regPassword(e.target.value))}
                                                type="password" placeholder="Type here" className="input input-bordered input-primary" />
                                        </label>

                                        <div className="flex w-full justify-between gap-2">
                                            <div />
                                            <a onClick={() => {
                                                if (_userRegData.currentEmail &&
                                                    reg_password) {
                                                    _setRegStep(_regStep + 1)
                                                }
                                            }} className="btn btn-primary mt-7 flex items-center">
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
                                                <input
                                                    value={_userRegData.surname}
                                                    onChange={e => _setUserRegData({ ..._userRegData, surname: e.target.value })}
                                                    type="text" placeholder="Surname" className="input input-bordered input-primary w-full" />
                                                <input
                                                    value={_userRegData.givenName}
                                                    onChange={e => _setUserRegData({ ..._userRegData, givenName: e.target.value })}
                                                    type="text" placeholder="Given Name" className="input input-bordered input-primary w-full" />
                                                <input
                                                    value={_userRegData.middleInitial}
                                                    onChange={e => _setUserRegData({ ..._userRegData, middleInitial: e.target.value })}
                                                    type="text" placeholder="Middle Initial" className="input input-bordered input-primary w-1/2" />
                                            </div>
                                        </label>
                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Your Birthdate</span>
                                            <div className="input-group w-full">
                                                <input
                                                    value={_userRegData.birthdate}
                                                    onChange={e => _setUserRegData({ ..._userRegData, birthdate: e.target.value })}
                                                    type="date" placeholder="Birthdate" className="input input-bordered input-primary w-full" />
                                            </div>
                                        </label>
                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Your Current Location (City Approximate)</span>
                                            <input
                                                value={_userRegData.currentLocation}
                                                onChange={e => _setUserRegData({ ..._userRegData, currentLocation: e.target.value })}
                                                type="text" placeholder="Your current location here" className="input input-bordered input-primary" />
                                        </label>
                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Program Completed</span>
                                            <div className="input-group w-full">
                                                <input
                                                    value={_userRegData.programCompleted}
                                                    onChange={e => _setUserRegData({ ..._userRegData, programCompleted: e.target.value })}
                                                    type="text" placeholder="Program" className="input input-bordered input-primary w-full" />
                                                <input
                                                    value={_userRegData.graduationDate}
                                                    onChange={e => _setUserRegData({ ..._userRegData, graduationDate: e.target.value })}
                                                    type="date" placeholder="Date Graduated" className="input input-bordered input-primary w-full" />
                                            </div>
                                        </label>


                                        <div className="flex w-full justify-between gap-2">
                                            <a onClick={() => _setRegStep(_regStep - 1)} className="btn btn-primary mt-7">Prev</a>
                                            <a onClick={() => {
                                                if (_userRegData.surname && _userRegData.givenName && _userRegData.birthdate && _userRegData.currentLocation && _userRegData.programCompleted && _userRegData.graduationDate) {
                                                    _setRegStep(_regStep + 1)
                                                }
                                            }} className="btn btn-primary mt-7">Next</a>
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
                                            <input
                                                checked={_userRegData.isCurrentlyWorking}
                                                onChange={e => _setUserRegData({ ..._userRegData, isCurrentlyWorking: e.target.checked })}
                                                type="checkbox" className="toggle toggle-primary mr-5" />
                                            <span>Do you currently work?</span>
                                        </label>
                                        {_userRegData.isCurrentlyWorking && (
                                            <motion.div className="mt-5">
                                                <label className="input-group input-group-vertical mt-2">
                                                    <span>Current Work</span>
                                                    <input type="text" placeholder="What do you do?" className="input input-bordered input-primary" />
                                                </label>
                                                <label className="input-group input-group-vertical mt-2">
                                                    <span>Current Company</span>
                                                    <input type="text" placeholder="What is the name of your company?" className="input input-bordered input-primary" />
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
                                        {
                                            _userDisplayPhoto ? (
                                                <div className="avatar self-center mb-5">
                                                    <div className="w-40 mask mask-squircle relative">
                                                        <Image src={URL.createObjectURL(_userDisplayPhoto)} layout="fill" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-40 h-40 self-center mask mask-squircle bg-base-300 mb-5 flex justify-center items-center">
                                                    <CgUser size={70} />
                                                </div>
                                            )
                                        }
                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Upload Display Photo (unavailable for now)</span>
                                            <input type="file" name="alumniDisplayPhoto"
                                                accept="image/*"
                                                disabled
                                                onChange={e => {
                                                    _setUserDisplayPhoto(e.target.files[0])
                                                    console.log(e.target.files[0])
                                                }}
                                                className=" w-full bg-base-100 px-2 py-3 text-base-content rounded cursor-pointer " />
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

                                        <label className="input-group input-group-vertical mt-2">
                                            <span>Upload Transcript of Records (unavailable for now)</span>
                                            <input type="file" name="alumniDisplayPhoto"
                                                accept="image/*"
                                                disabled
                                                onChange={e => _setDisplayPhoto(e)}
                                                className="form-control w-full bg-base-100 px-2 py-3 text-base-content rounded cursor-pointer " />
                                        </label>

                                        <div className="flex w-full justify-between gap-2">
                                            <a onClick={() => _setRegStep(_regStep - 1)} className="btn btn-primary mt-7">Prev</a>
                                            <a onClick={async () => {
                                                await CreateUser_Firebase();
                                            }} className="btn btn-primary mt-7">Register</a>
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        </motion.div>
                    </motion.section>
                )}

            </motion.div>
        </>
    )
}

export default RegisterPage