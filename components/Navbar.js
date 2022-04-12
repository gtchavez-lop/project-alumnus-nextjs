import { useState, useEffect } from 'react'
import { motion, useViewportScroll } from 'framer-motion'
import { themeChange } from 'theme-change'

const Navbar = e => {

    const { scrollY } = useViewportScroll()
    const [_scrollY, _setScrollY] = useState(0)
    const [_thresholdReached, _setThresholdReached] = useState(false)
    const [_themeSelected, _setThemeSelected] = useState("")

    useEffect(() => {
        themeChange(false)
        _setThemeSelected(window.localStorage.getItem("theme"))
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", e => {
            scrollY.get() > 100 ? _setThresholdReached(true) : _setThresholdReached(false)
            _setScrollY(scrollY.get())
        })
    }, [_scrollY])

    return (
        <>
            <div className={`${!_thresholdReached ? "bg-opacity-0" : "bg-opacity-100"} bg-base-200 fixed w-full flex justify-center items-center px-10 md:px-20 xl:px-0 z-[99] transition-colors`}>
                <div className="navbar max-w-5xl">
                    <div className="navbar-start">
                        <a className="btn btn-ghost normal-case text-lg">Project Alumnus</a>
                    </div>
                    <div className="navbar-end gap-4">
                        <div className='hidden md:flex gap-1 justify-end'>
                            <a className='btn btn-ghost'>Events</a>
                            <a className='btn btn-ghost'>Merch</a>
                            <a className='btn btn-ghost'>Listing</a>
                        </div>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://api.lorem.space/image/face?hash=33791" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                <li><a>Logout</a></li>
                                <div className='divider' />
                                <li><a>Profile</a></li>
                                <li><a>Events</a></li>
                                <li><a>Merch</a></li>
                                <li><a>Listing</a></li>
                                <div className='divider' />
                                <li>
                                    {
                                        _themeSelected === "dark" ?
                                            <a data-set-theme="light" onClick={() => _setThemeSelected("light")}>Light Mode</a>
                                            :
                                            <a data-set-theme="dark" onClick={() => _setThemeSelected("dark")}>Dark Mode</a>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar