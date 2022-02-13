import dayjs from "dayjs"
import { AnimatePresence, m, motion } from "framer-motion"
import Head from "next/head"
import { useEffect, useState } from "react"
import { CgSpinner, CgSpinnerAlt, CgSpinnerTwo, CgSpinnerTwoAlt } from "react-icons/cg"
import Event_Card from "../../components/events/Event_Card"
import { _Transition_Blob_Bottom, _Transition_Blob_Top, _Transition_Card, _Transition_Page } from "../../components/_Animations"
import _SupabaseClient from "../../components/_SupabaseClient"


const Events = e => {

    // fetch Events Table Data
    const [events, setEvents] = useState()
    const [loaded, setLoaded] = useState(false)

    useEffect(async () => {
        let { data: Table_Events, error } = await _SupabaseClient
            .from('Table_Events')
            .select('*')

        if (!error) {
            setEvents(Table_Events);
            setTimeout(() => {
                setLoaded(true)
            }, 100);
        }

    }, [])

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
                className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600"
            />
            {/* event pag */}
            <motion.div
                variants={_Transition_Page}
                initial="initial" animate="animate" exit="exit"
                className="relative min-h-screen flex flex-col px-5 lg:px-20 z-10 "
            >

                {/* initial page */}
                <section className="relative min-h-screen flex flex-col justify-center items-center">
                    <h1 className="text-5xl font-bold text-center bg-gradient-to-bl from-gray-700 via-gray-900 to-black bg-clip-text text-transparent ">
                        News and Events
                    </h1>
                    {/* description */}
                    <p className="text-center text-xl mt-12">
                        See what is happening in the University of Caloocan City.

                    </p>

                    {/* scrolldown */}
                    <p className="absolute bottom-10 select-none text-gray-600">Scroll Down to see more</p>
                </section>

                {/* events content */}
                <section className="min-h-screen flex flex-col py-32">
                    <h1 className="text-4xl font-bold text-center">Events</h1>

                    <AnimatePresence>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {loaded && events.map((event) => (
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