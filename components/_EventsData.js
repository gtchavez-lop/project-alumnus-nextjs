import _sanityClient from "./_sanityClient"
import _SupabaseClient from "./_SupabaseClient"

const Data_Events = async e => {
    // let { data: Table_Events, error } = await _SupabaseClient
    //     .from('Table_Events')
    //     .select('*')
    // if (!error) {
    //     return Table_Events
    // } else {
    //     return false
    // }

    const posts = await _sanityClient.fetch(groq`
        *[_type == "event_post"] {
            _id,
            "event_author": event_author -> author_name,
            event_body,
            "event_mainImage": event_mainImage.asset -> url,
            event_publishedAt,
            "event_slug": event_slug.current,
            event_tags,
            event_title
        }
    `)
    return posts
}

export default Data_Events