import sanityClient from '@sanity/client';

const client = new sanityClient({
	projectId: 'gq2nptd4',
	apiVersion: '2022-05-07',
	dataset: 'production',
	useCdn: true,
});

const query = `
	*[_type == 'event']{
		_id,
		_createdAt,
		title,
		"slug": slug.current,
		"authorName": author->name,
		"featuredImage": featuredImage->url,
		tags,
		content
	}
`;

export const getEvent = async (e) => {
	const data = await client.fetch(query);

	if (data) {
		return data;
	}
	return {};
};

const fetchData = async (req, res) => {
	const data = await getEvent();
	res.status(200).json({ data, message: 'Successfully fetched events' });
};

export default fetchData;
