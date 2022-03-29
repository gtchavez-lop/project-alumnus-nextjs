import Logo from "./Logo"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// icons
import { CgSun, CgMoon, CgShoppingBag, CgHome, CgSearch, CgArrowLeft, CgChevronDown, CgLogOut, CgCalendar, CgUserList } from 'react-icons/cg'
import { themeChange } from "theme-change";

// firebase auth
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import firebaseApp from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
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
    const [_user, _authLoading, _authError] = useAuthState(getAuth(firebaseApp))
    const [_userData, _setUserData] = useState({})
    const [_isSearching, _setIsSearching] = useState(false)
    const [_userDisplayImage, _setUserDisplayImage] = useState("")
    const [_alumniList, _setAlumniList] = useState([])
    const [_searchResultOpen, _setSearchResultOpen] = useState(false)
    const [_searchString, _setSearchString] = useState("")
    const [_isThresholdReached, _setIsThresholdReached] = useState(false)
    const _themeSelected = useRef("")
    const [_userEmail, _setUserEmail] = useState('')
    const [_userPassword, _setUserPassword] = useState('')

    // firebase


    // get scrollY position
    // const _scrollY = useRef(0)
    const handleScroll = e => {
        // _scrollY.current = window.scrollY
        if (window.scrollY > 50) { _setIsThresholdReached(true) } else _setIsThresholdReached(false);
    }
    useEffect(e => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // initiate theme state
    useEffect(e => {
        themeChange(false);

        // get theme value
        let temp = window.localStorage.getItem('theme')
        _themeSelected.current = temp
        // _setThemeSelected(temp == 'night' ? 'night' : 'winter')

        // get all alumni data on page load
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
        apolloClient.query({ query }).then(res => {
            _setAlumniList(res.data.alumniLists)
        })

    }, [])

    // get user data on auth state change
    useEffect(e => {
        if (_user) {
            const query = gql`
                query {
                    alumniLists (where: {
                        currentEmail: "${_user.email}"
                    }) {
                        surname
                        givenName
                        alumniDisplayPhoto { url }
                    }
                }
            `

            apolloClient.query({ query })
                .then(res => res)
                .then(data => {
                    _setUserData(data.data.alumniLists[0])
                    _setUserDisplayImage(data.data.alumniLists[0].alumniDisplayPhoto.url)
                })
        }
    }, [_authLoading])

    const SignInUser = async e => {
        await signInWithEmailAndPassword(getAuth(firebaseApp), _userEmail, _userPassword)
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
                            <Logo width={30} height={30} strokeWidth={75} strokeColor={_themeSelected.current === "winter" ? "#394E6A" : "#B3C5EF"} />
                        </div>
                    </Link>
                    {_user ? (
                        <label className="input-group ">
                            <input value={_searchString}
                                autoComplete="off"
                                autoCorrect="off"
                                autoFocus={false}
                                spellCheck={false}
                                tabIndex={-1}
                                disabled

                                onChange={e => { e.currentTarget.value.length > 0 ? _setSearchResultOpen(true) : _setSearchResultOpen(false); _setSearchString(e.currentTarget.value) }}
                                type="text" placeholder="Find someone here..." className="input input-bordered input-sm" />
                            <span><CgSearch size={15} /></span>
                        </label>
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
                    {/* links on desktop only */}
                    <div className="hidden lg:flex gap-2 mr-3">
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
                    </div>
                    {
                        (_user && _userData && _userDisplayImage) ? (
                            <Link href="/me" passHref>
                                <div className="btn btn-secondary btn-outline items-center rounded-full hidden lg:flex">
                                    <div className="avatar">
                                        <div className="w-7 rounded-full overflow-hidden relative">
                                            <Image src={_userDisplayImage} layout="fill" />
                                        </div>
                                    </div>
                                    <span className="ml-3">
                                        {_userData.givenName}
                                    </span>
                                </div>
                            </Link>
                        ) : (
                            <>
                                <Link href="/register" passHref>
                                    <div className="btn btn-primary rounded-full">
                                        <p>Sign Up</p>
                                    </div>
                                </Link>
                                <div>
                                    <label htmlFor="SignIn_PopupWindow" className="btn btn-primary btn-outline rounded-full modal-button">Sign In</label>
                                </div>
                            </>
                        )
                    }
                    <div className="dropdown dropdown-end text-right ">

                        <label tabIndex={0} className="btn btn-ghost btn-circle ">
                            <CgChevronDown size={25} />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 mt-5 shadow bg-base-300 rounded gap-1 w-64">
                            {((_user && _userData && _userDisplayImage)) && (
                                <>
                                    <Link href="/me" passHref>
                                        <li className="flex flex-col">
                                            <a className="w-full text-left  relative flex justify-start items-center">
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full overflow-hidden relative">
                                                        <Image width={40} height={40} objectFit="cover" src={_userDisplayImage} onError={e => {
                                                            _setUserDisplayImage("./pa-transparent-white.png")
                                                        }} loading="lazy" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-sm">{_userData.surname}, {_userData.givenName}</p>
                                                    <p className="text-xs">See your profile</p>
                                                </div>
                                            </a>
                                        </li>
                                    </Link>
                                    <li onClick={e => {
                                        signOut(getAuth(firebaseApp))
                                    }}><a className="w-full text-right"> <CgLogOut size={25} /> <span>Logout</span> </a></li>
                                    <div className="divider"></div>
                                </>
                            )}
                            <li><a className="w-full text-right">News and Events</a></li>
                            <li><a className="w-full text-right">Merchandise</a></li>
                            <li>
                                <label className="w-full swap swap-rotate place-items-center content-center">
                                    <input
                                        data-toggle-theme="night,winter"
                                        checked={_themeSelected.current === 'winter' ? true : false}
                                        onChange={e => {
                                            let temp = window.localStorage.getItem('theme')
                                            _themeSelected.current = temp
                                            console.log(_themeSelected.current)
                                        }}
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