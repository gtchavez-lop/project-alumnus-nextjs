// recyclable card for alumnus

import Image from 'next/image'
import { motion as m } from 'framer-motion'

import { CgUser } from 'react-icons/cg'

const Alumnus_Card_New = ({ index, data }) => {
    const { surname, givenName, programCompleted, graduationDate, id, alumniDisplayPhoto, slug } = data

    return (
        <>
            {(data) && (
                <m.div layout className="card bg-base-200 hover:bg-base-300 shadow select-none transition-colors">
                    <label htmlFor="my-modal-6" className="modal-button cursor-pointer">
                        <div className="card-body p-5">
                            <div className="card-title">
                                {alumniDisplayPhoto ? (
                                    <div className=" avatar">
                                        <div className='w-10 mask mask-squircle relative bg-base-100' data-theme="night">
                                            <Image layout='fill' src={alumniDisplayPhoto.url} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className=" avatar">
                                        <div className='w-10 mask mask-squircle relative' >
                                            <CgUser className='w-10 h-10' />
                                        </div>
                                    </div>
                                )}
                                <div className='flex flex-col'>
                                    <span>{surname}, {givenName}</span>
                                    <span className='text-sm'>{programCompleted}</span>
                                </div>
                            </div>
                            <div className="card-actions justify-end mt-3">
                                <p className="flex text-right justify-end text-base-content text-opacity-30">
                                    <span className="lg:hidden">Tap</span>
                                    <span className="hidden lg:block">Click</span>
                                    <span>&nbsp;to see more</span>
                                </p>
                            </div>
                        </div>
                    </label>
                </m.div>
            )}
        </>
    )
}

export default Alumnus_Card_New