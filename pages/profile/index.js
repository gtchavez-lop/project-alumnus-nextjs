import { motion, AnimatePresence } from "framer-motion"
import { CgDanger, CgGhostCharacter, CgSpinner } from 'react-icons/cg'
import dayjs from 'dayjs'

import { _Transition_Blob_Profile, _Transition_Page, _Transition_Card } from "../../components/_Animations"

import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebaseApp from '../../firebaseConfig'
import Image from "next/image"
import { useEffect, useState } from "react"
import apolloClient from "apolloClient"
import { gql } from "@apollo/client"

const ProfilePage = e => {
    const [user, loading, error] = useAuthState(getAuth(firebaseApp))
    const [userData, setUserData] = useState({})
    const [userDataLoading, setUserDataLoading] = useState(true)

    useEffect(e => {
        if (user) {
            const getUserQuery = gql`
                query {
                    alumniLists (where: {
                        currentEmail: "${user.email}"
                    }) {
                        alumniDisplayPhoto { url }
                        isVerified
                        surname
                        givenName
                        isCurrentlyWorking
                        company
                        slug
                        currentEmail
                        currentLocation
                        programCompleted
                        graduationDate
                        birthDate
                    }
                }
            `
            apolloClient.query({
                query: getUserQuery,
            }).then(res => {
                let data = res.data.alumniLists[0]
                setTimeout(() => {
                    setUserData(data)
                    setUserDataLoading(false)
                }, 500);
            })
        } else {
            setUserDataLoading(true)
        }
    }, [user])

    // 
    // useEffect(e => {
    //     console.log(userData)
    // }, [userData])

    return (
        <>
            <motion.div
                variants={_Transition_Blob_Profile} initial="initial" animate="animate" exit="exit"
                className="absolute h-full w-full top-0 left-0 bg-gradient-to-tl from-secondary to-primary" />
            <motion.main
                variants={_Transition_Page} initial="initial" animate="animate" exit="exit"
                className="min-h-screen px-5 lg:px-32 gap-5 lg:mt-0">
                <section className="min-h-screen flex items-center justify-center relative">
                    <div className="hidden lg:block" />
                    {/* scroll down to register */}
                    {(userDataLoading) ?
                        ((!user && !loading) ? (
                            <div className="flex flex-col md:flex-row-reverse justify-evenly items-center w-full gap-3">
                                <motion.div
                                    variants={_Transition_Card}
                                    initial="initial" animate="animate" exit="exit"
                                    className="select-none flex justify-center items-center md:w-1/2">
                                    <CgGhostCharacter className="w-40 h-40" />
                                </motion.div>
                                <motion.div
                                    variants={_Transition_Card}
                                    initial="initial" animate="animate" exit="exit"
                                    className="select-none alert shadow-lg bg-base-300 md:w-1/2">
                                    <div>
                                        <CgDanger size={25} />
                                        <span>Please sign in to an account</span>
                                    </div>
                                </motion.div>
                            </div>
                        ) : (
                            <>

                                <motion.div
                                    animate={{ rotate: ["0deg", '360deg'] }}
                                    transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
                                >
                                    <CgSpinner size={35} />
                                </motion.div>
                            </>
                        ))
                        : (
                            <motion.div
                                variants={_Transition_Card} initial="initial" animate="animate" exit="exit"
                                className="flex flex-col justify-center lg:items-end items-center w-full">
                                <div className="relative w-44 h-44 mask mask-squircle">
                                    <Image src={userData.alumniDisplayPhoto.url} layout="fill" alt="Display Photo" />
                                </div>
                                <div className="divider w-1/2 self-center lg:self-end" />
                                <div className="card w-96 bg-base-100 lg:bg-transparent shadow-xl lg:shadow-none mt-0">
                                    <div className="card-body p-5 lg:p-0">
                                        <h2 className="card-title justify-center lg:justify-end text-2xl">{userData.surname}, {userData.givenName} ({dayjs().diff(dayjs(userData.birthDate), 'years')})</h2>
                                        <p className="text-center lg:text-right mt-2 lg:mt-5">{userData.currentLocation}</p>
                                        <p className="text-center lg:text-right">{userData.programCompleted} - Batch {dayjs(userData.graduationData).year()}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                </section>
            </motion.main>
        </>
    )
}

export default ProfilePage