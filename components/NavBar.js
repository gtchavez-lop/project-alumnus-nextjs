import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CgClose, CgDarkMode, CgMenu, CgMoon, CgProfile, CgShoppingCart, CgSun } from 'react-icons/cg'
import { themeChange } from "theme-change"
import SideMenu from "./SideMenu"

// firenase hooks
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import firebaseApp from '../firebaseConfig'
import apolloClient from "apolloClient"
import { gql } from "@apollo/client"

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

    // firebase auth 
    const [getUser, loading, error] = useAuthState(getAuth(firebaseApp))
    const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] = useSignInWithEmailAndPassword(getAuth(firebaseApp));
    const [_userEmail, _setUserEmail] = useState('')
    const [_userPassword, _setUserPassword] = useState('')
    const [_userData, _setUserData] = useState({})

    useEffect(() => {
        if (getUser) {
            const getUserQuery = gql`
                query {
                    alumniLists (where: {
                        currentEmail: "${getUser.email}"
                    }) {
                        alumniDisplayPhoto { url }
                    }
                }
            `
            if (!loading && getUser.email) {
                const user = apolloClient.query({
                    query: getUserQuery,
                }).then(res => res).then(({ data }) => {
                    _setUserData(data.alumniLists[0])
                })
            }
        }
    }, [getUser])

    const _signInUser = async e => {
        await signInWithEmailAndPassword(_userEmail, _userPassword)

        const getUserQuery = gql`
            query {
                alumniLists (where: {
                    currentEmail: "${_userEmail}"
                }) {
                    alumniDisplayPhoto { url }
                }
            }
        `
        if (!loading && _userEmail) {
            const { data } = await apolloClient.query({
                query: getUserQuery,
            })
            console.log(data)
        }
        _setUserEmail('')
        _setUserPassword('')
    }

    const _signOutUser = async e => {
        await signOut(getAuth(firebaseApp))
        _setUserData({})
    }

    return (
        <>
            {/* sidemenu */}
            <AnimatePresence exitBeforeEnter>
                {_sideMenuOpen && (
                    <SideMenu toggleSideMenu={() => _toggleSideMenu(false)} />
                )}
            </AnimatePresence>
            {/* navbar */}
            <motion.div className={`fixed top-0 left-0 w-full navbar justify-between px-5 lg:px-28 z-50 transition-all duration-100 ${_scrollY > 100 ? 'bg-neutral shadow-2xl text-neutral-content' : 'bg-transparent py-10 text-base-content'}`}>
                <div className="flex">
                    <Link href='/' scroll={false}>
                        <div className="cursor-pointer hidden lg:flex items-center">
                            <Image src='/pa-transparent-white.png' width={30} height={30} />
                            <span className={`ml-3 font-bold transition-all duration-100 ${_scrollY < 100 ? 'text-xl' : ''}`}>
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
                            <a className="btn btn-ghost gap-2 items-center font-bold">  Events </a>
                        </Link>
                        <Link href='/listing' scroll={false}>
                            <a className="btn btn-ghost gap-2 items-center font-bold">  Alumni List </a>
                        </Link>
                    </div>
                    <div className="divider divider-vertical mx-2 hidden lg:block" />
                    <div className="flex items-center gap-1">
                        <a className="btn btn-ghost btn-square hidden lg:flex"> <CgShoppingCart size={25} /> </a>
                        <label className="btn btn-ghost btn-square swap swap-rotate place-items-center content-center">
                            <input className=" " data-toggle-theme="corporate,business" type="checkbox" />
                            <CgSun className="swap-on" size={25} />
                            <CgMoon className="swap-off" size={25} />
                        </label>

                        <div className="dropdown dropdown-end dropdown-hover items-center">
                            {
                                (Object.keys(_userData).length > 0 && !loading) ? (
                                    <>
                                        <label tabIndex={0} className="btn btn-ghost btn-square">
                                            <div className="avatar">
                                                <div className="relative w-8 mask mask-squircle">
                                                    <Image src={_userData.alumniDisplayPhoto.url} layout="fill" objectFit="cover" />
                                                </div>
                                            </div>
                                        </label>
                                    </>
                                ) : (
                                    <label tabIndex={0} className="btn btn-ghost btn-square"><CgProfile size={25} /></label>
                                )
                            }
                            <ul className="p-2 menu dropdown-content bg-neutral text-neutral-content rounded w-max">
                                {(!getUser && !loading) && (
                                    <>
                                        <li>
                                            <label htmlFor="SignIn_PopupWindow" className="modal-button">Sign In</label>
                                        </li>
                                        <li>
                                            <Link href='/register' scroll={false} passHref>
                                                <a className="text-right">Register an account</a>
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {(getUser && !loading) && (
                                    <>
                                        <li>
                                            <label htmlFor="SignOut_PopupWindow" className="modal-button">Sign Out</label>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                    </div>

                </div>

                <input type="checkbox" id="SignIn_PopupWindow" className="modal-toggle" />
                <div className="modal bg-base-200 bg-opacity-80">
                    <div className="modal-box">
                        <h3 className="font-bold text-xl">Sign in to your account</h3>

                        <div className="form-control mt-10 gap-3">
                            <label className="input-group input-group-vertical">
                                <span>Email</span>
                                <input type="text" value={_userEmail} onChange={e => _setUserEmail(e.target.value)} placeholder="juanDelaCruz@mail.com" className="input input-bordered input-primary" />
                            </label>
                            <label className="input-group input-group-vertical">
                                <span>Password</span>
                                <input type="password" value={_userPassword} onChange={e => _setUserPassword(e.target.value)} placeholder="••••••••" className="input input-bordered input-primary" />
                            </label>
                        </div>

                        <div className="modal-action justify-between">
                            <label htmlFor="SignIn_PopupWindow" className="btn btn-ghost">Close</label>
                            <label onClick={() => _signInUser()} htmlFor="SignIn_PopupWindow" className="btn btn-primary">Sign In</label>
                        </div>
                    </div>
                </div>

                {/* sign out window */}
                <input type="checkbox" id="SignOut_PopupWindow" className="modal-toggle" />
                <div className="modal bg-base-200 bg-opacity-80">
                    <div className="modal-box">
                        <h3 className="font-bold text-xl">Sign out</h3>
                        <p>Do you want to sign out?</p>

                        <div className="modal-action ">
                            <label htmlFor="SignOut_PopupWindow" className="btn btn-ghost">No</label>
                            <label onClick={() => _signOutUser()} htmlFor="SignOut_PopupWindow" className="btn btn-primary">Yes</label>
                        </div>
                    </div>
                </div>

            </motion.div>
        </>
    )
}

export default NavBar