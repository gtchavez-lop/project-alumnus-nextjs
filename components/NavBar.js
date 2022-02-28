import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CgClose, CgDarkMode, CgMenu, CgProfile, CgShoppingCart, CgUserList, CgWebsite } from 'react-icons/cg'
import { themeChange } from "theme-change"
import SideMenu from "./SideMenu"

const NavBar = e => {



    const [_sideMenuOpen, _toggleSideMenu] = useState(false)
    const [_scrollY, _setScrollY] = useState(0)

    useEffect(() => {
        window.onscroll = () => {
            _setScrollY(window.scrollY)
        }
    }, [_scrollY])

    useEffect(() => {
        themeChange(false)
    }, [])

    return (
        <>
            {/* sidemenu */}
            <AnimatePresence exitBeforeEnter>
                {_sideMenuOpen && (
                    <SideMenu toggleSideMenu={() => _toggleSideMenu(false)} />
                )}
            </AnimatePresence>
            {/* navbar */}
            <div className={`fixed top-0 left-0 w-full navbar justify-between px-5 lg:px-28 z-50 transition-all ${_scrollY > 100 ? 'bg-neutral shadow-2xl text-neutral-content' : 'bg-transparent py-10 text-base-content'}`}>
                <div className="flex">
                    <Link href='/' scroll={false}>
                        <div className="cursor-pointer hidden lg:flex items-center">
                            <Image src='/pa-transparent-white.png' width={30} height={30} />
                            <span className={`ml-3 font-bold transition-all ${_scrollY < 100 ? 'text-xl' : ''}`}>
                                UCC Project Alumnus
                            </span>
                        </div>
                    </Link>
                    <a
                        onClick={() => _toggleSideMenu(!_sideMenuOpen)}
                        className="btn btn-ghost btn-square lg:hidden">
                        {_sideMenuOpen ? <CgClose size={25} /> : <CgMenu size={25} />}
                    </a>
                </div>
                <div className="lg:hidden flex">
                    <Link href='/' scroll={false}>
                        <div className="cursor-pointer flex items-center">
                            <Image src='/pa-transparent-white.png' width={30} height={30} />
                        </div>
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="lg:flex items-center hidden gap-2">
                        <Link href='/events' scroll={false}>
                            <a className="btn btn-ghost gap-2 items-center"> <CgWebsite size={25} /> Events </a>
                        </Link>
                        <Link href='/listing' scroll={false}>
                            <a className="btn btn-ghost gap-2 items-center"> <CgUserList size={25} /> Alumni List </a>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <a className="btn btn-ghost btn-square hidden lg:flex"> <CgShoppingCart size={25} /> </a>

                        <a
                            data-toggle-theme="corporate,busness"
                            className="btn btn-ghost btn-square">
                            <CgDarkMode size={25} />
                        </a>

                        <div className="dropdown dropdown-end dropdown-hover items-center">
                            <label tabIndex={0} className="btn btn-ghost btn-square"><CgProfile size={25} /></label>
                            <ul className="p-2 menu dropdown-content bg-neutral text-neutral-content rounded w-max">
                                <li><a className="text-right">Sign In</a></li>
                                <li>
                                    <Link href='/register' scroll={false} passHref>
                                        <a className="text-right">Register an account</a>
                                    </Link>
                                </li>
                            </ul>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default NavBar