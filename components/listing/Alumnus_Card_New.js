// recyclable card for alumnus

import Image from 'next/image'
import { motion as m, AnimateSharedLayout, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

import { CgUser } from 'react-icons/cg'
import { _Transition_Card } from '../../components/_Animations'
import dayjs from 'dayjs'

const Alumnus_Card_Information = ({ data, closeModal }) => {
    const { surname, givenName, programCompleted, graduationDate, id, alumniDisplayPhoto, slug, currentLocation, currentEmail } = data
    return (
        <>
            <m.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ease: 'easeOut', duration: 0.2, layout: { duration: 0.2, ease: "easeOut" } }}
                layoutId={`modal_${id}`}
                onClick={e => {
                    if (e.target == e.currentTarget) {
                        closeModal()
                    }
                }}
                className='w-full h-full fixed top-0 left-0 bg-base-200 bg-opacity-[0.90] flex justify-center items-center z-50'>
                <m.div layoutId={`card_${id}`} transition={{ layout: { duration: 0.2, ease: "easeOut" } }} className='card w-11/12 md:w-3/4 lg:w-1/2 min-w-fit max-w-xl bg-base-100 shadow'>
                    <div className='card-body p-5'>
                        {alumniDisplayPhoto ? (
                            <m.div layoutId={`avatar_${id}`} transition={{ layout: { duration: 0.2, ease: "easeOut" } }} className="justify-center avatar">
                                <div className='w-20 mask mask-squircle relative bg-base-100' data-theme="night">
                                    <Image layout='fill' src={alumniDisplayPhoto.url} />
                                </div>
                            </m.div>
                        ) : (
                            <m.div layoutId={`avatar_${id}`} className="justify-center avatar">
                                <div className='w-20 mask mask-squircle relative' >
                                    <CgUser className='w-20 h-20' />
                                </div>
                            </m.div>
                        )}
                        <div className='flex flex-col w-full text-center text-2xl'>
                            <m.span layoutId={`surname_${id}`} transition={{ layout: { duration: 0.2, ease: "easeOut" } }}>{surname}, {givenName}</m.span>
                            <m.span layoutId={`programCompleted_${id}`} transition={{ layout: { duration: 0.2, ease: "easeOut" } }} className='text-sm'>{programCompleted}</m.span>
                        </div>

                        <m.p className='flex justify-between w-full self-center max-w-sm mt-10 '>Graduated at <span className='text-primary font-bold'>{dayjs(graduationDate).format("MMMM DD, YYYY")}</span></m.p>
                        <m.p className='flex justify-between w-full self-center max-w-sm  '>Currently located at <span className='text-primary font-bold'>{currentLocation}</span></m.p>
                        <m.p className='flex justify-between w-full self-center max-w-sm  '>Current Email Address <span className='text-primary font-bold'>{currentEmail}</span></m.p>
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
                        onClick={() => setIsClicked(true)}
                        className="card bg-base-200 hover:bg-base-300 shadow select-none transition-colors relative">
                        <m.label layoutId={`card_${id}`} transition={{ layout: { duration: 0.2, ease: "easeOut" } }} htmlFor={`modal_${id}`} className="modal-button cursor-pointer">
                            <m.div className="card-body p-5"
                                transition={{ layout: { duration: 0.2, ease: "easeOut" } }}
                                layoutId={`modal_${id}`} >
                                <div className="card-title">
                                    {alumniDisplayPhoto ? (
                                        <m.div layoutId={`avatar_${id}`} transition={{ layout: { duration: 0.2, ease: "easeOut" } }} className=" avatar">
                                            <div className='w-10 mask mask-squircle relative bg-base-100' data-theme="night">
                                                <Image layout='fill' src={alumniDisplayPhoto.url} />
                                            </div>
                                        </m.div>
                                    ) : (
                                        <m.div layoutId={`avatar_${id}`} transition={{ layout: { duration: 0.2, ease: "easeOut" } }} className=" avatar">
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