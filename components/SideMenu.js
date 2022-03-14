import { motion } from "framer-motion"
import Link from "next/link"
import { _Transition_SideMenu_Content, _Transition_SideMenu_Overlay } from "./_Animations"

const SideMenu = ({ toggleSideMenu }) => {
    return (
        <>
            {/* overlay */}
            <motion.div
                onClick={(e) => { toggleSideMenu(); }}
                variants={_Transition_SideMenu_Overlay}
                initial="initial" animate="animate" exit="exit"
                className="fixed w-full h-full top-0 left-0 bg-base-300 bg-opacity-50 z-40 lg:hidden">
                {/* content */}
                <motion.div
                    variants={_Transition_SideMenu_Content}
                    initial="initial" animate="animate" exit="exit"
                    className="absolute top-0 left-0 w-3/4 md:w-1/2 h-full bg-base-300 flex flex-col justify-center overflow-hidden shadow-md">
                    <div className="flex flex-col gap-1">
                        <Link href='/' scroll={false} >
                            <button className="btn btn-ghost rounded-none">Home</button>
                        </Link>
                        <Link href='/listing' scroll={false} >
                            <button className="btn btn-ghost rounded-none">Listing</button>
                        </Link>
                        <Link href='/events' scroll={false} >
                            <button className="btn btn-ghost rounded-none">News &#x26; Events</button>
                        </Link>
                        <Link href='/merch' scroll={false} >
                            <button className="btn btn-ghost rounded-none">Merchandise</button>
                        </Link>``
                        <div className="divider" />
                        <button className="btn btn-ghost rounded-none">About</button>
                        <button className="btn btn-ghost rounded-none">Contact</button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}

export default SideMenu