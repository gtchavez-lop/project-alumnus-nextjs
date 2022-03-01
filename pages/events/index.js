import Head from "next/head"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CgSpinner } from "react-icons/cg"
import { gql } from "@apollo/client"

import apolloClient from "../../apolloClient"
import { _Transition_Blob_Bottom, _Transition_Blob_Top, _Transition_Card, _Transition_Page } from "../../components/_Animations"
import Event_Card from "../../components/events/Event_Card"

// get blog data
export const getStaticProps = async () => {
    const { data } = await apolloClient.query({
        query: gql`
            query {
                news_And_Events {
                    id
                    createdAt
                    eventTitle
                    eventSlug
                    eventContent { markdown }
                    displayImage { url }
                    eventAuthors { name authorSlug }
                    eventTags
                }
            }
        `
    })
    return {
        props: {
            Table_Events: data.news_And_Events
        }
    }
}

const Events = ({ Table_Events }) => {

    const [events, setEvents] = useState()
    const [loaded, setLoaded] = useState(true)

    return (
        <>
            <Head>
                <title>News and Events - UCC Project Alumnus</title>
                <meta name="description" content="University of Caloocan City - Alumni Management System" />
            </Head>

            {/* desgn | blob */}
            <motion.div
                variants={_Transition_Blob_Top}
                initial="initial" animate="animate" exit="exit"
                className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-tl from-teal-600 via-blue-700 to-purple-600"
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
                        News and Events
                    </h1>
                    {/* description */}
                    <p className="text-center text-xl mt-5">
                        See what is happening in the University of Caloocan City.

                    </p>

                    {/* scrolldown */}
                    <motion.p
                        variants={_Transition_Card}
                        initial="initial" animate="animate" exit="exit"
                        className="absolute bottom-10 select-none text-base-content text-opacity-50">Scroll down to see the events</motion.p>

                </section>

                {/* events content */}
                <section className="min-h-screen flex flex-col py-32">
                    <h1 className="text-4xl font-bold text-center">Events</h1>

                    <AnimatePresence>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {Table_Events.map((event) => (
                                <Event_Card {...event} key={event.id} />
                            ))}
                        </div>
                    </AnimatePresence>

                    <AnimatePresence>
                        <div className="mt-10 flex flex-col gap-5 justify-center items-center">
                            {!loaded && (
                                <>
                                    <motion.div
                                        animate={{ rotate: ["0deg", '360deg'] }}
                                        transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
                                    >
                                        <CgSpinner size={100} />
                                    </motion.div>
                                    <p>Fetching Data</p>
                                </>
                            )}
                        </div>
                    </AnimatePresence>
                </section>

            </motion.div>
        </>
    )
}

export default Events