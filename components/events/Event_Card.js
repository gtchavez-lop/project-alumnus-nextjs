import { motion } from "framer-motion"
import dayjs from "dayjs"
import { _Transition_Card } from "../_Animations"
import Link from "next/link"

const Event_Card = ({ title, id, created_at, slug, author }) => {
    return (
        <motion.div
            variants={_Transition_Card}
            initial="initial" animate="animate" exit="exit"
            whileHover={{ translateY: -5 }}
            key={id} className="card card-side card-bordered shadow-2xl border-2 border-slate-400 bg-base-200">
            <div className="card-body p-5">
                <h2 className="card-title">{title}</h2>
                <p className="text-sm">
                    <span className="text-slate-500">Created At: </span>
                    {dayjs(created_at).format("MM/DD/YYYY - h:mma")}
                </p>
                <p className="text-sm">
                    <span className="text-slate-500">Created By: </span>
                    {author}
                </p>
                <div className="card-actions justify-end">
                    <Link href={{
                        pathname: `/events/${slug}`,
                        query: {
                            id: id,
                        }
                    }} scroll={false} >
                        <button className="btn btn-primary">Read More</button>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default Event_Card