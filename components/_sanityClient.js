import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: 'tkfs4ze5',
    dataset: 'production',
    useCdn: true
})