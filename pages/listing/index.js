import Head from "next/head"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { _Transition_Blob_Bottom, _Transition_Blob_Top, _Transition_Card, _Transition_Page } from "../../components/_Animations"
import { CgDanger } from "react-icons/cg"

import { getAuth, } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebaseApp from '../../firebaseConfig'

import Alumnus_Card from "../../components/listing/Alumnus_Card"
import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

// get all alumnus as a server prop (for preloading) on page request
export const getServerSideProps = async e => {
    const { data } = await apolloClient.query({
        query: gql`
            query {
                alumniLists (orderBy: createdAt_DESC) {
                    createdAt
                    id
                    surname
                    givenName
                    slug
                    alumniDisplayPhoto {url}
                    currentEmail
                    currentLocation
                    programCompleted
                    graduationDate
                    isCurrentlyWorking
                    company
                    workPosition
                }
            }
        `
    })

    return {
        props: {
            alumnus: data
        }
    }
}

// create Alumnus page
const Listing = ({ alumnus }) => {
    // states
    const [filteredAlumniList, setFilteredAlumniList] = useState([])
    const [user, loading, error] = useAuthState(getAuth(firebaseApp));
    const [_searchAndFilterState, set_searchAndFilterState] = useState({
        searchQuery: "",
        orderBy: "createdAt",
        orderDirection: "ASC"
    })

    // update and filter alumnus list and push to filteredAlumniList state
    const _ReassignAlumnuList = () => {
        if (user) {
            let outputArray = []

            // search, filter, and sort alumni list based on _searchAndFilterState state
            if (_searchAndFilterState.searchQuery.length > 0) {
                outputArray = alumnus.alumniLists.filter(alumnus => {
                    return alumnus.surname.toLowerCase().includes(_searchAndFilterState.searchQuery.toLowerCase()) ||
                        alumnus.givenName.toLowerCase().includes(_searchAndFilterState.searchQuery.toLowerCase())
                })
            } else {
                outputArray = alumnus.alumniLists
            }

            // sort alumni list using swtich
            switch (_searchAndFilterState.orderBy) {
                case "createdAt":
                    outputArray.sort((a, b) => {
                        return a.createdAt > b.createdAt ? -1 : 1
                    })
                    break;
                case "surname":
                    outputArray.sort((a, b) => {
                        return a.surname > b.surname ? 1 : -1
                    })
                    break;
                case "givenName":
                    outputArray.sort((a, b) => {
                        return a.givenName > b.givenName ? 1 : -1
                    })
                    break;
                case "currentEmail":
                    outputArray.sort((a, b) => {
                        return a.currentEmail > b.currentEmail ? 1 : -1
                    })
                    break;
            }

            // sort alumni list by direction
            if (_searchAndFilterState.orderDirection === "DESC") {
                let tempArray = []
                for (let i = outputArray.length - 1; i >= 0; i--) {
                    tempArray.push(outputArray[i])
                }
                outputArray = tempArray
            }

            // remove alumni if the user's email is equal to the alumnus' current email
            if (user.email) {
                outputArray = outputArray.filter(alumnus => {
                    return alumnus.currentEmail !== user.email
                })
            }


            setFilteredAlumniList(outputArray)
        }
    }

    // trigger _ReassignAlumnuList on _searchAndFilterState change
    useEffect(() => {
        _ReassignAlumnuList()
    }, [_searchAndFilterState])

    // trigger _ReassignAlumnuList on user state change
    useEffect(() => {
        _ReassignAlumnuList()
    }, [user])


    return (
        <>
            {/* head */}
            <Head>
                <title>Alumni List - UCC Project Alumnus</title>
                <meta name="description" content="University of Caloocan City - Alumni Management System" />
            </Head>

            {/* animated background */}
            <motion.div
                variants={_Transition_Blob_Bottom}
                initial="initial" animate="animate" exit="exit"
                className="absolute top-0 left-0 w-full h-screen z-0 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600"
            />

            {/* alumnus section */}
            <motion.main
                variants={_Transition_Page}
                initial="initial" animate="animate" exit="exit"
                className="relative min-h-screen flex flex-col px-5 lg:px-20 z-10 "
            >

                {/* landing section */}
                <section className="relative min-h-screen flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold text-center text-base-content ">Alumni Members List</h1>
                    <p className="text-center text-xl mt-5">See people who became part of the University of Caloocan City.</p>

                    {/* display a toast if the user is not signed in */}
                    {(user && !loading) ? (
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
                                <span>Please sign in to view the list</span>
                            </div>
                        </motion.div>
                    )}
                </section>

                {/* alumnus list section */}
                {/* only show alumnus list section if user object is existing and has value */}
                {user && (
                    <section className="min-h-screen flex flex-col pt-28 mb-36">
                        <h1 className="text-4xl font-bold text-center">Alumnus List</h1>

                        {/* action section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 my-10 gap-5">
                            <div className="flex flex-col">
                                <label className="label">
                                    <span className="label-text">Search an Alumnus</span>
                                </label>
                                <div className="input-group">
                                    <input onChange={e => {
                                        set_searchAndFilterState({
                                            ..._searchAndFilterState,
                                            searchQuery: e.target.value
                                        })
                                    }} type="text" placeholder="Find someone here. Just type and it will appear" className="w-full input input-base-100 input-bordered " />
                                </div>
                                <div className="self-end">
                                    <select onChange={
                                        e => {
                                            set_searchAndFilterState({
                                                ..._searchAndFilterState,
                                                orderBy: e.target.value
                                            })
                                        }
                                    } className="select select-bordered lg:hidden input-sm md:input-md">
                                        <option disabled defaultValue="createdAt">Select Category</option>
                                        <option value="createdAt">Date Added</option>
                                        <option value="surname">Surname</option>
                                        <option value="givenName">Given Name</option>
                                        <option value="currentEmail">Email</option>
                                    </select>
                                    <select onChange={
                                        e => {
                                            set_searchAndFilterState({
                                                ..._searchAndFilterState,
                                                orderDirection: e.target.value
                                            })
                                        }
                                    } className="select select-bordered lg:hidden input-sm md:input-md">
                                        <option disabled defaultValue="ASC">Select Order </option>
                                        <option value="ASC">Ascending</option>
                                        <option value="DESC">Descending</option>
                                    </select>
                                </div>
                            </div>
                            <div className="w-full justify-end gap-5 hidden lg:flex">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Sort By</span>
                                    </label>
                                    <select onChange={
                                        e => {
                                            set_searchAndFilterState({
                                                ..._searchAndFilterState,
                                                orderBy: e.target.value
                                            })
                                        }
                                    } className="select select-bordered select-sm lg:select-md">
                                        <option disabled defaultValue="createdAt">Select Category</option>
                                        <option value="createdAt">Date Added</option>
                                        <option value="surname">Surname</option>
                                        <option value="givenName">Given Name</option>
                                        <option value="currentEmail">Email</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Order By</span>
                                    </label>
                                    <select onChange={
                                        e => {
                                            set_searchAndFilterState({
                                                ..._searchAndFilterState,
                                                orderDirection: e.target.value
                                            })
                                        }
                                    } className="select select-bordered select-sm lg:select-md">
                                        <option disabled defaultValue="ASC">Select Order </option>
                                        <option value="ASC">Ascending</option>
                                        <option value="DESC">Descending</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        {/* loop filteredAlumniList and display card on each *IF* the user is existing  */}
                        <motion.div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {user && filteredAlumniList.map((alumnus) => (
                                <Alumnus_Card alumniData={alumnus} key={alumnus.id} />
                            ))}
                        </motion.div>

                        {/* display a simple note that the searched user is not existing or the user is searching for himself/herself */}
                        <AnimatePresence>
                            {(filteredAlumniList.length < 1) && (
                                <>
                                    <motion.div
                                        variants={_Transition_Card}
                                        initial="initial" animate="animate" exit="exit"
                                        layout>
                                        <p className="text-2xl text-center">Seems like that person does not exist in our database.</p>
                                        <p className="text-lg text-center text-gray-500 mt-2">
                                            If you&apos;re looking for yourself.
                                            <Link href="/profile" scroll>
                                                <span className="ml-2 link">Go here</span>
                                            </Link>
                                        </p>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </section>
                )}

            </motion.main>
        </>
    )
}

export default Listing