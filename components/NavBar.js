import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { CgClose, CgDanger, CgMenu, CgMoon, CgProfile, CgShoppingCart, CgSun, CgList, CgFeed } from 'react-icons/cg'
import { FaTshirt } from 'react-icons/fa'
import { themeChange } from "theme-change"
import SideMenu from "./SideMenu"

// firenase hooks
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import firebaseApp from '../firebaseConfig'
import apolloClient from "apolloClient"
import { gql } from "@apollo/client"
import Logo from "./Logo"

const NavBar = e => {
    const [_sideMenuOpen, _toggleSideMenu] = useState(false)
    const [_scrollY, _setScrollY] = useState(0)

    useEffect(() => {
        window.addEventListener("scroll", e => {
            _setScrollY(window.scrollY)
        })
    }, [_scrollY])

    // firebase auth 
    const [getUser, loading, error] = useAuthState(getAuth(firebaseApp))
    const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] = useSignInWithEmailAndPassword(getAuth(firebaseApp));
    const [_userEmail, _setUserEmail] = useState('')
    const [_userPassword, _setUserPassword] = useState('')
    const [_userData, _setUserData] = useState({})
    const [_showError, _setShowError] = useState(false)
    const [_themeSelected, _setThemeSelected] = useState("")

    useEffect(e => {
        themeChange(false)
        let temp = window.localStorage.getItem('theme')
        _setThemeSelected(temp == 'winter' ? 'winter' : 'night')
    }, [])

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

        if (error) {
            console.log(error)
            _setShowError(true)
            setTimeout(() => {
                _setShowError(false)
            }, 1000);
        }
    }, [getUser])

    useEffect(e => {
        if (signInError) {
            console.log(signInError.message)
            _setShowError(true)
        }
    }, [signInLoading])

    const SignInUser = async e => {
        await signInWithEmailAndPassword(_userEmail, _userPassword)
    }

    const SignOutUser = async e => {
        await signOut(getAuth(firebaseApp))
        _setUserData({})
    }

    const ShowError = ({ closeHandler }) => {
        _setUserEmail('')
        _setUserPassword('')
        return (
            <div className="fixed bottom bottom-0 z-40 p-5 w-full">
                <div className="alert alert-error shadow-lg">
                    <div>
                        <CgDanger size={25} className="mr-5" />
                        <span>{signInError.message}</span>
                    </div>
                    <a onClick={closeHandler} className="btn btn-ghost btn-square">
                        <CgClose size={25} className="" />
                    </a>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* alert */}
            {_showError && <ShowError closeHandler={() => _setShowError(false)} />}
            {/* sidemenu */}
            <AnimatePresence exitBeforeEnter>
                {_sideMenuOpen && (
                    <SideMenu toggleSideMenu={() => _toggleSideMenu(false)} />
                )}
            </AnimatePresence>
            {/* navbar */}
            <motion.div className={`fixed top-0 left-0 w-full navbar justify-between px-5 lg:px-28 z-50 transition-all duration-100 ${_scrollY < 100 ? 'py-7' : ' backdrop-blur-md'}`}>
                {/* navbar start */}
                <div className="flex">
                    <Link href='/' scroll={false}>
                        <div className="cursor-pointer hidden lg:flex items-center">
                            <Logo width={30} height={30} strokeWidth={100} strokeColor={_themeSelected == "night" ? "#D4D4D4" : "#181A2A"} />
                            <span className={`ml-3 font-bold transition-all duration-100 text-xl ${_scrollY > 100 && 'opacity-0'}`}>
                                UCC Project Alumnus
                            </span>
                        </div>
                    </Link>

                    <label className="lg:hidden btn btn-ghost btn-square swap swap-rotate place-items-center content-center">
                        <input checked={_sideMenuOpen} onChange={e => _toggleSideMenu(e.target.checked)} type="checkbox" />
                        <CgClose className="swap-on" size={25} />
                        <CgMenu className="swap-off" size={25} />
                    </label>
                </div>

                {/* center logo */}
                <div className="lg:hidden flex">
                    <Link href='/' scroll={false}>
                        <div className="cursor-pointer flex items-center">
                            <Logo width={30} height={30} strokeWidth={100} strokeColor={_themeSelected == "night" ? "#D4D4D4" : "#181A2A"} />
                        </div>
                    </Link>
                </div>

                {/* navbar end */}
                <div className="flex gap-2 items-center">
                    {_scrollY < 100 ? (
                        <div className="lg:flex items-center hidden gap-2">
                            <Link href='/events' scroll={false}>
                                <a className="btn btn-ghost gap-2 items-center font-bold">  Events </a>
                            </Link>
                            <Link href='/listing' scroll={false}>
                                <a className="btn btn-ghost gap-2 items-center font-bold">  Alumni List </a>
                            </Link>
                            <Link href="/merch" passHref>
                                <a className="btn btn-ghost hidden lg:flex"> Merch </a>
                            </Link>
                        </div>
                    ) : (
                        <div className="lg:flex items-center hidden gap-2">
                            <Link href='/events' scroll={false}>
                                <a className="btn btn-ghost btn-square gap-2 items-center font-bold"> <CgList size={20} /> </a>
                            </Link>
                            <Link href='/listing' scroll={false}>
                                <a className="btn btn-ghost btn-square gap-2 items-center font-bold">  <CgFeed size={20} /> </a>
                            </Link>
                            <Link href="/merch" passHref>
                                <a className="btn btn-ghost btn-square hidden lg:flex"> <FaTshirt size={25} /> </a>
                            </Link>
                        </div>
                    )
                    }
                    <div className={`divider divider-vertical mx-3`} />
                    <div className="flex items-center gap-1">
                        <label className="btn btn-ghost btn-circle swap swap-rotate place-items-center content-center">
                            <input
                                checked={_themeSelected === 'winter' ? true : false}
                                onChange={e => {
                                    let activeTheme = window.localStorage.getItem('theme')
                                    _setThemeSelected(activeTheme === 'night' ? 'night' : 'winter')
                                }}
                                data-toggle-theme="night,winter" type="checkbox" />
                            <CgSun className="swap-on" size={25} />
                            <CgMoon className="swap-off" size={25} />
                        </label>

                        <div className="dropdown dropdown-end dropdown-hover items-center">
                            {
                                ((_userData.alumniDisplayPhoto) && !loading) ? (
                                    <>
                                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                                            <div className="avatar ">
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
                                            <Link href='/profile' scroll={false} passHref>
                                                <a className="text-right">Your Profile</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <label htmlFor="SignOut_PopupWindow" className="modal-button">Sign Out</label>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                    </div>

                </div>

                {/* sign in window */}
                <input type="checkbox" id="SignIn_PopupWindow" className="modal-toggle" />
                <div className="modal fixed bg-base-300 bg-opacity-90 h-screen">
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
                            <label onClick={() => SignInUser()} htmlFor="SignIn_PopupWindow" className="btn btn-primary">Sign In</label>
                        </div>
                    </div>
                </div>

                {/* error alert */}
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}


                {/* sign out window */}
                <input type="checkbox" id="SignOut_PopupWindow" className="modal-toggle" />
                <div className="modal fixed bg-base-300 bg-opacity-90 h-screen">
                    <div className="modal-box">
                        <h3 className="font-bold text-xl">Sign out</h3>
                        <p>Do you want to sign out?</p>

                        <div className="modal-action ">
                            <label htmlFor="SignOut_PopupWindow" className="btn btn-ghost">No</label>
                            <label onClick={() => SignOutUser()} htmlFor="SignOut_PopupWindow" className="btn btn-primary">Yes</label>
                        </div>
                    </div>
                </div>

            </motion.div>
        </>
    )
}

export default NavBar