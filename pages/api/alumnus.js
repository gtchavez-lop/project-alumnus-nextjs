import sanityClient from '@sanity/client';

const client = new sanityClient({
	projectId: 'gq2nptd4',
	apiVersion: '2022-05-07',
	dataset: 'production',
	useCdn: true,
});

const query = `
    *[_type == "alumnus"] {
        alumnusID,
        givenName,
        surname,
        middleName,
        currentEmail,
        "slug": slug.current,
        birthdate,
        "displayPhoto": displayPhoto.asset->url,
        currentLocation,
        currentEmail,
        programCompleted,
        graduationYear,
        programStartYear,
        isCurrentlyWorking,
        currentCompany,
        currentPosition,
    }
`;

const sanityFetch = async (e) => {
	const data = await client.fetch(query);
	return data;
};

const fetchData = async (req, res) => {
	const data = await sanityFetch();

	res.status(200).json({
		data,
		message: 'Successfully fetched data from Sanity',
	});
};

export default fetchData;
