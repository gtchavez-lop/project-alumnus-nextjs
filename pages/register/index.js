import { _Transition_Blob_Left, _Transition_Page } from "../../components/_Animations"
import { motion } from "framer-motion"

const RegisterPage = e => {
    return (
        <>
            <motion.div variants={_Transition_Blob_Left} initial="initial" animate="animate" exit="exit"
                className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 fixed top-0 left-0 w-full h-full -z-10"
            />
            <motion.div
                variants={_Transition_Page} initial="initial" animate="animate" exit="exit"
                className="min-h-screen flex flex-col-reverse lg:flex-row justify-end lg:justify-between items-center px-5 lg:px-32 gap-5 mt-64 lg:mt-0">
                {/* form */}
                <div className="flex flex-col lg:w-2/5 gap-3">
                    {/* <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Your email address</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered" />
                    </div>
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Your email address</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered" />
                    </div> */}
                </div>

                {/* title */}
                <div className="flex flex-col lg:text-right text-center">
                    <p className="text-5xl">Register an Account</p>
                    <p>Register and keep with the updates</p>
                </div>
            </motion.div>
        </>
    )
}

export default RegisterPage