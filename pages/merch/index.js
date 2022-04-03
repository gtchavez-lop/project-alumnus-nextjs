import Image from 'next/image'
import apolloClient from '../../apolloClient'
import { motion } from 'framer-motion'
import { _Transition_Page, _Transition_Blob_Bottom, _Transition_Blob_Top_Center } from '../../components/_Animations'
import { gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import { _Transition_Card } from '../../components/_Animations'
import { useAuth } from '../../components/_AuthProvider'

import { CgShoppingCart, CgDanger } from 'react-icons/cg'

export const getStaticProps = async () => {
    const { data } = await apolloClient.query({
        query: gql`
            {
                merchLists {
                    id
                    merchName
                    merchPrice
                    merchImage {
                        url
                    }
                }
            }
        `
    })

    return {
        props: {
            merchList: data.merchLists
        },
    }
}

const MerchandisePage = ({ merchList }) => {

    const [merchListLoaded, setMerchListLoaded] = useState(false)
    const { currentUser } = useAuth()

    useEffect(e => {
        setTimeout(() => {
            setMerchListLoaded(Object.keys(merchList).length > 0 ? true : false);
        }, 200);
    }, [])

    return (
        <>


            {/* animated background */}
            <motion.div
                variants={_Transition_Blob_Top_Center}
                initial="initial" animate="animate" exit="exit"
                className="absolute top-0 left-0 w-full h-screen z-0 bg-gradient-to-tl from-green-300 via-blue-500 to-purple-600"
            />


            <motion.main
                variants={_Transition_Page} initial="initial" animate="animate" exit="exit"
                className='min-h-screen px-5 lg:px-28'
            >
                <section className='flex flex-col justify-center items-center h-screen relative'>
                    <h1 className="text-5xl font-bold text-center text-base-content ">Merchandise</h1>
                    <p className="text-center text-xl mt-5">Bring some part of UCC with you.</p>
                    <p className="text-center text-xl opacity-50">
                        <span>You can see more of the merch </span>
                        <span className='underline underline-offset-4'>here</span>
                    </p>


                    <motion.p
                        variants={_Transition_Card}
                        initial="initial" animate="animate" exit="exit"
                        className="absolute bottom-10 select-none text-base-content text-opacity-50">Scroll Down to see the list</motion.p>

                </section>

                <section className='min-h-screen flex flex-col gap-10'>
                    <p className='text-center text-3xl mt-10 mb-16'>Available Merchandises</p>
                    {(merchListLoaded) && (
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                            {merchList.map((merch, index) => (
                                <div key={index} className="group card bg-base-300 shadow-sm hover:shadow-md transition-all">
                                    <figure className="py-24 relative rounded-md overflow-hidden ">
                                        <Image src={merch.merchImage.url} objectFit="cover" layout="fill" className='group-hover:scale-110 transition-all' alt={merch.merchName} />
                                    </figure>
                                    <div className="card-body p-7">
                                        <h2 className="card-title font-bold">&#8369;{(merch.merchPrice).toFixed(2)}</h2>
                                        <p>{merch.merchName}</p>
                                        {
                                            currentUser ? (
                                                <div className="card-actions self-end mt-5">
                                                    <div className="hidden md:flex btn btn-primary items-center rounded-full">
                                                        <CgShoppingCart size={25} className="md:mr-2" />
                                                        <span className='hidden md:block'>Add to Cart</span>
                                                    </div>
                                                    <div className="md:hidden btn btn-circle btn-primary items-center">
                                                        <CgShoppingCart size={25} className="md:mr-2" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="card-actions self-end mt-5">
                                                    <p className='text-sm opacity-50'>Sign In to have an option to buy this</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

            </motion.main>
        </>
    )
}

export default MerchandisePage