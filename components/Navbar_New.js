import Logo from "./Logo"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// icons
import { CgSun, CgMoon, CgMenu, CgClose } from 'react-icons/cg'
import { themeChange } from "theme-change";


const Navbar_New = e => {

    const [_themeSelected, _setThemeSelected] = useState("");
    const [_menuShown, _setMenuShown] = useState(false);

    // initiate theme state
    useEffect(e => {
        themeChange(false);
        let temp = window.localStorage.getItem('theme')
        _setThemeSelected(temp == 'corporate' ? 'corporate' : 'business')
    }, [])

    return (
        <>
            <nav className="fixed top-0 left-0 navbar px-5 md:px-10 lg:px-28 py-5 z-50">
                {/* desktop */}
                <div className="navbar-start hidden lg:flex gap-10">
                    <label className="btn btn-ghost btn-square swap swap-rotate place-items-center content-center">
                        <input
                            checked={_menuShown ? true : false}
                            onChange={e => _setMenuShown(e.target.checked)}
                            type='checkbox'
                        />
                        <CgClose size={25} className="swap-on" />
                        <CgMenu size={25} className="swap-off" />
                    </label>
                    {!_menuShown ? (
                        <Link href="/">
                            <motion.div
                                initial={{ opacity: 0, x: -10, transition: { duration: 0.5, ease: "backOut" } }}
                                animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: "backOut" } }}
                                className={`flex items-center gap-5 cursor-pointer`}>
                                <Logo width={30} height={30} strokeWidth={100} strokeColor={_themeSelected == "business" ? "#D4D4D4" : "#181A2A"} />
                                <p className="text-lg font-bold">UCC Project Alumnus</p>
                            </motion.div>
                        </Link>

                    ) : (
                        <motion.ul

                            initial={{ opacity: 0, x: -10, transition: { duration: 0.5, ease: "backOut" } }}
                            animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: "backOut" } }}
                            className={`flex items-center gap-2`}>
                            <li className="btn btn-ghost">Home</li>
                            <li className="btn btn-ghost">Alumni List</li>
                            <li className="btn btn-ghost">Merch</li>
                        </motion.ul>

                    )}
                </div>
                {/* mobile */}
                <div className="navbar-start lg:hidden">
                    <label className="btn btn-ghost btn-square swap swap-rotate place-items-center content-center">
                        <input
                            checked={_menuShown ? true : false}
                            onChange={e => _setMenuShown(e.target.checked)}
                            type='checkbox'
                        />
                        <CgClose size={25} className="swap-on" />
                        <CgMenu size={25} className="swap-off" />
                    </label>
                </div>

                {/* mobile only */}
                <div className={`navbar-center lg:hidden`}>
                    <Logo width={30} height={30} strokeWidth={100} strokeColor={_themeSelected == "business" ? "#D4D4D4" : "#181A2A"} />
                </div>
                <div className="navbar-end">
                    <label className="btn btn-circle btn-ghost swap swap-rotate place-items-center content-center">
                        <input
                            checked={_themeSelected === 'corporate' ? true : false}
                            onChange={e => {
                                let activeTheme = window.localStorage.getItem('theme')
                                _setThemeSelected(activeTheme === 'business' ? 'business' : 'corporate')
                            }}
                            data-toggle-theme="business,corporate" type="checkbox" />
                        <CgSun className="swap-on" size={25} />
                        <CgMoon className="swap-off" size={25} />
                    </label>
                </div>
            </nav>
        </>
    )
}

export default Navbar_New