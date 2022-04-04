import Logo from "./Logo"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useViewportScroll, LayoutGroup } from 'framer-motion'
import { useAuth } from '../components/_AuthProvider'

// icons
import { CgSun, CgMoon, CgShoppingBag, CgHome, CgSearch, CgArrowLeft, CgChevronDown, CgLogOut, CgCalendar, CgUserList, CgPen, CgLogIn, CgSpinner } from 'react-icons/cg'
import { themeChange } from "theme-change";

// firebase auth
import { gql } from "@apollo/client"
import apolloClient from "apolloClient"

const NavSearchBar = ({ closeSearchBar, alumniList }) => {

    const [_searchResultOpen, _setSearchResultOpen] = useState(false)
    const [_searchString, _setSearchString] = useState("")

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ ease: "circOut", duration: 0.3 }}
                onClick={e => {
                    if (e.target === e.currentTarget) closeSearchBar()
                }}
                className="fixed w-full h-full z-40 lg:hidden bg-base-100 bg-opacity-75 flex flex-col">
                <motion.div
                    initial={{ translateX: -20, }}
                    animate={{ translateX: 0, }}
                    exit={{ translateX: -20, }}
                    transition={{ ease: "circOut", duration: 0.3 }}
                    className="fixed top-0 left-0 w-full p-2 md:pl-10 bg-base-300 flex items-center justify-stretch gap-5 rounded">
                    <motion.div
                        onClick={closeSearchBar}
                        className="btn btn-ghost btn-circle">
                        <CgArrowLeft size={25} />
                    </motion.div>
                    <input
                        disabled
                        value={_searchString}
                        onChange={e => { e.currentTarget.value.length > 0 ? _setSearchResultOpen(true) : _setSearchResultOpen(false); _setSearchString(e.currentTarget.value) }}
                        className="w-full p-6 bg-base-300 rounded" type="text" placeholder="Search (unavailable)" />
                </motion.div>

                {
                    _searchResultOpen && (
                        <ul className="menu w-full px-10 fixed top-16">
                            {alumniList.filter(alumni =>
                                alumni.givenName.toLowerCase().includes(_searchString.toLowerCase()) ||
                                alumni.surname.toLowerCase().includes(_searchString.toLowerCase()))
                                .map((alumni, index) => (
                                    <Link key={index} href="/alumni/[id]" as={`/alumni/${alumni.id}`}>
                                        <motion.li layout className="bg-base-200">
                                            <a>{alumni.givenName} {alumni.surname}</a>
                                        </motion.li>
                                    </Link>
                                ))
                            }
                        </ul>
                    )
                }

            </motion.div>
        </>
    )
}

