import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { _Transition_Page } from '../../components/_Animations'
import { useListing } from '../../components/_AlumniListProvider'


const Alumni_Page = ({ staticID }) => {
    const router = useRouter()
    const { slug } = router.query

    // split slug
    const userID = slug?.split('&');

    // states
    const { alumniList, loading, getAlumniList } = useListing();
    const [alumni, setAlumni] = useState();

    useEffect(e => {
        getAlumniList()
            .then(e => {
                // filter alumni based on id
                const alumni = e.filter(e => e.id == userID[1])
                setAlumni(alumni)
            })
    }, [])




    return (
        <>
            {alumni && alumni.length > 0 ? (
                <motion.section
                    variants={_Transition_Page}
                    initial='initial' animate='animate' exit='exit'
                    className='min-h-screen flex flex-col gap-10 justify-center items-center'>
                    <p>{alumni[0].givenName} {alumni[0].surname}</p>
                </motion.section>
            ) : (
                <p>Loading</p>
            )}
        </>
    )
}

export default Alumni_Page