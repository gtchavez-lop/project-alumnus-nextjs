import { motion } from "framer-motion"
import dayjs from "dayjs"
import { _Transition_Card } from "../_Animations"
import { CgReadme, CgUser, CgUserList } from "react-icons/cg"

const Alumnus_Card = ({ instance_id, name_last, name_given, student_id, graduation_date, program_affiliated }) => {
    return (
        <>
            <motion.div
                variants={_Transition_Card}
                initial="initial" animate="animate" exit="exit"
                whileHover={{ translateY: -5 }}
                key={instance_id} className="card card-bordered shadow-2xl border-2 border-base-content bg-base-200 select-none">
                <div className="card-body p-5">
                    <h2 className="card-title flex items-center">
                        <CgUser size={30} />
                        <span className="ml-5">{name_last}, {name_given}</span>
                    </h2>

                    <p className="text-sm">
                        {student_id}
                    </p>
                    <p>
                        {program_affiliated}
                    </p>
                    <p className="text-sm mt-5">
                        <span className="text-slate-500">Graduated since: </span>
                        {dayjs(graduation_date).format("MMMM D, YYYY")}
                    </p>
                    <div className="card-actions justify-end">
                        <button
                            className="btn btn-sm btn-disabled">
                            <CgUserList size={25} />
                            <span className="ml-3">Not yet Available</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Alumnus_Card