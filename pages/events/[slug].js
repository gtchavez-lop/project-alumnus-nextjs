import reactMarkdown from 'react-markdown'
import Link from 'next/link'
import { CgChevronLeft } from 'react-icons/cg'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

import { _Transition_Page } from '../../components/_Animations'
import apolloClient from 'apolloClient'
import { gql } from '@apollo/client'

// get single event data on page request (server side)
export const getServerSideProps = async (context) => {
    // get event id from url
    const { id } = context.query

    // query single event from db based on event id
    const { data } = await apolloClient.query({
        query: gql`
            query  {
                news_And_Events {
                    id
                    createdAt
                    eventTitle
                    eventSlug
                    eventContent { markdown }
                    displayImage { url }
                    eventAuthors { name authorSlug }
                    eventTags
                  }
            }
        `
    })

    return {
        props: {
            id: data.news_And_Events.find(event => event.id === id).id,
            content: data.news_And_Events.find(event => event.id === id)
        }
    }

}

const Event_Blog = ({ id, content }) => {
    // initialize markdown parser
    const ReactMarkdown = reactMarkdown

    // markdown parser component renderer
    const renderers = {
        h1: props => <h1 className="text-4xl my-5 font-bold">{props.children}</h1>,
        h2: props => <h2 className="text-3xl my-5 font-bold">{props.children}</h2>,
        h3: props => <h3 className="text-2xl my-5 font-bold">{props.children}</h3>,
        h4: props => <h4 className="text-xl my-5 font-bold">{props.children}</h4>,
        h5: props => <h5 className="text-lg my-5 font-bold">{props.children}</h5>,
        h6: props => <h6 className="text-md my-5 font-bold">{props.children}</h6>,
        p: props => <p className="my-2">{props.children}</p>,
        ul: props => <ul className="text-xl my-5 list-disc border-l-2 px-10">{props.children}</ul>,
        li: props => <li className="">{props.children}</li>,
        blockquote: props => <blockquote className="text-xl mt-12">{props.children}</blockquote>,
        strong: props => <strong className="text-xl mt-12">{props.children}</strong>,
        em: props => <em className="text-xl mt-12">{props.children}</em>,
        br: props => <br className="text-xl mt-12" />,
        hr: props => <hr className="text-xl border-slate-500 mx-10 my-10" />,
        a: props => <a className="text-xl mt-12" href={props.href}>{props.children}</a>,
        img: props => <img className=" text-xl mt-12" src={props.src} alt={props.alt} />,
        table: props => <table className=" text-xl mt-12">{props.children}</table>,
        thead: props => <thead className=" text-xl mt-12">{props.children}</thead>,
        tbody: props => <tbody className=" text-xl mt-12">{props.children}</tbody>,
        tr: props => <tr className=" text-xl mt-12">{props.children}</tr>,
        td: props => <td className=" text-xl mt-12">{props.children}</td>,
        th: props => <th className=" text-xl mt-12">{props.children}</th>,
        code: props => <code className=" text-xl mt-12">{props.children}</code>,
        pre: props => <pre className=" text-xl mt-12">{props.children}</pre>,
        inlineCode: props => <code className=" text-xl mt-12">{props.children}</code>,
        root: props => <div className=" text-xl mt-12">{props.children}</div>
    }

    // tree-shake content
    const { eventContent, displayImage, createdAt, eventTags, eventTitle, eventAuthors } = content

    useEffect(() => {
        // scroll to top of page
        window.scrollTo(0, 0)
    }, [])

    console.log(content)

    return (
        <motion.div
            variants={_Transition_Page}
            initial="initial" animate="animate" exit="exit"
        >
            {/* content */}
            <section className='px-10 lg:px-28 mt-16'>
                {/* back button */}
                <div className='flex mt-32'>
                    <Link href={{
                        pathname: '/events',
                    }}>
                        <button className='btn btn-secondary btn-link'>
                            <CgChevronLeft size={25} />
                            <span className='ml-2'>Back to events</span>
                        </button>
                    </Link>
                </div>

                {/* content */}
                <div className='pb-20 pt-10'>
                    {/* get author's name */}
                    <p className='my-2 text-gray-400 flex flex-col'>Posted by <span className='ml-2 text-base-content font-bold'>{eventAuthors.name}</span></p>

                    {/* get event tags */}
                    <div className='flex flex-wrap gap-2 mb-10 select-none'>
                        {eventTags.map((tag, index) => (
                            <div key={index} className="badge badge-primary capitalize">{tag}</div>
                        ))}
                    </div>

                    {/* get event title */}
                    <p className='text-5xl my-5 font-bold'>{eventTitle}</p>

                    <div className='divider' />

                    {/* render event content as a markdown to html */}
                    <div className='mb-32'>
                        <ReactMarkdown
                            components={renderers}>
                            {eventContent.markdown}
                        </ReactMarkdown>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Event_Blog