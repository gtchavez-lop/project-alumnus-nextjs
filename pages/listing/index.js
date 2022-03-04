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

const Listing = ({ }) => {

    const [isSearching, setIsSearching] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredAlumniList, setFilteredAlumniList] = useState([])
    const [orderBy, setOrderBy] = useState("createdAt")
    const [_alumniList, _setAlumniList] = useState([]);
    const [user, loading, error] = useAuthState(getAuth(firebaseApp));
    const _alumniList_Ref = useRef()
    const [_searchAndFilterState, set_searchAndFilterState] = useState({
        searchQuery: "",
        orderBy: "createdAt",
        orderDirection: "ASC"
    })

    // fetch alumni list on page load
    useEffect(() => {
        try {
            if (user) {
                apolloClient.query({
                    query: gql`
                        query {
                            alumniLists (where: {currentEmail_not: "${user.email}"}, orderBy: ${orderBy}_${orderDirection}) {
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
                            }
                        }
                    `
                }).then(res => {
                    _setAlumniList(res.data.alumniLists)
                    _alumniList_Ref.current = res.data.alumniLists
                })
            }
        }
        catch (error) {
            console.log(error)
        }

    }, [user])

    // fetch alumni list on search
    useEffect(() => {
        if (user) {
            try {
                console.log(_searchAndFilterState)
                if (_searchAndFilterState) {
                    apolloClient.query({
                        query: gql`
                        query {
                            alumniLists (
                                where: {
                                    currentEmail_not: "${user.email}",
                                    OR: [
                                        {surname_contains: "${_searchAndFilterState.searchQuery}"},
                                        {givenName_contains: "${_searchAndFilterState.searchQuery}"},
                                    ]
                                }, 
                                orderBy: ${_searchAndFilterState.orderBy}_${_searchAndFilterState.orderDirection}) {
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
                                }
                            }
                        `
                    }).then(res => {
                        _setAlumniList(res.data.alumniLists)
                    })
                } else {
                    _setAlumniList(_alumniList_Ref.current)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }, [_searchAndFilterState])

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
                className="absolute top-0 left-0 w-full h-screen z-0 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600"
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
                    <p className="text-center text-xl mt-5">
                        See people who became part of the University of Caloocan City.
                    </p>

                    {/* scrolldown */}
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

                {/* events content */}

                {user && (
                    <section className="min-h-screen flex flex-col pt-28 mb-36">
                        <h1 className="text-4xl font-bold text-center">Alumnus List</h1>

                        <div className="grid grid-cols-1 lg:grid-cols-2 my-10 gap-5">
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Search an Alumnus</span>
                                </label>
                                <div className="flex space-x-2">
                                    <input onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Find someone here. Just type and it will appear" className="w-full input input-base-100 input-bordered" />
                                </div>
                            </div> */}
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


                        <motion.div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {_alumniList.map((alumnus) => (
                                <Alumnus_Card alumniData={alumnus} key={alumnus.id} />
                            ))}
                        </motion.div>
                        <AnimatePresence>
                            {(_alumniList.length < 1) && (
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

            </motion.div>
        </>
    )
}

export default Listing