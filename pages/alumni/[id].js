import { useRouter } from 'next/router'

const Alumni_Page = e => {
    const router = useRouter()
    const { id } = router.query

    return (
        <>
            <section className='min-h-screen flex flex-col gap-10'>
                <p>{id}</p>
            </section>
        </>
    )
}

export default Alumni_Page