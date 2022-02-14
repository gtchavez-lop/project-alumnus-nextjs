import reactMarkdown from 'react-markdown'
import _SupabaseClient from '../../components/_SupabaseClient'
import { CgChevronLeft } from 'react-icons/cg'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { _Transition_Page } from '../../components/_Animations'
import { useEffect } from 'react'
import _sanityClient from '../../components/_sanityClient'

export const getServerSideProps = async (context) => {
    const { id } = context.query
    // const { data: content, error } = await _SupabaseClient
    //     .from('Table_Events')
    //     .select('*')
    //     .eq('id', id)

    //     return {
    //         props: {
    //             id: id,
    //             content: content,
    //         }
    //     }
    const posts = await _sanityClient.fetch(
        `*[_type == "event_post" && _id == "${id}"] [0] {
            _id,
            "event_author": event_author -> author_name,
            event_body,
            "event_mainImage": event_mainImage.asset -> url,
            event_publishedAt,
            "event_slug": event_slug.current,
            event_tags,
            event_title
          }`
    )

    return {
        props: {
            id: id,
            content: posts
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

    // tree shake content
    const { event_body, event_mainImage, event_publishedAt, event_tags, event_title } = content

    useEffect(() => {
        // scroll to top of page
        window.scrollTo(0, 0)
    }, [])

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
                        <button className='btn btn-secondary btn-outline'>
                            <CgChevronLeft size={25} />
                            <span className='ml-2'>Back to events</span>
                        </button>
                    </Link>
                </div>

                <div className='pb-20 pt-10'>
                    <div className='flex flex-wrap gap-2 mb-10 select-none'>
                        {event_tags.map((tag, index) => (
                            <div key={index} className="badge badge-primary capitalize">{tag}</div>
                        ))}
                    </div>
                    <p className='text-5xl my-5 font-bold'>{event_title}</p>
                    <div className='divider' />
                    <ReactMarkdown
                        components={renderers}>
                        {event_body}
                    </ReactMarkdown>
                </div>
            </section>
        </motion.div>
    )
}

export default Event_Blog