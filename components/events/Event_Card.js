import { AnimatePresence, motion } from "framer-motion"
import dayjs from "dayjs"
import { _Transition_Card } from "../_Animations"
import Link from "next/link"
import { useState } from "react"
import { CgReadme, CgSpinner } from "react-icons/cg"

const Event_Card = ({ eventTitle, eventSlug, createdAt, id, eventAuthors }) => {

    const [loading, setLoading] = useState(false)

    return (
        <motion.div
            variants={_Transition_Card}
            initial="initial" animate="animate" exit="exit"
            // whileHover={{ translateY: -5 }}
            key={id} className="card card-bordered shadow border-2 border-base-content bg-base-200 transition-colors hover:bg-neutral hover:text-neutral-content">
            <div className="card-body p-5">
                <h2 className="card-title">{eventTitle}</h2>
                <p className="text-sm">
                    <span className="text-slate-500">Created At: </span>
                    {dayjs(createdAt).format("MM/DD/YYYY - h:mma")}
                </p>
                <p className="text-sm">
                    <span className="text-slate-500">Created By: </span>
                    {eventAuthors.name}
                </p>
                <div className="card-actions justify-end flex items-center">
                    {!loading && (
                        <Link href={{
                            pathname: `/events/${eventSlug}`,
                            query: {
                                id: id,
                            }
                        }} scroll={false} >
                            <button

                                onClick={() => setLoading(true)}
                                className="btn btn-primary btn-sm">
                                <CgReadme size={25} />
                                <span className="ml-3">Read More</span>
                            </button>
                        </Link>
                    )}
                    {loading && (

                        <motion.div
                            animate={{ rotate: ["0deg", '360deg'] }}
                            transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
                        >
                            <CgSpinner size={25} />
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default Event_Card