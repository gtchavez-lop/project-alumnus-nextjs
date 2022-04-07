// recyclable card for alumnus

import Image from 'next/image'
import Link from 'next/link'
import { motion as m, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { CgUser, CgCloseO } from 'react-icons/cg'
import { _Transition_Card } from '../../components/_Animations'
import dayjs from 'dayjs'

const Alumnus_Card_Information = ({ data, closeModal }) => {
    const { surname, givenName, programCompleted, graduationDate, id, alumniDisplayPhoto, slug, currentLocation, currentEmail } = data
    return (
        <>
            <m.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0, }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
                layoutId={`modal_${id}`}
                onClick={e => {
                    if (e.target == e.currentTarget) {
                        closeModal()
                    }
                }}
                className='w-full h-full fixed top-0 left-0 bg-base-200 bg-opacity-[0.90] flex justify-center items-center z-[99]'>
                <m.div
                    initial={{ translateY: 20 }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: 20 }}
                    transition={{ ease: 'easeOut', duration: 0.2 }}
                    className='card absolute bottom-0 w-full bg-base-300 shadow'>
                    <div className='card-body p-5 gap-5 lg:gap-2 w-full md:w-3/4 lg:w-1/2 self-center '>
                        {/* close button */}
                        <div className='flex justify-end absolute right-5 top-5 z-20'>
                            <div
                                onClick={() => closeModal()}
                                className='btn btn-ghost btn-circle btn-outline-secondary'>
                                <CgCloseO size={25} />
                            </div>
                        </div>

                        {/* display photo */}
                        {alumniDisplayPhoto ? (
                            <m.div className="justify-center avatar">
                                <div className='w-32 mask mask-squircle relative bg-base-100' data-theme="night">
                                    <Image layout='fill' src={alumniDisplayPhoto.url} />
                                </div>
                            </m.div>
                        ) : (
                            <m.div className="justify-center avatar">
                                <div className='w-32 mask mask-squircle relative' >
                                    <CgUser className='w-32 h-32' />
                                </div>
                            </m.div>
                        )}

                        {/* basic infor */}
                        <div className='flex flex-col w-full text-center text-2xl'>
                            <m.span >{surname}, {givenName}</m.span>
                            <m.span className='text-sm'>{programCompleted}</m.span>
                        </div>

                        <m.p className='flex flex-col md:flex-row text-center md:text-left justify-between w-full self-center max-w-lg mt-10 '>Graduated at <span className='text-secondary font-bold'>{dayjs(graduationDate).format("MMMM DD, YYYY")}</span></m.p>
                        <m.p className='flex flex-col md:flex-row text-center md:text-left justify-between w-full self-center max-w-lg  '>Currently located at <span className='text-secondary font-bold'>{currentLocation}</span></m.p>
                        <m.p className='flex flex-col md:flex-row text-center md:text-left justify-between w-full self-center max-w-lg  '>Current Email Address <span className='text-secondary font-bold'>{currentEmail}</span></m.p>

                        <div className='grid grid-cols-2 gap-5 my-10'>
                            <div onClick={closeModal} className='btn btn-primary btn-outline'>Close</div>

                            <Link href={`/alumni/${slug}&${id}`} passHref scroll>
                                <div onClick={closeModal} className='btn btn-primary'>Go to Profile</div>
                            </Link>
                        </div>
                    </div>
                </m.div>
            </m.div>
        </>
    )
}

const Alumnus_Card_New = ({ index, data }) => {
    const { surname, givenName, programCompleted, graduationDate, id, alumniDisplayPhoto, slug } = data
    const [isClicked, setIsClicked] = useState(false)

    return (
        <>
            <AnimatePresence>
                {isClicked && <Alumnus_Card_Information data={data} closeModal={() => setIsClicked(false)} />}
            </AnimatePresence>

            {(data) && (
                <>
                    <m.div
                        animate={{ opacity: isClicked ? 0 : 1, scale: isClicked ? 0.9 : 1 }}
                        transition={{ ease: 'easeOut', duration: 0.2 }}
                        onClick={() => setIsClicked(true)}
                        className="card bg-base-200 hover:bg-base-300 shadow select-none transition-color relative">
                        <m.label transition={{ layout: { duration: 0.2, ease: "easeOut" } }} htmlFor={`modal_${id}`} className="modal-button cursor-pointer">
                            <m.div className="card-body p-5"
                                transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
                            >
                                <div className="card-title">
                                    {alumniDisplayPhoto ? (
                                        <m.div transition={{ layout: { duration: 0.2, ease: "easeOut" } }} className=" avatar">
                                            <div className='w-10 mask mask-squircle relative bg-base-100' data-theme="night">
                                                <Image layout='fill' src={alumniDisplayPhoto.url} />
                                            </div>
                                        </m.div>
                                    ) : (
                                        <m.div transition={{ layout: { duration: 0.2, ease: "easeOut" } }} className=" avatar">
                                            <div className='w-10 mask mask-squircle relative' >
                                                <CgUser className='w-10 h-10' />
                                            </div>
                                        </m.div>
                                    )}
                                    <div className='flex flex-col'>
                                        <m.span transition={{ layout: { duration: 0.2, ease: "easeOut" } }} layoutId={`surname_${id}`}>{surname}, {givenName}</m.span>
                                        <m.span transition={{ layout: { duration: 0.2, ease: "easeOut" } }} layoutId={`programCompleted_${id}`} className='text-sm'>{programCompleted}</m.span>
                                    </div>
                                </div>
                                <div className="card-actions justify-end mt-3">
                                    <p className="flex text-right justify-end text-base-content text-opacity-30">
                                        <span className="lg:hidden">Tap</span>
                                        <span className="hidden lg:block">Click</span>
                                        <span>&nbsp;to see more</span>
                                    </p>
                                </div>
                            </m.div>
                        </m.label>
                    </m.div>
                </>
            )}


        </>
    )
}

export default Alumnus_Card_New