import { motion } from "framer-motion"
import dayjs from "dayjs"
import { _Transition_Card } from "../_Animations"
import { CgReadme, CgUser, CgUserList } from "react-icons/cg"

const Alumnus_Card = ({ surname, givenName, programCompleted, graduationDate, id }) => {
    return (
        <>
            <motion.div
                variants={_Transition_Card}
                initial="initial" animate="animate" exit="exit"
                whileHover={{ translateY: -5 }}
                key={id} className="card card-bordered shadow border-2 border-base-content bg-base-200 select-none">
                <div className="card-body p-5">
                    <h2 className="card-title flex items-center">
                        <CgUser size={30} />
                        <span className="ml-5">{surname}, {givenName}</span>
                    </h2>

                    <p>
                        {programCompleted}
                    </p>
                    <p className="text-sm mt-2">
                        <span className="text-slate-500">Graduated since: </span>
                        {dayjs(graduationDate).format("MMMM D, YYYY")}
                    </p>
                    <div className="card-actions justify-end mt-5">
                        <button
                            className="btn btn-sm btn-disabled">
                            <CgUserList size={25} />
                            <span className="ml-3">View Profile (unavailable)</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Alumnus_Card