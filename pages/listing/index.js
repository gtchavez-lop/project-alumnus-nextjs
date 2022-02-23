import Head from "next/head"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { _Transition_Blob_Bottom, _Transition_Blob_Top, _Transition_Page } from "../../components/_Animations"
import { CgSpinner } from "react-icons/cg"


import Alumnus_Card from "../../components/listing/Alumnus_Card"
import apolloClient from "../../apolloClient"
import { gql } from "@apollo/client"

export const getServerSideProps = async () => {
    const { data } = await apolloClient.query({
        query: gql`
            query {
                alumniLists {
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
                    startingWorkDate
                    endingWorkDate
                  }
            }
        `
    })

    const { alumniLists } = data

    return {
        props: {
            alumniList: alumniLists
        }
    }
}

const Listing = ({ alumniList }) => {

    const [isSearching, setIsSearching] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredAlumniList, setFilteredAlumniList] = useState([])
    const [sortedBy, setSortedBy] = useState("")

    // search alumni
    useEffect(() => {
        if (searchQuery.length > 0) {
            setIsSearching(true)
            const filteredAlumni = alumniList.filter(alumni => {
                return alumni.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    alumni.givenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    alumni.currentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    alumni.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) // ||
                // alumni.company.toLowerCase().includes(searchQuery.toLowerCase())
            })
            // sort using switch case
            switch (sortedBy) {
                case "surname":
                    filteredAlumni.sort((a, b) => {
                        if (a.surname < b.surname) return -1
                        if (a.surname > b.surname) return 1
                        return 0
                    })
                    break;
                case "givenName":
                    filteredAlumni.sort((a, b) => {
                        if (a.givenName < b.givenName) return -1
                        if (a.givenName > b.givenName) return 1
                        return 0
                    })
                    break;
                case "email":
                    filteredAlumni.sort((a, b) => {
                        if (a.currentEmail < b.currentEmail) return -1
                        if (a.currentEmail > b.currentEmail) return 1
                        return 0
                    })
                    break;
                case "location":
                    filteredAlumni.sort((a, b) => {
                        if (a.currentLocation < b.currentLocation) return -1
                        if (a.currentLocation > b.currentLocation) return 1
                        return 0
                    })
                    break;
                case "company":
                    filteredAlumni.sort((a, b) => {
                        if (a.company < b.company) return -1
                        if (a.company > b.company) return 1
                        return 0
                    })
                    break;
                // default sort by createdAt
                default:
                    filteredAlumni.sort((a, b) => {
                        if (a.createdAt < b.createdAt) return -1
                        if (a.createdAt > b.createdAt) return 1
                        return 0
                    })
                    break;
            }

            setFilteredAlumniList(filteredAlumni)
        } else {
            setIsSearching(false)
            setFilteredAlumniList([])
            // sort using switch case
        }
    }, [searchQuery])

    // manually sort alumni
    const sortAlumni = (sortBy) => {
        setSortedBy(sortBy)

        if (sortedBy.length > 0) {
            const filteredAlumni = alumniList.filter(alumni => {
                return alumni.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    alumni.givenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    alumni.currentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    alumni.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) // ||
                // alumni.company.toLowerCase().includes(searchQuery.toLowerCase())
            })
            // set searching to true
            setIsSearching(true)
            // sort using switch case
            switch (sortedBy) {
                case "surname":
                    alumniList.sort((a, b) => {
                        if (a.surname < b.surname) return -1
                        if (a.surname > b.surname) return 1
                        return 0
                    })
                    break;
                case "givenName":
                    alumniList.sort((a, b) => {
                        if (a.givenName < b.givenName) return -1
                        if (a.givenName > b.givenName) return 1
                        return 0
                    })
                    break;
                case "email":
                    alumniList.sort((a, b) => {
                        if (a.currentEmail < b.currentEmail) return -1
                        if (a.currentEmail > b.currentEmail) return 1
                        return 0
                    })
                    break;
                case "location":
                    alumniList.sort((a, b) => {
                        if (a.currentLocation < b.currentLocation) return -1
                        if (a.currentLocation > b.currentLocation) return 1
                        return 0
                    })
                    break;
                case "company":
                    alumniList.sort((a, b) => {
                        if (a.company < b.company) return -1
                        if (a.company > b.company) return 1
                        return 0
                    })
                    break;
                // default sort by createdAt
                default:
                    alumniList.sort((a, b) => {
                        if (a.createdAt < b.createdAt) return -1
                        if (a.createdAt > b.createdAt) return 1
                        return 0
                    })
                    break;
            }

            setFilteredAlumniList(filteredAlumni)
        } else {
            setIsSearching(false)
            setFilteredAlumniList([])
        }
    }

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
                    <p className="text-center text-xl mt-12">
                        See people who became part of the University of Caloocan City.
                    </p>

                    {/* scrolldown */}
                    <p className="absolute bottom-10 select-none text-base-content text-opacity-50">Scroll Down to see more</p>
                </section>

                {/* events content */}
                <section className="min-h-screen flex flex-col pt-28 mb-36">
                    <h1 className="text-4xl font-bold text-center">Alumnus List</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Search an Alumnus</span>
                            </label>
                            <div className="flex space-x-2">
                                <input onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Find someone here. Just type and it will appear" className="w-full input input-base-100 input-bordered" />
                            </div>
                        </div>
                        <div className="flex w-full justify-end gap-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Sort By</span>
                                </label>
                                <select onChange={
                                    e => {
                                        sortAlumni(e.target.value);
                                    }
                                } className="select select-bordered">
                                    <option disabled defaultValue="createdAt">Select Category</option>
                                    <option value="createdAt">Date Added</option>
                                    <option value="surname">Surname</option>
                                    <option value="givenName">Given Name</option>
                                    <option value="email">Email</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Order By</span>
                                </label>
                                <select className="select select-bordered select-disabled">
                                    <option disabled defaultValue="asc">Select Order (unavailable)</option>
                                    <option>Ascending</option>
                                    <option>Descending</option>
                                </select>
                            </div>
                        </div>

                    </div>


                    <motion.div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        <AnimatePresence>
                            {!isSearching && alumniList.map((alumnus) => (
                                <Alumnus_Card alumniData={alumnus} key={alumnus.id} />
                            ))}
                        </AnimatePresence>
                        <AnimatePresence>
                            {isSearching && filteredAlumniList.map((alumnus) => (
                                <Alumnus_Card alumniData={alumnus} key={alumnus.id} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    <AnimatePresence>
                        {(filteredAlumniList.length < 1 && searchQuery.length > 0) && (
                            <>
                                <motion.div
                                    layout>
                                    <p className="text-2xl text-center">We do not have that</p>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </section>

            </motion.div>
        </>
    )
}

export default Listing