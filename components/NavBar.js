import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CgClose, CgMenu, CgProfile, CgShoppingCart, CgUserList, CgWebsite } from 'react-icons/cg'
import SideMenu from "./SideMenu"

const NavBar = e => {

    const [_sideMenuOpen, _toggleSideMenu] = useState(false)
    const [_scrollY, _setScrollY] = useState(0)

    useEffect(() => {
        window.onscroll = () => {
            _setScrollY(window.scrollY)
        }
    }, [_scrollY])

    return (
        <>
            {/* sidemenu */}
            <AnimatePresence exitBeforeEnter>
                {_sideMenuOpen && (
                    <SideMenu toggleSideMenu={() => _toggleSideMenu(false)} />
                )}
            </AnimatePresence>
            {/* navbar */}
            <div className={`fixed top-0 left-0 w-full navbar justify-between px-5 lg:px-28 z-50 transition-all ${_scrollY > 150 ? 'bg-neutral shadow-lg text-primary ' : 'bg-transparent py-10 text-base-content'}`}>
                <div className="flex">
                    <Link href='/' scroll={false}>
                        <div className="cursor-pointer hidden lg:flex items-center">
                            <Image src='/pa-transparent-white.png' width={30} height={30} />
                            <span className={`ml-3 font-bold transition-all ${_scrollY < 150 ? 'text-xl' : ''}`}>
                                UCC Project Alumnus
                            </span>
                        </div>
                    </Link>
                    <button
                        onClick={() => _toggleSideMenu(!_sideMenuOpen)}
                        className="btn btn-ghost btn-square lg:hidden">
                        {_sideMenuOpen ? <CgClose size={25} /> : <CgMenu size={25} />}
                    </button>
                </div>
                <div className="lg:hidden flex">
                    <Link href='/' scroll={false}>
                        <div className="cursor-pointer flex items-center">
                            <Image src='/pa-transparent-white.png' width={30} height={30} />
                        </div>
                    </Link>
                </div>
                <div className="flex gap-2">
                    <div className="lg:flex items-center hidden gap-2">
                        <Link href='/events' scroll={false}>
                            <button className="btn btn-ghost btn-sm gap-2 items-center"> <CgWebsite size={25} /> Events </button>
                        </Link>
                        <Link href='/listing' scroll={false}>
                            <button className="btn btn-ghost btn-sm gap-2 items-center"> <CgUserList size={25} /> Listing </button>
                        </Link>
                    </div>
                    <div className="divider divider-vertical mx-0 hidden lg:flex" />
                    <button className="btn btn-ghost btn-sm btn-square"> <CgShoppingCart size={25} /> </button>
                    <button className="btn btn-ghost btn-sm btn-square"> <CgProfile size={25} /> </button>
                </div>

            </div>
        </>
    )
}

export default NavBar