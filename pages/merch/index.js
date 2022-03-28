import Image from 'next/image'
import apolloClient from '../../apolloClient'
import { motion } from 'framer-motion'
import { _Transition_Page } from '../../components/_Animations'
import { gql } from '@apollo/client'
import { useState, useEffect } from 'react'

import { CgShoppingCart } from 'react-icons/cg'

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

    useEffect(e => {
        setTimeout(() => {
            setMerchListLoaded(Object.keys(merchList).length > 0 ? true : false);
        }, 200);
    }, [])

    return (
        <>
            <motion.main
                variants={_Transition_Page} initial="initial" animate="animate" exit="exit"
                className='min-h-screen px-5 lg:px-28'
            >
                <section className='flex flex-col justify-center items-center h-screen'>
                    <h1 className="text-5xl font-bold text-center text-base-content ">Merchandise Section</h1>
                    <p className="text-center text-xl mt-5">Bring some part of UCC with you.</p>
                </section>

                <section className='min-h-screen flex flex-col gap-10'>
                    <p className='text-center text-3xl mt-10 mb-16'>Available Merchandises</p>
                    {merchListLoaded && (
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                            {merchList.map((merch, index) => (
                                <div key={index} className="card bg-base-200 shadow-sm">
                                    <figure className="py-24 relative rounded-md overflow-hidden">
                                        <Image src={merch.merchImage.url} objectFit="cover" layout="fill" alt={merch.merchName} />
                                    </figure>
                                    <div className="card-body p-4">
                                        <h2 className="card-title font-bold">&#8369;{(merch.merchPrice).toFixed(2)}</h2>
                                        <p>{merch.merchName}</p>
                                        <div className="card-actions self-end mt-5">
                                            <button className="hidden md:flex btn btn-primary items-center">
                                                <CgShoppingCart size={25} className="md:mr-2" />
                                                <span className='hidden md:block'>Add to Cart</span>
                                            </button>
                                            <button className="md:hidden btn btn-square btn-primary items-center">
                                                <CgShoppingCart size={25} className="md:mr-2" />
                                            </button>
                                        </div>
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