const Navbar_New = e => {

    // const [_themeSelected, _setThemeSelected] = useState("");
    const [_menuShown, _setMenuShown] = useState(false);
    const [_searchShown, _setSearchShown] = useState(false);
    const [_isSearching, _setIsSearching] = useState(false)
    const [_userDisplayImage, _setUserDisplayImage] = useState()
    const [_alumniList, _setAlumniList] = useState([])
    const [_searchResultOpen, _setSearchResultOpen] = useState(false)
    const [_searchString, _setSearchString] = useState("")
    const [_isThresholdReached, _setIsThresholdReached] = useState(false)
    const [_themeSelected, _setThemeSelected] = useState("")
    const [_userEmail, _setUserEmail] = useState('')
    const [_userPassword, _setUserPassword] = useState('')
    const { scrollY, scrollYProgress } = useViewportScroll()
    const _userData_Ref = useRef()

    // user context
    const { currentUser, loading, userData, login, logout } = useAuth()


    // get user data method

    const getAlumniList = async e => {
        if (_user) {
            const query = gql`
                query {
                    alumniLists {
                        id
                        surname
                        givenName
                        alumniDisplayPhoto { url }
                    }
                }
            `

            const { data } = await apolloClient.query({ query })
            if (data) {
                let temp = data.alumniLists
                // console.log("data", data.alumniLists[0])
                _setAlumniList(temp)
                // _setUserDisplayImage(data.alumniLists[0].alumniDisplayPhoto.url)
            }
        }
    }


    // get scrollY position
    useEffect(e => {
        const handleScroll = e => {
            // _scrollY.current = window.scrollY
            if (scrollY.get() > 50) { _setIsThresholdReached(true) } else _setIsThresholdReached(false);
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // initiate theme state
    useEffect(e => {
        themeChange(false);

        // get theme value
        _setThemeSelected(window?.localStorage.getItem("theme"))
    }, [])


    const SignInUser = async e => {
        await login(_userEmail, _userPassword)
    }

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {_searchShown && <NavSearchBar alumniList={_alumniList} closeSearchBar={() => _setSearchShown(false)} />}
            </AnimatePresence>

            {
                _searchResultOpen && (
                    <div className="fixed w-full h-full top-0 z-40 bg-base-100 bg-opacity-75 flex justify-center"
                        onClick={e => {
                            if (e.target === e.currentTarget) _setSearchResultOpen(false);
                            _setSearchString("")
                        }}>
                        <ul className="menu w-1/2 px-10 mt-16 hidden lg:flex">
                            {_alumniList.filter(alumni =>
                                alumni.givenName.toLowerCase().includes(_searchString.toLowerCase()) ||
                                alumni.surname.toLowerCase().includes(_searchString.toLowerCase()))
                                .map((alumni, index) => (
                                    <Link key={index} href="/alumni/[id]" as={`/alumni/${alumni.id}`}>
                                        <motion.li layout className="bg-base-200">
                                            <a>{alumni.givenName} {alumni.surname}</a>
                                        </motion.li>
                                    </Link>
                                ))
                            }
                        </ul>

                    </div>
                )
            }

            <nav className={`fixed top-0 left-0 navbar px-5 md:px-10 lg:px-28 py-5 z-30 transition-colors ${_isThresholdReached ? 'bg-base-100' : 'bg-transparent'}`}>
                {/* desktop navstart */}
                <div className="hidden lg:flex navbar-start gap-5">
                    <Link href="/" passHref>
                        <div className="btn btn-ghost btn-square ">
                            <Logo width={30} height={30} strokeWidth={75} strokeColor={_themeSelected === "winter" ? "#394E6A" : "#E2E8F4"} />
                        </div>
                    </Link>
                    {currentUser ? (
                        // <label className="input-group ">
                        //     <input value={_searchString}
                        //         autoComplete="off"
                        //         autoCorrect="off"
                        //         autoFocus={false}
                        //         spellCheck={false}
                        //         tabIndex={-1}
                        //         disabled
                        //         onChange={e => { e.currentTarget.value.length > 0 ? _setSearchResultOpen(true) : _setSearchResultOpen(false); _setSearchString(e.currentTarget.value) }}
                        //         type="text" placeholder="Find someone here..." className="input input-bordered input-sm" />
                        //     <span><CgSearch size={15} /></span>
                        // </label>
                        <AnimatePresence AnimatePresence >
                            {
                                !_isThresholdReached && (
                                    <motion.div
                                        initial={{ opacity: 0, translateX: -20, transition: { duration: 0.2, easing: "easeOut" } }}
                                        animate={{ opacity: 1, translateX: 0, transition: { duration: 0.2, easing: "easeIn" } }}
                                        exit={{ opacity: 0, translateX: 20, transition: { duration: 0.2, easing: "easeOut" } }}
                                        className="hidden lg:flex gap-2 ml-3 ">
                                        <Link href="/" passHref>
                                            <div className="tooltip tooltip-bottom" data-tip="Home">
                                                <div className="btn btn-ghost btn-circle">
                                                    <CgHome size={25} />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="/events" passHref>
                                            <div className="tooltip tooltip-bottom" data-tip="News and Events">
                                                <div className="btn btn-ghost btn-circle">
                                                    <CgCalendar size={25} />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="/merch" passHref>
                                            <div className="tooltip tooltip-bottom" data-tip="Merchandise">
                                                <div className="btn btn-ghost btn-circle">
                                                    <CgShoppingBag size={25} />
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="/listing" passHref>
                                            <div className="tooltip tooltip-bottom" data-tip="Alumni List">
                                                <div className="btn btn-ghost btn-circle">
                                                    <CgUserList size={25} />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    ) : (
                        <p className="text-xl font-bold">UCC Alumnus</p>
                    )}
                </div>

                {/* mobile navstart */}
                <div className="navbar-start lg:hidden gap-1">
                    <Link href="/" passHref>
                        <div className="btn btn-ghost btn-circle">
                            <Logo width={30} height={30} strokeWidth={75} strokeColor={_themeSelected.current === "winter" ? "#394E6A" : "#B3C5EF"} />
                        </div>
                    </Link>
                    <motion.div
                        transition={{ duration: 0.2 }}
                        onClick={() => _setSearchShown(true)}
                        className="btn btn-ghost btn-circle">
                        <CgSearch size={25} />
                    </motion.div>
                </div>

                {/* navbar end */}
                <div className="navbar-end gap-1">

                    {
                        (currentUser && userData) ? (
                            <Link href="/me" passHref scroll={false}>
                                {
                                    _isThresholdReached ? (
                                        <motion.div className="btn btn-primary btn-outline btn-circle items-center rounded-full hidden lg:flex">
                                            <motion.div className="avatar">
                                                <motion.div layout transition={{ layout: { duration: 0.25, ease: [0.07, 0.85, 0.16, 0.94] } }} className="w-10 rounded-full overflow-hidden relative">
                                                    <Image src={userData.alumniDisplayPhoto?.url} layout="fill" />
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    ) : (
                                        <motion.div className="btn btn-primary btn-outline items-center rounded-full hidden lg:flex">
                                            <motion.div className="avatar">
                                                <motion.div layout transition={{ layout: { duration: 0.25, ease: [0.07, 0.85, 0.16, 0.94] } }} className="w-7 rounded-full overflow-hidden relative">
                                                    <Image src={userData.alumniDisplayPhoto?.url} layout="fill" />
                                                </motion.div>
                                            </motion.div>
                                            <motion.span className="ml-3">
                                                {userData.givenName}
                                            </motion.span>
                                        </motion.div>
                                    )
                                }
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2">
                                {
                                    !loading ? (
                                        <div className="flex items-center gap-2">
                                            <Link href="/register" passHref>
                                                <div className="btn btn-primary btn-circle">
                                                    <span><CgPen size={18} /></span>
                                                </div>
                                            </Link>
                                            <label htmlFor="SignIn_PopupWindow" className="btn btn-primary btn-outline btn-circle modal-button">
                                                <span><CgLogIn size={18} /></span>
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <motion.div animate={{ rotate: 360 }} transition={{ ease: 'linear', duration: 1, repeat: Infinity }}>
                                                <CgSpinner size={30} />
                                            </motion.div>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className="dropdown dropdown-end text-right ">

                        <label tabIndex={0} className="btn btn-ghost btn-circle ">
                            <CgChevronDown size={25} />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 mt-5 shadow bg-base-300 rounded gap-1 w-64">
                            {(userData) && (
                                <>
                                    <Link href="/me" passHref scroll={false}>
                                        <li className="flex flex-col">
                                            <a className="w-full text-left  relative flex justify-start items-center">
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full overflow-hidden relative">
                                                        <Image width={40} height={40} objectFit="cover" src={userData.alumniDisplayPhoto.url} onError={e => {
                                                            _setUserDisplayImage("./pa-transparent-white.png")
                                                        }} loading="lazy" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm">{userData.surname}, {userData.givenName}</p>
                                                    <p className="text-xs">See your profile</p>
                                                </div>
                                            </a>
                                        </li>
                                    </Link>
                                    <li onClick={logout}><a className="w-full text-right"> <CgLogOut size={25} /> <span>Logout</span> </a></li>
                                    <div className="divider"></div>
                                </>
                            )}
                            <li>
                                <Link href="/events" passHref scroll={false}>
                                    <a className="w-full text-right">News and Events</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/merch" passHref scroll={false}>
                                    <a className="w-full text-right">Merchandise</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/listing" passHref scroll={false}>
                                    <a className="w-full text-right">Alumni List</a>
                                </Link>
                            </li>
                            <li onClick={e => {
                                let temp = window.localStorage.getItem('theme')
                                _setThemeSelected(temp)
                            }}>
                                <label className="w-full swap swap-rotate place-items-center content-center">
                                    <input
                                        checked={_themeSelected === "winter"}
                                        onChange={e => {
                                            e.target.checked = _themeSelected === "winter" ? true : false
                                        }}
                                        data-toggle-theme="night,winter"
                                        type="checkbox" />
                                    <CgMoon className="swap-on" size={25} />
                                    <CgSun className="swap-off" size={25} />
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>


            {/* sign in modal */}
            <input type="checkbox" id="SignIn_PopupWindow" className="modal-toggle" />
            <div className="modal fixed bg-base-300 bg-opacity-90 h-screen">
                <div className="modal-box">
                    <h3 className="font-bold text-xl">Sign in to your account</h3>
                    <div className="form-control mt-10 gap-3">
                        <label className="input-group input-group-vertical">
                            <span>Email</span>
                            <input type="text" value={_userEmail} onChange={e => _setUserEmail(e.target.value)} placeholder="juan-delacruz@email.com" className="input input-bordered input-primary" />
                        </label>
                        <label className="input-group input-group-vertical">
                            <span>Password</span>
                            <input type="password" value={_userPassword} onChange={e => _setUserPassword(e.target.value)} placeholder="••••••••" className="input input-bordered input-primary" />
                        </label>
                    </div>
                    <div className="modal-action justify-between">
                        <label htmlFor="SignIn_PopupWindow" className="btn btn-ghost">Close</label>
                        <label onClick={SignInUser} htmlFor="SignIn_PopupWindow" className="btn btn-primary">Sign In</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar_New