import { createContext, useContext, useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import apolloClient from 'apolloClient'
import { motion } from 'framer-motion';
import { CgSpinner } from 'react-icons/cg'

const ListingContext = createContext();

export const useListing = e => {
    return useContext(ListingContext);
}

export const ListingProvider = ({ children }) => {
    const [alumniList, setAlumniList] = useState([]);
    const [loading, setLoading] = useState(true);


    const getAlumniList = async e => {
        const alumniListQuery = gql`
        {
            alumniLists {
                id
                surname
                givenName
                alumniDisplayPhoto { url}
                birthDate
                createdAt
                slug
                currentEmail
                currentLocation
                programCompleted
                graduationDate
                isCurrentlyWorking
                company
                workPosition
                merchCart {
                    merchName
                    merchImage { url }
                    merchPrice
                }
            }
        }
    `

        const { data } = await apolloClient.query({
            query: alumniListQuery
        })

        setAlumniList(data.alumniLists);
        setLoading(false);
        return data.alumniLists;
    }

    useEffect(e => {
        getAlumniList();
    }, [])

    return (
        <ListingContext.Provider value={{ alumniList, loading, getAlumniList }}>
            {loading ? (
                <div className='absolute top-0 left-0 w-full h-full bg-zinc-900 text-white flex flex-col items-center justify-center'>
                    <motion.div animate={{ rotate: 360 }} transition={{ ease: 'linear', duration: 1, repeat: Infinity }}>
                        <CgSpinner size={30} />
                    </motion.div>
                    <p className='mt-4'>Loading Alumnus Module</p>
                </div>
            ) : (
                <>
                    {children}
                </>
            )}
        </ListingContext.Provider>
    )

}